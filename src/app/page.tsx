import { Approach } from "@/components/sections/Approach";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Expertise } from "@/components/sections/Expertise";
import { Hero } from "@/components/sections/Hero";
import { Leadership } from "@/components/sections/Leadership";
import { SelectedWork } from "@/components/sections/SelectedWork";

// The header, main landmark and footer come from the root layout.
export default function Home() {
  return (
    <>
      <Hero />
      <Approach />
      <SelectedWork />
      <Experience />
      <Leadership />
      <Expertise />
      <Contact />
    </>
  );
}
