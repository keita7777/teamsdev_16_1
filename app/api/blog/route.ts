import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const supabase = await createClient();
    const data = await req.json();
    await supabase.from("posts").insert(data);
    return NextResponse.json({ message: "投稿完了" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "投稿失敗", error }, { status: 500 });
  }
};
