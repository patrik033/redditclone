import { View, Text } from "react-native"
import { useLocalSearchParams } from "expo-router"
//import posts from "../../../../assets/data/posts.json";
import PostListItem from "../../../components/PostListItem";
import { supabase } from "../../../lib/supabase";
import { useEffect,useState } from "react";
import { Post } from "../../../types";




const DetailedPost = () => {
    const { id } = useLocalSearchParams()
    const [post,setPost] = useState<Post | null>(null);

    const fetchPost = async () => {
        const {data,error} = await supabase.from('posts').select('*, group:groups(*),user:users!posts_user_id_fkey(*)').eq('id',id).single();
        setPost(data);
    
    }


    useEffect(() => {
        fetchPost();
    },[])
    

    if(!post){
        return <Text>Post not found</Text>
    }
 
    return (
        <View style={{ flex: 1}}>
            <PostListItem post={post} isDetailedPost={true} />
        </View>
    )
}

export default DetailedPost