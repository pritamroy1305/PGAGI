// API Response Types
export interface WeatherData {
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    wind: {
      speed: number;
      deg: number;
    };
    name: string;
  
  }
  
  export interface NewsArticle {
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    source: {
      name: string;
      id: string;
    };
    content: string;
  }
  
  export interface StockData {
    symbol: string;
    price: number;
    change: number;
    changePercent: number;
    high: number;
    low: number;
    volume: number;
    historicalData: Array<{
      date: string;
      price: number;
      volume: number;
    }>;
  }
  
  export interface ApiState<T> {
    data: T | null;
    isLoading: boolean;
    error: string | null;
  }