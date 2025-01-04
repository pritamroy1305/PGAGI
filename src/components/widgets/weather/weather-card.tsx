"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeatherData } from "@/lib/api/types";
import { Cloud, Droplets, Thermometer, Wind } from "lucide-react";
interface WeatherCardProps {
  data: WeatherData | null;
  isLoading: boolean;
}

export function WeatherCard({ data, isLoading }: WeatherCardProps) {
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Weather</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Weather at {data.name}</span>
          <img 
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt={data.weather[0].description}
            className="w-15 h-15"
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">Temperature</p>
              <p className="text-2xl font-bold">{Math.round(data.main.temp)}°C</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm font-medium">Humidity</p>
              <p className="text-2xl font-bold">{data.main.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium">Wind Speed</p>
              <p className="text-2xl font-bold">{data.wind.speed} m/s</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Cloud className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium">Condition</p>
              <p className="text-2xl font-bold capitalize">{data.weather[0].main}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}