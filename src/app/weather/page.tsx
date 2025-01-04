"use client";

import { useState } from 'react';
import { WeatherCard } from '@/components/weather/weather-card';
import { StateSelect } from '@/components/weather/state-select';
import { WeatherResponse } from '@/types/weather';

export default function WeatherPage() {
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="container mx-auto p-4">
      <div className='dark:text-white text-gray-600' style={{ textAlign: 'center', fontSize: '48px', fontWeight: 'bold', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>Weather Information</div>
      <div className="max-w-md mx-auto">
        <StateSelect 
          onWeatherData={setWeatherData}
          onLoadingChange={setIsLoading}
        />
        {weatherData && <WeatherCard data={weatherData} />}
        {isLoading && (
          <div className="animate-pulse mt-4">
            <div className="h-48 bg-gray-200 rounded-lg"></div>
          </div>
        )}
      </div>
    </div>
  );
}