import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";

const App: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    //listen for messages from the background script
    const messageListener = (
      request: any,
      sender: chrome.runtime.MessageSender,
      sendResponse: (response: any) => void,
    ) => {
      console.log('Message received from:', sender.tab?.url);
      setMessage(request.selectionText || request.linkUrl || "No content");
      sendResponse({ status: "Message received in App.tsx" });
    };

    chrome.runtime.onMessage.addListener(messageListener);

    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  return (
    <div>
      <h1 className="text-6xl">Fact checker</h1>
      {/*<Button>button</Button>
      {message ? <p>Received: {message}</p> : <p>No message yet.</p>}*/}
      <SearchBar/>
      <TrustRating/>
      <ClickbaitRating/>
      <RelevantSources/>
      <ControverseSources/>
    </div>
  );
};

export default App;
