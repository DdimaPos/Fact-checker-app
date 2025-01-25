import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import International from "./components/international";
import StopFalsMd from "./components/stopFalsmd";

export const FakeNewsList = () => {
  return (
    <div className="m-auto text-muted text-8xl mt-7 w-[100%]">
      <Tabs defaultValue="stopfalsmd">
        <TabsList>
          <TabsTrigger value="international">International</TabsTrigger>
          <TabsTrigger value="stopfalsmd">Moldova</TabsTrigger>
        </TabsList>
        <TabsContent  value="international">
          <International />
        </TabsContent>
        <TabsContent  value="stopfalsmd">
          <StopFalsMd />
        </TabsContent>
      </Tabs>
    </div>
  );
};
