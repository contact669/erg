
'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ErgLogo } from "@/components/icons";
import {
    PanelLeft,
    LayoutDashboard,
    Users,
    HardHat,
    FileText,
    Settings,
    LogOut,
    Construction,
    Search,
    Bell,
    Receipt,
    MailQuestion
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth, useUser } from "@/firebase";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Tableau de Bord" },
    { href: "/dashboard/demandes", icon: MailQuestion, label: "Demandes" },
    { href: "/dashboard/devis", icon: FileText, label: "Devis" },
    { href: "/dashboard/factures", icon: Receipt, label: "Factures" },
    { href: "/dashboard/chantiers", icon: Construction, label: "Chantiers" },
    { href: "/dashboard/clients", icon: Users, label: "Clients" },
];

function NavLink({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string; }) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Link
                    href={href}
                    className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8",
                        isActive
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{label}</span>
                </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{label}</TooltipContent>
        </Tooltip>
    );
}

export default function DashboardSidebar() {
    const auth = useAuth();
    const { user } = useUser();
    const router = useRouter();

    const handleSignOut = async () => {
        if (!auth) return;
        await auth.signOut();
        router.push('/');
    };
    
    const userAvatar = PlaceHolderImages.find(p => p.id === 'founder-1');

    return (
        <>
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                <TooltipProvider>
                    <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                        <Link
                            href="/"
                            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                        >
                            <ErgLogo className="h-8 w-8 text-background" />
                            <span className="sr-only">ERG</span>
                        </Link>
                        {navItems.map((item) => (
                            <NavLink key={item.href} {...item} />
                        ))}
                    </nav>
                    <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    onClick={handleSignOut}
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                >
                                    <LogOut className="h-5 w-5" />
                                    <span className="sr-only">Déconnexion</span>
                                </button>
                            </TooltipTrigger>
                            <TooltipContent side="right">Déconnexion</TooltipContent>
                        </Tooltip>
                    </nav>
                </TooltipProvider>
            </aside>
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline" className="sm:hidden">
                            <PanelLeft className="h-5 w-5" />
                            <span className="sr-only">Ouvrir le menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="sm:max-w-xs">
                        <nav className="grid gap-6 text-lg font-medium">
                            <Link
                                href="/"
                                className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                            >
                                <ErgLogo className="h-8 w-8 text-background" />
                                <span className="sr-only">ERG</span>
                            </Link>
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <item.icon className="h-5 w-5" />
                                    {item.label}
                                </Link>
                            ))}
                             <button
                                onClick={handleSignOut}
                                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                            >
                                <LogOut className="h-5 w-5" />
                                Déconnexion
                            </button>
                        </nav>
                    </SheetContent>
                </Sheet>

                <div className="relative ml-auto flex-1 md:grow-0">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Rechercher..."
                        className="w-full rounded-lg bg-secondary pl-8 md:w-[200px] lg:w-[336px]"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <ModeToggle />
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <Bell className="h-5 w-5" />
                        <span className="sr-only">Notifications</span>
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                           <Avatar className="h-8 w-8">
                               {userAvatar && <AvatarImage src={user?.photoURL || userAvatar.imageUrl} alt={user?.displayName || 'Avatar utilisateur'} />}
                               <AvatarFallback>
                                   {user?.email?.charAt(0).toUpperCase() || 'U'}
                               </AvatarFallback>
                           </Avatar>
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{user?.displayName || user?.email}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/dashboard/profil">Profil</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                           <Link href="/dashboard/parametres">Paramètres</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSignOut}>Déconnexion</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
        </>
    );
}
