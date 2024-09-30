import {
  Pagination,
  PaginationContent,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

type PaginationBarProps = {
  totalPages: number;
  currentPage: number;
  query?: string;
  location?: string;
  category?: string;
  verified?: boolean;
  sort?: string;
  order?: string;
};

export function PaginationBar({
  currentPage,
  totalPages,
  category,
  location,
  order,
  query,
  sort,
  verified,
}: PaginationBarProps) {
  const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10));
  const minPage = Math.max(1, Math.min(currentPage - 5, totalPages - 9));

  const numberedPageItems = [];

  function generatePageLink(page: number) {
    const searchParams = new URLSearchParams({
      ...(query && { query }),
      ...(location && { location }),
      ...(category && { category }),
      ...(verified && { verified: "true" }),
      ...(order && { order }),
      ...(sort && { sort }),
      page: page.toString(),
    });

    return `/?${searchParams.toString()}`;
  }

  for (let page = minPage; page <= maxPage; page++) {
    numberedPageItems.push(
      <Link
        href={generatePageLink(page)}
        scroll={false}
        className={`${
          currentPage == page
            ? " pointer-events-none btn-active bg-slate-950"
            : "bg-slate-500 hover:bg-slate-700"
        } rounded-lg w-10 text-center  text-white p-2 font-bold tracking-tight`}
        key={page}
      >
        {page}
      </Link>
    );
  }
  return (
    <Pagination>
      <PaginationContent className="hidden sm:flex">
        {numberedPageItems}
      </PaginationContent>
      <PaginationContent className="sm:hidden">
        <Link
          href={generatePageLink(currentPage - 1)}
          scroll={false}
          className={`${
            currentPage == 1
              ? " pointer-events-none btn-active bg-slate-500"
              : "bg-slate-950 hover:bg-slate-700"
          } rounded-lg text-center  text-white p-2 font-bold tracking-tight`}
        >
          <ChevronLeft />
        </Link>
        <button
          className={`pointer-events-none w-10  bg-slate-950  hover:bg-slate-600 rounded-lg text-center  text-white p-2 font-bold tracking-tight`}
        >
          {currentPage}
        </button>
        <Link
          href={generatePageLink(currentPage + 1)}
          scroll={false}
          className={`${
            currentPage == maxPage
              ? " pointer-events-none btn-active bg-slate-500"
              : "bg-slate-950 hover:bg-slate-700"
          } rounded-lg text-center  text-white p-2 font-bold tracking-tight`}
        >
          <ChevronRight />
        </Link>
      </PaginationContent>
    </Pagination>
  );
}
