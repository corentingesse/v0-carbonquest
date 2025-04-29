import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Gamepad2, ScanLine, Users, Globe } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-teal-100 py-20">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=1000')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-teal-800 bg-clip-text text-transparent">
                Comprendre l&apos;impact de nos choix alimentaires
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                CarbonQuest vous aide à découvrir et réduire l&apos;empreinte carbone de votre alimentation grâce à des
                outils innovants et ludiques.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white border-none shadow-md hover:shadow-lg transition-all duration-200"
                  asChild
                >
                  <Link href="/scanner">
                    <ScanLine className="mr-2 h-5 w-5" />
                    Essayer l&apos;Éco Scanner
                  </Link>
                </Button>
                <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50" asChild>
                  <Link href="/jeu">
                    <Gamepad2 className="mr-2 h-5 w-5" />
                    Jouer au Mini-Jeu
                  </Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-green-300 rounded-full blur-3xl opacity-20"></div>
                <Image
                  src="/images/logo.png"
                  alt="CarbonQuest Logo"
                  width={400}
                  height={400}
                  className="relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nos outils pour un avenir durable</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez comment CarbonQuest vous aide à comprendre et réduire votre impact environnemental au quotidien.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Éco Scanner Card */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm h-full">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-md mb-4">
                  <ScanLine className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">Éco Scanner</CardTitle>
                <CardDescription>
                  Scannez les codes-barres des produits alimentaires pour découvrir leur impact environnemental.
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-gray-600">
                  Notre scanner analyse les produits et vous fournit des informations détaillées sur leur empreinte
                  carbone, leur origine et leur mode de production. Prenez des décisions éclairées pour la planète.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="text-green-600 hover:text-green-700 hover:bg-green-50 p-0 flex items-center"
                  asChild
                >
                  <Link href="/scanner">
                    Découvrir l&apos;Éco Scanner
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Mini-Jeu Card */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm h-full">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-md mb-4">
                  <Gamepad2 className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">Mini-Jeu Carbone</CardTitle>
                <CardDescription>
                  Apprenez de façon ludique l&apos;impact carbone des aliments que nous consommons.
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-gray-600">
                  Notre mini-jeu éducatif vous permet de tester vos connaissances sur l&apos;empreinte carbone des
                  aliments. Relevez des défis, gagnez des points et devenez un expert de l&apos;alimentation durable !
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="text-teal-600 hover:text-teal-700 hover:bg-teal-50 p-0 flex items-center"
                  asChild
                >
                  <Link href="/jeu">
                    Jouer au Mini-Jeu
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* À propos Card */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm h-full">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-md mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">Notre entreprise</CardTitle>
                <CardDescription>Découvrez CarbonQuest, notre mission et notre équipe passionnée.</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-gray-600">
                  CarbonQuest est une entreprise engagée dans la lutte contre le changement climatique. Nous développons
                  des solutions innovantes pour aider chacun à comprendre et réduire son impact environnemental.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0 flex items-center"
                  asChild
                >
                  <Link href="/a-propos">
                    En savoir plus
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-teal-50 to-green-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Notre impact</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ensemble, nous contribuons à un avenir plus durable grâce à des choix alimentaires éclairés.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-md">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-md mx-auto mb-4">
                <ScanLine className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-gray-800 mb-2">10 000+</h3>
              <p className="text-gray-600">Produits scannés</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-md">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-md mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-gray-800 mb-2">5 000+</h3>
              <p className="text-gray-600">Utilisateurs actifs</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-md">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-md mx-auto mb-4">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-gray-800 mb-2">500+</h3>
              <p className="text-gray-600">Tonnes de CO₂ économisées</p>
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
                <h2 className="text-3xl font-bold text-white mb-4">Prêt à réduire votre empreinte carbone ?</h2>
                <p className="text-green-50 mb-0">
                  Rejoignez CarbonQuest dès aujourd&apos;hui et commencez votre voyage vers une alimentation plus
                  durable.
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
