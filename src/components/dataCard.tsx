/*import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import "./rating.css"
import { cn } from "@/lib/utils";
interface Props{
  title: string,
  rating: number,
  className?: string 
}
export const DataCard = ({title, rating, className}: Props) => {
  const [barWidth, setBarWidth] = useState(0);
  setTimeout(() => {
    setBarWidth(rating);
  }, 0);
  const barColor = `hsl(${barWidth}, 70%, 45%)`;
  return (
    <div className={cn(className, "")}>
      <Card className="w-[400px] text-foreground">
        <CardHeader>
          <CardTitle className="w-fit m-auto font-bold text-[25px]">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col justify-center items-center gap-7">
          <div className="text-6xl counter"
            style={{"--num":rating} as React.CSSProperties}
          >{/*rating*}</div>

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
};*/

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import "./rating.css";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  rating: number;
  className?: string;
}

export const DataCard = ({ title, rating, className }: Props) => {
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

  const barColor = `hsl(${barWidth}, 70%, 45%)`;

  return (
    <div className={cn(className, "")}>
      <Card className="w-[400px] text-foreground">
        <CardHeader>
          <CardTitle className="w-fit m-auto font-bold text-[25px]">
            {title}
          </CardTitle>
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
