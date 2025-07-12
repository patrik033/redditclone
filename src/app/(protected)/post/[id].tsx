import { View, Text, ActivityIndicator } from "react-native"
import { useLocalSearchParams } from "expo-router"
import PostListItem from "../../../components/PostListItem";

import { fetchPostById } from "../../../services/postService";
import { useQuery } from "@tanstack/react-query";



const DetailedPost = () => {
    const { id } = useLocalSearchParams<{id: string}>()

    const {data: post, isLoading, error} = useQuery({
        queryKey: ['post', id],
        queryFn: () => fetchPostById(id),
        staleTime: 5000,
    })


    if(isLoading){
        return <ActivityIndicator/>
    }

    if(error || !post){
        return <Text>Error fetching post</Text>
    }


    return (
        <View style={{ flex: 1}}>
            <PostListItem post={post} isDetailedPost />
        </View>
    )
}

export default DetailedPost