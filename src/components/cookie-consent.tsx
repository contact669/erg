"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Cookie } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ConsentValue = "accepted" | "declined"
const COOKIE_NAME = "cookie_consent"
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 an

function getCookie(name: string) {
  if (typeof document === "undefined") return null
  const value = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1]
  return value ? decodeURIComponent(value) : null
}

function setCookie(name: string, value: string, maxAge = COOKIE_MAX_AGE) {
  if (typeof document === "undefined") return
  // SameSite=Lax : bon défaut. Secure uniquement en https.
  const secure = typeof window !== "undefined" && window.location.protocol === "https:" ? "; Secure" : ""
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`
}

export default function CookieConsent({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // Affiche uniquement si aucun choix enregistré
    const existing = getCookie(COOKIE_NAME)
    if (!existing) setOpen(true)
  }, [])

  const copy = useMemo(
    () => ({
      title: "Préférences de confidentialité",
      text:
        "Nous utilisons des cookies nécessaires au fonctionnement du site, et des cookies optionnels pour mesurer l’audience et améliorer l’expérience.",
      linkLabel: "En savoir plus",
      accept: "Accepter",
      decline: "Refuser",
    }),
    []
  )

  const choose = (value: ConsentValue) => {
    // Tu peux brancher ici tes scripts analytics selon le choix (ex: window.dataLayer)
    setCookie(COOKIE_NAME, value)
    setOpen(false)
  }

  if (!open) return null

  return (
    <div className={cn("fixed inset-x-0 bottom-0 z-50", className)}>
      <div className="container px-4 pb-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Bannière de consentement aux cookies"
          className={cn(
            "rounded-2xl border bg-background/95 p-5 shadow-2xl backdrop-blur",
            "ring-1 ring-border/50"
          )}
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                <Cookie className="h-5 w-5 text-accent" />
              </div>

              <div className="space-y-1.5">
                <p className="font-headline text-sm font-semibold text-foreground">{copy.title}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {copy.text}{" "}
                  <Link
                    href="/confidentialite"
                    className="underline underline-offset-4 transition-colors hover:text-primary"
                  >
                    {copy.linkLabel}
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 md:ml-auto md:flex-row md:items-center">
              <Button variant="outline" size="sm" onClick={() => choose("declined")} className="md:min-w-[110px]">
                {copy.decline}
              </Button>
              <Button size="sm" onClick={() => choose("accepted")} className="md:min-w-[110px]">
                {copy.accept}
              </Button>
            </div>
          </div>

          {/* Optionnel : micro-mention “nécessaires toujours actifs” */}
          <p className="mt-3 text-xs text-muted-foreground">
            Les cookies strictement nécessaires sont toujours actifs pour assurer le bon fonctionnement du site.
          </p>
        </div>
      </div>
    </div>
  )
}
