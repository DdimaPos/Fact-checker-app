import Article from "@/generic/article";
import Paginator from "@/generic/paginator";
import SkeletonArticle from "@/generic/skeleton";
import { useEffect, useState } from "react";

interface Article {
  source: any;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}
interface Data {
  status: string;
  totalResults: number;
  articles: Article[];
}
export default function International() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<Data | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        var response = await fetch(
          "http://localhost:3000/proxy_newsapi",
        );
        var fetchData = await response.json();
        setData(fetchData);
      } catch (err: any) {
        setError("error fetching international news");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);
  if (loading) {
    return (
      <div className="w-[100%]">
        {[1, 2, 3, 4, 5].map((i) => {
          return (
              <SkeletonArticle key={i} />
          );
        })}
      </div>
    );
  }

  if (error) {
    return <>Could not fetch international news</>;
  }
  if (!data || data.articles.length === 0) {
    return <div>No articles found.</div>;
  }
  //calculate pagination details
  const totalPages = Math.ceil(data.articles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const paginatedArticles = data.articles.slice(startIndex, endIndex);

  return (
    <div>
      <div className="h-[900px]">
        {paginatedArticles.map((val) => {
          return (
            <Article
              key={val.url}
              img_url={val.urlToImage}
              title={val.title}
              url={val.url}
              content={val.description}
              date={val.publishedAt}
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
