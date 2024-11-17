import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("comments").select(`
    comment,
    id,
    post_id,
    user_id,
    created_at,
    users (
      name,
      profileImg
    )
  `);

    if (error) {
      throw new Error(`コメントデータ取得エラー: ${error.message}`);
    }

    return NextResponse.json({ message: "コメントデータ取得完了", comments: data }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json({ message: "コメントデータ取得失敗", error: (error as Error).message }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const supabase = createClient();
    const data = await req.json();

    const { error } = await supabase
      .from("comments")
      .insert({ comment: data.comment, user_id: data.user_id, post_id: data.post_id });

    if (error) {
      throw new Error(`データ挿入エラー: ${error.message}`);
    }

    return NextResponse.json({ message: "コメント投稿完了" }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json({ message: "コメント投稿失敗", error: (error as Error).message }, { status: 500 });
  }
};
