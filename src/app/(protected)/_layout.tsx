import { Stack, Redirect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

const AppLayout = () => {

    const { isSignedIn } = useAuth();
    
   if(!isSignedIn){
    return <Redirect href="/sign-in" />
   }

    return (
        <Stack  screenOptions={{
            headerShown: false
        }}/>
    )
}

export default AppLayout;