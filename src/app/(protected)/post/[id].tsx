import { View, Text, ActivityIndicator, Alert } from "react-native"
import { router, Stack, useLocalSearchParams } from "expo-router"
import PostListItem from "../../../components/PostListItem";

import { deletePostById, fetchPostById } from "../../../services/postService";
import { useQuery } from "@tanstack/react-query";
import { useSupabase } from "../../../lib/supabase";
import { AntDesign, MaterialIcons, Entypo } from '@expo/vector-icons';

import { useMutation, useQueryClient } from "@tanstack/react-query";

const DetailedPost = () => {
    const { id } = useLocalSearchParams<{ id: string }>()
    const supabase = useSupabase();
    const queryClient = useQueryClient();
    
    
    const { data: post, isLoading, error } = useQuery({
        queryKey: ['post', id],
        queryFn: () => fetchPostById(id, supabase),
        staleTime: 5000,
    })

    const { mutate:remove } = useMutation({
        
        mutationFn: () => deletePostById(id, supabase),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
            router.back()
        },
        onError: (error) => {
            Alert.alert('Error', error.message)
        }
    })


    if (isLoading) {
        return <ActivityIndicator />
    }

    if (error || !post) {
        return <Text>Error fetching post</Text>
    }


    return (
        <View style={{ flex: 1 }}>

            <Stack.Screen options={{

                animation: 'slide_from_bottom',
               
                headerRight: () =>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <Entypo name="trash" size={24} color="white" onPress={() => remove()} />
                        <AntDesign name="search1" size={24} color="white" />
                        <MaterialIcons name="sort" size={27} color="white" />
                        <Entypo name="dots-three-horizontal" size={24} color="white" />
                    </View>
            }} />



            <PostListItem post={post} isDetailedPost />
        </View>
    )
}

export default DetailedPost