import supabase from "../config/supabase.js"

async function findAll() {
    const { data, error } = await supabase
    .from("categories")
    .select("*");

    if (error) {
        throw error;
    }

    return data;
}

 async function findById(id: string) {
    const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();

    if (error) {
        throw error;
    }

    return data;
}

async function create(category:{
    name: string;
    description: string;
    icon: string;
    display_order: number;
    active: boolean;
}) {
    const { data, error } = await supabase
        .from("categories")
        .insert(category)
        .select()
        .single();

    if(error) {
        throw error;
    }

    return data;

}

export default {
    findAll,
    findById,
    create,
}