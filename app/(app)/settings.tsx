import { router } from "expo-router";
import { View, ScrollView } from "react-native";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1, H2, Muted } from "@/components/ui/typography";
import { useSupabase } from "@/context/supabase-provider";

export default function Settings() {
	const { signOut, session, user } = useSupabase();

	// Add debug logging
	console.log('Settings page - session:', session);
	console.log('Settings page - user:', user);

	return (
		<ScrollView className="flex-1 bg-background">
			<View className="p-4 gap-y-6">
				<View className="gap-y-2">
					<H1 className="text-center">Account Settings</H1>
					<Muted className="text-center">Manage your account and preferences</Muted>
				</View>

					{!session && (
					<View className="gap-y-2">
						<Muted className="text-center">No active session</Muted>
					</View>
				)}

				{session?.user && (
					<View className="gap-y-4">
						<H2>User Information</H2>
						<View className="gap-y-2">
							<Muted>Email: {session.user.email || 'No email'}</Muted>
							<Muted>ID: {session.user.id || 'No ID'}</Muted>
							<Muted>Phone: {session.user.phone || 'No phone'}</Muted>
							<Muted>Last Sign In: {session.user.last_sign_in_at ? new Date(session.user.last_sign_in_at).toLocaleString() : 'Never'}</Muted>
							<Muted>Created: {session.user.created_at ? new Date(session.user.created_at).toLocaleString() : 'Unknown'}</Muted>
							<Muted>Role: {session.user.role || 'No role'}</Muted>
						</View>

						<H2>Raw Data (Debug)</H2>
						<Muted className="text-xs">
							{JSON.stringify(session.user, null, 2)}
						</Muted>
					</View>
				)}

				<View className="gap-y-4">
					<Button
						className="w-full"
						variant="default"
						size="default"
						onPress={() => router.push("/(app)/modal")}
						title="Open Modal"
					>
						<Text>Open Modal</Text>
					</Button>

					<Button
						className="w-full"
						variant="destructive"
						size="default"
						onPress={signOut}
						title="Sign Out"
					>
						<Text>Sign Out</Text>
					</Button>
				</View>
			</View>
		</ScrollView>
	);
}
