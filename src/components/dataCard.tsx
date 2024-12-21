import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import "./rating.css"
interface Props{
  title: string,
  rating: number
}
export const DataCard = ({title, rating}: Props) => {
  const [barWidth, setBarWidth] = useState(0);
  setTimeout(() => {
    setBarWidth(rating);
  }, 0);
  const barColor = `hsl(${barWidth}, 70%, 45%)`;
  return (
    <div>
      <Card className="w-[400px] text-foreground">
        <CardHeader>
          <CardTitle className="w-fit m-auto font-bold text-[25px]">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col justify-center items-center gap-7">
          <div className="text-6xl">{rating}</div>

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
