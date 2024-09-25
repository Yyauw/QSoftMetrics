import Navbar from "../components/Navbar";
import InfoNav from "../components/InfoNav";
import FeedbackTable from "../components/feedback/FeedbackTable";
export default function ResultFeedback() {
  const data = [
    {
      nombre: "Manolin",
      tipo: "Desarrollador",
      correo: "manolin@gmail.com",
      comentario:
        "no sirve alkdjasklj dsklakdj sajd slajkldjsak lklsakdljsalkjdlkasjdkasjkdjsa jdasjd laksjdklasdjkladjlkajdklasjdk",
      calificacion: 5,
    },
    {
      nombre: "Manolin",
      tipo: "Desarrollador",
      correo: "manolin@gmail.com",
      comentario: "no sirve",
      calificacion: 5,
    },
    {
      nombre: "Manolin223",
      tipo: "Desarrollador",
      correo: "manolin@gmail.com",
      comentario: "no sirve",
      calificacion: 3,
    },
    {
      nombre: "Manolin1232131",
      tipo: "Desarrollador",
      correo: "manolin@gmail.com",
      comentario: "",
      calificacion: 0,
    },
    {
      nombre: "Manolin124124",
      tipo: "Desarrollador",
      correo: "manolin@gmail.com",
      comentario: "",
      calificacion: 4,
    },
    {
      nombre: "Manolin12414",
      tipo: "Desarrollador",
      correo: "manolin@gmail.com",
      comentario: "",
      calificacion: 2,
    },
  ];
  return (
    <section className="flex flex-row min-h-[100vh] min-w-[100vw] bg-background text-foreground">
      <Navbar page={1} />

      <main className="flex flex-col bg-slate-100 flex-1">
        <div className="p-2">
          <InfoNav />
        </div>

        {/* titulo */}
        <div className="p-4">
          <h1 className="text-2xl font-bold">
            Retroalimentacion - Adecuacion funcional
          </h1>
          <p>Toda las opiniones de la categoria</p>
        </div>

        {/* contenido */}
        <section className="border rounded-md shadow-md p-3 bg-white m-3">
          <div className="p-2">
            <h1 className="text-2xl">Retroalimentacion</h1>
            <p>Opiniones</p>
          </div>
          <FeedbackTable data={data} />
        </section>
      </main>
    </section>
  );
}
