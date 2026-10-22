import { Stack } from 'expo-router';
import { MealProvider } from '../context/MealContext';

export default function RootLayout() {
  return (
    <MealProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </MealProvider>
  );
}
