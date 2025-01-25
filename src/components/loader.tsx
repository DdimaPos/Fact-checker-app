import "./loader.css";
interface Props{
  subwaySurf: boolean | null
}
export const Loader = ({subwaySurf}:Props) => {
  return (
    <div className="flex flex-col  items-center justify-center">
      {subwaySurf?<img width="400" height="auto" src="brian-family-guy.gif" alt="GIF"/>:""}
      <div className="bouncing-loader mt-10">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
