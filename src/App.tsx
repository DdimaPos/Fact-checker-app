import { useEffect, useState } from "react";
import "./App.css";
import { SearchBar, DataCard, SourcesCard } from "./components";
import { Sources } from "./types/Source";

const App: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    //check if chrome is undefined - then I run it as site
    if (typeof chrome !== "undefined" && chrome.runtime) {
      //listen for messages from the background script
      const messageListener = (
        request: any,
        sender: chrome.runtime.MessageSender,
        sendResponse: (response: any) => void,
      ) => {
        console.log("Message received from:", sender.tab?.url);
        setMessage(request.selectionText || request.linkUrl || "No content");
        sendResponse({ status: "Message received in App.tsx" });
      };

      chrome.runtime.onMessage.addListener(messageListener);

      return () => {
        chrome.runtime.onMessage.removeListener(messageListener);
      };
    }
  }, []);

  ///source from backend - mock data
  const sources1: Sources = {
    sourceData: [
      {
        sourceLogo:
          "https://www.hubspot.com/hs-fs/hubfs/McDonalds_Golden_Arches.svg.png?width=500&height=438&name=McDonalds_Golden_Arches.svg.png",
        sourceUrl: "https://www.google.com",
        sourceName: "Google",
        text: "lorem ipsum dolor",
      },
      {
        sourceLogo:
          "https://www.hubspot.com/hs-fs/hubfs/McDonalds_Golden_Arches.svg.png?width=500&height=438&name=McDonalds_Golden_Arches.svg.png",
        sourceUrl: "https://www.google.com",
        sourceName: "Google",
        text: "lorem ipsum dolor Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse maximus non magna eu commodo. Nulla facilisi. Aliquam non aliquam ante. Morbi pellentesque, urna sit amet ornare sodales, tellus elit suscipit augue, sed hendrerit nisl lorem eget arcu. Suspendisse lacinia, tellus consectetur malesuada lacinia, nunc lacus feugiat orci, ut dictum nisi neque fermentum est. In imperdiet et nibh in ornare. Morbi quis tempor enim, nec scelerisque nunc. Duis scelerisque massa non magna volutpat malesuada. Vestibulum vitae commodo mauris, sit amet viverra turpis. Maecenas at enim fermentum, consequat ante a, interdum ante. Quisque vel porta sapien, ac ullamcorper ante. Morbi non porta tortor. In non quam elementum, lobortis nisl vitae, pharetra lorem. Donec id consequat lacus, at dictum mi.",
      },
    ],
    controversial: true,
  };
  const sources2: Sources = {
    sourceData: [
      {
        sourceLogo:
          "https://www.hubspot.com/hs-fs/hubfs/McDonalds_Golden_Arches.svg.png?width=500&height=438&name=McDonalds_Golden_Arches.svg.png",
        sourceUrl: "https://www.google.com",
        sourceName: "Google",
        text: "lorem ipsum dolor",
      },
    ],
    controversial: false,
  };
  console.log(message);
  return (
    <div className="max-w-[1000px] m-auto flex flex-col">
      <h1 className="text-6xl m-auto mt-4 mb-4 w-fit">Fact checker</h1>
      <SearchBar />
      <div className="flex mt-4 flex-wrap justify-center gap-4">
        <div className="flex flex-col gap-10">
          <DataCard title="Overall trust rating" rating={59} />
          <DataCard title="Clickbait rating" rating={100} />
        </div>
        <div className="flex flex-col">
          <SourcesCard title="Relevant Sources" sources={sources1} />
          <SourcesCard title="Controvertial Sources" sources={sources2} />
        </div>
      </div>
    </div>
  );
};

export default App;
