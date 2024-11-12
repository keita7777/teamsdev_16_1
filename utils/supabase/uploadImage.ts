import { createClient } from "@/utils/supabase/server";

export const uploadImage = async (image: File) => {
  const supabase = await createClient();
  const bucket = "teamdev_image";

  const timestamp = Date.now();
  const newName = `${timestamp}-${image.name}`;
  const { data } = await supabase.storage.from(bucket).upload(newName, image);

  if (!data) throw new Error("画像アップロードに失敗しました");

  return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
};
