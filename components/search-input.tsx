"use client";

import qs from "query-string";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category");

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          category: currentCategory,
          title: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [debouncedValue, currentCategory, router, pathname]);

  return (
    <div className="relative hidden md:block">
      <Search className="h-4 w-4 absolute top-[10px] left-3 text-slate-600" />
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="w-full md:w-[300px] pl-9 rounded-full bg-zinc-50 focus-visible:ring-zinc-200"
        placeholder="Search for a course"
      />
    </div>
  );
};

export default SearchInput;
