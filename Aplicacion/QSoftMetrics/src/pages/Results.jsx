import Navbar from "../components/Navbar";
import InfoNav from "../components/InfoNav";
import ResultPanel from "../components/results/ResultPanel";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
export default function Results() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState("Adecuación Funcional");
  const [software, setSoftware] = useState();
  const [resultados, setResultados] = useState({});

  const fetchSoftware = async () => {
    const res = await fetch(process.env.API_URL || 
 "http://localhost:3000" + "/api/software/" + id);
    const data = await res.json();
    //console.log(data);
    setSoftware(data);
  };

  const fetchResults = async () => {
    const res = await fetch(process.env.API_URL || 
 "http://localhost:3000" + "/api/resultados/" + id);
    const data = await res.json();
    console.log(data);
    setResultados(data);
  };

  useEffect(() => {
    const myParam = searchParams.get("category");
    setCategory(myParam);
  }, [searchParams]);

  useEffect(() => {
    fetchSoftware();
    fetchResults();
  }, []);

  return (
    <section className="flex flex-row min-h-[100vh] max-w-[100vw] bg-background text-foreground">
      <Navbar softwareCategories={software?.categorias_a_evaluar} />

      <main className="flex flex-col bg-slate-100 flex-1">
        <div className="p-2">
          <InfoNav />
        </div>

        {/* titulo */}
        <div className="p-4">
          <h1 className="text-2xl font-bold">
            Resultados del Software {resultados?.nombre_software}
          </h1>
          <p>Mis evaluaciones</p>
        </div>

        {/* graficos */}
        {resultados?.respuestaCounts ? (
          Object.keys(resultados.respuestaCounts).map((key) => {
            return (
              <ResultPanel
                dataProps={resultados.respuestaCounts[key]}
                nombre={key}
                showPanel={category === key}
              />
            );
          })
        ) : (
          <p className="mt-4 font-bold ms-4 text-xl">
            No hay evaluaciones para este proyecto
          </p>
        )}
      </main>
    </section>
  );
}
