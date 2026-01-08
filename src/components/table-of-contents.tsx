
"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import type { TocSection } from "@/lib/types"

interface TableOfContentsProps {
  sections: TocSection[]
}

export default function TableOfContents({ sections }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-20% 0px -75% 0px" } // Déclenche quand l'élément est dans le quart supérieur de l'écran
    )

    const elements = sections.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    
    elements.forEach((el) => observer.observe(el))

    return () => elements.forEach((el) => observer.unobserve(el))
  }, [sections])

  if (!sections || sections.length === 0) {
    return null
  }

  return (
    <Card className="bg-secondary/40">
      <CardHeader>
        <CardTitle className="font-headline text-base">
          Dans cet article
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={cn(
                  "block text-muted-foreground transition-colors hover:text-primary",
                  activeId === section.id && "font-semibold text-accent",
                  section.level === 'h3' && "pl-4"
                )}
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
