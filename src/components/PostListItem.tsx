import { formatDistanceToNowStrict } from "date-fns/formatDistanceToNowStrict";
import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Link, router } from "expo-router";
import { Tables } from "../types/database.types";
import { useSupabase } from "../lib/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUpvote, selectMyUpvote } from "../services/upvoteService";
import { useSession } from "@clerk/clerk-expo";



type PostListItemProps = {
  post: Post;
  isDetailedPost?: boolean;
}

type Post = Tables<'posts'> & {
  //user: Tables<'users'>;
  group: Tables<'groups'>;
  upvotes: { sum: number }[];
}


const PostListItem = ({ post, isDetailedPost }: PostListItemProps) => {

  const supabase = useSupabase();
  const queryClient = useQueryClient();
  const session = useSession();

  const shouldShowImage = isDetailedPost || post.image;
  const shouldShowDescription = isDetailedPost || !post.image;


  const { mutate: upvote } = useMutation({
    mutationFn: (value: 1 | -1) => createUpvote(post.id, value, supabase),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
  });

  const { data: myVote } = useQuery({
    queryKey: ['posts', post.id, 'myUpvote'],
    queryFn: () => selectMyUpvote(post.id, session?.session?.user?.id || "", supabase),
    
  })




  const isUpvoted = myVote?.value === 1;
  const isDownvoted = myVote?.value === -1;

  return (
    <Link href={`/post/${post.id}`} asChild>

      <Pressable style={{ paddingHorizontal: 15, paddingVertical: 10, gap: 7, borderBottomColor: 'lightgrey', borderBottomWidth: 0.5, backgroundColor: 'white' }}>
        {/* HEADER */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={{ uri: post.group.image }} style={{ width: 20, height: 20, borderRadius: 10, marginRight: 5 }} />
          <View>
            <View style={{ flexDirection: 'row', gap: 5 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 13, color: '#3A3B3C' }}>{post.group.name}</Text>
              <Text style={{ color: 'grey', fontSize: 13, alignSelf: 'flex-start' }}>{formatDistanceToNowStrict(new Date(post.created_at))}</Text>
            </View>
            {isDetailedPost && <Text style={{ fontSize: 13, color: '#2E5DAA' }}>{post.user?.name}</Text>}
          </View>
          <Pressable onPress={() => console.error('Pressed')} style={{ marginLeft: 'auto', backgroundColor: '#0d469b', borderRadius: 10 }}>
            <Text style={{ color: 'white', paddingVertical: 2, paddingHorizontal: 7, fontWeight: 'bold', fontSize: 13 }}>Join</Text>
          </Pressable>
        </View>

        {/* CONTENT */}
        <Text style={{ fontWeight: 'bold', fontSize: 17, letterSpacing: 0.5 }}>{post.title}</Text>
        {shouldShowImage && post.image && (
          <Image source={{ uri: post.image }} style={{ width: "100%", aspectRatio: 4 / 3, borderRadius: 15 }} />
        )}

        {shouldShowDescription && post.description && (
          <Text numberOfLines={isDetailedPost ? undefined : 4}>
            {post.description}
          </Text>
        )}

        {/* FOOTER */}
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <View style={[{ flexDirection: 'row' }, styles.iconBox]}>
              <MaterialCommunityIcons onPress={() => upvote(1)} name={isUpvoted ? "arrow-up-bold" : "arrow-up-bold-outline"} size={19} color={isUpvoted ? 'crimson' : 'black'} />
              <Text style={{
                fontWeight: '500',
                marginLeft: 5,
                alignSelf: 'center'
              }}>
                {post.upvotes[0].sum || 0}
              </Text>
              <View style={{ width: 1, backgroundColor: '#D4D4D4', height: 14, marginHorizontal: 7, alignSelf: 'center' }} />
              <MaterialCommunityIcons onPress={() => upvote(-1)} name={isDownvoted ? "arrow-down-bold" : "arrow-down-bold-outline"} size={19} color={isDownvoted ? 'dodgerblue' : 'black'} />
            </View>
            <View style={[{ flexDirection: 'row' }, styles.iconBox]}>
              <MaterialCommunityIcons name="comment-outline" size={19} color="black" />
              <Text style={{ fontWeight: '500', marginLeft: 5, alignSelf: 'center' }}>{post.nr_of_comments}</Text>
            </View>
          </View>
          <View style={{ marginLeft: 'auto', flexDirection: 'row', gap: 10 }}>
            <MaterialCommunityIcons name="trophy-outline" size={19} color="black" style={styles.iconBox} />
            <MaterialCommunityIcons name="share-outline" size={19} color="black" style={styles.iconBox} />
          </View>
        </View>
      </Pressable>
    </Link>
  )
}

export default PostListItem;

const styles = StyleSheet.create({
  iconBox: {
    borderWidth: 0.5,
    borderColor: '#D4D4D4',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20
  },
  image: {
    height: 20,
    aspectRatio: 1,
    borderRadius: 10
  },
  description: {
    fontSize: 14,
    color: 'gray'
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