import Navbar from "../components/Navbar";
import InfoNav from "../components/InfoNav";
import AnswerFeedbackTable from "../components/feedback/AnswerFeedBackTable";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
export default function ReviewAnswer() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  const fetchFeedback = async () => {
    const res = await fetch(
      "http://localhost:3000/api/software/respuestas/" + id
    );
    const data = await res.json();
    console.log(data);
    setData(data);
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  return (
    <section className="flex flex-row min-h-[100vh] max-w-[100vw] bg-background text-foreground">
      <Navbar page={2} />

      <main className="flex flex-col bg-slate-100 flex-1">
        <div className="p-2">
          <InfoNav />
        </div>

        {/* titulo */}
        <div className="p-4">
          <h1 className="text-2xl font-bold">Retroalimentacion</h1>
          <p>Toda tus respuestas</p>
        </div>

        {/* contenido */}
        <section className="border rounded-md shadow-md p-3 bg-white m-3">
          <div className="p-2">
            <h1 className="text-2xl">Retroalimentacion</h1>
            <p>Opiniones</p>
          </div>
          <AnswerFeedbackTable data={data} />
        </section>
      </main>
    </section>
  );
}
