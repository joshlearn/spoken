import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { useSupabase } from "@/context/supabase-provider";
import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1 } from "@/components/ui/typography";
import { View, TextInput } from "react-native";

export default function OnboardingPassword() {
  const { email } = useLocalSearchParams();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signInWithPassword } = useSupabase();  // Changed from signIn to signInWithPassword

  const handleNext = async () => {
    try {
      setError('');
      // Try to sign in first
      const { error: signInError } = await signInWithPassword(email as string, password);
      
      // If error code indicates user doesn't exist, go to name screen
      if (signInError?.message?.includes('Invalid login credentials')) {
        // User doesn't exist, proceed to name screen for signup
        router.push({
          pathname: "/(app)/onboarding/name",
          params: { email, password }
        });
      }
      // If no error, user is logged in and will be redirected automatically
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background p-4">
      <View className="flex-1 justify-center">
        <H1>Password</H1>
        {error && (
          <Text className="text-red-500 mb-4">{error}</Text>
        )}
        <TextInput
          placeholder="Enter password"
          secureTextEntry
          className="border p-2 mt-4"
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <Button
        variant="default"
        size="default"
        onPress={handleNext}
        disabled={!password}
      >
        <Text>Next →</Text>
      </Button>
    </SafeAreaView>
  );
}