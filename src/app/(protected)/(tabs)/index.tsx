import { View, FlatList, ActivityIndicator, Text } from "react-native";
import PostListItem from "../../../components/PostListItem";



import { Tables } from "../../../types/database.types";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../../services/postService";

type Post = Tables<'posts'> & {
    user: Tables<'users'>;
    group: Tables<'groups'>;
}

const HomeScreen = () => {


    const { 
        data: posts, 
        isLoading, 
        error,
        refetch,
        isRefetching,
    } = useQuery({
        queryKey: ['posts'],
        queryFn: () => fetchPosts(),
        staleTime: 10_000,
    });


   

    if (isLoading) {
        return <ActivityIndicator/>
    }

    if (error) {
        return <Text>Error fetcvhing posts</Text>
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={posts}
                renderItem={({ item }) => <PostListItem post={item} />}
                keyExtractor={(item) => item.id}
                onRefresh={refetch}
                refreshing={isRefetching}
            />

        </View>
    )
}

export default HomeScreen;

