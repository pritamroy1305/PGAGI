"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

// Interface for Spotify User
interface SpotifyUser {
  id: string;
  display_name: string;
  images: Array<{ url: string }>;
  external_urls: { spotify: string };
  followers: { total: number };
  email: string;
  country: string;
  biography: string;
}

export function SpotifyCard() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<SpotifyUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false); // Track if the redirect has occurred

  // Handle the Spotify authentication redirect and access token
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("access_token");

    if (token) {
      setAccessToken(token); // Store the access token
    } else {
      // If no token, redirect to Spotify authorization page
      if (!isRedirecting) {
        const clientId = process.env.SPOTIFY_CLIENT_ID || "";
        const redirectUri = process.env.SPOTIFY_REDIRECT_URI || "";
        
        if (!clientId || !redirectUri) {
          console.error("Missing client_id or redirect_uri in environment variables");
          return;
        }

        const params = new URLSearchParams({
          client_id: clientId,
          response_type: "token",
          redirect_uri: redirectUri,
          scope: "user-read-private user-read-email", // Adjust scope as needed
          state: "state_parameter", // Optional, use for CSRF protection
        });
        setIsRedirecting(true); // Mark as redirecting
        window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
      }
    }
  }, [isRedirecting]); // Track redirect state

  // Fetch Spotify user data if access token exists
  useEffect(() => {
    if (accessToken) {
      const fetchSpotifyUser = async () => {
        try {
          const response = await fetch("https://api.spotify.com/v1/me", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUser(data as SpotifyUser);
          } else {
            console.error("Error fetching Spotify user:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching Spotify user:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchSpotifyUser();
    }
  }, [accessToken]);

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
          <img
            src={user.images[0]?.url || "/default-avatar.png"} // Default image if none available
            alt={`${user.display_name}'s avatar`}
            className="w-16 h-16 rounded-full border-2 border-primary"
          />
          <div>
            <CardTitle className="text-lg font-bold">{user.display_name}</CardTitle>
            <p className="text-sm text-muted-foreground">@{user.id}</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{user.biography || "No biography available"}</p>
          <p className="text-sm text-muted-foreground">Country: {user.country}</p>
          <p className="text-sm text-muted-foreground">Email: {user.email}</p>
          <div className="mt-4 text-lg font-semibold text-primary">
            Followers: {user.followers.total}
          </div>
          <a href={user.external_urls.spotify} target="_blank" rel="noopener noreferrer">
            <button className="mt-2 px-4 py-2 text-sm font-semibold text-orange-500 bg-primary rounded-full hover:bg-primary-dark transition-colors duration-300">
              View Profile
            </button>
          </a>
        </CardContent>
      </Card>
    )
  );
}
