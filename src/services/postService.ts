import { SupabaseClient } from "@supabase/supabase-js";
import { useSupabase } from "../lib/supabase";
import { Database } from "../types/database.types";

export const fetchPosts = async (supabase: SupabaseClient<Database>) => {
    const { data, error } = await supabase
        .from('posts')
        .select('*, group:groups(*),upvotes(value.sum())')
        .order('created_at', { ascending: false });

    if (error) {
        throw error;
    }
    else  {
        return data;
    }
}


export const fetchPostById = async (id: string, supabase: SupabaseClient<Database>) => {
    const { data, error } = await supabase
        .from('posts')
        .select('*, group:groups(*),upvotes(value.sum())')
        .eq('id', id)
        .single();


    if (error) {
        throw error;
    }
    else  {
        return data;
    }
}



export const deletePostById = async (id: string, supabase: SupabaseClient<Database>) => {
    const { data,error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)
        .select()
        .single();

    if (error) {
        throw error;
    }
    else {
        return data;
    }
}