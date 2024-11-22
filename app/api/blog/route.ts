import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const currentPage = Number(searchParams.get("page")) - 1 || 0;
  const perPage = 6;
  let firstRange = currentPage * perPage;
  let lastRange = firstRange + (perPage - 1);
try{
  const supabaseData = createClient();
  const { data, error, count } = await supabaseData.from("posts")
  .select(`
      id, title, content, image_path, created_at, updated_at,
      users (name),
      categories (name)
      `, { count: "exact" })
  .range(firstRange, lastRange);

    if (error) {
      throw error;
    }

    return NextResponse.json({ message: "取得完了", posts: data, count: count }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "取得失敗", error }, { status: 500 });
  }
  };

export const POST = async (req: Request) => {
  try {
    const supabase = createClient();
    const data = await req.json();
    await supabase.from("posts").insert(data);
    return NextResponse.json({ message: "投稿完了" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "投稿失敗", error }, { status: 500 });
  }
};
