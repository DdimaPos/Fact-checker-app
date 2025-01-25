import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { Info, TrendingUp } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { HelperInfo } from "./helperInfo";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

interface Props {
  title: string;
  rating: number;
  className?: string;
  higherIsBetter: boolean;
}

export const DataCard = ({
  title,
  rating,
  className,
  higherIsBetter,
}: Props) => {
  const [referenceValue, setReferenceValue] = useState(0); //helper value to display the animations
  const barColor = `hsl(${higherIsBetter ? referenceValue : 100 - referenceValue}, 70%, 45%)`;
  const chartData = [
    { browser: "safari", visitors: 1260, fill: "var(--color-safari)" },
  ];

  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    safari: {
      label: "Safari",
      color: barColor,
    },
  } satisfies ChartConfig;
  useEffect(() => {
    setReferenceValue(0);
    const referenceTimer = setTimeout(() => {
      setReferenceValue(rating);
    }, 50);

    return () => {
      clearTimeout(referenceTimer);
    };
  }, [rating]);

  return (
    <div className={cn(className, "datacard")}>
      <Card className="w-[400px] text-foreground">
        <CardHeader className="w-fit p-2 m-auto flex flex-row items-center gap-4">
          <CardTitle className="w-fit font-bold text-[25px]">{title}</CardTitle>
          <HoverCard>
            <HoverCardTrigger asChild className="cursor-pointer">
              <Info />
            </HoverCardTrigger>
            <HoverCardContent className="w-[400px] p-1">
              <HelperInfo className="w-[350px] h-auto" />
            </HoverCardContent>
          </HoverCard>
        </CardHeader>
        <CardContent className="flex flex-col justify-center items-center">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square h-[220px]"
          >
            <RadialBarChart
              data={chartData}
              endAngle={(referenceValue / 100) * 360}
              innerRadius={80}
              outerRadius={140}
            >
              <PolarGrid
                gridType="circle"
                radialLines={false}
                stroke="none"
                className="first:fill-muted last:fill-background"
                polarRadius={[86, 74]}
              />
              <RadialBar dataKey="visitors" background />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-4xl font-bold counter"
                          >
                            {referenceValue}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Rating
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
            </RadialBarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">

        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">Showing total visitors for the last 6 months</div>
      </CardFooter>
      </Card>
    </div>
  );
};
