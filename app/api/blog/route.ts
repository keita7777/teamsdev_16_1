import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const supabaseData = await createClient();
    const { data, error } = await supabaseData.from("posts").select(`
      id, title, content, image_path, created_at, updated_at,
      users (name),
      categories (name)
    `);

    if (error) {
      throw error;
    }

    return NextResponse.json({ message: "取得完了", posts: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "取得失敗", error }, { status: 500 });
  }
};
