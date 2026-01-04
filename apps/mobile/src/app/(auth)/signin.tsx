import { Link, Stack } from 'expo-router'
import { StyleSheet, View, Text } from 'react-native'
import AppleSignInButton from '@/components/social-auth-buttons/apple/apple-sign-in-button';



export default function LoginScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Login' }} />
      <View style={styles.container}>
        <Text>Login</Text>
        <Link href="/" style={styles.link}>
          <Text>Try to navigate to home screen!</Text>
        </Link>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
})