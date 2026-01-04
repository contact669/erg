

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
    FileText,
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
import { useAuth, useUser, useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { collection, query, where, orderBy } from 'firebase/firestore';
import { useMemo, useState, useEffect } from "react";
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Skeleton } from "@/components/ui/skeleton";

const ADMIN_UID = "pHcnP0Mc32frrhPRzTT2nFwCxno1";

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
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const isActive = isClient && pathname === href;

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

function toDateSafe(value: any): Date | null {
    if (value?.toDate && typeof value.toDate === 'function') return value.toDate();
    if (value instanceof Date) return value;
    if (typeof value === 'string' || typeof value === 'number') {
        const d = new Date(value);
        return isNaN(d.getTime()) ? null : d;
    }
    return null;
}

function Notifications() {
    const { user } = useUser();
    const firestore = useFirestore();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const isAdmin = useMemo(() => user?.uid === ADMIN_UID, [user]);

    const requestsQuery = useMemoFirebase(() => {
        if (!firestore || !isAdmin) return null;
        return query(
            collection(firestore, 'quoteRequests'),
            where('status', '==', 'Nouvelle Demande'),
            orderBy('createdAt', 'desc')
        );
    }, [firestore, isAdmin]);

    const { data: newRequests } = useCollection(requestsQuery);

    const hasNewRequests = isClient && newRequests && newRequests.length > 0;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative rounded-full">
                    <Bell className="h-5 w-5" />
                    {hasNewRequests && (
                        <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 justify-center p-0 text-xs">
                            {newRequests.length}
                        </Badge>
                    )}
                    <span className="sr-only">Notifications</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Nouvelles Demandes</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {hasNewRequests ? (
                    newRequests.map((req: any) => {
                        const createdAt = toDateSafe(req.createdAt);
                        return (
                            <DropdownMenuItem key={req.id} asChild className="cursor-pointer">
                                <Link href="/dashboard/demandes">
                                    <div className="flex flex-col">
                                        <span className="font-semibold">{req.clientName}</span>
                                        <span className="text-xs text-muted-foreground line-clamp-1">{req.projectDescription}</span>
                                        {createdAt && isClient && (
                                            <span className="text-xs text-muted-foreground">
                                                {formatDistanceToNow(createdAt, { addSuffix: true, locale: fr })}
                                            </span>
                                        )}
                                    </div>
                                </Link>
                            </DropdownMenuItem>
                        )
                    })
                ) : (
                    <DropdownMenuItem disabled>Aucune nouvelle demande</DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/dashboard/demandes" className="font-semibold text-accent justify-center">Voir toutes les demandes</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function UserProfileButton() {
    const auth = useAuth();
    const { user, isUserLoading } = useUser();
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleSignOut = async () => {
        if (!auth) return;
        await auth.signOut();
        router.push('/');
    };

    const userAvatar = PlaceHolderImages.find(p => p.id === 'founder-1');

    if (isUserLoading || !isClient) {
        return <Skeleton className="h-8 w-8 rounded-full" />;
    }

    return (
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
            {isClient && (
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
            )}
        </DropdownMenu>
    )
}

export default function DashboardSidebar() {
    const auth = useAuth();
    const router = useRouter();

    const handleSignOut = async () => {
        if (!auth) return;
        await auth.signOut();
        router.push('/');
    };

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
                    <Notifications />
                    <UserProfileButton />
                </div>
            </header>
        </>
    );
}
