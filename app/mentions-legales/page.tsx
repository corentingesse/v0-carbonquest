import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mentions légales | CarbonQuest",
  description: "Mentions légales de CarbonQuest.",
}

export default function MentionsLegales() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mentions légales</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Éditeur du site</h2>
        <p className="text-gray-700">
          CarbonQuest est un projet développé par des étudiants d'Ynov Campus.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Hébergement</h2>
        <p className="text-gray-700">
          Le site est hébergé par Vercel.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Propriété intellectuelle</h2>
        <p className="text-gray-700">
          L'ensemble du contenu du site (textes, images, logo) est la propriété de CarbonQuest.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Données personnelles</h2>
        <p className="text-gray-700">
          Les données collectées sont utilisées uniquement dans le cadre du fonctionnement du site.
        </p>
      </section>
    </div>
  )
}