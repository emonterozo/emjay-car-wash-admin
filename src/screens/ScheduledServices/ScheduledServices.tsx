import React, { useContext, useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { format } from 'date-fns';

import { NavigationProp } from '../../types/navigation/types';
import { Booking, BookingScheduledAction, ScreenStatusProps } from '../../types/services/types';
import {
  ActivityIndicator,
  AppHeader,
  ConfirmationModal,
  EmptyState,
  ErrorModal,
  LoadingAnimation,
  Toast,
} from '@app/components';
import { ERR_NETWORK, LIMIT } from '@app/constant';
import GlobalContext from '@app/context';
import { getScheduledBookingRequest, updateBookingScheduledRequest } from '@app/services';
import { color, font } from '@app/styles';

const renderSeparator = () => <View style={styles.separator} />;

const actions: BookingScheduledAction[] = ['CANCEL', 'COMPLETE'];

const ScheduledServices = () => {
  const isFocused = useIsFocused();
  const { user } = useContext(GlobalContext);
  const navigation = useNavigation<NavigationProp>();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [action, setAction] = useState<BookingScheduledAction>('CANCEL');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [screenStatus, setScreenStatus] = useState<ScreenStatusProps>({
    isLoading: false,
    hasError: false,
    type: 'error',
  });
  const [totalCount, setTotalCount] = useState(0);
  const [shouldFetchItems, setShouldFetchItems] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const [toast, setToast] = useState<{
    isVisible: boolean;
    type: 'success' | 'error' | 'info';
    message: string;
  }>({
    isVisible: false,
    type: 'success',
    message: '',
  });

  const toggleConfirmModal = () => setIsModalVisible(!isModalVisible);
  const onToastClose = () => setToast({ isVisible: false, type: 'success', message: '' });

  const fetchScheduledBookings = async () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: true });
    const response = await getScheduledBookingRequest(
      user.accessToken,
      user.refreshToken,
      LIMIT,
      0,
    );

    if (response.success && response.data) {
      setBookings(response.data.bookings);
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
      fetchScheduledBookings();
      setShouldFetchItems(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, shouldFetchItems]);

  const onEndReached = async () => {
    if (isFetching || bookings.length >= totalCount) {
      return;
    }

    setIsFetching(true);
    const response = await getScheduledBookingRequest(
      user.accessToken,
      user.refreshToken,
      LIMIT,
      bookings.length,
    );

    if (response.success && response.data) {
      setBookings((prev) => [...prev, ...response.data?.bookings!]);
      setTotalCount(response.data.totalCount);
    }
    setIsFetching(false);
  };

  const onCancel = () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: false });
    navigation.goBack();
  };

  const handleCardPress = (id: string) => {
    navigation.navigate('CustomerDetails', { id });
  };

  const updateBooking = async () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: true });

    const result = await updateBookingScheduledRequest(
      user.accessToken,
      user.refreshToken,
      format(new Date(selectedBooking?.date!), 'yyyy-MM-dd'),
      selectedBooking?.slot_id!,
      action,
    );

    setScreenStatus({ ...screenStatus, hasError: false, isLoading: false });

    if (result.success) {
      setToast({
        isVisible: true,
        message:
          action === 'CANCEL'
            ? 'Booking has been cancelled successfully.'
            : 'Booking has been marked as completed.',
        type: 'success',
      });
      setSelectedBooking(null);
      fetchScheduledBookings();
    } else {
      setToast({
        isVisible: true,
        message: 'Something went wrong. Please try again.',
        type: 'error',
      });
    }
  };

  const handlePressYes = () => {
    toggleConfirmModal();
    updateBooking();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.background} barStyle="dark-content" />
      <AppHeader title="Scheduled Services" />
      <LoadingAnimation isLoading={screenStatus.isLoading} />
      <ErrorModal
        type={screenStatus.type}
        isVisible={screenStatus.hasError}
        onCancel={onCancel}
        onRetry={fetchScheduledBookings}
      />
      <ConfirmationModal
        type={action === 'CANCEL' ? 'CancelBooking' : 'CompleteBooking'}
        isVisible={isModalVisible}
        onNo={toggleConfirmModal}
        onYes={handlePressYes}
      />
      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        duration={3000}
        type={toast.type}
        onClose={onToastClose}
      />
      <View style={styles.heading}>
        <Text style={styles.label}>Scheduled Services Lists</Text>
        {bookings.length > 0 && (
          <Text style={styles.textTotal}>{`Total Scheduled Bookings: ${totalCount}`}</Text>
        )}
      </View>
      <FlatList
        bounces={false}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.list}
        data={bookings}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleCardPress(item.customer._id)}
            activeOpacity={0.9}
          >
            <View style={styles.details}>
              <Text style={styles.textName}>
                {`${item.customer.first_name} ${item.customer.last_name}`}
              </Text>
              <View style={styles.labeledInfoContainer}>
                <View style={styles.row}>
                  <Text style={styles.description}>Scheduled Date:</Text>
                  <Text style={styles.value}>
                    {format(new Date(item.date), 'EEE, MMM dd, yyyy')}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.description}>Time Slot:</Text>
                  <Text style={styles.value}>{`${item.start_time} - ${item.end_time}`}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.description}>Selected Service:</Text>
                  <Text style={styles.value}>{item.service.title}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.description}>Vehicle Type:</Text>
                  <Text style={styles.value}>
                    {item.service.type.charAt(0).toUpperCase() + item.service.type.slice(1)}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.description}>Distance:</Text>
                  <Text style={styles.value}>{item.customer.distance}</Text>
                </View>
              </View>
              <View style={styles.buttonContainer}>
                {actions.map((act) => (
                  <Pressable
                    key={act}
                    style={({ pressed }) => [
                      styles.button,
                      {
                        backgroundColor: act === 'CANCEL' ? '#FF4C4C' : '#4CAF50',
                        opacity: pressed ? 0.8 : 1,
                      },
                    ]}
                    onPress={() => {
                      setSelectedBooking(item);
                      setAction(act);
                      toggleConfirmModal();
                    }}
                  >
                    <Text style={styles.buttonText}>
                      {act.charAt(0).toUpperCase() + act.slice(1).toLowerCase()}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id + item.customer._id}
        ItemSeparatorComponent={renderSeparator}
        ListEmptyComponent={<EmptyState />}
        onEndReached={onEndReached}
        ListFooterComponent={<ActivityIndicator isLoading={isFetching} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    marginVertical: 16,
    paddingHorizontal: 25,
    alignItems: 'flex-start',
  },
  label: {
    ...font.regular,
    fontSize: 16,
    lineHeight: 16,
    color: '#696969',
    marginBottom: 16,
  },
  textTotal: {
    ...font.regular,
    fontSize: 16,
    color: '#696969',
    lineHeight: 16,
    marginBottom: 5,
  },
  list: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingBottom: 25,
    paddingVertical: 1,
  },
  card: {
    backgroundColor: '#fff',
    marginVertical: 10,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  details: {
    flexDirection: 'column',
    gap: 8,
  },
  textName: {
    ...font.bold,
    fontSize: 18,
    lineHeight: 18,
    color: color.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    ...font.bold,
    color: '#fff',
    fontSize: 16,
  },
  separator: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  description: {
    ...font.bold,
    color: color.black,
    fontSize: 16,
    lineHeight: 16,
  },
  value: {
    ...font.regular,
    fontSize: 16,
    lineHeight: 16,
    color: '#555',
  },
  labeledInfoContainer: {
    gap: 10,
    marginTop: 10,
  },
});

export default ScheduledServices;
