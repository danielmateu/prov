'use client';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button";
import { Eye, Moon, Sun } from "lucide-react";
import { useTheme } from "../theme-provider";
import { useTranslation } from "react-i18next";

export default function NavbarMode() {
    const { setTheme, theme } = useTheme()
    const { t } = useTranslation()

    return (
        <div className="flex flex-col items-center gap-2">
            <DropdownMenu

            >
                <DropdownMenuTrigger asChild
                    className=""
                >
                    <Button variant="outline" size="icon">
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <Eye className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all blindcolor:rotate-0 blindcolor:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                        {/* Claro */}
                        {t('Light')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                        {/* Oscuro */}
                        {t('Dark')}
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem onClick={() => setTheme("blindcolor")}>
                    Sin color
                </DropdownMenuItem> */}
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                        Sistema
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            {/* <p>{theme}</p>
            <p>
                Has seleccionado el tema: {theme === "light" ? t('Light') : theme === "dark" ? t('Dark') : theme === "blindcolor" ? t('BlindColor') : t('System')}
            </p> */}
        </div>
    );
}
