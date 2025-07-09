import { View, Text } from "react-native"
import { useLocalSearchParams } from "expo-router"
import posts from "../../../../assets/data/posts.json";
import PostListItem from "../../../components/PostListItem";

const DetailedPost = () => {
    const { id } = useLocalSearchParams()
    const post = posts.find((p) => p.id === id);


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