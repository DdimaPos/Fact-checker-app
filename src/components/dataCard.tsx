import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import "./rating.css";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { HelperInfo } from "./helperInfo";

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
  const [barWidth, setBarWidth] = useState(0);
  const [counterValue, setCounterValue] = useState(0);

  useEffect(() => {
    setBarWidth(0);
    const barTimer = setTimeout(() => {
      setBarWidth(rating);
    }, 50);

    setCounterValue(0);
    const counterTimer = setTimeout(() => {
      setCounterValue(rating);
    }, 50);

    return () => {
      clearTimeout(barTimer);
      clearTimeout(counterTimer);
    };
  }, [rating]);

  const barColor = `hsl(${higherIsBetter ? barWidth : 100 - barWidth}, 70%, 45%)`;

  return (
    <div className={cn(className, "datacard")}>
      <Card className="w-[400px] text-foreground">
        <CardHeader className="w-fit m-auto flex flex-row items-center gap-4">
          <CardTitle className="w-fit font-bold text-[25px]">{title}</CardTitle>
          <HoverCard>
            <HoverCardTrigger asChild className="cursor-pointer">
              <Info />
            </HoverCardTrigger>
            <HoverCardContent className="w-[400px] p-1">
              <HelperInfo className="w-[350px] h-auto"/>
            </HoverCardContent>
          </HoverCard>
        </CardHeader>
        <CardContent className="flex flex-col justify-center items-center gap-7">
          {/* Counter Animation */}
          <div
            className="text-6xl counter"
            style={{ "--num": counterValue } as React.CSSProperties}
          ></div>

          {/* Bar with trust rating */}
          <div className="animatedBar__parent relative rounded-[5px] h-[10px] w-[100%] bg-foreground">
            <div
              className="animatedBar__child absolute rounded-[5px] h-[10px] bg-primary"
              style={{ width: `${barWidth}%`, background: barColor }}
            ></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
