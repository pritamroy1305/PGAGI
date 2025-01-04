"use client";

import { useState, useEffect } from 'react';
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { financeApiService } from '@/lib/axios';
import { StockSearchResult, TimeSeriesData } from '@/types/finance';
import { useDebounce } from '@/hooks/use-debounce';
import React from 'react';

interface StockSearchProps {
  onStockData: (data: TimeSeriesData) => void;
  onLoadingChange: (isLoading: boolean) => void;
}

export function StockSearch({ onStockData, onLoadingChange }: StockSearchProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<StockSearchResult[]>([]);
  const debouncedSearch = useDebounce(search, 300);

  const handleSearch = async (query: string) => {
    if (!query) {
      setResults([]);
      return;
    }

    try {
      const response = await financeApiService.searchSymbol(query);
      console.log(response.data.bestMatches);
      setResults(response.data.bestMatches || []);
    } catch (error) {
      console.error('Error searching stocks:', error);
    }
  };

  const handleStockSelect = async (symbol: string) => {
    setOpen(false);
    onLoadingChange(true);

    try {
      const response = await financeApiService.getDailyTimeSeries(symbol);
      onStockData(response.data);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    } finally {
      onLoadingChange(false);
    }
  };

 useEffect(() => {
    handleSearch(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className="relative">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search stocks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>
      
      {results.length > 0 && (
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full">
              Select a stock
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full">
            <DropdownMenuLabel>Stock Results</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {results.map((result) => (
              <DropdownMenuItem
                key={result["1. symbol"]}
                onSelect={() => handleStockSelect(result["1. symbol"])}
              >
                <div className="flex flex-col">
                  <span className="font-medium">{result["2. name"]}</span>
                  <span className="text-sm text-muted-foreground">
                    {result["1. symbol"]} • {result["2. name"]}
                  </span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
