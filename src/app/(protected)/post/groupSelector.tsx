import { useState } from "react";
import { View, Text, Pressable, Image, TextInput, FlatList, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useSetAtom } from "jotai";
import { selectedGroupAtom } from "../../../atoms";
import { useQuery } from "@tanstack/react-query";
import { fetchGroups } from "../../../services/groupService";
import { Tables } from "../../../types/database.types";
import { useSupabase } from "../../../lib/supabase";
type Group = Tables<'groups'>


const groupSelector = () => {

    const [searchValue, setSearchValue] = useState<string>('')
    const setSelectedGroup = useSetAtom(selectedGroupAtom)
    const supabase = useSupabase();

    const { data, isLoading, error } = useQuery({
        queryKey: ['groups',{searchValue}],
        queryFn: () => fetchGroups(searchValue, supabase),    
        staleTime: 5000,
        placeholderData: (previousData) => previousData,
    })



    const goBack = (group: Group) => {
        setSearchValue('')
        setSelectedGroup(group)
        router.back()
    }

    if (isLoading) {
        return <ActivityIndicator />
    }

    if (error || !data) {
        return <Text>Error</Text>
    }



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
                    data={data}
                    renderItem={({ item, index }) =>
                        <Pressable
                            key={index}
                            style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee', flex: 1 }}
                            onPress={() => goBack(item)}>

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