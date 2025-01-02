import Navbar from "../components/Navbar";
import InfoNav from "../components/InfoNav";
import { useEffect, useState } from "react";
import ReviewSoftwareTable from "../components/review/ReviewSoftwareTable";

export default function MyReviews() {
  const [software, setSoftware] = useState([]);
  const getUserId = async () => {
    const user = await JSON.parse(localStorage.getItem("user"));
    if (!user) {
      console.log("User not logged in");
      window.location.href = "/login";
    }
    console.log(user.id_usuario);
    return user.id_usuario;
  };

  const fetchMyReviewedSoftware = async () => {
    const userId = await getUserId();
    const res = await fetch(
      process.env.API_URL || 
 "http://localhost:3000" + "/api/software/evaluaciones/" + userId
    );
    const data = await res.json();
    console.log(data);
    setSoftware(data);
  };

  useEffect(() => {
    fetchMyReviewedSoftware();
  }, []);

  return (
    <section className="flex flex-row min-h-[100vh] min-w-[100vw] bg-background text-foreground">
      <Navbar page={2} />

      <main className="flex flex-col bg-slate-100 flex-1">
        <div className="p-2">
          <InfoNav />
        </div>

        {/* titulo */}
        <div className="p-4">
          <h1 className="text-2xl font-bold">Mis Evaluaciones</h1>
          <p>Mis evaluaciones</p>
        </div>

        {/* contenido */}
        <section className="border rounded-md shadow-md p-3 bg-white m-3">
          <div className="p-2">
            <h1 className="text-2xl">Lista de evaluaciones</h1>
            <p>Lista de mis evaluaciones de software</p>
          </div>

          <ReviewSoftwareTable data={software} />
        </section>
      </main>
    </section>
  );
}
