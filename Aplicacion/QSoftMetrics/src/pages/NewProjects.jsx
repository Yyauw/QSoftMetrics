import Navbar from "../components/Navbar";
import InfoNav from "../components/InfoNav";

export default function NewProjects() {
  return (
    <section className="flex flex-row min-h-[100vh] min-w-[100vw] bg-background text-foreground">
      <Navbar page={1} />
      <main className="flex flex-col bg-slate-100 flex-1">
        <div className="p-2">
          <InfoNav />
        </div>
        <div className="p-4">
          <h1 className="text-2xl font-bold">Agregar proyecto</h1>
          <p>Mi softwares agregado para evaluacion</p>
        </div>

        <section className="border rounded-md shadow-md p-3 bg-white m-3">
          <h1 className="text-2xl">Agrega un proyecto</h1>
          <p>Lista de proyectos por evaluar</p>
          <div></div>
        </section>
      </main>
    </section>
  );
}
