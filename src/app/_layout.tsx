import { Slot } from "expo-router";
import { ClerkProvider,ClerkLoaded } from "@clerk/clerk-expo";
import { tokenCache } from '@clerk/clerk-expo/token-cache'

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
    throw new Error("Missing Publishable Key");
}

const RootLayout = () => {
    return (
        <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>

                <Slot />
  
        </ClerkProvider>
    )
}

export default RootLayout;