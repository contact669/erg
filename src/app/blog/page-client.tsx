"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import CtaBanner from "@/app/_components/cta-banner"
import Breadcrumbs from "@/components/breadcrumbs"
import AnimatedSection from "@/components/animated-section"
import { GoogleIcon } from "@/components/icons"

import { blogPosts } from "@/lib/data"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Calendar,
  User,
  Sparkles,
  BookOpen,
  Clock,
  ChevronRight,
  Tag,
  CheckCircle2,
  Phone
} from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

export default function BlogPage() {
  const [selectedTag, setSelectedTag] = useState<string>("Tous")

  // Extract unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>()
    blogPosts.forEach((post) => {
      post.tags?.forEach((t) => tagsSet.add(t))
    })
    return ["Tous", ...Array.from(tagsSet)]
  }, [])

  // Filter posts
  const filteredPosts = useMemo(() => {
    if (selectedTag === "Tous") return blogPosts
    return blogPosts.filter((post) => post.tags?.includes(selectedTag))
  }, [selectedTag])

  const featuredPost = filteredPosts[0] || blogPosts[0]
  const otherPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : []
  const featuredPostImage = PlaceHolderImages.find((p) => p.id === featuredPost.featuredImageId)

  return (
    <div className="flex min-h-screen flex-col bg-slate-50/50">
      <SiteHeader />

      <main className="flex-grow">
        {/* HERO SECTION — Premium Light Theme */}
        <section className="relative isolate overflow-hidden bg-slate-50 border-b border-slate-200/80 py-12 md:py-18 lg:py-20">
          {/* Subtle Ambient Glow */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-slate-50/80 to-slate-50" />
            <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
            <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-slate-200/40 blur-3xl" />
          </div>

          <div className="container relative z-10">
            <div className="mx-auto max-w-4xl text-center space-y-6">
              <div className="flex items-center justify-center">
                <Breadcrumbs />
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-4 py-1.5 text-xs sm:text-sm font-semibold text-amber-700 shadow-sm">
                  <BookOpen className="h-4 w-4 text-amber-600" /> Le Journal & Guides ERG Rénovation
                </span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=ERG-Entreprise+de+R%C3%A9novation+Appartement+%26+Salle+de+Bains+%C3%A0+Paris+et+%C3%8Ele-de-France"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3.5 py-1 text-xs text-slate-800 shadow-sm hover:bg-white"
                >
                  <GoogleIcon className="h-4 w-4" />
                  <span className="font-bold text-amber-600">Avis clients</span>
                  <span className="text-slate-500">• Expertise BTP Paris</span>
                </a>
              </div>

              <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                Conseils, Guides & Inspiration : <br />
                <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent">
                  Réussir Votre Rénovation à Paris
                </span>
              </h1>

              <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                Retrouvez les conseils pratiques de nos maîtres d'œuvre pour estimer votre budget, optimiser vos espaces et piloter vos travaux avec sérénité.
              </p>

              {/* Tag Filters Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSelectedTag(tag)}
                    className={[
                      "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border shadow-2xs",
                      selectedTag === tag
                        ? "bg-slate-900 text-white border-slate-900 shadow-md scale-105"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300",
                    ].join(" ")}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED POST & ARTICLES GRID */}
        <AnimatedSection>
          <section className="py-12 md:py-20">
            <div className="container">
              <div className="mx-auto max-w-6xl space-y-12">
                {/* FEATURED ARTICLE CARD */}
                {featuredPost && featuredPostImage && (
                  <Link href={`/blog/${featuredPost.slug}`} className="group block">
                    <Card className="rounded-3xl border border-slate-200 bg-white shadow-xl hover:shadow-2xl hover:border-amber-500/40 transition-all duration-300 overflow-hidden">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                        {/* Image */}
                        <div className="relative h-72 sm:h-96 lg:h-full lg:col-span-7 overflow-hidden bg-slate-100">
                          <Image
                            src={featuredPostImage.imageUrl}
                            alt={featuredPost.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 1024px) 100vw, 60vw"
                            data-ai-hint={featuredPostImage.imageHint}
                            priority
                          />
                          <div className="absolute top-4 left-4 z-20">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500 text-slate-950 px-3.5 py-1 text-xs font-bold shadow-md">
                              <Sparkles className="h-3.5 w-3.5" /> À la Une
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 sm:p-8 lg:p-10 lg:col-span-5 flex flex-col justify-between space-y-6">
                          <div className="space-y-4">
                            {featuredPost.tags && (
                              <div className="flex flex-wrap gap-2">
                                {featuredPost.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-xs font-bold text-slate-700"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}

                            <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors leading-snug">
                              {featuredPost.title}
                            </h2>

                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-4">
                              {featuredPost.description}
                            </p>
                          </div>

                          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
                              <span className="flex items-center gap-1.5">
                                <User className="h-4 w-4 text-amber-600" />
                                {featuredPost.author}
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1.5">
                                <Calendar className="h-4 w-4 text-slate-400" />
                                <time dateTime={featuredPost.date}>
                                  {format(new Date(featuredPost.date), "d MMMM yyyy", { locale: fr })}
                                </time>
                              </span>
                            </div>

                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 group-hover:text-amber-800">
                              Lire l'article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                )}

                {/* ARTICLES GRID */}
                {otherPosts.length > 0 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-headline text-2xl font-bold text-slate-900">
                        Derniers Articles & Guides
                      </h3>
                      <span className="text-xs font-semibold text-slate-500">
                        {otherPosts.length} article{otherPosts.length > 1 ? "s" : ""}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {otherPosts.map((post) => {
                        const postImage = PlaceHolderImages.find((p) => p.id === post.featuredImageId)
                        return (
                          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
                            <Card className="flex flex-col justify-between h-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm hover:shadow-xl hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1.5">
                              <CardContent className="p-0 flex flex-col h-full">
                                {/* Image Container */}
                                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                                  {postImage && (
                                    <Image
                                      src={postImage.imageUrl}
                                      alt={post.title}
                                      fill
                                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                      data-ai-hint={postImage.imageHint}
                                    />
                                  )}
                                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                                    {post.tags && post.tags.length > 0 && (
                                      <span className="rounded-full bg-slate-900/85 backdrop-blur-md px-3 py-1 text-xs font-bold text-white border border-white/20">
                                        {post.tags[0]}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* Content Details */}
                                <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                                  <div className="space-y-2">
                                    <h3 className="font-headline text-xl font-bold tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2">
                                      {post.title}
                                    </h3>
                                    <p className="line-clamp-3 text-xs sm:text-sm leading-relaxed text-slate-600">
                                      {post.description}
                                    </p>
                                  </div>

                                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                                    <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                                      <User className="h-3.5 w-3.5 text-amber-600" />
                                      <span>{post.author}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                                      <time dateTime={post.date}>
                                        {format(new Date(post.date), "d MMM yyyy", { locale: fr })}
                                      </time>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* ADVICE & DEVISS BANNER */}
                <div className="rounded-3xl border border-slate-200 bg-white p-8 md:p-10 shadow-lg relative overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-8 space-y-3">
                      <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/30 px-3.5 py-1 text-xs font-semibold text-amber-700">
                        <Sparkles className="h-4 w-4 text-amber-600" /> Vous avez un projet de rénovation à Paris ?
                      </span>
                      <h3 className="font-headline text-2xl md:text-3xl font-extrabold text-slate-900">
                        Bénéficiez des Conseils d'un Maître d'Œuvre Dédié
                      </h3>
                      <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                        Chaque appartement parisien a ses particularités (murs porteurs, parquets, syndic, conduits). Contactez-nous pour une visite sur site offerte et un chiffrage clair poste par poste.
                      </p>
                    </div>
                    <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
                      <Button
                        asChild
                        size="lg"
                        className="h-12 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-md"
                      >
                        <Link href="/devis">
                          Simuler mon devis gratuit <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="h-12 border-slate-300 text-slate-900 hover:bg-slate-100 rounded-xl"
                      >
                        <a href="tel:+33699961375">
                          <Phone className="mr-2 h-4 w-4 text-amber-600" />
                          06 99 96 13 75
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* CTA BANNER */}
        <CtaBanner />
      </main>

      <SiteFooter />
    </div>
  )
}
