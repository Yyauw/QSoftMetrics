import {
  Accessibility,
  TimerReset,
  MonitorCog,
  Pointer,
  Copy,
  ServerCog,
  UnfoldHorizontal,
  Shield,
  Lock,
  ListTodo,
  Folder,
  ScrollText,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

const allCategories = [
  { category: "ade_func", name: "Adecuación Funcional", icon: Accessibility },
  { category: "efi_des", name: "Eficiencia de Desempeño", icon: TimerReset },
  { category: "comp", name: "Compatibilidad", icon: MonitorCog },
  { category: "cap_ite", name: "Capacidad de Interacción", icon: Pointer },
  { category: "fia", name: "Fiabilidad", icon: Copy },
  { category: "seg", name: "Seguridad", icon: Lock },
  { category: "mant", name: "Mantenibilidad", icon: ServerCog },
  { category: "flex", name: "Flexibilidad", icon: UnfoldHorizontal },
  { category: "prot", name: "Protección", icon: Shield },
];

export default function Navbar({
  page,
  softwareCategories = null,
  setSoftwareCat = () => {},
}) {
  const [searchParams] = useSearchParams();
  const [showCategories, setShowCategories] = useState(false);
  const [categories, setCategories] = useState(allCategories);
  const jsonCategories = JSON.parse(softwareCategories);

  useEffect(() => {
    const myParam = searchParams.get("category");
    if (!myParam) return;
    setShowCategories(true);
  }, [searchParams]);

  useEffect(() => {
    setNavCategories();
  }, [softwareCategories]);

  const setNavCategories = () => {
    console.log(jsonCategories);
    if (softwareCategories) {
      const cat = allCategories
        .map((cat) => {
          if (jsonCategories.includes(cat.category)) {
            return cat;
          }
          return null;
        })
        .filter((cat) => cat !== null);
      setCategories(cat);
      setSoftwareCat(cat);
    }
  };

  return (
    <div className="flex min-h-[100dvh] bg-background text-foreground ">
      <nav className="hidden w-60 flex-col  bg-card md:flex">
        <div className="bg-[#FFA726] flex justify-center content-center h-20">
          <h1 className="text-2xl font-bold my-auto tracking-wider">
            QSoftMetrics
          </h1>
        </div>
        <div className="p-4 md:flex ">
          <div className="space-y-2">
            <Link
              to="/review"
              className="flex items-center gap-2 mt-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-[#FFA726] w-52"
              style={{ backgroundColor: page === 0 && "#FFA726" }}
            >
              <ListTodo />
              Evaluar
            </Link>
            <Link
              to="/my-projects"
              className="flex items-center gap-2 mt-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-[#FFA726]"
              style={{ backgroundColor: page === 1 && "#FFA726" }}
            >
              <Folder />
              Mis Proyectos
            </Link>
            <Link
              to="/my-reviews"
              className="flex items-center gap-2 mt-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-[#FFA726]"
              style={{ backgroundColor: page === 2 && "#FFA726" }}
            >
              <ScrollText />
              Mis Evaluaciones
            </Link>
            <Link
              to="/my-reviews"
              className="flex items-center gap-2 mt-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-[#FFA726]"
              style={{ backgroundColor: page === 3 && "#FFA726" }}
            >
              <ServerCog />
              Evaluación de Código
            </Link>

            <div className="">
              <div className="divider text-xs font-bold">ISO25010</div>
              {showCategories ? (
                categories.map((cat) => (
                  <Link
                    to={"?category=" + cat.name}
                    className="flex items-center gap-2 mt-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-[#FFA726]"
                    style={{
                      backgroundColor:
                        cat.name === searchParams.get("category") && "#FFA726",
                    }}
                    key={cat.category}
                  >
                    <cat.icon />
                    {cat.name}
                  </Link>
                ))
              ) : (
                <p className="text-center">
                  <button className="btn btn-warning bg-[#FFA726] btn-lg">
                    Evaluar sofware
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
