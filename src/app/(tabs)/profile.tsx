import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { useMealContext } from '../../context/MealContext';

export default function ProfileScreen() {
  const { familyInfo, setFamilyInfo } = useMealContext();

  const [size, setSize] = useState(familyInfo.size.toString());
  const [dietaryRestrictions, setDietaryRestrictions] = useState(familyInfo.dietaryRestrictions);
  const [goals, setGoals] = useState(familyInfo.goals);

  const handleSave = () => {
    setFamilyInfo({
      size: parseInt(size) || 1,
      dietaryRestrictions,
      goals,
    });
    Alert.alert('Success', 'Family intake info saved!');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Family Intake Measurements</Text>

      <Text style={styles.label}>Family Size</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={size}
        onChangeText={setSize}
        placeholder="e.g. 4"
      />

      <Text style={styles.label}>Dietary Restrictions / Allergies</Text>
      <TextInput
        style={styles.input}
        value={dietaryRestrictions}
        onChangeText={setDietaryRestrictions}
        placeholder="e.g. Peanut allergy, Vegetarian"
        multiline
      />

      <Text style={styles.label}>Goals</Text>
      <TextInput
        style={styles.input}
        value={goals}
        onChangeText={setGoals}
        placeholder="e.g. High protein, Low carb"
        multiline
      />

      <View style={styles.buttonContainer}>
        <Button title="Save Info" onPress={handleSave} />
      </View>

      <View style={styles.subscriptionContainer}>
        <Text style={styles.subscriptionText}>Playstore Subscription Status: Inactive</Text>
        <Button title="Subscribe via Playstore" color="#4caf50" onPress={() => Alert.alert('Subscription', 'Redirecting to Playstore...')} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 20,
  },
  subscriptionContainer: {
    marginTop: 40,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  subscriptionText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  }
});
