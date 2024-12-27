import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { FilterIcon, StarIcon } from '@app/icons';
import { AppHeader } from '@app/components';

const IMAGE =
  'https://firebasestorage.googleapis.com/v0/b/portfolio-d0d15.appspot.com/o/pexels-tima-miroshnichenko-6872601.jpg?alt=media&token=9688293b-ad76-4706-87a9-9446d42b576b';

const Services = () => {
  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Services" />
      <View style={styles.heading}>
        <Text style={styles.label}>Available Lists of Services</Text>
        <TouchableOpacity style={styles.filterContainer}>
          <FilterIcon />
          <Text style={styles.label}>Car/Small</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        data={[1, 2, 3]}
        renderItem={() => (
          <View style={styles.card}>
            <Image src={IMAGE} style={styles.image} resizeMode="cover" />
            <View style={styles.ratingsContainer}>
              <StarIcon width={20} height={16} />
              <Text style={styles.ratings}>4.5</Text>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.name}>Auto Detailing</Text>
              <View style={styles.row}>
                <Text style={styles.title}>Description:</Text>
                <Text style={styles.value}>Overall Detailing</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.title}>Price:</Text>
                <Text style={styles.value}>₱50,000</Text>
              </View>
            </View>
          </View>
        )}
        ItemSeparatorComponent={renderSeparator}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F2EF',
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 35,
    paddingHorizontal: 25,
  },
  label: {
    fontFamily: 'AeonikTRIAL-Regular',
    fontWeight: 'regular',
    fontSize: 16,
    color: '#696969',
  },
  filterContainer: {
    gap: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  list: {
    paddingHorizontal: 25,
    paddingBottom: 25,
    backgroundColor: '#F3F2EF',
  },
  name: {
    fontFamily: 'AeonikTRIAL-Regular',
    fontWeight: 'regular',
    fontSize: 24,
    color: '#000000',
  },
  title: {
    fontFamily: 'AeonikTRIAL-Regular',
    fontWeight: 'regular',
    fontSize: 20,
    color: '#888888',
  },
  separator: {
    marginTop: 24,
  },
  value: {
    fontFamily: 'AeonikTRIAL-Regular',
    fontWeight: 'regular',
    fontSize: 20,
    color: '#050303',
  },
  card: {
    backgroundColor: '#F3F2EF',
    borderRadius: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    height: 201,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  descriptionContainer: {
    marginTop: 16,
    marginHorizontal: 16,
    gap: 8,
    marginBottom: 50,
  },
  ratingsContainer: {
    position: 'absolute',
    right: 13,
    top: 13,
    backgroundColor: '#F4F9FD',
    paddingHorizontal: 12,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 12,
  },
  ratings: {
    fontFamily: 'AeonikTRIAL-Regular',
    fontWeight: 'regular',
    fontSize: 16,
    color: '#050303',
    letterSpacing: 1,
  },
});

export default Services;
