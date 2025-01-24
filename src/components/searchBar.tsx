import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Tesseract from "tesseract.js";
import { Textarea } from "./ui/textarea";
interface Props {
  onClick: Function;
}
export const SearchBar = ({ onClick }: Props) => {
  const [inputText, setInputText] = useState("");
  const [image, setImage]: [Blob | string, Function] = useState("");
  const setFileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImage(e.target.files[0]);
  };

  const extractText = () => {
    if (!image) {
      alert("Please upload an image first!");
      return;
    }

    //setLoading(true);
    Tesseract.recognize(image, "eng", {
      logger: (info) => console.log(info), // Log progress
    })
      .then(({ data: { text } }) => {
        setInputText(text);
        console.log(text);
      })
      .catch((err) => {
        console.error(err);
        alert("An error occurred during text extraction.");
      })
      .finally(() => {
        //setLoading(false);
      });
  };
  return (
    <div className="flex gap-4 ">
      <Textarea
        placeholder="Source link..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      ></Textarea>

      <Input type="file" onChange={setFileImage}></Input>

      <Button
        className="rounded-[5px] font-bold"
        onClick={() => {
          if (inputText != "") onClick(inputText);
        }}
      >
        Check
      </Button>
    </div>
  );
};
