import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-row justify-center items-center bg-black h-screen">
      <Image
        src="/rnm-back1.webp"
        alt="rick and morty"
        width={1500}
        height={1500}
      />
    </main>
  );
}
