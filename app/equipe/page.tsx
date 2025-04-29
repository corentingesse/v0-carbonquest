import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Linkedin, Twitter, Mail } from "lucide-react"

// Données fictives pour l'équipe
const teamMembers = [
  {
    id: 1,
    name: "Corentin GESSE ENTRESSANGLE",
    role: "Fondateur",
  },
  {
    id: 2,
    name: "Meldryck SAÏD",
    role: "Fondateur",
  },
  {
    id: 3,
    name: "Quentin FAYOLLE",
    role: "Fondateur",
  },
  {
    id: 4,
    name: "Dorian JOLY",
    role: "Fondateur",
  },
  {
    id: 5,
    name: "Mano RAICHON",
    role: "Fondateur",
  },
  {
    id: 6,
    name: "William CAMPO",
    role: "Fondateur",
  },
  {
    id: 7,
    name: "Martin BARRE",
    role: "Fondateur",
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
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-green-600 font-medium mb-3">{member.role}</p>
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
