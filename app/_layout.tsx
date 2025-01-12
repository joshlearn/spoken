import "../global.css";
import React from 'react';
import { Slot } from 'expo-router';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { SupabaseProvider } from "@/context/supabase-provider";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    async function prepare() {
      try {
        // Load fonts
        await Font.loadAsync({
          'MyCustomFont': require('../assets/fonts/PrestigeSignatureSerifDemo-PYlB.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <SupabaseProvider>
      <Slot />
    </SupabaseProvider>
  );
}