import { Card } from "@/components/ui/card";
import { useIsoDate } from "./hooks/useIsoDate";

interface Props {
  img_url: string;
  title: string;
  url: string;
  content: string;
  date: string;
}
const Article = ({ img_url, title, url, content, date }: Props) => {
  var prettyDate = useIsoDate(date);
  return (
    <Card className="h-[150px] mb-7 justify-start flex text-secondary-foreground">
      <div
        className="w-[25%] h-[150px] rounded-l bg-cover bg-center shrink-0"
        style={{ backgroundImage: `url(${img_url})` }}
      ></div>
      <div className="flex p-7 justify-between flex-col">
        <div className="text-[18px] font-bold">
          <a href={url}>{title}</a>
        </div>
        <p className="text-[14px]/5 max-h-5 w-[100%] text-muted-foreground overflow-ellipsis  overflow-hidden">{content}</p>
        <div className="text-[14px] text-muted-foreground">{prettyDate}</div>
      </div>
    </Card>
  );
};

export default Article;
