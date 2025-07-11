import { View,FlatList } from "react-native";
import PostListItem from "../../../components/PostListItem";
//import posts from "../../../../assets/data/posts.json";
import { useEffect,useState } from "react";

import { supabase } from "../../../lib/supabase";
//import { Post } from "../../../types";
import { Tables } from "../../../types/database.types";


type Post = Tables<'posts'> & {
    user: Tables<'users'>;
    group: Tables<'groups'>;
}

const HomeScreen = () => {

const [posts,setPosts] = useState<Post[]>([]);

const fetchPosts = async () => {
    const {data,error} = await supabase
    .from('posts')
    .select('*, group:groups(*),user:users!posts_user_id_fkey(*)');
    
    //console.log("data",JSON.stringify(data,null,2));
    if (data) {
        setPosts(data as Post[]);
    }
    else{
        console.log("error",JSON.stringify(error,null,2));
        //console.log("error",error);
    }
}

useEffect(() => {
    fetchPosts();
},[])

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={posts}
                renderItem={({ item }) => <PostListItem post={item} />}
                //keyExtractor={(item) => item.id}
            />
            
        </View>


    )
}

export default HomeScreen;

