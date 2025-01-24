import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import International from "./components/international";

export const FakeNewsList = () => {

  return (
    <div className="m-auto text-muted text-8xl mt-7">
      <Tabs defaultValue="international">
        <TabsList>
          <TabsTrigger value="international">Account</TabsTrigger>
          <TabsTrigger value="stopfalsmd">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="international">
          <International />
        </TabsContent>
        <TabsContent value="stopfalsmd"> nothing{/*<StopFalsMd />*/}</TabsContent>
      </Tabs>
    </div>
  );
};
