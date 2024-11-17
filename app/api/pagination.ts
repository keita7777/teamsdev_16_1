import { createClient } from "@/utils/supabase/server";
import { Database } from "@/type/database.types";

export const fetchPosts = async (page: number = 1, pageSize: number = 9) => {
  const supabase = createClient();
  const offset = (page - 1) * pageSize;

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .range(offset, offset + pageSize - 1);

  if (error) {
    console.error(error);
    return { data: [], error };
  }

  return { data, error: null };
};
