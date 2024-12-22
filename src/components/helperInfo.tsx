import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export const HelperInfo = ({ className }: Props) => {
  return (
    <div className={cn(className, "")}>
      <h2 className="text-[12px] font-bold">What is solidity rating?</h2>
      <p className="text-[12px] font-thin">
        Solidity rating is a parameter that evaluates the reliability and
        trustworthiness of the content based on the credibility of its sources,
        factual accuracy, and the depth of supporting evidence. A higher
        solidity rating indicates that the content is well-founded and backed by
        credible information.
      </p>
      <h2 className="text-[12px] font-bold">What is clickbait rating?</h2>
      <p className="text-[12px] font-thin">
        Clickbait rating is a measure of how sensationalized or misleading the
        content's headline or presentation is. A higher clickbait rating
        suggests the content uses tactics like exaggerated claims, ambiguous
        titles, or overly provocative language to attract clicks, often at the
        expense of accuracy or quality.
      </p>
    </div>
  );
};
