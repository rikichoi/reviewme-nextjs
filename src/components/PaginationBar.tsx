import {
  Pagination,
  PaginationContent,
} from "@/components/ui/pagination";
import Link from "next/link";

type PaginationBarProps = {
  totalPages: number;
  currentPage: number;
};

export function PaginationBar({ currentPage, totalPages }: PaginationBarProps) {
  const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10));
  const minPage = Math.max(1, Math.min(currentPage - 5, totalPages - 9));

  const numberedPageItems = [];

  for (let page = minPage; page <= maxPage; page++) {
    numberedPageItems.push(
      <Link
        href={`?page=${page}`}
        scroll={false}
        className={`${
          currentPage == page
            ? " pointer-events-none btn-active bg-slate-950"
            : "bg-slate-500"
        } rounded-lg w-10 text-center  text-white p-2 font-bold tracking-tight`}
        key={page}
      >
        {page}
      </Link>
    );
  }
  return (
    <Pagination>
      <PaginationContent>{numberedPageItems}</PaginationContent>
    </Pagination>
  );
}
