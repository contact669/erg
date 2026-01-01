"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

type ThemeValue = "light" | "dark" | "system"

export function ModeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()

  const items: Array<{
    value: ThemeValue
    label: string
    icon: React.ElementType
  }> = [
    { value: "light", label: "Clair", icon: Sun },
    { value: "dark", label: "Sombre", icon: Moon },
    { value: "system", label: "Système", icon: Monitor },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("relative", className)}
          aria-label="Changer le thème"
        >
          {/* Soleil / Lune animés (propre, discret) */}
          <Sun className="h-[1.15rem] w-[1.15rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.15rem] w-[1.15rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Changer le thème</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-[190px]">
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Apparence
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {items.map((it) => {
          const Icon = it.icon
          const active = theme === it.value

          return (
            <DropdownMenuItem
              key={it.value}
              onClick={() => setTheme(it.value)}
              className={cn(
                "flex items-center justify-between gap-3",
                active && "bg-accent/10"
              )}
            >
              <span className="inline-flex items-center gap-2">
                <Icon className="h-4 w-4 text-muted-foreground" />
                {it.label}
              </span>

              {/* Indicateur actif (sans dépendance supplémentaire) */}
              {active ? (
                <span
                  className="h-2 w-2 rounded-full bg-accent"
                  aria-label="Actif"
                />
              ) : (
                <span className="h-2 w-2 rounded-full bg-transparent" />
              )}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
