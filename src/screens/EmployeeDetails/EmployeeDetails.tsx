import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import {
  Text,
  Card,
  Divider,
  Avatar,
  Datepicker,
  IconElement,
  Icon,
  NativeDateService,
  I18nConfig,
} from '@ui-kitten/components';
import { AppHeader } from '@app/components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { EmployeeDetailsRouteProp } from '../../types/navigation/types';
import { FlatList } from 'react-native-gesture-handler';

const EmployeeDetails = () => {
  const navigation = useNavigation();
  const route = useRoute<EmployeeDetailsRouteProp>().params;

  const CalendarIcon = (props): IconElement => <Icon {...props} name="calendar" />;

  const [date, setDate] = React.useState(new Date());

  const servicesSampleData = [
    {
      id: 1,
      time: '10:00 am',
      month: 'Dec',
      day: '13',
      service: 'Oil change',
    },
    {
      id: 2,
      time: '10:55 am',
      month: 'Dec',
      day: '13',
      service: 'Interior Detailing',
    },
  ];

  const i18n: I18nConfig = {
    dayNames: {
      short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      long: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    },
    monthNames: {
      short: [
        'Jan',
        'Feb',
        'March',
        'Apr',
        'May',
        'June',
        'July',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      long: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
    },
  };

  const formatDateService = new NativeDateService('en', {
    format: 'MMM YYYY',
    i18n,
    startDayOfWeek: 1,
  });

  const renderAttendanceItem = ({ item }) => {
    return (
      <Card style={styles.listCardContainer}>
        <View style={styles.listContent}>
          <View style={styles.listTextContentColumn}>
            <Text style={styles.listTextContentRow}>{item.month}</Text>
            <Text style={styles.listTextContentRow}>{item.day}</Text>
          </View>

          <View style={styles.listTextContentColumn}>
            <Text style={styles.listTextContentRow}>Time: {item.time}</Text>
          </View>
          <View style={styles.listTextContentColumn}>
            <Text style={styles.listTextContentRow}>{item.service}</Text>
          </View>
        </View>
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Employee Details" onBack={() => navigation.goBack()} />

      <Card
        style={styles.cardContainer}
        marginBottom="20"
        status={route.status === 'Active' ? 'success' : 'warning'}
      >
        <View style={styles.nameContainer}>
          <Avatar
            style={styles.avatar}
            shape="rounded"
            size="giant"
            source={require('assets/images/user.png')}
            marginRight="20"
          />
          <View>
            <Text category="h5">{`${route.fullName}`}</Text>
            <Text style={styles.space}>{`${route.title}`}</Text>
          </View>
        </View>

        <View style={styles.servicesContainer}>
          <View style={styles.gridItem}>
            <Text appearance="hint">Services</Text>
            <Text category="=h6">0</Text>
          </View>
        </View>

        <Text appearance="hint" marginTop="10">
          Employee status
        </Text>
        <Text style={styles.space}>{`${route.status}`}</Text>

        <Divider style={styles.space} />
        <Text appearance="hint">Date started</Text>
        <Text style={styles.space}>{`${route.dateStarted}`}</Text>

        <Divider style={styles.space} />
        <Text appearance="hint">Contact</Text>
        <Text>{`${route.contact}`}</Text>
      </Card>

      <Text style={styles.text} category="h4" marginBottom="10" marginTop="15">
        SERVICES
      </Text>

      <Datepicker
        placeholder="Pick Date"
        date={date}
        onSelect={(nextDate) => setDate(nextDate)}
        accessoryRight={CalendarIcon}
        dateService={formatDateService}
      />

      <FlatList
        data={servicesSampleData}
        renderItem={renderAttendanceItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        marginTop="5"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },

  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 2,
  },

  space: {
    marginBottom: 10,
  },

  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  servicesContainer: {
    flexDirection: 'row',
  },

  gridItem: {
    justifyContent: 'center',
    padding: 8,
  },

  avatar: {
    margin: 8,
  },

  text: {
    textAlign: 'center',
  },

  listCardContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },

  listContainer: {
    alignItems: 'stretch',
  },

  listContent: {
    flexDirection: 'row',
  },

  listTextContentColumn: {
    justifyContent: 'center',
    padding: 8,
  },

  listTextContentRow: {
    textAlign: 'center',
  },
});

export default EmployeeDetails;
