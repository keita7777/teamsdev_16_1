import { supabaseData } from "@/supabase";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const { data, error } = await supabaseData.from("posts").select("*");

    if (error) {
      throw error;
    }

    return NextResponse.json({ message: "取得完了", posts: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "取得失敗", error }, { status: 500 });
  }
};
