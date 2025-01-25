import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardTitle } from "./ui/card";
import { Link } from "lucide-react";
interface Source {
  sourceLogo: string | null;
  sourceUrl: string;
  sourceName: string;
  text: string;
}

interface Sources {
  sourceData: Source[]; //sourceData is an array of Source objects
  controversial: boolean;
}
interface Props {
  title: string;
  sources: Sources;
  className?: string;
}
export const SourcesCard = ({
  title,
  sources,
  className,
}: Props) => {
  return (
    <div className={cn(className, "max-w-[600px] ")}>
      <Card className="flex flex-col p-2 gap-3">
        <CardTitle className=" m-auto text-foreground w-fit text-[25px]">
          {title}
        </CardTitle>
        <CardContent className="flex gap-[20px] flex-col max-h-[500px] overflow-y-auto">
          {sources.sourceData != null
            ? sources.sourceData.map((source, i) => {
                return (
                  <section key={i}>
                    <div className="mb-4 flex items-center gap-[10px]">
                      <Avatar>
                        {source.sourceLogo ? (
                          <AvatarImage
                            src={source.sourceLogo}
                            alt="Source Logo"
                          />
                        ) : (
                          <AvatarFallback>SRC</AvatarFallback>
                        )}
                      </Avatar>
                      <a
                        className="flex items-center gap-3 text-[18px] text-foreground font-bold hover:underline transition duration-200 ease-in delay-100"
                        href={source.sourceUrl}
                        target="_blank"
                      >
                        {source.sourceName
                          ? source.sourceName.length > 30
                            ? source.sourceName.slice(0, 30) + "..."
                            : source.sourceName
                          : source.sourceUrl}
                      
                      <span className="text-[12] font-thin"><Link size={12}/></span></a>
                    </div>
                    <div
                      className={`rounded-[10px] p-5 text-white text-[14px] ${!sources.controversial ? "bg-primary" : "bg-destructive"}`}
                    >
                      ..."
                      <span className="italic">{source.text}</span>
                      "...
                    </div>
                  </section>
                );
              })
            : "No sources for specified category"}
        </CardContent>
      </Card>
    </div>
  );
};
