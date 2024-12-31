import { Link } from "react-router-dom";
import { Check, Braces, Info } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    correo: "",
    contra: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    //peticion a la api
    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-control-allow-origin": "*",
      },
      body: JSON.stringify(data),
    }).then(async (res) => {
      //manejo de la respuesta
      console.log(res);
      if (res.status === 200) {
        const userdata = await res.json();
        console.log(userdata);
        localStorage.setItem("user", JSON.stringify(userdata));
        navigate("/review");
      } else {
        console.log("Login failed");
      }
    });
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      console.log("User already logged in");
      navigate("/review");
    }
  }, []);

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 bg-[#F5F5F5]">
      <Link to='/' className="absolute text-[#FFA726] font-bold tracking-wider top-0 left-0 mt-4 ml-4 flex items-center">X Salir</Link>
      <div className="mx-auto w-full max-w-md space-y-8 ">
        <div>
          <div className="flex items-center justify-center">
            <Check size={32} strokeWidth={3} />
            <h2 className="ml-2 text-3xl font-bold tracking-tight text-foreground">
              Iniciar Sesion
            </h2>
          </div>
          <p className="mt-2 text-center text-muted-foreground">
            Bienvenido a nuestra plataforma de evaluación de calidad de
            software.
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className=" gap-4 mx-auto">
            <div className="space-y-2 flex flex-col">
              <label htmlFor="email">Correo electrónico</label>
              <input
                id="email"
                type="email"
                name="correo"
                value={data.correo}
                onChange={handleChange}
                placeholder="juan@ejemplo.com"
                className="input input-bordered"
                required
              />
            </div>
          </div>
          <div className="space-y-2 flex flex-col">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="contra"
              value={data.contra}
              onChange={handleChange}
              type="password"
              required
              className="input input-bordered"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full btn btn-warning bg-[#FFA726]"
            >
              Iniciar sesion
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <div>¿No tienes una cuenta?</div>
          <Link
            to="/signup"
            className="font-medium underline underline-offset-4"
            prefetch={false}
          >
            Registrarte
          </Link>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <Info size={40} />
          <Braces size={40} />
          <Check size={40} />
        </div>
      </div>
    </div>
  );
}
