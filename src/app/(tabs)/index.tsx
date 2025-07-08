import { View,FlatList } from "react-native";
import PostListItem from "../../components/PostListItem";
import posts from "../../../assets/data/posts.json";

const HomeScreen = () => {

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

