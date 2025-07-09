import { Stack, Redirect, router } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { View } from "react-native";
import { AntDesign, MaterialIcons, Entypo } from '@expo/vector-icons';

const AppLayout = () => {

    const { isSignedIn } = useAuth();
    
   if(!isSignedIn){
    return <Redirect href="/sign-in" />
   }

    return (
       <Stack>
        <Stack.Screen name="(tabs)" options={{ 
            headerShown: false
         }} />
        <Stack.Screen name="post/[id]" options={{ 
            headerStyle: {
                backgroundColor: '#FF5700'
            },
            headerTitle: '',
            animation: 'slide_from_bottom',
            headerLeft: () => <AntDesign name="close" size={24} color="white" onPress={() => router.back()} />,
            headerRight: () =>
                <View style={{flexDirection: 'row', gap: 10}}>
                    <AntDesign name="search1" size={24} color="white" />
                    <MaterialIcons name="sort" size={27} color="white" />
                    <Entypo name="dots-three-horizontal" size={24} color="white" />
                </View>
         }} />
       </Stack>
    )
}

export default AppLayout;