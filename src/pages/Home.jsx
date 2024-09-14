import { useState } from "react";

import Header from "../components/Header";
import Calculator from "../components/Calculator";
import TruthTable from "../components/TruthTable";

export default function Home() {
  const [results, setResults] = useState();

  return (
    <>
      <main className="w-full py-20 flex flex-col items-center justify-start">
        <section className="flex flex-col items-center justify-center gap-2 pb-6">
          <Header />
        </section>
        <section className="p-6 rounded-lg bg-white">
          <Calculator onCalculate={(table) => setResults(table)} />
        </section>
        <section className="mt-6">
          <TruthTable results={results} />
        </section>
      </main>
    </>
  );
}
