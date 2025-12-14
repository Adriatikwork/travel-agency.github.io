"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plane, Search, Mail } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useState } from "react"

interface Departure {
  id: string
  from: { en: string; sq: string }
  to: { en: string; sq: string }
  price: number
  date: string
  airline: string
  duration: string
  type: string
  availableSeats: number
}

interface DeparturesModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  departures: Departure[]
}

export function DeparturesModal({ open, onOpenChange, departures }: DeparturesModalProps) {
  const { language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === "sq" ? "sq-AL" : "en-GB", {
      month: "short",
      day: "numeric",
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString(language === "sq" ? "sq-AL" : "en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const filteredDepartures = departures.filter((departure) => {
    const query = searchQuery.toLowerCase()
    return (
      departure.from.en.toLowerCase().includes(query) ||
      departure.from.sq.toLowerCase().includes(query) ||
      departure.to.en.toLowerCase().includes(query) ||
      departure.to.sq.toLowerCase().includes(query)
    )
  })

  const handleRequestInfo = (departure: Departure) => {
    const subject =
      language === "sq"
        ? `Kërkesë për Informacion - ${departure.from[language]} në ${departure.to[language]}`
        : `Information Request - ${departure.from[language]} to ${departure.to[language]}`

    const body =
      language === "sq"
        ? `Përshëndetje,%0D%0A%0D%0AUnë jam i interesuar për më shumë informacion rreth nisjes:%0D%0A%0D%0ANga: ${departure.from[language]}%0D%0ANë: ${departure.to[language]}%0D%0AData: ${formatDate(departure.date)}%0D%0ACmimi: €${departure.price} për person%0D%0AKohëzgjatja: ${departure.duration}%0D%0ALinja Ajrore: ${departure.airline}%0D%0A%0D%0APlease provide me with more details and availability.%0D%0A%0D%0AThank you!`
        : `Hello,%0D%0A%0D%0AI am interested in more information about this departure:%0D%0A%0D%0AFrom: ${departure.from[language]}%0D%0ATo: ${departure.to[language]}%0D%0ADate: ${formatDate(departure.date)}%0D%0APrice: €${departure.price} per person%0D%0ADuration: ${departure.duration}%0D%0AAirline: ${departure.airline}%0D%0A%0D%0APlease provide me with more details and availability.%0D%0A%0D%0AThank you!`

    window.location.href = `mailto:info@fluturo.co?subject=${subject}&body=${body}`
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] w-full sm:max-w-[95vw] md:max-w-[95vw] lg:max-w-[95vw] max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="bg-gradient-to-r from-[#38b6ff] via-[#30b2f5] to-[#38b6ff] text-white p-6 border-b-4 border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <Plane className="h-6 w-6" />
            <DialogTitle className="text-2xl font-bold">
              {language === "sq" ? "NISJET E DISPONUESHME" : "AVAILABLE DEPARTURES"}
            </DialogTitle>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <p className="text-sm text-white/90 whitespace-nowrap">
              {language === "sq" ? "Gjeni fluturimin tuaj të ardhshëm" : "Find your next flight"}
            </p>
            <div className="relative w-full sm:flex-1 sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder={language === "sq" ? "Kërko destinacion..." : "Search destinations..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white text-gray-900 border-white/30"
              />
            </div>
          </div>
          {searchQuery && (
            <p className="text-sm text-white/80 mt-2">
              {language === "sq"
                ? `${filteredDepartures.length} rezultate të gjetura`
                : `${filteredDepartures.length} results found`}
            </p>
          )}
        </DialogHeader>

        <div className="overflow-auto max-h-[calc(90vh-200px)] bg-muted/30">
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <table className="w-full">
              <thead className="bg-[#38b6ff] text-white sticky top-0 z-10">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-sm uppercase tracking-wider">
                    {language === "sq" ? "Nga" : "From"}
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-sm uppercase tracking-wider">
                    {language === "sq" ? "Në" : "To"}
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-sm uppercase tracking-wider">
                    {language === "sq" ? "Data" : "Date"}
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-sm uppercase tracking-wider">
                    {language === "sq" ? "Kohëzgjatja" : "Duration"}
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-sm uppercase tracking-wider">
                    {language === "sq" ? "Linja" : "Airline"}
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-sm uppercase tracking-wider">
                    {language === "sq" ? "Vende" : "Seats"}
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-sm uppercase tracking-wider">
                    {language === "sq" ? "Cmimi" : "Price"}
                  </th>
                  <th className="text-center py-4 px-6 font-semibold text-sm uppercase tracking-wider">
                    {language === "sq" ? "Info" : "Info"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredDepartures.map((departure, index) => (
                  <tr
                    key={departure.id}
                    className={`border-b border-border hover:bg-accent/50 transition-colors ${
                      index % 2 === 0 ? "bg-card" : "bg-muted/20"
                    }`}
                  >
                    <td className="py-4 px-6">
                      <div className="font-semibold text-foreground">{departure.from[language]}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-semibold text-foreground">{departure.to[language]}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm font-medium text-foreground">{formatDate(departure.date)}</div>
                      <div className="text-xs text-muted-foreground">{formatTime(departure.date)}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-foreground">{departure.duration}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-foreground">{departure.airline}</div>
                      <div className="text-xs text-[#38b6ff] font-medium">
                        {departure.type === "Direct" ? (language === "sq" ? "Direkt" : "Direct") : departure.type}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          departure.availableSeats > 10
                            ? "bg-[#38b6ff]/20 text-[#38b6ff]"
                            : "bg-destructive/20 text-destructive"
                        }`}
                      >
                        {departure.availableSeats} {language === "sq" ? "vende" : "left"}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-2xl font-bold text-[#38b6ff]">€{departure.price}</div>
                      <div className="text-xs text-muted-foreground">
                        {language === "sq" ? "për person" : "per person"}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Button
                        size="sm"
                        className="whitespace-nowrap gap-2 bg-[#38b6ff] hover:bg-[#30b2f5]"
                        onClick={() => handleRequestInfo(departure)}
                      >
                        <Mail className="h-4 w-4" />
                        {language === "sq" ? "Kërkoni Info" : "Request Info"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden p-4 space-y-4">
            {filteredDepartures.map((departure) => (
              <div key={departure.id} className="bg-card rounded-lg border border-border p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-bold text-lg text-foreground">
                      {departure.from[language]} → {departure.to[language]}
                    </div>
                    <div className="text-sm text-muted-foreground">{formatDate(departure.date)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#38b6ff]">€{departure.price}</div>
                    <div className="text-xs text-muted-foreground">
                      {language === "sq" ? "për person" : "per person"}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                  <div>
                    <span className="font-medium text-foreground">
                      {language === "sq" ? "Kohëzgjatja:" : "Duration:"}
                    </span>{" "}
                    {departure.duration}
                  </div>
                  <div>
                    <span className="font-medium text-foreground">{language === "sq" ? "Linja:" : "Airline:"}</span>{" "}
                    {departure.airline}
                  </div>
                  <div>
                    <span className="font-medium text-foreground">{language === "sq" ? "Tipi:" : "Type:"}</span>{" "}
                    {departure.type === "Direct" ? (language === "sq" ? "Direkt" : "Direct") : departure.type}
                  </div>
                  <div>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        departure.availableSeats > 10
                          ? "bg-[#38b6ff]/20 text-[#38b6ff]"
                          : "bg-destructive/20 text-destructive"
                      }`}
                    >
                      {departure.availableSeats} {language === "sq" ? "vende" : "seats"}
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full gap-2 bg-[#38b6ff] hover:bg-[#30b2f5]"
                  onClick={() => handleRequestInfo(departure)}
                >
                  <Mail className="h-4 w-4" />
                  {language === "sq" ? "Kërkoni Informacion" : "Request Information"}
                </Button>
              </div>
            ))}
          </div>

          {filteredDepartures.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              {language === "sq"
                ? "Nuk u gjetën rezultate. Provoni një kërkim tjetër."
                : "No results found. Try a different search."}
            </div>
          )}
        </div>

        <div className="bg-muted border-t border-border p-4 text-center text-sm text-muted-foreground">
          {language === "sq"
            ? "Çmimet janë për person dhe mund të ndryshojnë. Dërgoni email për më shumë informacion."
            : "Prices are per person and subject to change. Email us for more information."}
        </div>
      </DialogContent>
    </Dialog>
  )
}
