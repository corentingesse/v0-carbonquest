"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { BarcodeScanner } from "@/components/barcode-scanner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, Camera, Keyboard, History } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"

// Schéma de validation pour le code-barres
const barcodeSchema = z.object({
  barcode: z
    .string()
    .min(8, { message: "Le code-barres doit contenir au moins 8 caractères" })
    .max(13, { message: "Le code-barres ne peut pas dépasser 13 caractères" })
    .regex(/^\d+$/, { message: "Le code-barres doit contenir uniquement des chiffres" }),
})

type BarcodeFormValues = z.infer<typeof barcodeSchema>

export default function ScannerPage() {
  const router = useRouter()
  const [isScanning, setIsScanning] = useState(false)
  const [activeTab, setActiveTab] = useState("scanner")

  // Configuration du formulaire avec React Hook Form et Zod
  const form = useForm<BarcodeFormValues>({
    resolver: zodResolver(barcodeSchema),
    defaultValues: {
      barcode: "",
    },
  })

  const handleBarcodeScan = (barcode: string) => {
    setIsScanning(false)
    router.push(`/produit/${barcode}`)
  }

  const onSubmit = (data: BarcodeFormValues) => {
    router.push(`/produit/${data.barcode}`)
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-teal-100 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-teal-800 bg-clip-text text-transparent">
              Éco Scanner
            </h1>
            <p className="text-lg text-gray-700 mb-0">
              Scannez le code-barres d&apos;un produit alimentaire pour découvrir son impact environnemental et faire
              des choix plus durables.
            </p>
          </div>
        </div>
      </section>

      {/* Scanner Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 flex justify-center">
          <Card className="w-full max-w-md border-none shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-md">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold">Scanner un produit</CardTitle>
              <CardDescription>
                Scannez ou saisissez le code-barres d&apos;un produit pour connaître son impact environnemental
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6 pt-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 p-1 bg-gray-100 rounded-lg">
                  <TabsTrigger
                    value="scanner"
                    className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow-sm rounded-md transition-all duration-200"
                  >
                    <Camera className="h-4 w-4" />
                    Scanner
                  </TabsTrigger>
                  <TabsTrigger
                    value="manual"
                    className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow-sm rounded-md transition-all duration-200"
                  >
                    <Keyboard className="h-4 w-4" />
                    Saisie manuelle
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="scanner" className="mt-6">
                  {isScanning ? (
                    <div className="w-full">
                      <BarcodeScanner onScan={handleBarcodeScan} onCancel={() => setIsScanning(false)} />
                    </div>
                  ) : (
                    <>
                      <div className="rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-8 w-full flex justify-center shadow-inner">
                        <div className="relative">
                          <div className="absolute inset-0 bg-green-400/20 rounded-full blur-2xl"></div>
                          <img
                            src="images/code-barre.avif"
                            alt="Scanner illustration"
                            className="h-36 w-36 rounded-2xl relative z-10"
                          />
                        </div>
                      </div>
                      <Button
                        className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-none shadow-md hover:shadow-lg transition-all duration-200"
                        onClick={() => setIsScanning(true)}
                      >
                        <Camera className="mr-2 h-5 w-5" />
                        Activer le scanner
                      </Button>
                    </>
                  )}
                </TabsContent>
                <TabsContent value="manual" className="mt-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="barcode"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Entrez le code-barres (ex: 3017620422003)"
                                {...field}
                                className="text-center text-lg py-6 border-gray-200 rounded-xl shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 transition-all duration-200"
                                inputMode="numeric"
                                pattern="[0-9]*"
                              />
                            </FormControl>
                            <FormMessage className="text-center" />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-none shadow-md hover:shadow-lg transition-all duration-200"
                      >
                        Rechercher
                      </Button>
                    </form>
                  </Form>
                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500 mb-3">Exemples de codes-barres à essayer :</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {["3017620422003", "5449000000996", "3017620425004"].map((code) => (
                        <Button
                          key={code}
                          variant="outline"
                          size="sm"
                          className="border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all duration-200"
                          onClick={() => {
                            form.setValue("barcode", code)
                            form.handleSubmit(onSubmit)()
                          }}
                        >
                          {code}
                        </Button>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <Button
                variant="outline"
                className="w-full mt-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 flex items-center justify-center gap-2 transition-all duration-200"
                onClick={() => router.push("/historique")}
              >
                <History className="h-4 w-4" />
                Voir l&apos;historique
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-gradient-to-br from-green-50 to-teal-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Comment ça marche ?</h2>
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-md mr-4 flex-shrink-0">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Scannez le code-barres</h3>
                    <p className="text-gray-600">
                      Utilisez notre scanner intégré ou saisissez manuellement le code-barres du produit alimentaire que
                      vous souhaitez analyser.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-md mr-4 flex-shrink-0">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Découvrez l&apos;impact environnemental</h3>
                    <p className="text-gray-600">
                      Notre application analyse les données du produit et calcule son empreinte carbone, en tenant
                      compte de sa production, son transport et son emballage.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-md mr-4 flex-shrink-0">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Faites des choix éclairés</h3>
                    <p className="text-gray-600">
                      Utilisez ces informations pour faire des choix alimentaires plus durables et réduire votre impact
                      sur l&apos;environnement au quotidien.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
