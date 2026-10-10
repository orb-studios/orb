import { Hero } from "../components/Hero";
import { Deck, Elements, Manifesto } from "../components/sections1";
import { FinalCTA, Footer, HowTo, Packs } from "../components/sections2";
import { UserReviews } from "../components/UserReviews";
import { useReveal } from "../hooks/useReveal";

export function Landing({ go }: { go: (p: "home" | "play") => void }) {
  useReveal();
  return (
    <main>
      <Hero go={go} />
      <Manifesto />
      <Elements />
      <Deck />
      <UserReviews />
      <HowTo />
      <Packs />
      <FinalCTA go={go} />
      <Footer go={go} />
    </main>
  );
}
