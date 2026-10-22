import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMealContext } from '../../context/MealContext';

export default function GroceriesScreen() {
  const { groceries, toggleGroceryItem } = useMealContext();

  if (groceries.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No groceries yet!</Text>
        <Text style={styles.subText}>Generate a meal plan first.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={groceries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => toggleGroceryItem(item.id)}
          >
            <MaterialCommunityIcons
              name={item.crossedOff ? 'checkbox-marked-circle-outline' : 'checkbox-blank-circle-outline'}
              size={24}
              color={item.crossedOff ? '#4caf50' : '#757575'}
            />
            <Text style={[styles.itemText, item.crossedOff && styles.crossedOffText]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  subText: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  listContent: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 18,
    marginLeft: 12,
    color: '#333',
  },
  crossedOffText: {
    textDecorationLine: 'line-through',
    color: '#999',
  }
});
