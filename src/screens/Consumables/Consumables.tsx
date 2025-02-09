import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  AppHeader,
  ConfirmationModal,
  EmptyState,
  ErrorModal,
  FloatingActionButton,
  LoadingAnimation,
  Toast,
} from '@app/components';
import { ERR_NETWORK, LIMIT } from '@app/constant';
import GlobalContext from '@app/context';
import { CloseIcon, ConsumablesIcon } from '@app/icons';
import { deleteConsumableItemRequest, getConsumableItemsRequest } from '@app/services';
import { color, font } from '@app/styles';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp } from 'src/types/navigation/types';
import { ConsumableItem, ScreenStatusProps } from 'src/types/services/types';

type ToastMessage = {
  message: string;
  toastType: 'success' | 'error';
};

const renderSeparator = () => <View style={styles.separator} />;

const Consumables = () => {
  const { user } = useContext(GlobalContext);
  const navigation = useNavigation<NavigationProp>();
  const [consumables, setConsumables] = useState<ConsumableItem[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [screenStatus, setScreenStatus] = useState<ScreenStatusProps>({
    isLoading: false,
    hasError: false,
    type: 'error',
  });
  const [totalCount, setTotalCount] = useState(0);
  const [selectedConsumableId, setSelectedConsumableId] = useState<string | null>(null);
  const [shouldFetchItems, setShouldFetchItems] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [isFetching, setIsFetching] = useState(false);
  const isFocused = useIsFocused();

  const toggleConfirmModal = () => setIsModalVisible(!isModalVisible);
  const onToastClose = () => setIsToastVisible(false);

  const fetchConsumableItems = async () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: true });
    const response = await getConsumableItemsRequest(user.accessToken, '_id', 'asc', LIMIT, 0);

    if (response.success && response.data) {
      setConsumables(response.data.consumables);
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
    if (isFocused || shouldFetchItems) {
      fetchConsumableItems();
      setShouldFetchItems(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, shouldFetchItems]);

  const renderCardItem = ({ item }: { item: ConsumableItem }) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => {
          setSelectedConsumableId(item.id);
          toggleConfirmModal();
        }}
      >
        <View style={styles.closeIcon}>
          <CloseIcon />
        </View>
      </TouchableOpacity>
      <View style={styles.mainIcon}>
        <ConsumablesIcon width={50} height={50} />
      </View>
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.quantity}>Qty. of items: {item.quantity}</Text>
        <Text style={styles.price}>₱{item.price.toLocaleString()}</Text>
      </View>
    </View>
  );

  const handleYes = async () => {
    if (selectedConsumableId) {
      handleDeleteConsumableItem(selectedConsumableId);
      toggleConfirmModal();
    }
  };

  const handleAddConsumableItem = () => {
    navigation.navigate('ConsumablesForm');
  };

  const handleDeleteConsumableItem = async (id: string) => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: true });

    const response = await deleteConsumableItemRequest(user.accessToken, id);

    if (response.success && response.data) {
      setScreenStatus({ ...screenStatus, hasError: false, isLoading: false });
      setShouldFetchItems(true);
      const toastData: ToastMessage = getToastMessage('success');
      setMessage(toastData.message);
      setToastType(toastData.toastType);
      setIsToastVisible(true);
    } else {
      const toastData: ToastMessage = getToastMessage('error');
      setMessage(toastData.message);
      setToastType(toastData.toastType);
      setIsToastVisible(true);
      setScreenStatus({
        isLoading: false,
        type: response.error === ERR_NETWORK ? 'connection' : 'error',
        hasError: true,
      });
    }
  };

  const onEndReached = async () => {
    if (isFetching || consumables.length >= totalCount) {
      return;
    }

    setIsFetching(true);
    const response = await getConsumableItemsRequest(
      user.accessToken,
      '_id',
      'asc',
      LIMIT,
      consumables.length,
    );

    if (response.success && response.data) {
      setConsumables((prev) => [...prev, ...response.data?.consumables!]);
      setTotalCount(response.data.totalCount);
    }
    setIsFetching(false);
  };

  const onCancel = () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: false });
    navigation.goBack();
  };

  const getToastMessage = (status: 'success' | 'error'): ToastMessage => {
    if (status === 'success') {
      return {
        message: 'Consumables have been successfully deleted!',
        toastType: 'success',
      };
    } else {
      return {
        message: 'Error occur, please try again!',
        toastType: 'error',
      };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.background} barStyle="dark-content" />
      <AppHeader title="Consumables" />
      <LoadingAnimation isLoading={screenStatus.isLoading} />
      <ErrorModal
        type={screenStatus.type}
        isVisible={screenStatus.hasError}
        onCancel={onCancel}
        onRetry={fetchConsumableItems}
      />
      <ConfirmationModal
        type={'DeleteConsumables'}
        isVisible={isModalVisible}
        onNo={toggleConfirmModal}
        onYes={handleYes}
      />
      <Toast
        isVisible={isToastVisible}
        message={message}
        duration={3000}
        type={toastType}
        onClose={onToastClose}
      />
      <View style={styles.heading}>
        <Text style={styles.label}>Consumable Lists</Text>
      </View>

      {consumables.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={consumables}
          renderItem={renderCardItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={renderSeparator}
          onEndReached={onEndReached}
          ListFooterComponent={<ActivityIndicator isLoading={isFetching} />}
        />
      )}

      <FloatingActionButton onPress={handleAddConsumableItem} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingHorizontal: 25,
    paddingBottom: 25,
    backgroundColor: color.background,
  },
  card: {
    backgroundColor: '#F3F2EF',
    borderRadius: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    paddingVertical: 8,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  mainIcon: {
    padding: 24,
  },
  name: {
    fontSize: 20,
    lineHeight: 20,
    ...font.regular,
    color: color.black,
  },
  price: {
    fontSize: 16,
    lineHeight: 16,
    ...font.light,
    color: color.primary,
  },
  quantity: {
    fontSize: 16,
    lineHeight: 16,
    ...font.light,
    color: '#888888',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  separator: {
    marginTop: 24,
  },
  details: {
    gap: 8,
    flex: 1,
  },
});

export default Consumables;
