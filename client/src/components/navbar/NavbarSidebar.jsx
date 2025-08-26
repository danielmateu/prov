'use client'

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useTranslation } from "react-i18next"

export default function NavbarSidebar({ username, role, handleLogout }) {
    const [open, setOpen] = useState(false)
    const location = useLocation()

    const handleLinkClick = () => {
        setOpen(false)
    }

    const isActive = (path) => location.pathname === path

    const linkClass = "w-full text-left px-2 py-1.5 rounded-md transition-colors blindcolor:hover:bg-slate-100 dark:hover:bg-slate-700 dark:hover:text-slate-200 dark:hover:border-1 dark:border-transparent hover:bg-slate-100 hover:text-slate-900 hover:border-1 border-transparent"
    const activeLinkClass = "bg-slate-300  dark:bg-purple-500 dark:text-slate-100 blindcolor:border-2 blindcolor:border-black blindcolor:text-black blindcolor:bg-white"

    const NavLink = ({ to, children }) => (
        <Link
            onClick={handleLinkClick}
            to={to}
            className={cn(linkClass, isActive(to) && activeLinkClass)}
        >
            {children}
        </Link>
    )

    const { t } = useTranslation()

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <img src="/rapitecnic-sin-letras.png" alt="logo web" className="md:hidden w-10 cursor-pointer blindcolor:sepia" />
            </SheetTrigger>
            <SheetContent className="w-72 bg-slate-200 dark:bg-slate-800" side="left">
                <SheetHeader>
                    <SheetTitle>
                        <div className="flex gap-2 items-center">
                            <img src="/rapitecnic-sin-letras.png" alt="logo web" className="w-10 h-10 cursor-pointer blindcolor:sepia" />
                            <div className="flex flex-col items-start">
                                <p className="dark:text-white text-lg font-bold">
                                    RAPI<span className="text-purple-800 dark:text-purple-500 font-medium blindcolor:sepia">TECNIC</span>
                                </p>
                                <p className="text-sm font-semibold text-slate-600 italic dark:text-slate-400">
                                    Servicio Técnico Integral
                                </p>
                            </div>
                        </div>
                    </SheetTitle>
                    <SheetDescription className="gap-2 dark:text-slate-300">
                        {username} <span className="text-slate-400 text-sm">{role}</span>
                    </SheetDescription>
                </SheetHeader>
                <Separator className="mt-2" />
                <div className="flex flex-col items-start gap-1 pt-4 text-sm">
                    <NavLink to="/inicio">
                        {t('Home')}
                    </NavLink>
                    <NavLink to="/asistencia">
                        {t('AssistanceServices')}
                    </NavLink>
                    <NavLink to="/resumen">
                        {/* Mis gestiones */}
                        {t('MyServices')}
                    </NavLink>
                    <NavLink to="/sats">
                        SATS
                    </NavLink>
                    <Separator className="my-2 bg-black" />
                </div>
                <Button
                    className="group mt-4 w-full justify-start dark:bg-slate-700 hover:dark:bg-slate-600 dark:text-slate-200"
                    onClick={() => {
                        handleLogout()
                        handleLinkClick()
                    }}
                >
                    <p>Cerrar sesión</p>
                    <LogOut className="ml-auto group-hover:translate-x-1 transition" />
                </Button>
            </SheetContent>
        </Sheet>
    )
}