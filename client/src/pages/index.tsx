import IsLogged from "@components/IsLogged";
import Home from "@views/Home/Home";

export default function HomePage() {
  return (
    <IsLogged>
      <main>
        <Home />
      </main>
    </IsLogged>
  );
}
