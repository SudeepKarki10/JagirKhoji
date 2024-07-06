import Image from "next/image";
import Hero from "./components/Hero";
import HeroJobs from "../pages/HeroJobs";

export default function Home() {
  return (
    <div>
      <Hero />
      <HeroJobs />
    </div>
  );
}
