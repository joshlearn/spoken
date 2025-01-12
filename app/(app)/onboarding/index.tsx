import { useState } from 'react';
import { router } from "expo-router";
import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1 } from "@/components/ui/typography";
import { View, TextInput } from "react-native";

export default function OnboardingEmail() {
  const [email, setEmail] = useState('');

  const handleNext = () => {
    if (email) {
      router.push({
        pathname: "/(app)/onboarding/password",
        params: { email }
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background p-4">
      <View className="flex-1 justify-center">
        <H1>Email</H1>
        <TextInput
          placeholder="Enter email"
          className="border p-2 mt-4"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <Button
        variant="default"
        size="default"
        onPress={handleNext}
        disabled={!email}
      >
        <Text>Next →</Text>
      </Button>
    </SafeAreaView>
  );
}