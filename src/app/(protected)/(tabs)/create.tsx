import { View, Text, Pressable, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from '@expo/vector-icons';
import { router, Link } from "expo-router";
import groups from '../../../../assets/data/groups.json'
import { useState } from "react";
import GroupSelector from "../post/groupSelector";

const CreateScreen = () => {


    const [title, setTitle] = useState<string>('')
    const [bodyText, setBodyText] = useState<string>('')




    const goBack = () => {
        setTitle('')
        setBodyText('')

        router.back()
    }




    return (

        <SafeAreaView style={{ backgroundColor: 'white', flex: 1, paddingHorizontal: 10 }}>
            {/** Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AntDesign name="close" size={30} color="black" onPress={() => goBack()} />
                <Pressable onPress={() => router.back()} style={{ marginLeft: 'auto' }}>
                    <Text style={styles.postText}>Post</Text>
                </Pressable>
            </View>


            {/** COMMUNITY SELECTOR */}
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 15 }}>

                    <Link href={"/post/groupSelector"} asChild>
                        <Pressable style={styles.communityContainer}>
                            <Text style={styles.rStyles}>r/</Text>
                            <Text style={{ fontWeight: '600' }}>Select a Community</Text>
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