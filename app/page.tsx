import Header from "@/components/Header";
import Search from "@/components/Search";
import ArticleList from "@/components/ArticleList";
import Pagination from "@/components/Pagination";

export default function Home() {
  return (
    <div>
      <Header />
      <Search />
      <ArticleList />
      <Pagination />
    </div>
  );
}
