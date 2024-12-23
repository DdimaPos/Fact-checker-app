import { useEffect, useState } from "react";
import "./App.css";
import {
  SearchBar,
  DataCard,
  SourcesCard,
  NothingToShow,
  Loader,
} from "./components";

type FinalResult = {
  trustRating: number; 
  clickbaitRating: number;
  sources: {
    sourceData: {
      sourceLogo: string;
      sourceUrl: string;
      sourceName: string;
      text: string;
    }[];
    controversial: boolean; // Flag indicating if the sources are controversial
  }[];
};

type DataToSend = {
  url: string | null;
  text: string | null;
};

const App: React.FC = () => {
  const [displayData, setDisplayData] = useState(false);
  const [finalResult, setFinalResult] = useState<FinalResult | null>(null);
  const [isDisappearing, setIsDisappearing] = useState(false); // New state
  const [isLoading, setIsLoading] = useState(false);

  const processInput = (input: string) => {
    setIsDisappearing(true);
    setTimeout(() => {
      setDisplayData(false); //remove cards after fade-out
      setIsLoading(true);
      setIsDisappearing(false); //reset disappearing state
    }, 200); 
    const data = input.startsWith("http")
      ? { url: input, text: null }
      : { url: null, text: input };

    fetchResult(data);
  };
  const fetchResult = async (data: DataToSend) => {
    /*try {
      let result = await fetch("http://localhost:6969/get-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let recievedData = await result.json();
      setFinalResult(recievedData);
      setDisplayData(true);
    } catch (err: any) {
      console.error(err.message);
      setDisplayData(true);
    } finally {
      setIsLoading(false);
    }*/

    //timeout for debugging
    setTimeout(() => {
      //logs to avoid error when debugging
      console.log(finalResult);
      console.log(data);
      
      setFinalResult(null);
      setDisplayData(true);
      setIsLoading(false);
    }, 2000);
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

        setIsLoading(true);
        fetchResult(data);

        sendResponse({ status: "Message received in App.tsx" });
      };

      chrome.runtime.onMessage.addListener(messageListener);

      return () => {
        chrome.runtime.onMessage.removeListener(messageListener);
      };
    }
  }, []);

  //Mock data
  const finalResultM = {
    trustRating: 60,
    clickbaitRating: 20,
    sources: [
      {
        sourceData: [
          {
            sourceLogo: "https://gagauzinfo.md/images/favicon.png",
            sourceUrl:
              "https://point.md/ru/novosti/ekonomika/cheban-my-ozhidaem-uvedomleniia-ot-gazproma-v-blizhaishie-dni/",
            sourceName:
              "Вадим Чебан: Молдова может вернуться к закупкам газа из России уже в мае",
            text: "Вход/Регистрация банки: Глава «Молдовагаз» Вадим Чебан утверждает, что направил в «Газпром» несколько запросов на поставку газа в Приднестровье по Трансбалканской сети, но не получил ответа, передает tv8.md",
          },
        ],
        controversial: false,
      },
      {
        sourceData: [
          {
            sourceLogo: "https://gagauzinfo.md/images/favicon.png",
            sourceUrl:
              "https://point.md/ru/novosti/ekonomika/cheban-my-ozhidaem-uvedomleniia-ot-gazproma-v-blizhaishie-dni/",
            sourceName:
              "Вадим Чебан: Молдова может вернуться к закупкам газа из России уже в мае",
            text: "С другой стороны, Вадим Чебан говорит, что он также сообщил Тирасполю о возможности покупать газ на бирже, за который, однако, придется заплатить.",
          },
        ],
        controversial: true,
      },
    ],
  };
  return (
    <div className="max-w-[1000px] m-auto flex flex-col min-h-[300px] min-w-[500px]">
      <h1 className="text-6xl m-auto mt-4 mb-4 w-fit">Fact checker</h1>
      <SearchBar onClick={processInput} />
      {isLoading ? (
        <Loader />
      ) : displayData && finalResultM ? (
        <div
          className={`flex mt-4 flex-wrap justify-center gap-4 ${isDisappearing ? "fade-out" : ""}`}
        >
          <div className="flex flex-col gap-10 sticky z-50">
            <DataCard
              title="Overall solidity rating"
              rating={finalResultM.trustRating}
              className="opacity-0 slide-up delay-1 z-10"
              higherIsBetter={true}
            />
            <DataCard
              title="Clickbait rating"
              rating={finalResultM.clickbaitRating}
              className="opacity-0 slide-up delay-2 z-0"
              higherIsBetter={false}
            />
          </div>
          <div className="flex flex-col gap-10">
            <SourcesCard
              title="Sources with similar information"
              sources={finalResultM.sources[0]}
              className="opacity-0 slide-up delay-3"
            />
            <SourcesCard
              title="Sources with diverging information"
              sources={finalResultM.sources[1]}
              className="opacity-0 slide-up delay-4"
            />
          </div>
        </div>
      ) : (
        <NothingToShow />
      )}
    </div>
  );
};

export default App;
