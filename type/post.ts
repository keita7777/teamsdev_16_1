export type Post = {
  category_id: string;
  content: string;
  created_at: string;
  id: string;
  image_path: string;
  title: string;
  updated_at: string;
  user_id: string;
  users: {
    profileImg: string;
  };
};
