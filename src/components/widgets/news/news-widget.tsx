"use client";

import { useState, useEffect } from "react";
import { NewsCard } from "./news-card";
import { NewsArticle } from "@/lib/api/types";
import { newsApiService } from "@/lib/axios";

export function NewsWidget() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await newsApiService.getTopHeadline();

        setArticles(response.data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-muted rounded w-3/4"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Latest News</h2>
      {articles.map((article) => (
        <NewsCard key={article.source.id} article={article} />
      ))}
    </div>
  );
}