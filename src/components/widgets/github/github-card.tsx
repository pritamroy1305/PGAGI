"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Octokit } from "@octokit/core";


interface GitHubUser {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
    name: string;
    company: string;
    blog: string;
    location: string;
    bio: string;
    public_repos: number;
    followers: number;
    following: number;
}


export function GitHubCard() {
    const octokit = new Octokit({
        auth: process.env.GITHUB_KEY,
      });
      const [isLoading, setIsLoading] = useState(true);
      const [user, setUser] = useState<GitHubUser | null>(null);
      useEffect(() => {
        const fetchNews = async () => {
          try {
            const response = await octokit.request('GET /users/{username}', {
                username: 'pritamroy1305',
                headers: {
                  'X-GitHub-Api-Version': '2022-11-28'
                }
              })
    
           setUser(response.data as GitHubUser);
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
        user && (
            <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex items-center space-x-4">
                    <img src={user.avatar_url} alt={`${user.login}'s avatar`} className="w-16 h-16 rounded-full border-2 border-primary" />
                    <div>
                        <CardTitle className="text-lg font-bold">{user.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">@{user.login}</p>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{user.bio}</p>
                    <p className="text-sm text-muted-foreground">{user.company}</p>
                    <p className="text-sm text-muted-foreground">{user.location}</p>
                    <div className="mt-4 text-lg font-semibold text-primary">
                        Public Repos: {user.public_repos} · Followers: {user.followers} · Following: {user.following}
                    </div>
                    <Link href={user.html_url}>
                    <button className="mt-2 px-4 py-2 text-sm font-semibold text-orange-500 bg-primary rounded-full hover:bg-primary-dark transition-colors duration-300">
    View Profile
</button>

                    </Link>
                </CardContent>
            </Card>
        )
    );
}