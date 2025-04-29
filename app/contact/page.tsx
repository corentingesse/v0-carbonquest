"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react"

// Schéma de validation pour le formulaire de contact
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Veuillez entrer une adresse email valide" }),
  subject: z.string().min(5, { message: "Le sujet doit contenir au moins 5 caractères" }),
  message: z.string().min(10, { message: "Le message doit contenir au moins 10 caractères" }),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  function onSubmit(data: ContactFormValues) {
    // Simuler l'envoi du formulaire
    console.log("Formulaire soumis:", data)
    setIsSubmitted(true)

    // Réinitialiser le formulaire après 3 secondes
    setTimeout(() => {
      form.reset()
      setIsSubmitted(false)
    }, 3000)
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-teal-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-teal-800 bg-clip-text text-transparent">
              Contactez-nous
            </h1>
            <p className="text-lg text-gray-700 mb-0">
              Une question, une suggestion ou une demande de partenariat ? N&apos;hésitez pas à nous contacter.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulaire de contact */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>

              {isSubmitted ? (
                <Card className="border-green-100 bg-green-50">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-green-700 mb-2">Message envoyé !</h3>
                    <p className="text-green-600">
                      Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-none shadow-lg">
                  <CardContent className="p-6">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nom</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Votre nom"
                                    {...field}
                                    className="border-gray-200 focus:border-green-500 focus:ring focus:ring-green-200 transition-all duration-200"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="votre@email.com"
                                    type="email"
                                    {...field}
                                    className="border-gray-200 focus:border-green-500 focus:ring focus:ring-green-200 transition-all duration-200"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Sujet</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Sujet de votre message"
                                  {...field}
                                  className="border-gray-200 focus:border-green-500 focus:ring focus:ring-green-200 transition-all duration-200"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Votre message..."
                                  {...field}
                                  rows={6}
                                  className="border-gray-200 focus:border-green-500 focus:ring focus:ring-green-200 transition-all duration-200 resize-none"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white border-none shadow-md hover:shadow-lg transition-all duration-200"
                        >
                          <Send className="mr-2 h-5 w-5" />
                          Envoyer le message
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Informations de contact */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Nos coordonnées</h2>

              <div className="space-y-8">
                <Card className="border-none shadow-lg bg-white/90 backdrop-blur-sm overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-video w-full bg-gray-200">
                      {/* Ici, vous pourriez intégrer une carte Google Maps ou OpenStreetMap */}
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                        <MapPin className="h-12 w-12 text-gray-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-md mr-4 flex-shrink-0">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">Adresse</h3>
                      <p className="text-gray-600">
                        123 Avenue de l&apos;Écologie
                        <br />
                        75001 Paris, France
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-md mr-4 flex-shrink-0">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">Email</h3>
                      <p className="text-gray-600">
                        contact@carbonquest.fr
                        <br />
                        support@carbonquest.fr
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-md mr-4 flex-shrink-0">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">Téléphone</h3>
                      <p className="text-gray-600">
                        +33 1 23 45 67 89
                        <br />
                        Lun-Ven: 9h-18h
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-teal-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Questions fréquentes</h2>

            <div className="space-y-6">
              <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">Comment fonctionne l&apos;Éco Scanner ?</h3>
                  <p className="text-gray-600">
                    Notre Éco Scanner utilise la technologie de reconnaissance de code-barres pour identifier les
                    produits alimentaires. Une fois le produit identifié, nous calculons son empreinte carbone en
                    fonction de sa production, son transport et son emballage, en nous basant sur des données
                    scientifiques fiables.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">
                    D&apos;où proviennent vos données sur l&apos;empreinte carbone ?
                  </h3>
                  <p className="text-gray-600">
                    Nos données proviennent de sources scientifiques reconnues, notamment la base de données Open Food
                    Facts et des études académiques sur l&apos;impact environnemental des aliments. Nous mettons
                    régulièrement à jour ces données pour garantir leur précision.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">Comment puis-je proposer un partenariat avec CarbonQuest ?</h3>
                  <p className="text-gray-600">
                    Nous sommes ouverts aux partenariats avec des entreprises et organisations partageant nos valeurs.
                    Pour discuter d&apos;une collaboration potentielle, veuillez nous contacter via le formulaire
                    ci-dessus en précisant la nature du partenariat envisagé.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">L&apos;application est-elle gratuite ?</h3>
                  <p className="text-gray-600">
                    Oui, l&apos;application CarbonQuest est entièrement gratuite pour les utilisateurs. Notre mission
                    est de rendre l&apos;information sur l&apos;impact environnemental de notre alimentation accessible
                    à tous.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
