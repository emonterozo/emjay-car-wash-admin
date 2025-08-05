import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Text, Image, FlatList } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { color, font } from '@app/styles';
import { AppHeader, EmptyState, ErrorModal, LoadingAnimation } from '@app/components';
import { NavigationProp } from '../../types/navigation/types';
import { ERR_NETWORK, IMAGES, LIMIT } from '@app/constant';
import { Conversation, ScreenStatusProps } from '../../types/services/types';
import { getConversationsRequest } from '@app/services';
import GlobalContext from '@app/context';

const renderSeparator = () => <View style={styles.separator} />;

const Message = () => {
  const { user } = useContext(GlobalContext);
  const isFocused = useIsFocused();
  const navigation = useNavigation<NavigationProp>();
  const [screenStatus, setScreenStatus] = useState<ScreenStatusProps>({
    isLoading: false,
    hasError: false,
    type: 'error',
  });
  const [messages, setMessages] = useState<Conversation[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  const fetchConversations = async () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: true });
    const response = await getConversationsRequest(user.accessToken, user.refreshToken, LIMIT, 0);
    if (response.success && response.data) {
      setMessages(response.data.messages);
      setTotalCount(response.data.totalCount);
      setScreenStatus({ ...screenStatus, hasError: false, isLoading: false });
    } else {
      setScreenStatus({
        isLoading: false,
        type: response.error === ERR_NETWORK ? 'connection' : 'error',
        hasError: true,
      });
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchConversations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  const onCancel = () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: false });
  };

  const onEndReached = async () => {
    if (isFetching || messages.length >= totalCount) {
      return;
    }

    setIsFetching(true);
    const response = await getConversationsRequest(
      user.accessToken,
      user.refreshToken,
      LIMIT,
      messages.length,
    );

    if (response.success && response.data) {
      setMessages((prev) => [...prev, ...response.data?.messages!]);
      setTotalCount(response.data.totalCount);
    }
    setIsFetching(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.background} barStyle="dark-content" />
      <AppHeader title="Messages" />
      <LoadingAnimation isLoading={screenStatus.isLoading} type="modal" />
      <ErrorModal
        type={screenStatus.type}
        isVisible={screenStatus.hasError}
        onCancel={onCancel}
        onRetry={fetchConversations}
      />
      <FlatList
        bounces={false}
        data={messages}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Chat', {
                customerId: item.customer_id,
                firstName: item.first_name,
                lastName: item.last_name,
                gender: item.gender,
              })
            }
          >
            <View style={styles.message}>
              <View style={styles.avatarContainer}>
                <Image
                  source={item.gender === 'MALE' ? IMAGES.AVATAR_BOY : IMAGES.AVATAR_GIRL}
                  style={styles.avatar}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.middle}>
                <Text style={styles.name} numberOfLines={1}>
                  {`${item.first_name} ${item.last_name}`}
                </Text>
                <Text style={styles.text} numberOfLines={3}>
                  {item.last_message.message}
                </Text>
              </View>
              <View style={styles.right}>
                <Text style={styles.timestamp} numberOfLines={1}>
                  {item.last_message.timestamp}
                </Text>
                {item.emjay_unread_count > 0 && (
                  <View style={styles.countContainer}>
                    <Text style={styles.count}>
                      {item.emjay_unread_count >= 100 ? '99+' : item.emjay_unread_count}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id.toString()}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={renderSeparator}
        ListEmptyComponent={<EmptyState />}
        onEndReached={onEndReached}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },

  message: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 17,
  },
  countContainer: {
    padding: 4,
    width: 45,
    height: 45,
    borderRadius: 45,
    backgroundColor: '#1F93E1',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  count: {
    ...font.regular,
    fontSize: 20,
    lineHeight: 20,
    color: '#F3F2EF',
    textAlign: 'center',
    alignSelf: 'center',
  },
  timestamp: {
    ...font.regular,
    fontSize: 12,
    lineHeight: 12,
    color: '#888888',
  },
  right: {
    gap: 21,
  },
  text: {
    ...font.regular,
    fontSize: 16,
    lineHeight: 23,
    color: '#888888',
  },
  name: {
    ...font.regular,
    fontSize: 20,
    lineHeight: 20,
    color: '#050303',
  },
  middle: {
    gap: 8,
    flex: 1,
  },
  list: {
    paddingHorizontal: 25,
    paddingVertical: 25,
    backgroundColor: color.background,
    flexGrow: 1,
  },
  separator: {
    marginTop: 44,
  },
  avatarContainer: {
    backgroundColor: '#1F93E1',
    borderRadius: 83,
    width: 83,
    height: 83,
    overflow: 'hidden',
  },
  avatar: {
    position: 'absolute',
    top: 4,
    left: 0,
    width: '100%',
    height: '100%',
  },
});

export default Message;
