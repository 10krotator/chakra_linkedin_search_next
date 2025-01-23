import SearchBar from "@/components/SearchBar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/chakra.jpg"
            alt="Chakra Logo"
            width={80}
            height={80}
            className="mb-2"
            />
          <h1 className="text-4xl font-bold text-center mb-8 leading-tight tracking-tighter">LinkedIn Profile Search</h1>
          <SearchBar />
        </div>
      </main>
    </div>
  );
}
