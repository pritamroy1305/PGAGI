"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NewsArticle } from "@/lib/api/types";
import Link from "next/link";

interface NewsCardProps {
  article: NewsArticle;
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <Card className="w-full p-1">
      <CardHeader>
        <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <img src={article.urlToImage} alt={article.title} className="w-full h-48 object-cover rounded-lg" />
        
        <p className="text-sm text-muted-foreground line-clamp-3">
          {article.author}
        </p>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {article.description}
        </p>
        <div className="mt-4 text-xs text-muted-foreground">
          {article.source.name} · {new Date(article.publishedAt).toLocaleDateString()}
        </div>
        
        <Link href={article.url}>
            <button className="mt-4 px-4 py-2 text-sm font-semibold text-white dark:text-black bg-primary rounded hover:bg-primary-dark transition-colors duration-300 dark:bg-primary-light dark:hover:bg-primary">
            Read more
            </button>
        </Link>
      </CardContent>
    </Card>
  );
}