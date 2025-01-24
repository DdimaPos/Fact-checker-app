import "./loader.css";
export const Loader = () => {
  return (
    <div className="flex flex-col  items-center justify-center">
      <div className="bouncing-loader mt-10">
        <div></div>
        <div></div>
        <div></div>
      </div>
      {/*<img width="400" height="auto" src="brian-family-guy.gif" alt="GIF"/>*/}
    </div>
  );
};
