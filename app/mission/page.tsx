import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Leaf, BarChart, CheckCircle, Globe, ShieldCheck, Users, Lightbulb } from "lucide-react"

export default function MissionPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-teal-100 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-teal-800 bg-clip-text text-transparent">
                Notre mission
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                Chez CarbonQuest, notre mission est de rendre l&apos;impact environnemental de notre alimentation
                visible, compréhensible et actionnable pour tous.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white border-none shadow-md hover:shadow-lg transition-all duration-200"
                  asChild
                >
                  <Link href="/scanner">
                    Découvrir nos outils
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-green-300 rounded-full blur-3xl opacity-20"></div>
                <Image
                  src="/images/ferme.jpeg"
                  alt="CarbonQuest Logo"
                  width={300}
                  height={300}
                  className="relative rounded-2xl z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Citation inspirante */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-4xl font-serif text-green-600 mb-4">"</div>
            <p className="text-xl md:text-2xl font-serif italic text-gray-700 mb-6">
              La connaissance est le premier pas vers le changement. Notre mission est de donner à chacun les
              informations nécessaires pour faire des choix alimentaires plus durables.
            </p>
            <p className="text-gray-500 font-medium">Les fondateurs de CarbonQuest</p>
          </div>
        </div>
      </section>

      {/* Notre vision */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-teal-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Notre vision</h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                Nous imaginons un monde où chaque personne dispose des informations et des outils nécessaires pour faire
                des choix alimentaires éclairés, tenant compte de leur impact sur l&apos;environnement.
              </p>
              <p>
                Nous croyons que la technologie peut jouer un rôle clé dans cette transition, en rendant ces
                informations accessibles, compréhensibles et actionnables au quotidien.
              </p>
              <p>
                Notre vision est celle d&apos;une société où l&apos;impact carbone de nos aliments est aussi visible que
                leur prix ou leurs valeurs nutritionnelles, permettant à chacun de prendre des décisions en connaissance
                de cause.
              </p>
              <p>
                À terme, nous aspirons à créer un écosystème complet d&apos;outils et de ressources qui accompagnent les
                consommateurs, les producteurs et les distributeurs vers une alimentation plus durable et respectueuse
                de notre planète.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nos objectifs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Nos objectifs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm h-full">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-md mb-4">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Sensibiliser</h3>
                <p className="text-gray-600">
                  Informer le grand public sur l&apos;impact environnemental de notre alimentation et son rôle dans le
                  changement climatique.
                </p>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Éduquer sur les émissions de CO₂ liées à l&apos;alimentation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Démystifier les concepts d&apos;empreinte carbone</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Promouvoir une alimentation plus durable</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm h-full">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-md mb-4">
                  <BarChart className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Mesurer</h3>
                <p className="text-gray-600">
                  Fournir des outils précis et fiables pour mesurer l&apos;empreinte carbone des produits alimentaires
                  que nous consommons.
                </p>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Développer des algorithmes de calcul précis</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Intégrer des données scientifiques fiables</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Créer des visualisations compréhensibles</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm h-full">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-md mb-4">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Agir</h3>
                <p className="text-gray-600">
                  Encourager des changements concrets dans nos habitudes alimentaires pour réduire notre impact
                  environnemental collectif.
                </p>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Proposer des alternatives plus durables</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Faciliter l&apos;adoption de nouvelles habitudes</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Mesurer l&apos;impact collectif des changements</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nos engagements */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-teal-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Nos engagements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-md mr-4 flex-shrink-0">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Impact environnemental</h3>
                <p className="text-gray-700">
                  Nous nous engageons à réduire notre propre empreinte carbone en tant qu&apos;entreprise, en adoptant
                  des pratiques durables dans tous nos processus et en compensant nos émissions résiduelles.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-md mr-4 flex-shrink-0">
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Transparence</h3>
                <p className="text-gray-700">
                  Nous nous engageons à être totalement transparents sur nos méthodes de calcul, nos sources de données
                  et nos partenariats, afin de garantir la confiance de nos utilisateurs.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-md mr-4 flex-shrink-0">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Accessibilité</h3>
                <p className="text-gray-700">
                  Nous nous engageons à rendre nos outils accessibles à tous, quels que soient leurs connaissances
                  préalables, leur situation géographique ou leurs moyens financiers.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-md mr-4 flex-shrink-0">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Innovation continue</h3>
                <p className="text-gray-700">
                  Nous nous engageons à innover constamment pour améliorer nos outils et développer de nouvelles
                  solutions qui répondent aux défis environnementaux de notre alimentation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notre approche */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Notre approche</h2>
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-md flex-shrink-0 md:mt-1">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Données scientifiques</h3>
                  <p className="text-gray-700">
                    Nous nous appuyons sur des données scientifiques rigoureuses pour calculer l&apos;empreinte carbone
                    des produits alimentaires, en tenant compte de leur production, transport, emballage et autres
                    facteurs pertinents.
                  </p>
                  <p className="text-gray-700 mt-2">
                    Notre équipe de chercheurs et d&apos;experts environnementaux travaille en permanence à affiner nos
                    modèles de calcul et à intégrer les dernières avancées scientifiques dans ce domaine.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-md flex-shrink-0 md:mt-1">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Technologie accessible</h3>
                  <p className="text-gray-700">
                    Nous développons des outils technologiques simples et intuitifs, comme notre Éco Scanner et notre
                    Mini-Jeu, pour rendre ces informations accessibles à tous, quel que soit leur niveau de connaissance
                    préalable sur les questions environnementales.
                  </p>
                  <p className="text-gray-700 mt-2">
                    Nous accordons une attention particulière à l&apos;expérience utilisateur, en veillant à ce que nos
                    interfaces soient intuitives, agréables et adaptées à tous les types d&apos;appareils.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-md flex-shrink-0 md:mt-1">
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Éducation ludique</h3>
                  <p className="text-gray-700">
                    Nous croyons que l&apos;apprentissage est plus efficace lorsqu&apos;il est engageant et amusant.
                    C&apos;est pourquoi nous intégrons des éléments ludiques dans nos outils, pour faciliter la
                    compréhension et l&apos;adoption de comportements plus durables.
                  </p>
                  <p className="text-gray-700 mt-2">
                    Notre Mini-Jeu Carbone est un exemple parfait de cette approche : il permet d&apos;apprendre tout en
                    s&apos;amusant, rendant les concepts d&apos;empreinte carbone plus accessibles et mémorables.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Objectifs de développement durable */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-teal-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Contribution aux Objectifs de Développement Durable</h2>
            <p className="text-center text-gray-700 mb-8">
              Notre mission s&apos;inscrit dans le cadre des Objectifs de Développement Durable (ODD) des Nations Unies.
              Nous contribuons particulièrement aux objectifs suivants :
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 text-center shadow-md">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">12</span>
                </div>
                <h3 className="font-medium">Consommation responsable</h3>
              </div>

              <div className="bg-white rounded-lg p-4 text-center shadow-md">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">13</span>
                </div>
                <h3 className="font-medium">Lutte contre le changement climatique</h3>
              </div>

              <div className="bg-white rounded-lg p-4 text-center shadow-md">
                <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">15</span>
                </div>
                <h3 className="font-medium">Vie terrestre</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-2/3 mb-8 md:mb-0">
                <h2 className="text-3xl font-bold text-white mb-4">Participez à notre mission</h2>
                <p className="text-green-50 mb-0">
                  Chaque action compte. Découvrez comment vous pouvez contribuer à un avenir plus durable grâce à nos
                  outils.
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center md:justify-end">
                <Button
                  className="bg-white text-green-600 hover:bg-green-50 shadow-md hover:shadow-lg transition-all duration-200"
                  size="lg"
                  asChild
                >
                  <Link href="/scanner">
                    Commencer maintenant
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
