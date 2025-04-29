"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, XCircle, Leaf, Award } from "lucide-react"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"

// Dynamically import Confetti to avoid SSR issues
const Confetti = dynamic(() => import("react-confetti"), {
  ssr: false,
})

/*  CIRCUIT DASH 3.1 — Mini‑jeu circuits courts  */

/***************** DATA *****************/
// Local fallback list (used if remote fetch fails)
const LOCAL_FOODS = [
  {
    id: 1,
    name_fr: "Tomate de Provence",
    name_en: "Provence tomato",
    origin: "local",
    emoji: "🍅",
    km_import: 0,
    km_local: 30,
  },
  {
    id: 2,
    name_fr: "Avocat du Mexique",
    name_en: "Mexican avocado",
    origin: "import",
    emoji: "🥑",
    km_import: 9000,
    km_local: 30,
  },
  {
    id: 3,
    name_fr: "Pommes bretonnes",
    name_en: "Brittany apples",
    origin: "local",
    emoji: "🍏",
    km_import: 0,
    km_local: 45,
  },
  {
    id: 4,
    name_fr: "Mangue du Pérou",
    name_en: "Peruvian mango",
    origin: "import",
    emoji: "🥭",
    km_import: 10300,
    km_local: 40,
  },
  {
    id: 5,
    name_fr: "Carotte des Landes",
    name_en: "Landes carrot",
    origin: "local",
    emoji: "🥕",
    km_import: 0,
    km_local: 50,
  },
  {
    id: 6,
    name_fr: "Bananes du Costa Rica",
    name_en: "Costa‑Rica bananas",
    origin: "import",
    emoji: "🍌",
    km_import: 8700,
    km_local: 70,
  },
  {
    id: 7,
    name_fr: "Poire de Savoie",
    name_en: "Savoy pear",
    origin: "local",
    emoji: "🍐",
    km_import: 0,
    km_local: 35,
  },
  {
    id: 8,
    name_fr: "Kiwi de Nouvelle‑Zélande",
    name_en: "New‑Zealand kiwi",
    origin: "import",
    emoji: "🥝",
    km_import: 19000,
    km_local: 30,
  },
  {
    id: 9,
    name_fr: "Courgette du Gard",
    name_en: "Gard zucchini",
    origin: "local",
    emoji: "🥒",
    km_import: 0,
    km_local: 40,
  },
  {
    id: 10,
    name_fr: "Ananas du Ghana",
    name_en: "Ghana pineapple",
    origin: "import",
    emoji: "🍍",
    km_import: 6600,
    km_local: 50,
  },
  {
    id: 11,
    name_fr: "Abricot du Roussillon",
    name_en: "Roussillon apricot",
    origin: "local",
    emoji: "🍑",
    km_import: 0,
    km_local: 25,
  },
  {
    id: 12,
    name_fr: "Cerises de Provence",
    name_en: "Provence cherries",
    origin: "local",
    emoji: "🍒",
    km_import: 0,
    km_local: 60,
  },
  {
    id: 13,
    name_fr: "Raisin d'Italie",
    name_en: "Italian grapes",
    origin: "import",
    emoji: "🍇",
    km_import: 1000,
    km_local: 50,
  },
  {
    id: 14,
    name_fr: "Laitue de Vendée",
    name_en: "Vendée lettuce",
    origin: "local",
    emoji: "🥬",
    km_import: 0,
    km_local: 20,
  },
  {
    id: 15,
    name_fr: "Noix de Californie",
    name_en: "California walnuts",
    origin: "import",
    emoji: "🌰",
    km_import: 9000,
    km_local: 60,
  },
  {
    id: 16,
    name_fr: "Poivron d'Espagne",
    name_en: "Spanish pepper",
    origin: "import",
    emoji: "🌶️",
    km_import: 1200,
    km_local: 40,
  },
  {
    id: 17,
    name_fr: "Pomme de terre du Loiret",
    name_en: "Loiret potato",
    origin: "local",
    emoji: "🥔",
    km_import: 0,
    km_local: 80,
  },
  {
    id: 18,
    name_fr: "Orange de Valence",
    name_en: "Valencia orange",
    origin: "import",
    emoji: "🍊",
    km_import: 1200,
    km_local: 30,
  },
  {
    id: 19,
    name_fr: "Myrtilles du Chili",
    name_en: "Chilean blueberries",
    origin: "import",
    emoji: "🫐",
    km_import: 12000,
    km_local: 100,
  },
  {
    id: 20,
    name_fr: "Papaye du Brésil",
    name_en: "Brazilian papaya",
    origin: "import",
    emoji: "🥭",
    km_import: 8000,
    km_local: 50,
  },
]

/***************** FUN FACTS *****************/
const FUN_FACTS_FR = [
  "Les circuits courts représentent déjà 21 % des ventes directes agricoles en France !",
  "Un aliment parcourt en moyenne 3 000 km avant d'arriver dans votre assiette.",
  "Acheter local soutient l'emploi : 1€ dépensé = jusqu'à 2,5€ injectés dans la région.",
  "Les marchés de producteurs existent depuis… le Moyen‑Âge !",
]
const FUN_FACTS_EN = [
  "Farmers' markets date back to ancient times and are booming again!",
  "Food travels an average of 1 500 miles in the US before it's eaten.",
  "Short supply chains can cut packaging waste by up to 50 %.",
  "Spending $10 locally circulates up to $25 in the community.",
]

/************** HELPERS **************/
const rnd = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)]
const CO2_PER_KM = 0.25 // kg assumed for produce transport

// Date‑seeded PRNG (Mulberry32) for deterministic daily shuffles
function mulberry32(a: number) {
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function dailyShuffle<T>(list: T[]): T[] {
  const seed = Number.parseInt(new Date().toISOString().slice(0, 10).replace(/-/g, ""), 10)
  const rng = mulberry32(seed)
  return [...list].sort(() => rng() - 0.5)
}

/************** I18N & A/B TEST SLOGANS **************/
const SLOGANS_FR = [
  "Moins de kilomètres, plus de saveurs !",
  "Fraîcheur locale, planète ravie !",
  "100 % circuits courts, 0 % bla‑bla !",
]
const SLOGANS_EN = ["Fewer miles, fresher taste!", "Local freshness, global goodness!", "Short supply, big flavor!"]

const L = {
  FR: {
    start: "Commencer",
    local: "Circuit court",
    import: "Importé",
    time: "Temps restant :",
    again: "Rejouer",
    fact: "Le savais‑tu ?",
    best: "Meilleur score",
    co2: (k: number) => `${k} kg de CO₂ évités !`,
    market: "Trouver un marché local",
  },
  EN: {
    start: "Start",
    local: "Short circuit",
    import: "Imported",
    time: "Time left:",
    again: "Play again",
    fact: "Did you know?",
    best: "Best score",
    co2: (k: number) => `${k} kg CO₂ saved!`,
    market: "Find a local market",
  },
}

type Lang = "FR" | "EN"
type Food = (typeof LOCAL_FOODS)[0]

/************** COMPONENTS **************/
const ImpactWidget = ({ km }: { km: number }) => (
  <div className="fixed bottom-4 right-4 bg-white/80 backdrop-blur-md border rounded-xl p-4 text-sm shadow-lg">
    <p className="font-semibold">Impact collectif</p>
    <p>
      {km.toLocaleString()} km • {Math.round(km * CO2_PER_KM).toLocaleString()} kg CO₂
    </p>
  </div>
)

interface LandingProps {
  onStart: () => void
  lang: Lang
  setLang: (lang: Lang) => void
  hc: boolean
  toggleHC: () => void
  sloganVariant: string
}

const Landing = ({ onStart, lang, setLang, hc, toggleHC, sloganVariant }: LandingProps) => (
  <div
    className={`min-h-screen flex flex-col items-center justify-center p-8 text-center ${
      hc ? "bg-black text-white" : "bg-gradient-to-br from-green-200 to-lime-100"
    }`}
  >
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-4xl md:text-6xl font-extrabold mb-6"
    >
      {sloganVariant}
    </motion.h1>
    <p className="max-w-xl text-lg md:text-xl mb-8 italic">{rnd(lang === "FR" ? FUN_FACTS_FR : FUN_FACTS_EN)}</p>
    <div className="flex flex-col lg:flex-row items-center gap-4 mb-6">
      <Button size="lg" className="px-8 py-6 text-lg" onClick={onStart}>
        <Leaf className="mr-2" />
        {L[lang].start}
      </Button>
      <Button variant="outline" onClick={() => setLang(lang === "FR" ? "EN" : "FR")}>
        {lang === "FR" ? "EN" : "FR"}
      </Button>
      <Button variant="outline" onClick={toggleHC}>
        {hc ? "Standard" : "Mode contrasté"}
      </Button>
    </div>
    <a
      href="https://www.jours-de-marche.fr"
      target="_blank"
      rel="noopener noreferrer"
      className="underline text-sm opacity-70"
    >
      {L[lang].market}
    </a>
  </div>
)

const NUM_ROUNDS = 8 // adjustable

interface GameProps {
  onFinish: (score: number, kms: number, total: number) => void
  lang: Lang
  hc: boolean
  mute: boolean
}

const Game = ({ onFinish, lang, hc, mute }: GameProps) => {
  const [foods] = useState(() => dailyShuffle(LOCAL_FOODS).slice(0, NUM_ROUNDS))
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [kms, setKms] = useState(0)
  const [t, setT] = useState(60)
  const [fact, setFact] = useState<string | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [feedback, setFeedback] = useState<{ type: "correct" | "wrong" | null }>({ type: null })

  useEffect(() => {
    const timer = setInterval(() => {
      setT((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          if (idx < foods.length) {
            onFinish(score, kms, NUM_ROUNDS)
          }
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [idx, foods.length, kms, onFinish, score])

  useEffect(() => {
    if (idx >= foods.length) {
      onFinish(score, kms, NUM_ROUNDS)
    }
  }, [idx, foods.length, kms, onFinish, score])

  const answer = (choice: "local" | "import") => {
    if (idx >= foods.length) return

    const f = foods[idx]
    const ok = f.origin === choice

    setFeedback({ type: ok ? "correct" : "wrong" })

    if (ok) {
      setScore((s) => s + 1)
      if (f.origin === "local") setKms((k) => k + (f.km_import - f.km_local))
      setFact(rnd(lang === "FR" ? FUN_FACTS_FR : FUN_FACTS_EN))
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 1000)
    } else {
      setFact(null)
    }

    setTimeout(() => {
      setIdx((i) => i + 1)
      setFeedback({ type: null })
    }, 800)
  }

  const current = foods[idx]

  if (idx >= foods.length) {
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center p-6 ${
          hc ? "bg-gray-900 text-white" : "bg-white"
        }`}
      >
        <p>Calcul de vos résultats...</p>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 ${
        hc ? "bg-gray-900 text-white" : "bg-white"
      }`}
    >
      {showConfetti && <Confetti numberOfPieces={120} recycle={false} />}
      <div className={`mb-4 ${hc ? "text-gray-300" : "text-gray-600"}`}>
        {L[lang].time} {t}s
      </div>
      <div className="absolute top-6 left-6 bg-white/80 backdrop-blur-md p-2 rounded-lg shadow">
        <span className="font-semibold">{score}/{idx}</span>
      </div>
      {current ? (
        <>
          <motion.div
            key={current.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <Card
              className={`w-64 md:w-80 shadow-xl ${
                feedback.type
                  ? feedback.type === "correct"
                    ? "border-4 border-green-500"
                    : "border-4 border-red-500"
                  : ""
              }`}
            >
              <CardContent className="text-9xl py-6 text-center">{current.emoji}</CardContent>
            </Card>
            <h2 className="mt-4 text-xl font-semibold text-center">
              {lang === "FR" ? current.name_fr : current.name_en}
            </h2>

            {feedback.type && (
              <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="mt-2 mb-4">
                {feedback.type === "correct" ? (
                  <CheckCircle className="w-8 h-8 text-green-600" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-600" />
                )}
              </motion.div>
            )}

            <div className="grid grid-cols-2 gap-4 mt-8 w-full max-w-xs">
              <Button
                onClick={() => answer("local")}
                className={`bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 ${
                  feedback.type ? "pointer-events-none" : ""
                }`}
                disabled={feedback.type !== null}
              >
                {L[lang].local}
              </Button>
              <Button
                variant="outline"
                onClick={() => answer("import")}
                className={`border-green-500 text-green-600 hover:bg-green-50 ${
                  feedback.type ? "pointer-events-none" : ""
                }`}
                disabled={feedback.type !== null}
              >
                {L[lang].import}
              </Button>
            </div>
          </motion.div>
          {fact && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-6 bg-lime-100 p-4 rounded-xl max-w-md"
            >
              <p className="font-semibold mb-1">{L[lang].fact}</p>
              <p className="text-sm">{fact}</p>
            </motion.div>
          )}
        </>
      ) : (
        <p>Loading…</p>
      )}
    </div>
  )
}

/************** ACHIEVEMENTS **************/
export const Ach = (score: number, total: number) => {
  const ratio = score / total
  return ratio === 1
    ? { t: "Maître du marché", e: "🏆" }
    : ratio >= 0.75
      ? { t: "Locavore éclairé(e)", e: "🥇" }
      : ratio >= 0.5
        ? { t: "Apprenti circuit‑court", e: "🥈" }
        : null
}

interface ResultProps {
  score: number
  kms: number
  total: number
  retry: () => void
  lang: Lang
  hc: boolean
}

const Result = ({ score, kms, total, retry, lang, hc }: ResultProps) => {
  const [best, setBest] = useState(0)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedBest = Math.max(score, Number.parseInt(localStorage.getItem("cd_best") || "0", 10))
      setBest(storedBest)
      localStorage.setItem("cd_best", storedBest.toString())
    }
  }, [score])

  const achievement = Ach(score, total)
  const co2Saved = Math.round(kms * CO2_PER_KM)

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-8 text-center ${
        hc ? "bg-gray-900 text-white" : "bg-green-50"
      }`}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex items-center mb-6"
      >
        {score / total >= 0.5 ? (
          <CheckCircle className="w-10 h-10 text-green-600" />
        ) : (
          <XCircle className="w-10 h-10 text-red-600" />
        )}
        <h2 className="text-3xl font-bold ml-3">
          {score}/{total}
        </h2>
      </motion.div>

      <p className="text-lg mb-4 font-medium">{L[lang].co2(co2Saved)}</p>

      {achievement && (
        <div className="flex items-center gap-2 mb-4 text-xl">
          <Award className="w-6 h-6" /> {achievement.e} {achievement.t}
        </div>
      )}

      <p className="text-sm opacity-70 mb-2">
        {L[lang].best}: {best}
      </p>

      <div className="flex gap-4">
        <Button
          onClick={retry}
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
        >
          {L[lang].again}
        </Button>
      </div>
    </div>
  )
}

/************** APP **************/
export default function CircuitDashGame() {
  const [page, setPage] = useState("land")
  const [score, setScore] = useState(0)
  const [kms, setKms] = useState(0)
  const [total, setTotal] = useState(NUM_ROUNDS)
  const [lang, setLang] = useState<Lang>("FR")
  const [hc, setHc] = useState(false)
  const [impactKm] = useState(123456) // placeholder fetched from backend

  // Register service worker once (client‑side only)
  useEffect(() => {
    if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        /* ignore */
      })
    }
  }, [])

  // Pour éviter les erreurs d'hydratation, utiliser un slogan fixe au lieu d'un aléatoire
  // Ou mieux, le générer uniquement côté client avec useEffect
  const [sloganVariant, setSloganVariant] = useState(SLOGANS_FR[0]); // Valeur par défaut prévisible
  
  // Choisir le slogan côté client seulement après le premier rendu
  useEffect(() => {
    const slogans = lang === "FR" ? SLOGANS_FR : SLOGANS_EN;
    setSloganVariant(rnd(slogans));
  }, [lang]);

  return (
    <>
      {page === "land" && (
        <>
          <Landing
            onStart={() => setPage("game")}
            lang={lang}
            setLang={setLang}
            hc={hc}
            toggleHC={() => setHc((v) => !v)}
            sloganVariant={sloganVariant}
          />
          <ImpactWidget km={impactKm} />
        </>
      )}

      {page === "game" && (
        <Game
          onFinish={(s, k, t) => {
            setScore(s)
            setKms(k)
            setTotal(t)
            setPage("res")
          }}
          lang={lang}
          hc={hc}
          mute={true}
        />
      )}

      {page === "res" && (
        <Result score={score} kms={kms} total={total} retry={() => setPage("game")} lang={lang} hc={hc} />
      )}
    </>
  )
}
