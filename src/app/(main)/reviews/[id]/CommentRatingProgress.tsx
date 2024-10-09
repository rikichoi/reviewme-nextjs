import * as React from "react";

import { Progress } from "@/components/ui/progress";

type CommentRatingProgressProps = {
  progress: number;
};

export function CommentRatingProgress({
  progress,
}: CommentRatingProgressProps) {
  //   const [progress, setProgress] = React.useState(13);
  // const progress = 13;

  //   React.useEffect(() => {
  //     const timer = setTimeout(() => setProgress(66), 500);
  //     return () => clearTimeout(timer);
  //   }, []);

  return <Progress value={progress} className="w-[60%] max-h-3 flex-1" />;
}
