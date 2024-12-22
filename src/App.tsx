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
  trustRating: number; // e.g., 59
  clickbaitRating: number; // e.g., 100
  sources: {
    sourceData: {
      sourceLogo: string; // e.g., logo URL
      sourceUrl: string; // e.g., URL to the source
      sourceName: string; // e.g., "Google"
      text: string; // Content or summary from the source
    }[];
    controversial: boolean; // Flag indicating if the sources are controversial
  }[];
};

type DataToSend = {
  url: string | null;
  text: string | null;
};

const App: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [displayData, setDisplayData] = useState(false);
  const [dataToSend, setDataToSend] = useState<DataToSend | null>(null);
  const [finalResult, setFinalResult] = useState<FinalResult | null>(null);
  const [isDisappearing, setIsDisappearing] = useState(false); // New state
  const [isLoading, setIsLoading] = useState(false);

  const processInput = (input: string) => {
    setIsDisappearing(true);
    setTimeout(() => {
      setDisplayData(false); //remove cards after fade-out
      setIsLoading(true);
      setIsDisappearing(false); //reset disappearing state
    }, 200); //Mat
    const data = input.startsWith("http")
      ? { url: input, text: null }
      : { url: null, text: input };

    setDataToSend(data);
    fetchResult(data);
  };
  const fetchResult = async (data: DataToSend) => {
    console.log(dataToSend);
    console.log("Send Data:", data);
    try {
      let result = await fetch("http://localhost:6969/get-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let recievedData = await result.json();
      console.log("Recieved data from server:", recievedData);
      setFinalResult(recievedData);
      setDisplayData(true);
    } catch (err: any) {
      console.error(err.message);

      setDisplayData(true);
    } finally {
      setIsLoading(false);
    }
    /*setTimeout(() => {
      setFinalResult(null);
      setDisplayData(true);
      setIsLoading(false);
    }, 2000);*/
  };
  ///for extension's right click
  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.runtime) {
      const messageListener = (
        request: any,
        _sender: chrome.runtime.MessageSender,
        sendResponse: (response: any) => void,
      ) => {
        console.log("Message received from:", request.pageUrl);

        const data = {
          url: request.pageUrl,
          text: request.selectionText,
        };

        setMessage(request.selectionText || request.pageUrl || "No content");
        setDataToSend(data);
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
  console.log(finalResult);
  /*const finalResultM= {
    overallTrustRating: 59,
    clickbaitRating: 100,
    sources: [
      {
        sourceData: [
          {
            sourceLogo: "https://point.md/static/images/logo-og.png",
            sourceUrl: "https://www.google.com",
            sourceName: "Point.md",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus dignissim orci, at vulputate diam. Integer ut ex a orci faucibus iaculis. Etiam nec auctor dui. Vivamus eu quam tellus. Cras nisl nisi, semper eget nisl eget, egestas rutrum turpis. Aenean malesuada ullamcorper ante et varius. Nam eleifend non eros ut volutpat. Suspendisse vitae nunc ut arcu pretium porta nec id tellus. Curabitur augue tellus, cursus id facilisis eget, elementum nec metus. Donec felis ante, porttitor non vestibulum eu, finibus at neque. Fusce ultrices risus quis lorem sollicitudin fermentum. Nunc faucibus ante sed magna suscipit, a imperdiet quam pretium. Vestibulum blandit tincidunt enim.",
          },
          {
            sourceLogo:
              "https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png",
            sourceUrl: "https://www.google.com",
            sourceName: "Google",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus dignissim orci, at vulputate diam. Integer ut ex a orci faucibus iaculis. Etiam nec auctor dui. Vivamus eu quam tellus. Cras nisl nisi, semper eget nisl eget, egestas rutrum turpis. Aenean malesuada ullamcorper ante et varius. Nam eleifend non eros ut volutpat. Suspendisse vitae nunc ut arcu pretium porta nec id tellus. Curabitur augue tellus, cursus id facilisis eget, elementum nec metus. Donec felis ante, porttitor non vestibulum eu, finibus at neque. Fusce ultrices risus quis lorem sollicitudin fermentum. Nunc faucibus ante sed magna suscipit, a imperdiet quam pretium. Vestibulum blandit tincidunt enim.",
          },
        ],
        controversial: true,
      },
      {
        sourceData: [
          {
            sourceLogo:
              "https://www.hubspot.com/hs-fs/hubfs/McDonalds_Golden_Arches.svg.png",
            sourceUrl: "https://www.google.com",
            sourceName: "Google",
            text: "lorem ipsum dolor",
          },
        ],
        controversial: false,
      },
    ],
  };*/
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
        controversial: true,
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
  console.log(message);
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
          </div>
          <div className="flex flex-col gap-10">
            <SourcesCard
              title="Sources with similar information"
              sources={finalResult.sources[0]}
              className="opacity-0 slide-up delay-3"
              controvertial={true}
            />
            <SourcesCard
              title="Sources with diverging information"
              sources={finalResult.sources[1]}
              className="opacity-0 slide-up delay-4"
              controvertial={false}
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
