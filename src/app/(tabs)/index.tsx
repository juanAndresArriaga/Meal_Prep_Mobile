import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, ActivityIndicator, Linking, TouchableOpacity } from 'react-native';
import { useMealContext } from '../../context/MealContext';

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function RecipesScreen() {
  const { familyInfo, mealPlan, setMealPlan, setGroceries } = useMealContext();
  const [loading, setLoading] = useState(false);

  const generateMealPlan = () => {
    setLoading(true);
    // Mock API call to AI service
    setTimeout(() => {
      const mockPlan: typeof mealPlan = {};
      const mockGroceries = [
        { id: '1', name: 'Chicken Breast (2 lbs)', crossedOff: false },
        { id: '2', name: 'Broccoli (1 head)', crossedOff: false },
        { id: '3', name: 'Brown Rice (1 bag)', crossedOff: false },
        { id: '4', name: 'Olive Oil', crossedOff: false },
        { id: '5', name: 'Eggs (1 dozen)', crossedOff: false },
      ];

      DAYS_OF_WEEK.forEach(day => {
        mockPlan[day] = [
          {
            title: `Healthy ${day} Dinner`,
            description: `A nutritious meal tailored for ${familyInfo.size} people, considering: ${familyInfo.dietaryRestrictions || 'No restrictions'}.`,
            videoLink: 'https://www.youtube.com/results?search_query=healthy+dinner+recipe'
          }
        ];
      });

      setMealPlan(mockPlan);
      setGroceries(mockGroceries);
      setLoading(false);
    }, 1500);
  };

  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) => console.error('An error occurred', err));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Button
          title="Generate AI Meal Plan"
          onPress={generateMealPlan}
          disabled={loading}
        />
      </View>

      {loading && <ActivityIndicator size="large" color="#2f95dc" style={styles.loader} />}

      {!loading && Object.keys(mealPlan).length === 0 && (
        <Text style={styles.emptyText}>Tap the button above to generate your weekly meal plan!</Text>
      )}

      {!loading && Object.keys(mealPlan).length > 0 && DAYS_OF_WEEK.map(day => (
        <View key={day} style={styles.dayCard}>
          <Text style={styles.dayTitle}>{day}</Text>
          {mealPlan[day]?.map((meal, index) => (
            <View key={index} style={styles.mealContainer}>
              <Text style={styles.mealTitle}>{meal.title}</Text>
              <Text style={styles.mealDesc}>{meal.description}</Text>
              <TouchableOpacity onPress={() => openLink(meal.videoLink)}>
                <Text style={styles.linkText}>Watch Recipe on YouTube</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  loader: {
    marginTop: 50,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#666',
  },
  dayCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  mealContainer: {
    marginTop: 8,
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  mealDesc: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  linkText: {
    color: '#2f95dc',
    textDecorationLine: 'underline',
  }
});
