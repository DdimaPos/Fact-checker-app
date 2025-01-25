import Article from "@/generic/article";
import Paginator from "@/generic/paginator";
import SkeletonArticle from "@/generic/skeleton";
import { useEffect, useState } from "react";

interface Article {
  title: string;
  image: string;
  created_at: string;
  content: string;
  url:string;
  id: number;
}
interface Data {
  results: Article[];
}
export default function StopFalsMd() {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<Data | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        var response = await fetch(
          "http://localhost:3000/proxy_stopfals",
        );
        var fetchData = await response.json();
        setData(fetchData);
      } catch (err: any) {
        setError("error fetching news from stopfals md");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);
  if (loading) {
    return (
      <div>
        {[1, 2, 3, 4, 5].map((i) => {
          return <SkeletonArticle key={i}/>;
        })}
      </div>
    );
  }

  if (error) {
    return <>{ error }</>;
  }
  if (!data || data.results.length === 0) {
    return <div>No articles found.</div>;
  }
  //calculate pagination details
  const totalPages = Math.ceil(data.results.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const paginatedArticles = data.results.slice(startIndex, endIndex);

  return (
    <div>
      <div className="h-[900px]">
        {paginatedArticles.map((val) => {
          return (
            <Article
              key={val.id}
              img_url={val.image}
              title={val.title}
              url={val.url}
              content={val.content}
              date={val.created_at}
            />
          );
        })}
      </div>
      <Paginator
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        showPreviousNext
      />
    </div>
  );
}
