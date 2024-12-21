import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
interface Props {
  onClick: Function;
}
export const SearchBar = ({ onClick }: Props) => {
  var [inputText, setInputText] = useState("");
  return (
    <div className="flex gap-4">
      <Input
        placeholder="Source link..."
        className="rounded-[5px]"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      ></Input>
      <Button className="rounded-[5px] font-bold" onClick={() => onClick(inputText)}>
        Check
      </Button>
    </div>
  );
};
