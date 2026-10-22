import { Tabs } from 'expo-router';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#2f95dc', headerShown: true }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Recipes',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="silverware-fork-knife" size={24} color={color as string} />,
        }}
      />
      <Tabs.Screen
        name="groceries"
        options={{
          title: 'Grocery List',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="cart-outline" size={24} color={color as string} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Family Profile',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account-group" size={24} color={color as string} />,
        }}
      />
    </Tabs>
  );
}
