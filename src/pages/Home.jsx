import Header from "../components/Header";
import Calculator from "../components/Calculator";

export default function Home() {
  return (
    <>
      <main className="w-full py-20 flex flex-col items-center justify-start">
        <section className="flex flex-col items-center justify-center gap-2 pb-6">
          <Header />
        </section>
        <section className="p-6 rounded-lg bg-white">
          <Calculator />
        </section>
      </main>
    </>
  );
}
