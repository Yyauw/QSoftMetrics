import Navbar from "../components/Navbar";
import InfoNav from "../components/InfoNav";
import SoftwareTable from "../components/review/SoftwareTable";

export default function Review() {
  return (
    <section className="flex flex-row min-h-[100vh] min-w-[100vw] bg-background text-foreground">
      <Navbar page={0} />

      <main className="flex flex-col bg-slate-100 flex-1">
        <div className="p-2">
          <InfoNav />
        </div>

        {/* titulo */}
        <div className="p-4">
          <h1 className="text-2xl font-bold">Evaluacion de software</h1>
          <p>Evaluar software en base a la norma 25010</p>
        </div>

        {/* contenido */}
        <section className="border rounded-md shadow-md p-3 bg-white m-3">
          <h1 className="text-2xl">Lista de software</h1>
          <p>Lista de software por evaluar</p>
          <SoftwareTable />
        </section>
      </main>
    </section>
  );
}
