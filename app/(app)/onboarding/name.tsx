import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { useSupabase } from "@/context/supabase-provider";
import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1 } from "@/components/ui/typography";
import { View, TextInput } from "react-native";

export default function OnboardingName() {
  const { email, password } = useLocalSearchParams();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { signUp } = useSupabase();
  const [error, setError] = useState<string | null>(null);

  const handleFinish = async () => {
    try {
      setError(null);
      const fullName = `${firstName} ${lastName}`.trim();
      
      const { data, error: signUpError } = await signUp(
        email as string,
        password as string,
        fullName
      );

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      if (!data?.user) {
        setError('An unexpected error occurred');
        return;
      }

    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background p-4">
      <View className="flex-1 justify-center">
        <H1>Name</H1>
        {error && (
          <Text className="text-red-500 mb-4">{error}</Text>
        )}
        <TextInput
          placeholder="First name"
          className="border p-2 mb-2 mt-4"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          placeholder="Last name"
          className="border p-2"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>
      <Button
        variant="default"
        size="default"
        onPress={handleFinish}
        disabled={!firstName || !lastName}
      >
        <Text>Finish</Text>
      </Button>
    </SafeAreaView>
  );
}