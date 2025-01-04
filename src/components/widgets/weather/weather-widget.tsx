"use client";

import { useState, useEffect } from "react";
import { WeatherCard } from "./weather-card";
import { WeatherData } from "@/lib/api/types";
import { weatherApiService } from "@/lib/axios";

export function WeatherWidget() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    const fetchWeather = async () => {
      try {

        
         const geoResponse = await weatherApiService.getCoordinates('Bolpur');
              if (geoResponse.data?.[0]) {
                const { lat, lon } = geoResponse.data[0];
                const weatherResponse = await weatherApiService.getWeather(lat, lon);
                setWeatherData(weatherResponse.data);
              }
            } catch (error) {
              console.error("Error fetching weather data:", error);
            } finally {
              setIsLoading(false);
            }
        
      
    };

    fetchWeather();
  }, []);

  return( 
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Latest Weather</h2>
  <WeatherCard data={weatherData} isLoading={isLoading} />
  </div>
  );
}