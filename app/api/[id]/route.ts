import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const GET = async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const id = (await params).id;
    const supabaseData = await createClient();
    const { data, error } = await supabaseData.from("posts").select(`
      *,
      users (
        profileImg
      )
    `).eq("id", id).single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ message: "取得完了", posts: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "取得失敗", error }, { status: 500 });
  }
};

export const PATCH = async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const id = (await params).id;
    const supabaseData = await createClient();
    const {title, image_path,content} = await request.json()
    const { data, error } = await supabaseData.from("posts").update({title, image_path,content}).eq("id", id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ message: "取得完了", posts: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "取得失敗", error }, { status: 500 });
  }
};

