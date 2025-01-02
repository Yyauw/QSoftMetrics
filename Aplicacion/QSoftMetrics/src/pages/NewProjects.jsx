import Navbar from "../components/Navbar";
import InfoNav from "../components/InfoNav";
import { Link } from "react-router-dom";
import CheckOption from "../components/general/CheckOption";
import { useEffect, useState } from "react";

export default function NewProjects() {
  const [userId, setUserId] = useState("");
  const [projectData, setProjectData] = useState({
    name: "",
    version: "",
    software_type: "web_app",
    desc: "",
    characteristics: {
      ade_func: true,
      efi_des: true,
      comp: true,
      cap_ite: true,
      fia: true,
      seg: true,
      mant: true,
      flex: true,
      prot: true,
    },
  });

  const handleChange = (e) => {
    setProjectData({
      ...projectData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(projectData);
    //obtiene las categorias seleccionadas
    const categories = Object.keys(projectData.characteristics).filter(
      (key) => projectData.characteristics[key]
    );

    if (categories.length === 0) {
      alert("Selecciona al menos una categoria");
      return;
    }
    const stringCategories = JSON.stringify(categories);
    console.log(userId);
    //hacemos la peticion
    fetch(process.env.API_URL || 
 "http://localhost:3000" + "/api/software", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: projectData.name,
        version: projectData.version,
        tipo_software: projectData.software_type,
        descripcion: projectData.desc,
        categorias: stringCategories,
        usuario_id: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        //redirigimos
        window.location.href = "/my-projects";
      });
  };

  const handleCheck = (e) => {
    setProjectData({
      ...projectData,
      characteristics: {
        ...projectData.characteristics,
        [e.target.id]: e.target.checked,
      },
    });
    console.log(projectData);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user.id_usuario) {
      console.log("User not logged in");
      navigate("/login");
    }
    setUserId(user.id_usuario);
  }, []);

  return (
    <section className="flex flex-row min-h-[100vh] min-w-[100vw] bg-background text-foreground">
      <Navbar page={1} />
      <main className="flex flex-col bg-slate-100 flex-1">
        <div className="p-2">
          <InfoNav />
        </div>

        <section className="border rounded-md shadow-md p-4 bg-white m-3">
          <h1 className="text-2xl mt-1">Agrega un proyecto</h1>
          <p>Agrega un proyecto para evaluar</p>
          {/* Formulario */}
          <div className="mt-4 max-w-3xl">
            <form action="" className="" onSubmit={handleSubmit}>
              <div className="space-y-2 flex flex-col">
                <label htmlFor="name">Nombre del Software</label>
                <input
                  id="name"
                  type="text"
                  required
                  className="input input-bordered"
                  onChange={handleChange}
                  value={projectData.name}
                />
              </div>
              <div className="space-y-2 flex flex-col mt-2">
                <label htmlFor="version">Version</label>
                <input
                  id="version"
                  type="number"
                  required
                  className="input input-bordered"
                  onChange={handleChange}
                  value={projectData.version}
                />
              </div>
              <div className="space-y-2 flex flex-col mt-2">
                <label htmlFor="software_type">Tipo de software</label>
                <select
                  name="software_type"
                  id="software_type"
                  className="select select-bordered w-full"
                  onChange={handleChange}
                  required
                >
                  <option value="web_app">Aplicacion web</option>
                  <option value="desktop_app">Software de escritorio</option>
                  <option value="phone_app">Aplicacion movil</option>
                </select>
              </div>
              <div className="space-y-2 flex flex-col mt-2">
                <label htmlFor="desc">Descripcion</label>
                <textarea
                  name="desc"
                  id="desc"
                  className="input input-bordered"
                  onChange={handleChange}
                  value={projectData.desc}
                ></textarea>
              </div>
              {/* aspectos a evaluar */}
              <div className="mt-4">
                <h1>Caracteristicas a evaluar</h1>
                <div className="grid grid-cols-3 mt-2  border rounded-md p-2 gap-2">
                  <CheckOption
                    name="Adecuacion Funcional"
                    keyName="ade_func"
                    handleCheck={handleCheck}
                  />
                  <CheckOption
                    name="Eficiencia de Desempeño"
                    keyName="efi_des"
                    handleCheck={handleCheck}
                  />
                  <CheckOption
                    name="Compatibilidad"
                    keyName="comp"
                    handleCheck={handleCheck}
                  />
                  <CheckOption
                    name="Capacidad de Iteracion"
                    keyName="cap_ite"
                    handleCheck={handleCheck}
                  />
                  <CheckOption
                    name="Fiabilidad"
                    keyName="fia"
                    handleCheck={handleCheck}
                  />
                  <CheckOption
                    name="Seguridad"
                    keyName="seg"
                    handleCheck={handleCheck}
                  />
                  <CheckOption
                    name="Mantenibilidad"
                    keyName="mant"
                    handleCheck={handleCheck}
                  />
                  <CheckOption
                    name="Flexibilidad"
                    keyName="flex"
                    handleCheck={handleCheck}
                  />
                  <CheckOption
                    name="Proteccion"
                    keyName="prot"
                    handleCheck={handleCheck}
                  />
                </div>
              </div>
              <div className="flex flex-row">
                <Link to="/my-projects" className="btn px-10 btn-error mt-4">
                  Cancelar
                </Link>
                <button className="btn px-10 btn-success mt-4 ms-2">
                  Agregar
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </section>
  );
}
