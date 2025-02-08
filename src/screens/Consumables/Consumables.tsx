import {
  AppHeader,
  ConfirmationModal,
  EmptyState,
  FloatingActionButton /*LoadingAnimation*/,
} from '@app/components';
import { IMAGES } from '@app/constant';
import { ConsumablesIcon } from '@app/icons';
import { color, font } from '@app/styles';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { /*AddConsumablesRouteProp,*/ NavigationProp } from 'src/types/navigation/types';
// import { ScreenStatusProps } from 'src/types/services/types';

const renderSeparator = () => <View style={styles.separator} />;

interface Consumable {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const CONSUMABLES_DATA: Consumable[] = [
  { id: 1, name: 'Micro Fiber Cloth', price: 1500, quantity: 5 },
  { id: 2, name: 'Car Shampoo', price: 700, quantity: 4 },
  { id: 3, name: 'Tire Black Lotion', price: 500, quantity: 4 },
  { id: 4, name: 'Micro Fiber Cloth', price: 1000, quantity: 4 },
  { id: 5, name: 'Tire Black Lotion', price: 500, quantity: 4 },
  { id: 6, name: 'Micro Fiber Cloth', price: 1000, quantity: 4 },
];

const Consumables = () => {
  const navigation = useNavigation<NavigationProp>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [screenStatus, setScreenStatus] = useState<ScreenStatusProps>({
  //   isLoading: false,
  //   hasError: false,
  //   type: 'error',
  // });

  const toggleConfirmModal = () => setIsModalVisible(!isModalVisible);

  const renderCardItem = ({ item }: { item: Consumable }) => (
    <View style={styles.card}>
      <TouchableOpacity style={styles.closeButton} onPress={toggleConfirmModal}>
        <Image source={IMAGES.CANCELLED} style={styles.closeIcon} resizeMode="contain" />
      </TouchableOpacity>
      <View style={styles.mainIcon}>
        <ConsumablesIcon />
      </View>
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.quantity}>Qty. of items: {item.quantity}</Text>
        <Text style={styles.price}>₱{item.price.toLocaleString()}</Text>
      </View>
    </View>
  );

  const handleYes = () => {
    toggleConfirmModal();
  };

  const navigateConsumablesForm = () => {
    navigation.navigate('ConsumablesForm');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.background} barStyle="dark-content" />
      <AppHeader title="Consumables" />
      {/* <LoadingAnimation isLoading={screenStatus.isLoading} /> */}
      <ConfirmationModal
        type={'DeleteConsumables'}
        isVisible={isModalVisible}
        onNo={toggleConfirmModal}
        onYes={handleYes}
      />
      <View style={styles.heading}>
        <Text style={styles.label}>Consumable Lists</Text>
      </View>

      {CONSUMABLES_DATA.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={CONSUMABLES_DATA}
          renderItem={renderCardItem}
          keyExtractor={(item) => item.id.toString()}
          // numColumns={2}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={renderSeparator}
          // columnWrapperStyle={styles.columnWrapper}
        />
      )}

      <FloatingActionButton onPress={navigateConsumablesForm} />
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
  // card: {
  //   backgroundColor: '#F3F2EF',
  //   borderRadius: 24,
  //   shadowColor: '#000000',
  //   shadowOffset: { width: 0, height: 4 },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 5,
  //   elevation: 5,
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   paddingVertical: 24,
  //   paddingHorizontal: 12,
  //   // width: '48%',
  //   width: '100%',
  // },
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
  // content: {
  //   alignItems: 'center',
  // },
  mainIcon: {
    padding: 24,
  },
  // textContainer: {
  //   width: '100%',
  //   alignItems: 'flex-start',
  //   // alignItems: 'center',
  //   gap: 8,
  // },
  name: {
    fontSize: 20,
    lineHeight: 20,
    ...font.regular,
    marginBottom: 4,
    color: color.black,
  },
  price: {
    fontSize: 16,
    lineHeight: 16,
    ...font.light,
    marginBottom: 4,
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
  listContent: {
    paddingHorizontal: 12,
    paddingVertical: 24,
  },
  // columnWrapper: {
  //   justifyContent: 'space-between',
  //   paddingHorizontal: 12,
  //   marginBottom: 16,
  // },
  separator: {
    marginTop: 24,
  },

  details: {
    gap: 8,
    flex: 1,
  },
});

export default Consumables;
