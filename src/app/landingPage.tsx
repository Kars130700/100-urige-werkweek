// ==================================================
// app/components/EpicMemeCharityLanding.tsx (Client)
// ==================================================

"use client";

import WavyImage from "@/components/wavyImages";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";

const ACCENTS = {
  cyan: "#00C2FF",
  coral: "#FF5A5F",
  mint: "#7CFFB2",
};

const TITLE = "DE WEEK VAN";
const CHARITY = {
  name: "Doneer Effectief",
  url: "https://doneereffectief.nl/advies/doneer-effectief-fondsen/",
  description:
    "Al het geld wat ik deze week verdien, gaat naar het Armoede fonds van Doneer Effectief.",
};

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "/100-urige-werkweek";
const TARGET_DATE_DEFAULT = new Date(Date.now() + 1000 * 60 * 60 * 100); // ~100 uur vanaf nu
const VIDEO_BG_SRC = `${prefix}/UUU.mp4`;
const VIDEO_BG_POSTER = ""; // bijv. "/intro-poster.jpg" of laat leeg

type CSSVars = React.CSSProperties & {
  ["--accent-cyan"]?: string;
  ["--accent-coral"]?: string;
  ["--accent-mint"]?: string;
};

export default function EpicMemeCharityLanding() {
  const [targetDate] = useState<Date>(TARGET_DATE_DEFAULT);

  const timeLeft = useCountdown(targetDate);

  const BANDS = useMemo(
    () => [
      {
        text: "100 UUR NON-STOP • ALLES NAAR HET GOEDE DOEL • ",
        cls: "bg-neutral-100 text-neutral-800 border-t-2",
        border: "var(--accent-cyan)",
      },
      {
        text: " PRIKKELS  ",
        cls: "bg-neutral-50 text-neutral-700 border-t-2",
        border: "var(--accent-coral)",
      },
      {
        text: "DONEER • SPONSOR • DOE MEE • ",
        cls: "bg-white text-neutral-800 border-t-2",
        border: "var(--accent-mint)",
      },
    ],
    []
  );

  const styleVars: CSSVars = {
    "--accent-cyan": ACCENTS.cyan,
    "--accent-coral": ACCENTS.coral,
    "--accent-mint": ACCENTS.mint,
  };

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden bg-white text-neutral-900 font-sans"
      style={styleVars}
    >
      <GlobalDecor />

      {/* Hero */}
      <Hero
        title={TITLE}
        timeLeft={timeLeft}
        videoBgSrc={VIDEO_BG_SRC}
        videoPoster={VIDEO_BG_POSTER}
      />

      {/* Diagonal bands */}
      <div className="relative py-8 select-none">
        {BANDS.map((b, i) => (
          <MarqueeBand
            key={i}
            text={b.text}
            className={b.cls}
            borderColor={b.border}
            rotate={i === 1 ? "-rotate-1" : "rotate-1"}
          />
        ))}
      </div>

      {/* IDEA */}
      <section
        id="idee"
        className="mx-auto bg-gray-100 px-4 py-16 w-full justify-center flex"
      >
        <div className="max-w-6xl">
          <SectionLabel>Het Idee</SectionLabel>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
            De <AccentCyan>100 uur </AccentCyan>durende werkweek.{" "}
            <AccentCoral>Alles</AccentCoral> gaat naar het goede doel.
          </h2>
          <p className="text-lg md:text-md text-neutral-700 max-w-3xl editable">
          Begin 2025 las ik het boek <a 
            href="https://decorrespondent.nl/cp/debermudadriehoekvantalent" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ textDecoration: "underline", color: "var(--accent-cyan)" }}
          >
            De bermudadriehoek van talent
          </a> van Simon Teuten. 
            Dit boek gaat over toppresteerders die &apos;vallen&apos; voor
            de grote kantoren en zo uiteindelijk niet aan hun eigen
            verwachtingen voldoen. In veel delen van het boek kon ik me
            vinden: ik zie mezelf als ambitieus, heb onwijs veel geluk met
            mijn jeugd gehad en wil graag bijdragen. Ook ben ik niet vies van
            een beetje beunen.
          </p>
          <p className="text-lg md:text-md text-neutral-700 max-w-3xl editable">
            Dat bracht me op het idee om het andere uiterste op te zoeken: hoe
            kan ik ambitieus zijn én tegelijker tijd zo veel mogelijk goed doen.
            Het antwoord volgde vrij snel. De ✨Legendarische 100 urige werkweek✨.
            1 week, waarin ik zo veel mogelijk goed probeer te doen.
          </p>
          <p className="text-lg md:text-md text-neutral-700 max-w-3xl editable">
            <br />
            Van 19 januari tot en met 25 januari ga ik 100 uur werken. Mensen
            kunnen mij supporten door mij in te huren voor werk, of door zelf
            een donatie te doen. Alle inkomsten gaan naar een{" "}
            <a
              href="https://doneereffectief.nl/advies/doneer-effectief-fondsen/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "underline", color: "var(--accent-cyan)" }}
            >
              goed doel
            </a>
          </p>
          <ul className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              {
                h: "Schrijf je in",
                p: "Heb je nou altijd al mij aan het werk willen zetten? Doneer voor een shift.",
              },
              {
                h: "Donaties = impact",
                p: "Elke donatie gaat naar een bewezen impactvol doel.",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-2xl font-extrabold mb-2">{card.h}</h3>
                <p className="text-neutral-600">{card.p}</p>
              </div>
            ))}
          </ul>
        </div>
      </section>

      {/* WIE BEN IK */}
      <section id="wie-ben-ik" className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-2 text-xs tracking-widest uppercase text-neutral-500">
          De Wie
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Tekst */}
          <div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                Wie ben ik?
              </h2>
              <p className="text-lg md:text-md text-neutral-700 max-w-3xl editable">
                Mijn naam is Kars. Ik heb een passie voor zo veel mogelijk goed doen en ik zie
                mijzelf als ambitieus. Om mijn twee passies te combineren, ga ik van 19 tot 25
                januari 100 uur werken. Alle opbrengsten gaan naar een goed doel. Doe je mee?
              </p>
              <p className="text-lg md:text-md text-neutral-700 max-w-3xl editable">
               Zo nee, geen paniek. Er is altijd genoeg te doen voor {" "}
                <a
                  href="https://toetstester.nl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "underline", color: "var(--accent-cyan)" }}
                >
                  ToetsTester
                </a>
                . Even schaamteloze promo: met ToetsTester verlagen wij de werkdruk van docenten door nakijken gedeeltelijk te automatiseren.
                We schatten jaarlijks meer dan 5 miljoen uur te kunnen besparen.
                BiemBamBoem, das nog eens impact maken!
              </p>
            </div>

          {/* Foto */}
          <div className="flex justify-center">
            <WavyImage
              src={`${prefix}/mijn-foto.jpg`}
              alt="Portret van mij"
              className="w-60 h-60 rounded-2xl border-4 border-neutral-200 shadow-md"
              hoverScale={1}
            />
          </div>
        </div>
      </section>

      {/* CHARITY */}
      <section id="goede-doel" className="mx-auto max-w-6xl px-4 py-16">
        <SectionLabel>Het Goede Doel</SectionLabel>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              {CHARITY.name}
            </h2>
            <p className="text-lg text-neutral-700 mb-4 editable">
              {CHARITY.description}
            </p>
            <p className="text-lg md:text-md text-neutral-700 max-w-3xl editable">
              Doneer Effectief probeert, zoals de naam al zegt, zo effectief
              mogelijk goed te doen. De grote filosoof B. Smalls sprak ooit:
              &#39;Mo&#39; Money, Mo&#39; Problems&#39;. Helaas is het onzin, als je in
              armoede opgroeid. De doelen waaraan Doneer Effectief doneert,
              hebben sterk wetenschappelijk onderbouwd dat zij voor{" "}
              <AccentCoral>€5.000</AccentCoral> een mensenleven kunnen redden.
              Voor 1.666 pilsjes (of 833 als je in Amsterdam woont) kun je dus
              80 levensjaren redden (en dan heb ik de levensjaren van jouw
              lever nog niet eens meegerekend).
            </p>
            <a
              href={CHARITY.url}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-block rounded-xl bg-neutral-900 text-white font-extrabold px-6 py-3 hover:opacity-90 active:scale-95 transition"
            >
              Lees meer over het doel →
            </a>
          </div>
          <Image
            src={`${prefix}/doneereffectief.jpg`}
            className="rounded-2xl mt-5 justify-self-center"
            width={200}
            height={300}
            alt="Picture of the author"
          />
        </div>
      </section>

      {/* CONTRIBUTE */}
      <section
        id="meedoen"
        className="mx-auto px-4 py-16 justify-center flex bg-gray-100 w-full"
      >
        <div className="max-w-6xl">
          <SectionLabel>Hoe kun je bijdragen?</SectionLabel>
          <div className="grid md:grid-cols-3 gap-6">
            <ContribCardLight
              title="Doneer zelf"
              desc="Wil je wel bijdragen, maar heb je geen werk beschikbaar? Doneer zelf een bedrag aan Doneer Effectief namens mij."
              cta="Doneer"
              color="var(--accent-coral)"
              onClick={() =>
                window.open(
                  "https://campagnes.doneereffectief.nl/100-urige-werkweek",
                  "_blank"
                )
              }
            />
            <ContribCardLight
              title="Huur me in"
              desc="Heb je werk te doen? Huur me in door je in te schrijven via onderstaande spreadsheet. Extra uitleg volgt daar."
              cta="Sponsor"
              color="var(--accent-cyan)"
              onClick={() =>
                window.open(
                  "https://docs.google.com/spreadsheets/d/1YlOqujDFCL7pDpGBCcMF8hMuK3pneqTK3i-75AArWgc/edit?usp=sharing",
                  "_blank"
                )
              }
            />
            <ContribCardLight
              title="Werk ook!"
              desc="Ben je geïnspireerd? Kom samen met mij een aantal uurtjes beunen en doneer ook je inkomsten!"
              cta="Werk"
              color="var(--accent-mint)"
              onClick={() =>
                window.open(
                  "https://docs.google.com/spreadsheets/d/1YlOqujDFCL7pDpGBCcMF8hMuK3pneqTK3i-75AArWgc/edit?usp=sharing",
                  "_blank"
                )
              }
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-4xl px-4 py-16">
        <SectionLabel>FAQ</SectionLabel>
        <div className="space-y-4">
          <FaqItem
            q="Hoe weet ik zeker dat jij het geld daadwerkelijk doneert?"
            a="Ik stuur met plezier een betaalbewijsje, maar je kan ook direct mijn salaris storten op de DoneerEffectief website"
          />
          <FaqItem q="Hoe ga je dat doen met eten en drinken?" a="Mama. 💓" />
          <FaqItem
            q="Kan mijn bedrijf sponsoren?"
            a="Graag! Neem contact op met karstenbergeo@gmail.com. Ik laat je graag weten wat de opties zijn"
          />
          <FaqItem
            q="Ik wil je misschien wel inhuren, maar wat kan jij allemaal?"
            a={
              <>
                Goeie vraag. Dit is onderzoek in progress. Wat in eerder is
                gelukt: programmeren (master AI, ervaring met NextJS, python,
                C#), zeilen, schoonmaken, teksten schrijven, koken, coachen,
                bijles, lesgeven, evenementorganisatie, marketing,
                website(design), sjouwen en vast nog wel een paar dingen! Check
                ook{" "}
                <a
                  href="https://drive.google.com/file/d/1I9fETlQD_TrfS4mLIQnCCz7REi7cXvCY/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-600 hover:text-blue-800"
                >
                  m&#39;n CV
                </a>
                .
              </>
            }
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 bg-neutral-50 border-t border-neutral-200 text-center">
        <p className="text-neutral-500 text-sm">
          Mooi website design is niet lelijk. Gemaakt door het{" "}
          <a
            href="https://toetstester.nl/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "underline", color: "var(--accent-cyan)" }}
          >
            ToetsTester
          </a>{" "}
          team✦
        </p>
      </footer>

      {/* Floating CTA */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
        <button
          onClick={() => {
            const el = document.getElementById("meedoen");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="rounded-full font-extrabold px-8 py-4 shadow-md hover:shadow-lg active:scale-95 transition"
          style={{ background: "var(--accent-cyan)", color: "#001018" }}
        >
          Doneer / Sponsor
        </button>
      </div>

      {/* Audio toggle */} <div className="fixed top-4 right-4 z-50 flex items-center gap-2"> <Image src="/100.svg" alt="Sound Icon" width={24} height={24} /> <label className="text-xs uppercase tracking-widest text-neutral-500 text-bold"><AccentCoral>UUR</AccentCoral></label> </div>
    </div>
  );
}

function GlobalDecor() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
      <div
        className="absolute inset-0 opacity-[0.6]"
        style={{
          backgroundImage:
            "linear-gradient(90deg,rgba(0,0,0,.04)_1px,transparent_1px),linear-gradient(rgba(0,0,0,.04)_1px,transparent_1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(600px 200px at 20% 15%, rgba(0,0,0,.06), transparent 60%), radial-gradient(800px 260px at 80% 5%, rgba(0,0,0,.05), transparent 60%)",
        }}
      />
    </div>
  );
}

function Hero({
  title,
  timeLeft,
  videoBgSrc,
  videoPoster,
}: {
  title: string;
  timeLeft: Countdown;
  videoBgSrc?: string;
  videoPoster?: string;
}) {
  return (
    <header className="relative overflow-hidden">
      {/* Background video layer */}
      {videoBgSrc && (
        <>
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src={videoBgSrc}
            poster={videoPoster || "/next.svg"}
            autoPlay
            loop
            muted
            playsInline
            aria-hidden
            preload="auto"
          />
        </>
      )}

      <div className="relative mx-auto max-w-7xl px-4 pt-24 pb-16">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white/80 backdrop-blur px-4 py-2 text-xs tracking-widest uppercase text-neutral-600">
          19-25 januari 2025
        </div>
        <h1 className="text-[10vw] leading-[0.9] font-extrabold tracking-tight">
          <span className="block drop-shadow-sm">
            {title.split(" – ")[0]}
          </span>
          <span
            className="block drop-shadow-sm"
            style={{ color: "var(--accent-coral)" }}
          >
            {title.split(" – ")[1] || "100 UUR"}
          </span>
        </h1>

        {/* Countdown */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
          {[
            { label: "Dagen", value: timeLeft.days },
            { label: "Uren", value: timeLeft.hours },
            { label: "Min", value: timeLeft.minutes },
            { label: "Sec", value: timeLeft.seconds },
          ].map((b, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white/85 backdrop-blur border border-neutral-200 p-4 text-center shadow-sm"
            >
              <div className="text-5xl font-black tabular-nums text-neutral-900">
                {b.value}
              </div>
              <div className="text-xs mt-1 tracking-widest uppercase text-neutral-500">
                {b.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#meedoen"
            className="rounded-xl font-extrabold px-6 py-3 border border-neutral-300 bg-white/85 backdrop-blur hover:bg-white"
          >
            Doe Mee
          </a>
          <a
            href="#goede-doel"
            className="rounded-xl font-extrabold px-6 py-3 text-white"
            style={{ background: "var(--accent-coral)" }}
          >
            Het Doel
          </a>
        </div>
      </div>
    </header>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-2 text-xs tracking-widest uppercase text-neutral-500">
      {children}
    </div>
  );
}

function AccentCyan({ children }: { children: React.ReactNode }) {
  return <span style={{ color: "var(--accent-cyan)" }}>{children}</span>;
}
function AccentCoral({ children }: { children: React.ReactNode }) {
  return <span style={{ color: "var(--accent-coral)" }}>{children}</span>;
}

function MarqueeBand({
  text,
  className,
  borderColor,
  rotate,
}: {
  text: string;
  className?: string;
  borderColor?: string;
  rotate?: string;
}) {
  return (
    <div
      className={`overflow-hidden ${className ?? ""} ${rotate ?? ""} my-4 border-transparent`}
      style={{ borderTopColor: borderColor }}
    >
      <div className="whitespace-nowrap py-2 animate-[marquee_16s_linear_infinite] font-extrabold text-2xl">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className="mx-4">
            {text}
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

function ContribCardLight({
  title,
  desc,
  cta,
  onClick,
  color,
}: {
  title: string;
  desc: string;
  cta: string;
  onClick: () => void;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 flex flex-col shadow-sm">
      <h3 className="text-2xl font-extrabold mb-2">{title}</h3>
      <p className="text-neutral-600 flex-1">{desc}</p>
      <button
        onClick={onClick}
        className="mt-6 rounded-xl font-extrabold px-5 py-3 text-neutral-900 hover:opacity-90 active:scale-95 transition"
        style={{ background: color }}
      >
        {cta}
      </button>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: React.ReactNode }) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="border border-neutral-200 rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-4 py-3 bg-white hover:bg-neutral-50 flex items-center justify-between"
      >
        <span className="font-bold text-neutral-900">{q}</span>
        <span className="text-neutral-500">{open ? "–" : "+"}</span>
      </button>
      {open && <div className="px-4 py-4 text-neutral-700">{a}</div>}
    </div>
  );
}

// ===============
// Countdown Hook
// ===============

type Countdown = { days: string; hours: string; minutes: string; seconds: string };

function useCountdown(targetDate: Date): Countdown {
  const [now, setNow] = useState<number>(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, targetDate.getTime() - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return {
    days: pad(days),
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
  };
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}
