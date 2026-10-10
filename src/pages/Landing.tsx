import { Hero } from "../components/Hero";
import { Deck, Elements, Manifesto } from "../components/sections1";
import { FinalCTA, Footer, HowTo, Packs } from "../components/sections2";
import { useReveal } from "../hooks/useReveal";

export function Landing({ go, onCoin }: { go: (p: "home" | "play") => void; onCoin: () => void }) {
  useReveal();
  return (
    <main>
      <Hero go={go} onCoin={onCoin} />
      <Manifesto />
      <Elements />
      <Deck />
      <HowTo />
      <Packs onCoin={onCoin} />
      <FinalCTA go={go} />
      <Footer go={go} />
    </main>
  );
}
