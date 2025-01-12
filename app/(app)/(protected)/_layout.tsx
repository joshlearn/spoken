// app/(app)/(protected)/_layout.tsx
import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '@/constants/colors';
import { useColorScheme } from '@/lib/useColorScheme';

export default function ProtectedLayout() {
  const { colorScheme } = useColorScheme();
  const iconSize = 24;

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor:
            colorScheme === 'dark'
              ? colors.dark.background
              : colors.light.background,
        },
        tabBarActiveTintColor:
          colorScheme === 'dark'
            ? colors.dark.foreground
            : colors.light.foreground,
      }}
    >
      <Tabs.Screen
        name="entry"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <Ionicons name="book-outline" size={iconSize} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={iconSize} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="library" // Add the Library tab
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <Ionicons name="library-outline" size={iconSize} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}