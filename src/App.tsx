import { useEffect, useState } from "react";
import "./App.css";
import { DataCard, SourcesCard, NothingToShow, Loader } from "./components";
import { SearchBar } from "./components/SearchBar";
import { FakeNewsList } from "./features/FakeNewsList";
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
  const [shrinked, setShrinked] = useState(false);

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

    fetchResult(data);
  };
  const fetchResult = async (data: DataToSend) => {
    const response = await fetch(
      "https://stopfals.md/archive/filter?page=1&order=desc&date=01%2F23%2F2025&lang=ro",
      {
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9,ru;q=0.8",
          "cache-control": "no-cache",
          pragma: "no-cache",
          priority: "u=1, i",
          "sec-ch-ua": '"Not A(Brand";v="8", "Chromium";v="132"',
          "sec-ch-ua-mobile": "?1",
          "sec-ch-ua-platform": '"Android"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "no-cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest",
          cookie: "lang=ro",
          Referer: "https://stopfals.md/ro/archive",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
        body: null,
        method: "GET",
      },
    );
    console.log(response.json());
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
    trustRating: 59,
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
        controversial: false,
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
        controversial: true,
      },
    ],
  };
  return (
    <div className="max-w-[1200px] m-auto flex flex-col min-h-[300px] min-w-[500px]">
      <h1 className="text-6xl m-auto mt-4 mb-4 w-fit">Fact checker</h1>
      <SearchBar onClick={processInput} shrinked={shrinked} />
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
        <FakeNewsList />
      )}
    </div>
  );
};

export default App;
