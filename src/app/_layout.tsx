import { Slot } from "expo-router";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useReactQueryDevTools } from '@dev-plugins/react-query'

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
const queryClient = new QueryClient();


const RootLayout = () => {
    
    if (!publishableKey) {
        throw new Error("Missing Publishable Key");
    }
    
    useReactQueryDevTools(queryClient);


    return (
        <QueryClientProvider client={queryClient}>
            <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>

                <Slot />

            </ClerkProvider>
        </QueryClientProvider>
    )
}

export default RootLayout;