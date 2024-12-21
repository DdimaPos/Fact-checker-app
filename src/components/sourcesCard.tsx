import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardTitle } from "./ui/card";
import { Sources } from "@/types/Source";

interface Props {
  title: string;
  sources: Sources;
}
export const SourcesCard = ({ title, sources }: Props) => {
  return (
    <div className="w-[500px]">
      <Card className="flex flex-col p-2">
        <CardTitle className=" m-auto text-foreground w-fit text-[25px]">
          {title}
        </CardTitle>
        <CardContent className="flex gap-[20px] flex-col">
          {sources.sourceData.map((source) => {
            return (
              <section>
                <div className="flex items-center gap-[10px]">
                  <Avatar>
                    {source.sourceLogo ? (
                      <AvatarImage src={source.sourceLogo} alt="Source Logo" />
                    ) : (
                      <AvatarFallback>SRC</AvatarFallback>
                    )}
                  </Avatar>
                  <a className="text-[18px]" href={source.sourceUrl}>{source.sourceName}</a>
                </div>
                <div
                  className={`rounded-[10px] p-5 text-white text-[12px] ${sources.controversial ? "bg-primary" : "bg-destructive"}`}
                >
                  {source.text}
                </div>
              </section>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};
