import Navbar from "../components/Navbar";
import InfoNav from "../components/InfoNav";
import ProjectsTable from "../components/my_projects/ProjectsTable";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function MyProjects() {
  const [proyectos, setProyectos] = useState([]);

  const getUserId = async () => {
    const user = await JSON.parse(localStorage.getItem("user"));
    if (!user) {
      console.log("User not logged in");
      navigate("/login");
    }
    console.log(user.id_usuario);
    return user.id_usuario;
  };

  // const data = [
  //   {
  //     name: "programita",
  //     version: "1.5",
  //     software_type: "web_app",
  //     desc: "programita",
  //   },
  //   {
  //     name: "programita 2",
  //     version: "12",
  //     software_type: "web_app",
  //     desc: "programita2 lorem ipsum dolor sit amet consectetur adasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  //   },
  //   {
  //     name: "programita 3",
  //     version: "3.2",
  //     software_type: "desktop_app",
  //     desc: "programita2",
  //   },
  // ];
  const cargarProyectos = async () => {
    const userId = await getUserId();
    const res = await fetch(
      process.env.API_URL || 
 "http://localhost:3000" + "/api/software/user/" + userId
    );
    const data = await res.json();
    setProyectos(data);
  };

  const borrarProyecto = async (id) => {
    console.log(id);
    const res = await fetch(process.env.API_URL || 
 "http://localhost:3000" + "/api/software/" + id, {
      method: "DELETE",
    });
    const data = await res.json();

    cargarProyectos();
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      console.log("User not logged in");
      navigate("/login");
    }
    cargarProyectos();
  }, []);

  return (
    <section className="flex flex-row min-h-[100vh] min-w-[100vw] bg-background text-foreground">
      <Navbar page={1} />

      <main className="flex flex-col bg-slate-100 flex-1">
        <div className="p-2">
          <InfoNav />
        </div>

        {/* titulo */}
        <div className="p-4">
          <h1 className="text-2xl font-bold">Mi Proyectos</h1>
          <p>Mi softwares agregado para evaluacion</p>
        </div>

        {/* contenido */}
        <section className="border rounded-md shadow-md p-3 bg-white m-3">
          <div className="grid grid-cols-2">
            <div className="p-2 pt-0">
              <h1 className="text-2xl">Lista de proyectos</h1>
              <p>Lista de proyectos por evaluar</p>
            </div>
            <div className="me-4  ms-auto">
              <Link to="./new" className="btn btn-success">
                Agregar Proyecto
              </Link>
            </div>
          </div>
          {proyectos.length > 0 ? (
            <ProjectsTable data={proyectos} borrarProyecto={borrarProyecto} />
          ) : (
            <p className="mt-4 font-bold">
              No tienes ningun software, agrega uno
            </p>
          )}
        </section>
      </main>
    </section>
  );
}
