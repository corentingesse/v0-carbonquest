import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Linkedin, Twitter, Mail } from "lucide-react"

// Données fictives pour l'équipe
const teamMembers = [
  {
    id: 1,
    name: "Sophie Martin",
    role: "Fondatrice & CEO",
    bio: "Passionnée d'écologie et d'innovation, Sophie a fondé CarbonQuest avec la vision de rendre l'impact environnemental de notre alimentation visible pour tous.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 2,
    name: "Thomas Dubois",
    role: "Directeur Technique",
    bio: "Expert en développement logiciel, Thomas supervise la création de nos outils numériques pour les rendre accessibles et performants.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 3,
    name: "Emma Leroy",
    role: "Responsable Scientifique",
    bio: "Docteure en sciences environnementales, Emma veille à la rigueur scientifique de nos données et de nos méthodes de calcul d'empreinte carbone.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 4,
    name: "Lucas Bernard",
    role: "Designer UX/UI",
    bio: "Créatif et centré sur l'utilisateur, Lucas conçoit des interfaces intuitives et engageantes pour nos applications.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 5,
    name: "Camille Petit",
    role: "Responsable Marketing",
    bio: "Experte en communication environnementale, Camille développe notre stratégie pour sensibiliser le plus grand nombre à l'impact de notre alimentation.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 6,
    name: "Antoine Moreau",
    role: "Développeur Full-Stack",
    bio: "Passionné de technologies vertes, Antoine développe les fonctionnalités de nos applications avec un souci constant de performance et d'accessibilité.",
    image: "/placeholder.svg?height=300&width=300",
  },
]

export default function TeamPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-teal-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-teal-800 bg-clip-text text-transparent">
              Notre équipe
            </h1>
            <p className="text-lg text-gray-700 mb-0">
              Découvrez les personnes passionnées qui travaillent chaque jour pour rendre l'impact environnemental de
              notre alimentation plus visible et compréhensible.
            </p>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card
                key={member.id}
                className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm overflow-hidden"
              >
                <div className="aspect-square relative bg-gradient-to-br from-gray-100 to-gray-200">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-green-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 mb-4">{member.bio}</p>
                  <div className="flex space-x-3">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-green-50 hover:text-green-600">
                      <Linkedin className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-green-50 hover:text-green-600">
                      <Twitter className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-green-50 hover:text-green-600">
                      <Mail className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Rejoignez-nous */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-teal-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Rejoignez notre équipe</h2>
            <p className="text-lg text-gray-700 mb-8">
              Vous êtes passionné(e) par l'environnement et souhaitez contribuer à notre mission ? Découvrez nos
              opportunités de carrière et rejoignez l'aventure CarbonQuest !
            </p>
            <Button
              className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white border-none shadow-md hover:shadow-lg transition-all duration-200"
              size="lg"
            >
              Voir nos offres d'emploi
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Notre culture d'entreprise</h2>
            <div className="space-y-6 text-gray-700">
              <p>
                Chez CarbonQuest, nous cultivons un environnement de travail collaboratif, innovant et centré sur
                l'impact. Nous croyons que les meilleures idées naissent de la diversité des perspectives et de la
                passion partagée pour notre mission.
              </p>
              <p>
                Nous encourageons l'autonomie, la créativité et l'apprentissage continu. Chaque membre de notre équipe
                est invité à contribuer avec ses idées et à prendre des initiatives pour faire avancer notre mission
                commune.
              </p>
              <p>
                Notre culture est également fondée sur la transparence, tant en interne qu'avec nos utilisateurs et
                partenaires. Nous partageons ouvertement nos succès, nos défis et nos apprentissages, car nous croyons
                que c'est ainsi que nous pouvons progresser collectivement.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
