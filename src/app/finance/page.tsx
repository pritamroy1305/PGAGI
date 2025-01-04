"use client";

import { useState } from 'react';
import { StockSearch } from '@/components/finance/stock-search';
import { StockChart } from '@/components/finance/stock-chart';
import { NewsSection } from '@/components/finance/news-section';
import { TimeSeriesData } from '@/types/finance';

export default function FinancePage() {
  const [stockData, setStockData] = useState<TimeSeriesData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Financial Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <StockSearch 
            onStockData={setStockData}
            onLoadingChange={setIsLoading}
          />
          {stockData && <StockChart data={stockData} />}
          {isLoading && (
            <div className="animate-pulse mt-4">
              <div className="h-[400px] bg-gray-200 rounded-lg"></div>
            </div>
          )}
        </div>
        <div>
          <NewsSection /> 
        </div>
      </div>
    </div>
  );
}