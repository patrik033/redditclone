import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
import { Feather } from "@expo/vector-icons";
import React from 'react';

export default function AuthRoutesLayout() {
    const { isSignedIn } = useAuth()

    console.log(isSignedIn);

    if (isSignedIn) {
        return <Redirect href={'/'} />
    }

    return (

        <Stack>
            <Stack.Screen name="sign-in" options={{
                headerTitle: 'Sign In',
            }} />
            <Stack.Screen name="sign-up" options={{
                headerTitle: 'Sign Up',
                headerBackTitle: 'Back',
                headerTintColor: '#FF5700',

                headerLeft: () => (
                    <Feather name="arrow-left" size={24} color="black" />
                )
            }} />
        </Stack>
    )
}