import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Globe, Leaf, Target } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-teal-100 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-teal-800 bg-clip-text text-transparent">
                À propos de CarbonQuest
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                Nous sommes une entreprise engagée dans la lutte contre le changement climatique, avec une mission
                claire : rendre l&apos;impact environnemental de notre alimentation visible et compréhensible pour tous.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white border-none shadow-md hover:shadow-lg transition-all duration-200"
                  asChild
                >
                  <Link href="/mission">
                    Notre mission
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50" asChild>
                  <Link href="/equipe">Découvrir l&apos;équipe</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-green-300 rounded-full blur-3xl opacity-20"></div>
                <Image
                  src="/images/logo.png"
                  alt="CarbonQuest Logo"
                  width={300}
                  height={300}
                  className="relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notre histoire */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Notre histoire</h2>
            <div className="space-y-6 text-gray-700">
              <p>
                CarbonQuest est née d&apos;une prise de conscience : l&apos;impact environnemental de notre alimentation
                est souvent invisible, alors qu&apos;il représente une part significative de notre empreinte carbone
                individuelle.
              </p>
              <p>
                Fondée en 2022 par une équipe de passionnés d&apos;écologie et de technologie, notre entreprise
                s&apos;est donnée pour mission de rendre ces informations accessibles à tous, de manière simple et
                ludique.
              </p>
              <p>
                Nous avons commencé par développer notre Éco Scanner, qui permet d&apos;analyser l&apos;empreinte
                carbone des produits alimentaires en scannant leur code-barres. Face au succès de cet outil, nous avons
                ensuite créé notre Mini-Jeu Carbone, pour sensibiliser de manière ludique à l&apos;impact de nos choix
                alimentaires.
              </p>
              <p>
                Aujourd&apos;hui, CarbonQuest continue de grandir et d&apos;innover, avec toujours le même objectif :
                contribuer à la transition écologique en donnant à chacun les moyens de comprendre et réduire son impact
                sur l&apos;environnement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-teal-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Nos valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm h-full">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-md mb-4">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Durabilité</h3>
                <p className="text-gray-600">
                  Nous plaçons l&apos;environnement au cœur de toutes nos décisions et actions. Notre objectif est de
                  contribuer à un avenir plus durable pour notre planète.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm h-full">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-md mb-4">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Transparence</h3>
                <p className="text-gray-600">
                  Nous croyons en l'importance de la transparence dans toutes nos actions. Nous fournissons des
                  informations claires et vérifiables sur l'impact environnemental des produits.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm h-full">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-md mb-4">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Innovation</h3>
                <p className="text-gray-600">
                  Nous cherchons constamment à innover pour rendre l'information environnementale plus accessible et
                  engageante. La technologie est notre alliée pour créer un impact positif.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nos partenaires */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Nos partenaires</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-center">
                <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Logo partenaire</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-teal-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Rejoignez notre mission</h2>
            <p className="text-lg text-gray-700 mb-8">
              Ensemble, nous pouvons faire la différence. Découvrez nos outils et commencez à réduire votre empreinte
              carbone dès aujourd'hui.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white border-none shadow-md hover:shadow-lg transition-all duration-200"
                asChild
              >
                <Link href="/scanner">Essayer l'Éco Scanner</Link>
              </Button>
              <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50" asChild>
                <Link href="/jeu">Jouer au Mini-Jeu</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
