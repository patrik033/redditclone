import { View, Text, Pressable, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from '@expo/vector-icons';
import { router, Link } from "expo-router";
import { useAtom } from "jotai";
import { selectedGroupAtom } from "../../../atoms";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../lib/supabase";
import { TablesInsert } from "../../../types/database.types";


const CreateScreen = () => {


    const insertPost = async (post: InsertPost) => {
        const { data, error } = await supabase
            .from("posts")
            .insert(post)
            .select()
            .single();
        if (error) {
            throw error
        }
        else {
            return data
        }
    }

    const [title, setTitle] = useState<string>('')
    const [bodyText, setBodyText] = useState<string>('')
    const [group, setGroup] = useAtom(selectedGroupAtom)

    type InsertPost = TablesInsert<'posts'>


    const queryClient = useQueryClient()



    const { isPending, mutate } = useMutation({
        mutationFn: async () => {
            if (!group) throw new Error('Group is required')
            if (!title) throw new Error('Title is required')

            return insertPost
                ({
                    title,
                    description: bodyText,
                    group_id: group?.id,
                    user_id: "7a86aa48-b828-4584-94f9-8e2b2f4426c4",
                });
        },
        onSuccess: (data) => {
            console.log(data)
            goBack()

            //invalidate posts query
            queryClient.invalidateQueries({ queryKey: ['posts'] })

        },
        onError: (error) => {
            console.log(error)
            Alert.alert('Failed to insert',error.message)
        }
    });

    const goBack = () => {
        setTitle('')
        setBodyText('')
        setGroup(null)
        router.back()
    }





    return (

        <SafeAreaView style={{ backgroundColor: 'white', flex: 1, paddingHorizontal: 10 }}>
            {/** Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AntDesign name="close" size={30} color="black" onPress={() => goBack()} />
                <Pressable disabled={isPending} onPress={() => mutate()} style={{ marginLeft: 'auto' }}>
                    <Text style={styles.postText}>{isPending ? 'Posting...' : 'Post'}</Text>
                </Pressable>
            </View>


            {/** COMMUNITY SELECTOR */}
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 15 }}>

                    <Link href={"/post/groupSelector"} asChild>
                        <Pressable style={styles.communityContainer}>
                            {group ?
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                    <Image source={{ uri: group.image }} style={{ width: 30, borderRadius: 15, aspectRatio: 1 }} />
                                    <Text style={{ fontWeight: '600' }}>{group.name}</Text>
                                </View>
                                :
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                    <View style={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: 15,
                                        backgroundColor: 'black',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{ color: 'white', fontWeight: 'bold' }}>r/</Text>
                                    </View>
                                    <Text style={{ fontWeight: '600' }}>Select a Community</Text>
                                </View>
                            }
                        </Pressable>
                    </Link>



                    {/** INPUTS */}
                    <TextInput
                        placeholder="Title"
                        style={{ fontSize: 20, fontWeight: 'bold', paddingVertical: 20 }}
                        value={title}
                        onChangeText={setTitle}
                        multiline={true}
                        scrollEnabled={false}
                    />

                    <TextInput
                        placeholder="Body text (optional)"
                        style={{ fontSize: 20, fontWeight: 'bold', paddingVertical: 20 }}
                        value={bodyText}
                        onChangeText={setBodyText}
                        multiline={true}
                        scrollEnabled={false}
                    />
                </ScrollView>
            </KeyboardAvoidingView>


        </SafeAreaView>
    )
}

export default CreateScreen;


const styles = StyleSheet.create({
    postText: {
        color: 'white',
        backgroundColor: '#115BCA',
        fontSize: 20,
        paddingVertical: 2,
        paddingHorizontal: 7,
        fontWeight: 'bold',
        borderRadius: 15
    },
    rStyles: {
        backgroundColor: 'black',
        color: 'white',
        paddingVertical: 1,
        paddingHorizontal: 5,
        borderRadius: 10,
        fontWeight: 'bold'
    },
    communityContainer: {
        backgroundColor: '#EDEDED',
        flexDirection: 'row',
        gap: 5,
        padding: 10,
        borderRadius: 20,
        alignSelf: 'flex-start',
        marginVertical: 10,
    }
})