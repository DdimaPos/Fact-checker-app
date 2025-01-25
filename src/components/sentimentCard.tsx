import { TrendingUp } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

interface Props {
  className: string;
  positive: number;
  neutral: number;
  negative: number;
}
export default function SentimentChart({
  className,
  positive,
  negative,
  neutral,
}: Props) {
  const chartData = [
    { month: "january", negative: negative, neutral: neutral, positive: positive},
  ];

  const chartConfig = {
    negative: {
      label: "Negative",
      color: "red",
    },
    neutral: {
      label: "Neutral",
      color: "grey",
    },
    positive: {
      label: "Positive",
      color: "green",
    },
  } satisfies ChartConfig;
  return (
    <Card className={cn(className, "flex flex-col")}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Emotional Analysis</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[180px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {Math.max(
                            chartData[0].negative,
                            chartData[0].neutral,
                            chartData[0].positive,
                          )}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="negative"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-negative)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="neutral"
              fill="var(--color-neutral)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />

            <RadialBar
              dataKey="positive"
              fill="var(--color-positive)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
