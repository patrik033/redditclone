import { useState } from "react";
import { View, Text, Pressable, Image, TextInput, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { router } from "expo-router";
import groups from '../../../../assets/data/groups.json'
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";

const groupSelector = () => {

    const [searchValue, setSearchValue] = useState<string>('')
    const filteredGroups = groups.filter((group) => group.name.toLowerCase().includes(searchValue.toLowerCase()))


    return (
        <SafeAreaView style={{ marginHorizontal: 10 }}>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AntDesign name="close" size={30} color="black" onPress={() => router.back()} />
                <Text style={{ margin: 'auto', fontSize: 16, fontWeight: 'bold' }}>Post To</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'lightgray', borderRadius: 5, padding: 10, marginVertical: 10 }}>
                <AntDesign name="search1" size={20} color="black" />
                <TextInput
                    placeholder="Search for a community"
                    style={{ borderWidth: 1, backgroundColor: 'lightgray', borderColor: '#ddd', borderRadius: 8, flex: 1, fontSize: 16 }}
                    value={searchValue}
                    onChangeText={setSearchValue}
                >
                </TextInput>
                {searchValue && (
                    <AntDesign name="closecircle" size={20} color="black" onPress={() => setSearchValue('')} />
                )}
            </View>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} >

            <FlatList
                data={filteredGroups}
                renderItem={({ item, index }) =>
                    <Pressable
                key={index}
                style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee',flex:1 }}
                onPress={() => console.log(item)}>

                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            <Image source={{ uri: item.image }} style={{ width: 40, borderRadius: 20, aspectRatio: 1 }} />
                            <Text style={{ fontSize: 16, fontWeight: '600' }}>{item.name}</Text>
                        </View>
                    </Pressable>
                }
                keyExtractor={(item) => item.id}
                />
                </KeyboardAvoidingView>



        </SafeAreaView>
    )
}

export default groupSelector;