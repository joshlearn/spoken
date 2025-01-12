// app/(app)/(protected)/library.tsx
import { View } from 'react-native';
import { H1, Muted } from '@/components/ui/typography';
import { Button } from "@/components/ui/button";
import { router } from "expo-router";
import { Text } from "@/components/ui/text";

export default function Library() {
  return (
    <View className="flex-1 items-center justify-center bg-background p-4 gap-y-4">
      <H1 className="text-center">Library</H1>
      <Muted className="text-center">
        This is your library page. (More features coming soon!)
      </Muted>
      <Button
						className="w-full"
						variant="default"
						size="default"
						onPress={() => router.push("/(app)/settings")}
						title="Open Settings"
					>
						<Text>Open Settings</Text>
					</Button>
    </View>
  );
}