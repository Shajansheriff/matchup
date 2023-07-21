import { GameBoard } from "@/components/GameBoard";

export default async function Home() {
  return (
    <main className="container min-h-screen px-24 py-4 mx-auto">
      <h1 className="text-4xl font-bold text-center mb-4 uppercase">
        Match up
      </h1>
      <GameBoard />
    </main>
  );
}
