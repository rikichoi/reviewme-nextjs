import { Badge } from "@/components/ui/badge";
import { Verified } from "lucide-react";

export function VerifiedBadge() {
  return (
    <Badge
      className="rounded-none bg-[#b1f2d0] px-2 py-1 flex gap-1 w-fit hover:bg-[#00b67a] items-center"
      color=""
    >
      <Verified className="text-black" size={16} />
      <span className="text-black text-xs font-extrabold tracking-tight">
        VERIFIED REVIEW
      </span>
    </Badge>
  );
}
