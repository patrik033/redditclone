import { View, Text, Image, StyleSheet } from "react-native";
import posts from "../../../assets/data/posts.json";
import { formatDistanceToNowStrict } from "date-fns";

const HomeScreen = () => {

    const post = posts[0];
    return (
        <View style={{ paddingHorizontal: 15, paddingVertical: 10, flex: 1 }}>
            
            {/* Post Header */}
            <View style={{ flexDirection: 'row', gap: 10 }}>
                <Image source={{ uri: post.group.image }} style={styles.image} />
                <Text style={{ fontWeight: 'bold' }}>{post.group.name}</Text>
                <Text style={{ fontSize: 12, color: 'gray' }}>{formatDistanceToNowStrict(new Date(post.created_at))}</Text>
                <View style={{ marginLeft: 'auto' }}>
                    <Text style={styles.joinButtonText}>Join</Text>
                </View>
            </View>

            {/* Content */}
            <Text style={styles.title}>{post.title}</Text>
            <Image source={{ uri: post.image ?? undefined }} style={{ width: '100%', aspectRatio: 4 / 3, borderRadius: 15 }} />
            <Text numberOfLines={4} style={{ fontSize: 14, color: 'gray' }}>{post.description}</Text>

            {/* Footer */}
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>

            </View>

        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    image: {
        height: 20,
        aspectRatio: 1,
        borderRadius: 10
    },
    joinButtonText: {
        backgroundColor: '#0d469b',
        color: 'white',
        paddingVertical: 2,
        paddingHorizontal: 7,
        borderRadius: 10,
        fontWeight: 'bold'
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        letterSpacing: 0.5
    }

})