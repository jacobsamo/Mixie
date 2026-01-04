import SignOutButton from "@/components/social-auth-buttons/sign-out-button";
import { useAuthContext } from "@/hooks/use-auth-context";

import { Container } from "@/components/container";

export default function Home() {
  const { profile } = useAuthContext();
  return (
    <Container className="p-6">
      <View className="flex flex-row items-center gap-2">
        <Text>Welcome!</Text>
      </View>
      <View className="flex flex-col items-start gap-2">
        <Text>Username</Text>
        <Text>{profile?.username}</Text>
        <Text>Full name</Text>
        <Text>{profile?.full_name}</Text>
      </View>
      <SignOutButton />
    </Container>
  );
}
