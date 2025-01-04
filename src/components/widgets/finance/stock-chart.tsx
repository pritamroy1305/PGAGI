"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StockData } from "@/lib/api/types";

interface StockChartProps {
  data: StockData;
}

export function StockChart({ data }: StockChartProps) {
  return (
    <Card className="w-full h-[300px]">
      <CardHeader>
        <CardTitle>{data.symbol} Stock Price</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data.historicalData}>
            <XAxis 
              dataKey="date"
              axisLine={true}
              tickLine={true}
              scale="auto"
              padding={{ left: 10, right: 10 }}
            />
            <YAxis
              axisLine={true}
              tickLine={true}
              scale="auto"
              padding={{ top: 10, bottom: 10 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}