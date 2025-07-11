import { View, FlatList, ActivityIndicator, Text } from "react-native";
import PostListItem from "../../../components/PostListItem";
//import posts from "../../../../assets/data/posts.json";
import { useEffect, useState } from "react";

import { supabase } from "../../../lib/supabase";
//import { Post } from "../../../types";
import { Tables } from "../../../types/database.types";
import { useQuery } from "@tanstack/react-query";

type Post = Tables<'posts'> & {
    user: Tables<'users'>;
    group: Tables<'groups'>;
}

const HomeScreen = () => {


    const { data: posts, isLoading, error } = useQuery({
        queryKey: ['posts'],
        queryFn: () => fetchPosts(),
    })

    //console.log("data", JSON.stringify(posts, null, 2));
    //const [posts, setPosts] = useState<Post[]>([]);

    const fetchPosts = async () => {
        const { data, error } = await supabase
            .from('posts')
            .select('*, group:groups(*),user:users!posts_user_id_fkey(*)');

        //console.log("data",JSON.stringify(data,null,2));
        if (error) {
            throw error;
            //console.log("error", JSON.stringify(error, null, 2));
            //console.log("error",error);
        }
        else  {
            return data;
        }
    }

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
            />

        </View>


    )
}

export default HomeScreen;

