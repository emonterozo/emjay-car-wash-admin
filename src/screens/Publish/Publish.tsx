import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { color, font } from '@app/styles';
import {
  AppHeader,
  EmptyState,
  ErrorModal,
  FloatingActionButton,
  LoadingAnimation,
} from '@app/components';
import GlobalContext from '@app/context';
import { ScreenStatusProps, PromoItem } from '../../types/services/types';
import { getPromos } from '@app/services';
import { ERR_NETWORK, IMAGES } from '@app/constant';
import { NavigationProp } from '../../types/navigation/types';

const renderSeparator = () => <View style={styles.separator} />;

const Publish = () => {
  const { user } = useContext(GlobalContext);
  const navigation = useNavigation<NavigationProp>();
  const [screenStatus, setScreenStatus] = useState<ScreenStatusProps>({
    isLoading: false,
    hasError: false,
    type: 'error',
  });
  const [promos, setPromos] = useState<PromoItem[]>([]);
  const isFocused = useIsFocused();

  const fetchPromoItems = async () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: true });
    const response = await getPromos(user.accessToken, user.refreshToken);

    if (response.success && response.data) {
      setPromos(response.data.promos);
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
      fetchPromoItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  const onCancel = () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: false });
    navigation.goBack();
  };

  const handleAddPromo = () => {
    navigation.navigate('PublishForm', { type: 'Add' });
  };

  const renderCardItem = ({ item }: { item: PromoItem }) => (
    <TouchableOpacity
      key={item._id}
      style={[
        styles.publishContainer,
        { backgroundColor: item.is_active ? color.primary : color.black },
      ]}
      onPress={() =>
        navigation.navigate('PublishForm', {
          type: 'Update',
          promo: {
            id: item._id,
            percent: item.percent,
            title: item.title,
            description: item.description,
            isActive: item.is_active,
          },
        })
      }
    >
      <View style={styles.publish}>
        <Text style={styles.publishTitle}>
          <Text style={styles.percent}>{`${item.percent}% `}</Text>
          {item.title}
        </Text>
        <Text style={styles.publishDescription}>{item.description}</Text>
      </View>
      <Image
        source={item.is_free ? IMAGES.PROMO_FREE : IMAGES.PROMO_PERCENT}
        style={styles.publishImage}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.background} barStyle="dark-content" />
      <AppHeader title="Promos" />
      <LoadingAnimation isLoading={screenStatus.isLoading} />
      <ErrorModal
        type={screenStatus.type}
        isVisible={screenStatus.hasError}
        onCancel={onCancel}
        onRetry={fetchPromoItems}
      />
      <View style={styles.heading}>
        <Text style={styles.label}>Promo Lists</Text>
      </View>
      <FlatList
        data={promos}
        renderItem={renderCardItem}
        keyExtractor={(item) => item._id.toString()}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={renderSeparator}
        ListEmptyComponent={<EmptyState />}
      />
      <FloatingActionButton onPress={handleAddPromo} circleColor={color.black} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    paddingHorizontal: 25,
  },
  label: {
    ...font.regular,
    fontSize: 16,
    lineHeight: 16,
    color: '#696969',
  },
  list: {
    flexGrow: 1,
    paddingBottom: 25,
    marginHorizontal: 24,
  },
  separator: {
    marginTop: 24,
  },
  percent: {
    color: '#6FFF00',
  },
  publishContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  publish: {
    flex: 1,
    gap: 8,
  },
  publishTitle: {
    ...font.bold,
    fontSize: 32,
    lineHeight: 32,
    color: color.background,
  },
  publishDescription: {
    ...font.regular,
    fontSize: 12,
    lineHeight: 12,
    color: '#C3C3C3',
  },
  publishImage: {
    width: 100,
    height: 100,
  },
});

export default Publish;
