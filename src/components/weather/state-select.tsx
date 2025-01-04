"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { weatherApiService } from "@/lib/axios";
import { WeatherResponse } from "@/types/weather";

interface StateSelectProps {
  onWeatherData: (data: WeatherResponse) => void;
  onLoadingChange: (isLoading: boolean) => void;
}

export function StateSelect({ onWeatherData, onLoadingChange }: StateSelectProps) {
  const INDIAN_STATES_WITH_CAPITALS = [
    { state: "Andhra Pradesh", capital: "Amaravati" },
    { state: "Arunachal Pradesh", capital: "Itanagar" },
    { state: "Assam", capital: "Dispur" },
    { state: "Bihar", capital: "Patna" },
    { state: "Chhattisgarh", capital: "Raipur" },
    { state: "Goa", capital: "Panaji" },
    { state: "Gujarat", capital: "Gandhinagar" },
    { state: "Haryana", capital: "Chandigarh" },
    { state: "Himachal Pradesh", capital: "Shimla" },
    { state: "Jharkhand", capital: "Ranchi" },
    { state: "Karnataka", capital: "Bengaluru" },
    { state: "Kerala", capital: "Thiruvananthapuram" },
    { state: "Madhya Pradesh", capital: "Bhopal" },
    { state: "Maharashtra", capital: "Mumbai" },
    { state: "Manipur", capital: "Imphal" },
    { state: "Meghalaya", capital: "Shillong" },
    { state: "Mizoram", capital: "Aizawl" },
    { state: "Nagaland", capital: "Kohima" },
    { state: "Odisha", capital: "Bhubaneswar" },
    { state: "Punjab", capital: "Chandigarh" },
    { state: "Rajasthan", capital: "Jaipur" },
    { state: "Sikkim", capital: "Gangtok" },
    { state: "Tamil Nadu", capital: "Chennai" },
    { state: "Telangana", capital: "Hyderabad" },
    { state: "Tripura", capital: "Agartala" },
    { state: "Uttar Pradesh", capital: "Lucknow" },
    { state: "Uttarakhand", capital: "Dehradun" },
    { state: "West Bengal", capital: "Kolkata" },
  ];
  

  const [value, setValue] = useState("");

  const handleStateSelect = async (state: string) => {
    setValue(state);
    onLoadingChange(true);

    try {
      const geoResponse = await weatherApiService.getCoordinates(state);
      if (geoResponse.data?.[0]) {
        const { lat, lon } = geoResponse.data[0];
        const weatherResponse = await weatherApiService.getWeather(lat, lon);
        onWeatherData(weatherResponse.data);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      onLoadingChange(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={value ? "true" : "false"}
          className="w-full justify-between"
        >
          {value || "Select City..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full p-0 max-h-60 overflow-y-auto">
        <DropdownMenuLabel>Indian States with Capitals</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {INDIAN_STATES_WITH_CAPITALS.map((state) => (
          <DropdownMenuItem
        key={state.capital}
        onSelect={() => handleStateSelect(state.capital)}
          >
        <Check
          className={cn(
            "mr-2 h-4 w-4",
            value === state.capital ? "opacity-100" : "opacity-0"
          )}
        />
        {state.capital}-{state.state}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
