import { useRef, useState } from "react";
import Tesseract from "tesseract.js";
import styles from "./index.module.scss";
import { Camera, Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
interface Props {
  onClick: Function;
  shrinked: boolean;
}
export const SearchBar = ({ onClick, shrinked }: Props) => {
  const [inputText, setInputText] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  //const [image, setImage]: [Blob | string, Function] = useState("");
  /*const setFileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImage(e.target.files[0]);
  };*/

  const inputFileRef = useRef<any>();
  const takePhoto = () => {
    inputFileRef.current.click();
    console.log("clicked on upload button")
  };
  const extractText = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files || e.target.files.length === 0) return;
    console.log("target has images")
    var image = e.target.files[0];
    if (!image) {
      alert("Please upload an image first!");
      return;
    }

    setImageLoading(true);
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
        setImageLoading(false);
      });
  };
  return (
    <div className={!shrinked ? `${styles.default}` : `${styles.shrinked}`}>
      <Textarea
        className="text-[30px]"
        placeholder="Source link..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      ></Textarea>

      <div className={styles.button__group}>
        <Button
          className={`font-bold ${styles.button}`}
          onClick={() => {
            if (inputText != "") onClick(inputText);
          }}
        >
          Check
        </Button>
        <Button
          className={styles.button}
          onClick={takePhoto}
          disabled={!imageLoading ? false : true}
        >
          {!imageLoading ? <Camera size={22}/> :<Loader2 className="animate-spin" />}
        </Button>
        <input
          ref={inputFileRef}
          className="hidden"
          type="file"
          onChange={extractText}
        ></input>
      </div>
    </div>
  );
}
