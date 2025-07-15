import { useState,useRef } from "react";

import { View, Text, ActivityIndicator, Alert, FlatList, TextInput, SafeAreaView, KeyboardAvoidingView, Platform, Pressable } from "react-native"
import { router, Stack, useLocalSearchParams } from "expo-router"
import PostListItem from "../../../components/PostListItem";

import { deletePostById, fetchPostById } from "../../../services/postService";
import { useSupabase } from "../../../lib/supabase";
import { AntDesign, MaterialIcons, Entypo } from '@expo/vector-icons';

import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import comments from "../../../../assets/data/comments.json"
import posts from "../../../../assets/data/posts.json"
import CommentListItem from "../../../components/CommentListItem"
import { useSafeAreaInsets } from "react-native-safe-area-context";

const DetailedPost = () => {
    const { id } = useLocalSearchParams<{ id: string }>()
    const supabase = useSupabase();
    const queryClient = useQueryClient();
    const insets = useSafeAreaInsets();
    
    
    const [comment, setComment] = useState<string>('');
    const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
    const inputRef = useRef<TextInput | null>(null);


    const { data: post, isLoading, error } = useQuery({
        queryKey: ['post', id],
        queryFn: () => fetchPostById(id, supabase),
        staleTime: 5000,
    })

    const { mutate: remove } = useMutation({

        mutationFn: () => deletePostById(id, supabase),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
            router.back()
        },
        onError: (error) => {
            Alert.alert('Error', error.message)
        }
    })




    const searchedPost = posts.find(p => p.id === id);
    const postComments = comments.filter((c) => c.post_id === "post-1");


    const handleReplyButtonPressed = (commentId: string) =>{
        inputRef.current?.focus();
        //setIsInputFocused(true);
        //setComment(`@${commentId} `);
        console.log("Reply button pressed",commentId);
    }

    if (isLoading) {
        return <ActivityIndicator />
    }

    if (error || !post) {
        return <Text>Error fetching post</Text>
    }



    return (
        <KeyboardAvoidingView keyboardVerticalOffset={insets.top + 15} behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>

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


            <View style={{ flex: 1 }}>

                <FlatList
                    data={postComments}
                    renderItem={({ item }) => <CommentListItem comment={item} depth={0} onReply={handleReplyButtonPressed} />}
                    ListHeaderComponent={<PostListItem post={post} isDetailedPost />}
                />
                <View
                    style={{
                        padding: 10,
                        paddingBottom: insets.bottom,
                        //borderBottomWidth: 1,
                        borderBottomColor: 'lightgrey',
                        backgroundColor: 'white',
                        borderRadius: 10,
                        shadowOffset:
                        {
                            width: 0,
                            height: -3
                        },
                        shadowOpacity: 0.1,
                        shadowRadius: 3,
                        elevation: 4,
                        //flexDirection: 'row',
                        //alignItems: 'center',
                        //gap: 10,
                    }}>






                    <TextInput
                        ref={inputRef}
                        placeholder="Join the discussion"
                        style=
                        {{
                            backgroundColor: '#E4E4E4',
                            borderWidth: 0.5,
                            borderColor: 'lightgrey',
                            borderRadius: 5,
                            padding: 5
                        }}
                        value={comment}
                        onChangeText={(text) => setComment(text)}
                        multiline={true}
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                    />
                    {isInputFocused && (

                        <Pressable style={{ backgroundColor: '#0d469b', borderRadius: 15, padding: 5, marginLeft: 'auto', marginTop: 15, }}>
                            <Text style={{ color: 'white', paddingVertical: 5, paddingHorizontal: 10, fontWeight: 'bold', fontSize: 13 }}>Reply</Text>
                        </Pressable>
                    )}

                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default DetailedPost