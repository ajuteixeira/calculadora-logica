import Header from "../components/Header";
import Input from "../components/Input";
import Keyboard from "../components/Keyboard";
import Button from "../components/Button";

export default function Home() {
  return (
    <>
      <main className="w-full h-[100vh] flex flex-col items-center justify-center bg-slate-100">
        <section className="flex flex-col items-center justify-center gap-2 pb-6">
          <Header />
        </section>
        <section className="p-5 rounded-lg bg-white">
          <Input />
          <Keyboard />
          <Button format="large" color="dark">
            calcular
          </Button>
        </section>
      </main>
    </>
  );
}
