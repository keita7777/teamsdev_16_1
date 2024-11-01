<<<<<<< HEAD
import styles from "./page.module.css";
import SignUpForm from "./signup/page";
=======
import Header from "@/components/Header";
import Search from "@/components/Search";
import ArticleList from "@/components/ArticleList";
import Pagination from "@/components/Pagination";

>>>>>>> 880a822c489feded25a9bfbe26bc898078831e26
export default function Home() {
  return (
    <>
      <Header />
      <Search />
      <ArticleList />
      <Pagination />
    </>
  );
}
