import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"
 
const SkeletonArticle = () => {
  return (
    <Card className="flex h-[150px] mb-7 justify-start ">
      <Skeleton className="w-[250px] rounded-l" />
      <div className="flex p-7 justify-between flex-col">
        <Skeleton className="h-[18px] w-[250px]" />
        <Skeleton className="h-[14px] w-[200px]" />
        <Skeleton className="h-[14px] w-[200px]" />
      </div>
    </Card>
  )
}

export default SkeletonArticle;
