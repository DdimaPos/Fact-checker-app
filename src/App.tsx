import { useEffect, useState } from "react";
import "./App.css";
import { DataCard, SourcesCard, Loader } from "./components";
import { FakeNewsList } from "./features/FakeNewsList";
import SentimentChart from "./components/sentimentCard";
import { SearchBar } from "./features/SearchBar";
import NetworkGraph from "./features/NetworkGraph";
type FinalResult = {
  trustRating: number;
  clickbaitRating: number;
  sentiment: {
    positive: number;
    negative: number;
    neutral: number;
  };

  confirming: [
    {
      sourceLogo: string;
      sourceUrl: string;
      sourceName: string;
      text: string;
    },
  ];
  /*denying: [
    {
      sourceLogo: string;
      sourceUrl: string;
      sourceName: string;
      text: string;
    },
  ];*/
};

type DataToSend = {
  url: string | null;
  text: string | null;
};

const App: React.FC = () => {
  const [displayData, setDisplayData] = useState(false);
  const [finalResult, setFinalResult] = useState<FinalResult | null>(null);
  const [isDisappearing, setIsDisappearing] = useState(false); //new state
  const [isLoading, setIsLoading] = useState(false);
  const [subwaySurf, setSubwaySurf] = useState<boolean | null>(false);
  const [shrinked, setShrinked] = useState(false);
  const [graphInput, setGraphInput] = useState("");
  const fetchResult = async (data: DataToSend) => {
    try {
      let result = await fetch("http://localhost:6969/get-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let recievedData = await result.json();
      console.log(recievedData);
      setFinalResult(recievedData);
      setDisplayData(true);
    } catch (err: any) {
      console.error(err.message);
      setDisplayData(true);
    } finally {
      setIsLoading(false);
    }

    //timeout for debugging
    /*setTimeout(() => {
      //logs to avoid error when debugging
      console.log(finalResult);
      console.log(data);

      setFinalResult(null);
      setDisplayData(true);
      setIsLoading(false);
    }, 2000);*/
  };

  const processInput = (input: string) => {
    setShrinked(true);
    setIsDisappearing(true);
    setTimeout(() => {
      setDisplayData(false); //remove cards after fade-out
      setIsLoading(true);
      setIsDisappearing(false); //reset disappearing state
    }, 200);
    const data = input.startsWith("http")
      ? { url: input, text: null }
      : { url: null, text: input };
    if (input.startsWith("http")) {
      setSubwaySurf(false);
      setGraphInput(input);
    } else {
      setSubwaySurf(true);
    }
    fetchResult(data);
  };
  ///for extension's right click
  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.runtime) {
      const messageListener = (
        request: any,
        _sender: chrome.runtime.MessageSender,
        sendResponse: (response: any) => void,
      ) => {
        const data = {
          url: request.pageUrl,
          text: request.selectionText,
        };
        setShrinked(true);
        setSubwaySurf(false);
        setIsLoading(true);
        fetchResult(data);
        setGraphInput(request.pageUrl);
        sendResponse({ status: "Message received in App.tsx" });
      };

      chrome.runtime.onMessage.addListener(messageListener);

      return () => {
        chrome.runtime.onMessage.removeListener(messageListener);
      };
    }
  }, []);

  return (
    <div className="max-w-[1200px] m-auto flex flex-col min-h-[300px] min-w-[500px]">
      <h1 className="text-6xl m-auto mt-4 mb-4 w-fit">News Lens</h1>
      <SearchBar onClick={processInput} shrinked={shrinked} />
      {isLoading ? (
        <Loader subwaySurf={subwaySurf} />
      ) : displayData && finalResult ? (
        <div
          className={`flex mt-4 flex-wrap justify-center gap-4 ${isDisappearing ? "fade-out" : ""}`}
        >
          <div className="flex flex-col gap-10 sticky z-50">
            <DataCard
              title="Overall solidity rating"
              rating={finalResult.trustRating}
              className="opacity-0 slide-up delay-1 z-10"
              higherIsBetter={true}
            />
            <DataCard
              title="Clickbait rating"
              rating={finalResult.clickbaitRating}
              className="opacity-0 slide-up delay-2 z-0"
              higherIsBetter={false}
            />
            <SentimentChart
              className="opacity-0 slide-up delay-4"
              positive={finalResult.sentiment.positive}
              neutral={finalResult.sentiment.negative}
              negative={finalResult.sentiment.negative}
            />
          </div>
          <div className="flex flex-col gap-10">
            <SourcesCard
              title="Sources with similar information"
              sources={finalResult.confirming}
              good={true}
              className="opacity-0 slide-up delay-3"
            />
            {/*<SourcesCard
              title="Sources with diverging information"
              sources={finalResult.denying}
              good={false}
              className="opacity-0 slide-up delay-4"
            />*/}
            
          </div>
            {graphInput && (
              <NetworkGraph className="slide-up delay-3" url={graphInput} />
            )}
        </div>
      ) : (
        <FakeNewsList />
      )}
      {/*<NetworkGraph />*/}
    </div>
  );
};
export default App;
