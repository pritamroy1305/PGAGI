"use client";

import { useState } from "react";
import { NewsCard } from "./news-card";
import { NewsArticle } from "@/lib/api/types";
import { newsApiService } from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function NewsSearch() {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState("");

    const handleSearch = async () => {
        setIsLoading(true);
        try {
            const response = await newsApiService.getNewsByQuery(`${query}`);
            setArticles(response.data.articles);
        } catch (error) {
            console.error("Error fetching news:", error);
        } finally {
            setIsLoading(false);
        }
    };

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
            <div className="flex gap-2">
            <div className="relative flex-1">
                <Input
                placeholder="Search News on Any Topic..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9"
                />
            </div>
            <Button onClick={handleSearch}>Search</Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
                <NewsCard key={article.publishedAt} article={article} />
            ))}
            </div>
        </div>
    );
}
