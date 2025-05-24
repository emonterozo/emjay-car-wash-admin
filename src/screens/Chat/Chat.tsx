import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  Text,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { io } from 'socket.io-client';
import Config from 'react-native-config';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';

import { color, font } from '@app/styles';
import { EmptyState, ErrorModal, LoadingAnimation } from '@app/components';
import GlobalContext from '@app/context';
import { ChevronLeftIcon, SendIcon } from '@app/icons';
import { CHAT_REFERENCE, ERR_NETWORK, IMAGES, LIMIT } from '@app/constant';
import { Message as TMessage, ScreenStatusProps } from '../../types/services/types';
import { getMessagesRequest, updateMessageStateRequest } from '@app/services';
import { ChatRouteProp } from '../../types/navigation/types';

const socket = io(Config.API_BASE_URL, {
  transports: ['websocket'],
});

const screenWidth = Dimensions.get('window').width;

const Chat = () => {
  const { user } = useContext(GlobalContext);
  const isFocused = useIsFocused();
  const { customerId, firstName, lastName, gender } = useRoute<ChatRouteProp>().params;
  const navigation = useNavigation();
  const flatListRef = useRef<FlatList>(null);
  const [screenStatus, setScreenStatus] = useState<ScreenStatusProps>({
    isLoading: false,
    hasError: false,
    type: 'error',
  });
  const [totalCount, setTotalCount] = useState(0);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const updateMessage = async () => {
    await updateMessageStateRequest(user.accessToken, user.refreshToken, customerId, 'emjay');
  };

  const fetchMessage = async () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: true });
    const response = await getMessagesRequest(
      user.accessToken,
      user.refreshToken,
      customerId,
      LIMIT,
      0,
    );
    if (response.success && response.data) {
      setMessages(response.data.messages);
      setTotalCount(response.data.totalCount);
      setScreenStatus({ ...screenStatus, hasError: false, isLoading: false });
      updateMessage();
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
      fetchMessage();
    } else {
      socket.emit('leave', customerId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  useEffect(() => {
    // Join your room
    socket.emit('join', { customerId, role: 'emjay' });

    // Listen for private messages
    socket.on('privateMessage', async () => {
      const response = await getMessagesRequest(
        user.accessToken,
        user.refreshToken,
        customerId,
        LIMIT,
        0,
      );
      if (response.success && response.data) {
        setMessages(response.data?.messages);
        setTotalCount(response.data.totalCount);
        updateMessage();
      }
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    });

    return () => {
      socket.off('privateMessage');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = () => {
    const payload = {
      from: {
        id: user.id,
        ref: CHAT_REFERENCE.emjay,
      },
      to: {
        id: customerId,
        ref: CHAT_REFERENCE.customer,
      },
      message,
    };
    socket.emit('privateMessage', payload);
    setMessage('');
  };

  const renderBubble = ({ item }: { item: TMessage }) => {
    const { timestamp, from } = item;

    return (
      <View
        style={[
          styles.bubble,
          from === CHAT_REFERENCE.emjay ? styles.customerContainer : styles.emjayContainer,
        ]}
      >
        <View style={from === CHAT_REFERENCE.emjay ? styles.messageSent : styles.messageReceived}>
          <Text
            style={[
              styles.messageText,
              from === CHAT_REFERENCE.emjay ? styles.customer : styles.emjay,
            ]}
          >
            {item.message}
          </Text>
        </View>
        <Text
          style={[
            styles.timestamp,
            from === CHAT_REFERENCE.emjay ? styles.customerContainer : styles.emjayContainer,
          ]}
        >
          {timestamp}
        </Text>
      </View>
    );
  };

  const loadMoreMessages = async () => {
    if (isLoadingMore || messages.length >= totalCount) {
      return;
    }

    setIsLoadingMore(true);
    const response = await getMessagesRequest(
      user.accessToken,
      user.refreshToken,
      customerId,
      LIMIT,
      messages.length,
    );
    if (response.success && response.data) {
      setMessages((prev) => [...prev, ...response.data?.messages!]);
      setTotalCount(response.data.totalCount);
    }
    setIsLoadingMore(false);
  };

  const onCancel = () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: false });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#F4F9FD" barStyle="dark-content" />
      <LoadingAnimation isLoading={screenStatus.isLoading} type="modal" />
      <ErrorModal
        type={screenStatus.type}
        isVisible={screenStatus.hasError}
        onCancel={onCancel}
        onRetry={fetchMessage}
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeftIcon />
        </TouchableOpacity>
        <View style={styles.avatarContainer}>
          <Image
            source={gender === 'MALE' ? IMAGES.AVATAR_BOY : IMAGES.AVATAR_GIRL}
            style={styles.avatar}
            resizeMode="contain"
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={1}>
            {`${firstName} ${lastName}`}
          </Text>
          <Text style={styles.description} numberOfLines={1}>
            Carwash customer
          </Text>
        </View>
      </View>
      <View style={styles.separator} />
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderBubble}
        inverted={messages.length > 0}
        onEndReached={loadMoreMessages}
        ListFooterComponent={isLoadingMore ? <ActivityIndicator /> : null}
        ListEmptyComponent={screenStatus.isLoading ? undefined : <EmptyState />}
        contentContainerStyle={messages.length > 0 ? undefined : styles.empty}
      />
      <View style={styles.separator} />
      <View style={styles.bottom}>
        <View style={styles.inputContainer}>
          <TextInput
            value={message}
            placeholder="Type your message..."
            multiline
            numberOfLines={10}
            style={styles.input}
            placeholderTextColor="#888888"
            onChangeText={setMessage}
            maxLength={1000}
          />
        </View>
        <Pressable
          onPress={sendMessage}
          style={({ pressed }) => [styles.send, pressed && { backgroundColor: '#46A6FF' }]}
        >
          <SendIcon width={40} height={40} fill="#FFFFFF" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 24,
    backgroundColor: '#F4F9FD',
  },
  content: {
    marginLeft: 12,
    gap: 5,
    flex: 1,
  },
  name: {
    ...font.regular,
    fontSize: 24,
    lineHeight: 24,
    color: color.black,
  },
  description: {
    ...font.regular,
    fontSize: 16,
    lineHeight: 16,
    color: '#888888',
  },
  messageReceived: {
    backgroundColor: '#F4F9FD',
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  messageSent: {
    backgroundColor: '#1F93E1',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  messageText: {
    ...font.regular,
    lineHeight: 23,
    fontSize: 16,
  },
  timestamp: {
    ...font.regular,
    lineHeight: 12,
    fontSize: 12,
    color: '#888888',
    marginHorizontal: 10,
    marginTop: 5,
  },
  bubble: {
    maxWidth: '80%',
    marginVertical: 4,
    marginHorizontal: 10,
  },
  send: {
    height: 70,
    width: 70,
    backgroundColor: '#1F93E1',
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    ...font.light,
    fontSize: 16,
    lineHeight: 16,
    color: '#050303',
    flex: 1,
    marginHorizontal: 5,
  },
  inputContainer: {
    width: screenWidth - 70 - 30 - 48,
    backgroundColor: '#F4F9FD',
    paddingHorizontal: 12,
    paddingVertical: 23,
    borderRadius: 24,
    minHeight: 71,
    maxHeight: 150,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottom: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
    marginVertical: 30,
  },
  separator: {
    marginBottom: 6,
  },
  emjayContainer: {
    alignSelf: 'flex-start',
  },
  customerContainer: {
    alignSelf: 'flex-end',
  },
  customer: {
    color: '#F3F2EF',
  },
  emjay: {
    color: '#050303',
  },
  empty: {
    flexGrow: 1,
    paddingHorizontal: 25,
  },
  avatarContainer: {
    backgroundColor: '#1F93E1',
    borderRadius: 60,
    width: 60,
    height: 60,
    overflow: 'hidden',
    marginLeft: 15,
  },
  avatar: {
    position: 'absolute',
    top: 4,
    left: 0,
    width: '100%',
    height: '100%',
  },
});

export default Chat;
