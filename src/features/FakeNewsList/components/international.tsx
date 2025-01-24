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
          "https://newsapi.org/v2/everything?q=fake+news&apiKey=17ab9c30f70a4af3bafe8947a8c4f1c5&language=en",
        );
        var fetchData = await response.json();
        setData(fetchData);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);
  if (loading) {
    return (
      <div>
        {[1, 2, 3, 4, 5].map(() => {
          return <SkeletonArticle />;
        })}
      </div>
    );
  }

  if (error) {
    return { error };
  }
  if (!data || data.articles.length === 0) {
    return <div>No articles found.</div>;
  }
  //calculate pagination details
  const totalPages = Math.ceil(data.articles.length / articlesPerPage);
  console.log(totalPages);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const paginatedArticles = data.articles.slice(startIndex, endIndex);
  console.log(paginatedArticles);
  return (
    <div>
      {paginatedArticles.map((val) => {
        return (
          <Article
            img_url={val.urlToImage}
            title={val.title}
            url={val.url}
            content={val.description}
            date={val.publishedAt}
          />
        );
      })}
      <Paginator
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        showPreviousNext
      />
      
    </div>
  );
}
