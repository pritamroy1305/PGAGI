"use client";
import axios from 'axios';

export const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org',
});

export const weatherApiService = {
  getCoordinates: (city: string) => 
    weatherApi.get('/geo/1.0/direct', {
      params: {
        q: `${city},IN`,
        appid: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY,
      },
    }),

  getWeather: (lat: number, lon: number) =>
    weatherApi.get('/data/2.5/weather', {
      params: {
        lat,
        lon,
        units: 'metric',
        appid: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY,
      },
    }),
};

export const financeApi = axios.create({
  baseURL: 'https://www.alphavantage.co',
  params: {
    apikey: process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY,
  },
});

export const financeApiService = {
  searchSymbol: (query: string) => 
    financeApi.get('/query', {
      params: {
        function: 'SYMBOL_SEARCH',
        keywords: query,
      },
    }),

  getDailyTimeSeries: (symbol: string) =>
    financeApi.get('/query', {
      params: {
        function: 'TIME_SERIES_DAILY',
        symbol,
        outputsize: 'full',
      },
    }),

  getNewsArticles: () =>
    financeApi.get('/query', {
      params: {
        function: 'NEWS_SENTIMENT',
        tickers: 'FOREX:INR',
        limit: 5,
      },
    }),
};

export const newsApi = axios.create({
  baseURL: 'https://newsapi.org/v2',
  params: {
    apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
  },
});

export const newsApiService = {
  getTopHeadline: () =>
    newsApi.get('/top-headlines', {
      params: {
        country: 'us',
        
        pageSize: 1,
      },
    }),
    
    getNewsByQuery: (query: string) =>
    newsApi.get('/everything', {
      params: {
        q: query,
        pageSize: 20,
        sortBy: 'relevancy',
      },
    }),
    getTopHeadlines: () =>
    newsApi.get('/top-headlines', {
      params: {
        country: 'us',
        
        pageSize: 5,
      },
    }),
};
