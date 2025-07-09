import { View, Text, Pressable, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from '@expo/vector-icons';
import { router } from "expo-router";
import groups from '../../../../assets/data/groups.json'
import { useState } from "react";

const CreateScreen = () => {
    const [selected, setSelected] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const [title, setTitle] = useState<string>('')
    const [bodyText, setBodyText] = useState<string>('')

    const renderCommunityDropdown = () => {
        if (!showDropdown) return null;

        return (
            <ScrollView style={{ maxHeight: 200, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, marginTop: 5 }}>
                {groups.map((group, index) => (
                    <Pressable
                        key={index}
                        style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' }}
                        onPress={() => {
                            setSelected(group.name);
                            setShowDropdown(false);
                        }}
                    >
                        <Text>r/{group.name}</Text>
                    </Pressable>
                ))}
            </ScrollView>
        );
    };
    

    const goBack = () => {
        setTitle('')
        setBodyText('')
        setSelected('')
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
                <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical:15 }}>

                    <View style={styles.communityContainer}>
                        <Pressable style={{ flexDirection: 'row', gap: 3 }} onPress={() => setShowDropdown(!showDropdown)}>
                            <Text style={styles.rStyles}>r/</Text>
                            <Text style={{ fontWeight: '600' }}>{selected.length > 0 ? selected : 'Select a Community'}</Text>
                            <AntDesign name="down" size={20} color="black" />
                        </Pressable>
                    </View>

                    {renderCommunityDropdown()}

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