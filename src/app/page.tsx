"use client";

import { WeatherWidget } from "@/components/widgets/weather/weather-widget";
import { NewsWidget } from "@/components/widgets/news/news-widget";
import { FinanceWidget } from "@/components/widgets/finance/finance-widget";
import { SpotifyCard } from "@/components/widgets/spotify/spotify";

export default function Home() {
  return (
    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4">
        
        <NewsWidget />
        
        <WeatherWidget />
        <FinanceWidget />
       
        <SpotifyCard />

      
      </div>
    
  );
}