import { useEffect, useState } from "react";
import "./App.css";
import { SearchBar, DataCard, SourcesCard, NothingToShow, Loader} from "./components";

type FinalResult = {
  overallTrustRating: number; // e.g., 59
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
  const [isLoading, setIsLoading]= useState(false);

  const processInput = (input: string) => {
    setIsDisappearing(true);
    setTimeout(() => {
      setDisplayData(false); // Remove cards after fade-out
      setIsLoading(true);
      setIsDisappearing(false); // Reset disappearing state
    }, 200); // Mat
    const data = input.startsWith("http")
      ? { url: input, text: null }
      : { url: null, text: input };

    setDataToSend(data); // Update state for reference
    fetchResult(data); // Send the data immediately
  };
  const fetchResult = async (data: DataToSend) => {
    console.log(dataToSend);
    console.log("Send Data:", data);
    /*try {
      let result = await fetch("link", {
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
    }finally{
      setIsLoading(false);
    }*/
    setTimeout(() => {
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
  const backendResponse = {
    trustRating: 59,
    clickbaitRating: 100,
    sources: [
      {
        sourceData: [
          {
            sourceLogo:
              "https://www.hubspot.com/hs-fs/hubfs/McDonalds_Golden_Arches.svg.png",
            sourceUrl: "https://www.google.com",
            sourceName: "Google",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus dignissim orci, at vulputate diam. Integer ut ex a orci faucibus iaculis. Etiam nec auctor dui. Vivamus eu quam tellus. Cras nisl nisi, semper eget nisl eget, egestas rutrum turpis. Aenean malesuada ullamcorper ante et varius. Nam eleifend non eros ut volutpat. Suspendisse vitae nunc ut arcu pretium porta nec id tellus. Curabitur augue tellus, cursus id facilisis eget, elementum nec metus. Donec felis ante, porttitor non vestibulum eu, finibus at neque. Fusce ultrices risus quis lorem sollicitudin fermentum. Nunc faucibus ante sed magna suscipit, a imperdiet quam pretium. Vestibulum blandit tincidunt enim.",
          },
          {
            sourceLogo:
              "https://www.hubspot.com/hs-fs/hubfs/McDonalds_Golden_Arches.svg.png",
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
  };
  console.log(message);
  return (
    <div className="max-w-[1000px] m-auto flex flex-col">
      <h1 className="text-6xl m-auto mt-4 mb-4 w-fit">Fact checker</h1>
      <SearchBar onClick={processInput} />
      {isLoading ? (
        <Loader /> // Show loader while request is being processed
      ) :displayData ? (
        <div className={`flex mt-4 flex-wrap justify-center gap-4 ${isDisappearing ? "fade-out" : ""}`}>
          <div className="flex flex-col gap-10 sticky">
            <DataCard
              title="Overall solidity rating"
              rating={backendResponse.trustRating}
              className="opacity-0 slide-up delay-1"
            />
            <DataCard
              title="Clickbait rating"
              rating={backendResponse.clickbaitRating}
              className="opacity-0 slide-up delay-2"
            />
          </div>
          <div className="flex flex-col gap-10">
            <SourcesCard
              title="Sources with similar information"
              sources={backendResponse.sources[0]}
              className="opacity-0 slide-up delay-3"
            />
            <SourcesCard
              title="Sources with diverging information"
              sources={backendResponse.sources[1]}
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
