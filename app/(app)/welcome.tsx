import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

import { Image } from "@/components/image";
import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1, H4, Muted } from "@/components/ui/typography";

export default function WelcomeScreen() {
	const router = useRouter();

	return (
		<SafeAreaView className="flex flex-1 items-center justify-center bg-background p-4">
			<View className="flex-1 items-center justify-center">
				<H1>Splash Screen</H1>
			</View>
			<Button
				variant="default"
				size="default"
				onPress={() => router.push("/(app)/onboarding")}
			>
				<Text>Get Started</Text>
			</Button>
		</SafeAreaView>
	);
}
