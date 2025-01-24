interface Props {
  img_url: string;
  title: string;
  url: string;
  content: string;
  date: string;
}
const Article = ({ img_url, title, url, content, date }: Props) => {
  return (
    <div className="w-[100%] justify-start flex text-secondary-foreground">
      <img className="w-[150px]" src={img_url} height={150} width={150} />
      <div className="flex justify-start flex-col">
        <div className="text-[16px] font-bold">
          <a href={url}>{title}</a>
        </div>
        <div className="text-[14px]">{content}</div>
        <div className="text-[14px]">{date}</div>
      </div>
    </div>
  );
};
export default Article;
