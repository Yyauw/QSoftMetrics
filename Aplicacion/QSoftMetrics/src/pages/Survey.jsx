import Navbar from "../components/Navbar";
import InfoNav from "../components/InfoNav";
import SurveyPanel from "../components/survey/SurveyPanel";
import { json, useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Survey() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState("Adecuación Funcional");
  const [preguntas, setPreguntas] = useState([]);
  const [software, setSoftware] = useState();
  const [softwareCat, setSoftwareCat] = useState([]);

  const fetchPreguntas = async () => {
    const res = await fetch(process.env.API_URL || 
 "http://localhost:3000" + "/api/preguntas");
    const data = await res.json();
    console.log("fechiando");
    setPreguntas(data);
  };

  const fetchSoftware = async () => {
    const res = await fetch(process.env.API_URL || 
 "http://localhost:3000" + "/api/software/" + id);
    const data = await res.json();
    //console.log(data);
    setSoftware(data);
  };

  useEffect(() => {
    const myParam = searchParams.get("category");
    setCategory(myParam);
  }, [searchParams]);

  useEffect(() => {
    fetchPreguntas();
    fetchSoftware();
  }, []);

  const getUserId = async () => {
    const user = await JSON.parse(localStorage.getItem("user"));
    if (!user) {
      console.log("User not logged in");
      window.location.href = "/login";
    }
    console.log(user.id_usuario);
    return user.id_usuario;
  };

  const cate = [
    "ade_func",
    "efi_des",
    "comp",
    "cap_ite",
    "fia",
    "seg",
    "mant",
    "flex",
    "prot",
  ];
  const findCategory = (myParam) => {
    if (myParam === "ade_func") setCategory("Adecuación Funcional");
    if (myParam === "efi_des") setCategory("Eficiencia de Desempeño");
    if (myParam === "comp") setCategory("Compatibilidad");
    if (myParam === "cap_ite") setCategory("Capacidad de Interacción");
    if (myParam === "fia") setCategory("Fiabilidad");
    if (myParam === "seg") setCategory("Seguridad");
    if (myParam === "mant") setCategory("Mantenibilidad");
    if (myParam === "flex") setCategory("Flexibilidad");
    if (myParam === "prot") setCategory("Protección");
  };

  const addAnswer = (categoria, id_pregunta, valor, comentario) => {
    const copyPreguntas = [...preguntas];
    console.log(copyPreguntas);
    preguntas.forEach((pregunta, index) => {
      if (pregunta.nombre === categoria) {
        pregunta.subcategorias.forEach((sub, index2) => {
          if (sub.id_pregunta === id_pregunta) {
            copyPreguntas[index].subcategorias[index2].respuesta =
              parseInt(valor);
            copyPreguntas[index].subcategorias[index2].comentario = comentario;
            setPreguntas(copyPreguntas);
          }
        });
      }
    });
  };

  const submitAnswer = async (categoria) => {
    console.log("creando encuesta");
    const userId = await getUserId();
    const res = await fetch(process.env.API_URL || 
 "http://localhost:3000" + "/api/survey", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-control-allow-origin": "*",
      },
      body: JSON.stringify({
        software_id: software.id_software,
        usuario_id: userId,
      }),
    });
    const data = await res.json();
    console.log(data.id_encuesta);
    insertAnswer(data.id_encuesta, categoria);
  };

  const insertAnswer = async (id_encuesta, categoria) => {
    const findCat = preguntas.find((pregunta) => pregunta.nombre === categoria);
    const ansData = findCat.subcategorias.map((sub) => {
      return {
        pregunta_id: sub.id_pregunta,
        encuesta_id: id_encuesta,
        respuesta: sub.respuesta,
        comentario: sub.comentario,
      };
    });
    console.log(ansData);
    const res = await fetch(process.env.API_URL || 
 "http://localhost:3000" + "/api/respuesta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-control-allow-origin": "*",
      },
      body: JSON.stringify(ansData),
    });
    const data = await res.json();
    console.log(data);

    const curentCategory = softwareCat.findIndex(
      (pregunta) => pregunta.name === category
    );
    console.log(curentCategory + 1);
    console.log(softwareCat.length);
    if (curentCategory + 1 === softwareCat.length) {
      alert("encuesta terminada");
      window.location.href = "/review";
      return;
    }
    setCategory(softwareCat[curentCategory + 1].name);
    setSearchParams({ category: softwareCat[curentCategory + 1].name });
  };

  return (
    <section className="flex flex-row min-h-[100vh] max-w-[100vw] bg-background text-foreground">
      <Navbar
        softwareCategories={software?.categorias_a_evaluar}
        setSoftwareCat={setSoftwareCat}
      />

      <main className="flex flex-col bg-slate-100 flex-1">
        <div className="p-2">
          <InfoNav />
        </div>

        {/* contenido */}
        {preguntas.length > 0 && (
          <section className="border rounded-md shadow-md p-3 bg-white m-3">
            {preguntas.map((pregunta, index) => {
              return (
                <SurveyPanel
                  preguntas={pregunta}
                  showPanel={category === pregunta.nombre}
                  addAnswer={addAnswer}
                  submitAnswer={submitAnswer}
                />
              );
            })}
          </section>
        )}
      </main>
    </section>
  );
}
