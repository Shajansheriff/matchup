import { shuffle } from "@/lib/utils";

interface Item {
  type: "general";
  setup: string;
  punchline: string;
  id: number;
}
type Items = Item[];

async function getData(): Promise<Items> {
  const res = await fetch("https://official-joke-api.appspot.com/jokes/ten");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const items = await getData();
  const shuffledQuestions = shuffle(items);
  const shuffledAnswers = shuffle(items);
  return (
    <main className="container p-24 mx-auto">
      <div className="grid grid-cols-2">
        <div>
          <ul className="space-y-3">
            {shuffledQuestions.map((item) => {
              return (
                <li key={item.id}>
                  {item.setup} <br /> {item.punchline}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <ul className="space-y-3">
            {shuffledAnswers.map((item) => {
              return (
                <li key={item.id}>
                  {item.punchline} <br /> {item.setup}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </main>
  );
}
