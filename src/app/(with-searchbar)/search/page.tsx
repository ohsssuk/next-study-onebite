import BookItem from "@/components/book-item";
import BookListSkeleton from "@/components/skeletone/book-list-skeleton";
import { BookData } from "@/types";
import { Suspense } from "react";

async function SearchResult({ q }: { q: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다</div>;
  }

  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {
  return (
    <Suspense
      key={(await searchParams).q || ""}
      fallback={<BookListSkeleton count={3} />}
    >
      <SearchResult q={(await searchParams).q || ""} />
    </Suspense>
  );
}
