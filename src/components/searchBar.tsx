import { Button } from "./ui/button";
import { Input } from "./ui/input";
export const SearchBar = () => {
  return <div className="flex gap-4">
    <Input placeholder="Source link..." className="rounded-[5px]"></Input>
    <Button className="rounded-[5px] font-bold">Check</Button>
  </div>;
}
