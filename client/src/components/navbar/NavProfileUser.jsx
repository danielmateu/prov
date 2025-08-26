'use client';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CircleUserRound, FileText, HousePlus, LogOut, ReceiptEuro, ShieldCheck, User2, UserRoundPlus, UserPen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils";
import { SettingsGearIcon } from "../Icons/settings-gear";
import { useTranslation } from "react-i18next";
import { useUserInfoStore } from "@/zustand/userInfoStore";
import { useUserPermissions } from "@/hooks/useUserPermissions";

export default function NavProfileUser({ user, role, handleLogout }) {

    // console.log('user', user);
    const location = useLocation();
    const { t } = useTranslation();

    const userInfo = useUserInfoStore((state) => state.userInfo);
    // console.log('userInfo', userInfo);
    const { checkPermission, isSuper, isCallcenter } = useUserPermissions();
    // console.log('isSuperAdmin', isSuperAdmin);

    return (
        <div className="flex items-center gap-4 z-50">
            <div className="flex flex-col items-center justify-center">
                {user && <span className="text-slate-800 dark:text-slate-300 font-bold">{user}</span>}
                {
                    isSuper ?
                        <span className="text-slate-500 dark:text-slate-400 text-xs">{t('SuperAdmin')}</span> :
                        role ?
                            <span className="text-slate-500 dark:text-slate-400 text-xs">{t('Administrator')}</span> :
                            <span className="text-slate-500 dark:text-slate-400 text-xs">{t('User')}</span>

                }
                {/* {role ?
                    <span className="text-slate-500 dark:text-slate-400 text-xs">{t('Administrator')}</span> :
                    <span className="text-slate-500 dark:text-slate-400 text-xs">{t('User')}</span>
                } */}
            </div>

            <Popover>
                <PopoverTrigger asChild>
                    {
                        userInfo?.ProfileImageUrl ?
                            <img
                                src={userInfo.ProfileImageUrl}
                                alt={user}
                                className="w-8 h-8 rounded-full cursor-pointer hover:scale-110 hover:rotate-6 transition hover:shadow-lg hover:shadow-slate-300 dark:hover:shadow-slate-700"
                            /> :
                            <CircleUserRound
                                size={32}
                                className="cursor-pointer"
                            />
                    }
                    {/* <CircleUserRound
                        size={32}
                        className="cursor-pointer"
                    /> */}
                </PopoverTrigger>
                <PopoverContent
                    align="end"
                    side='bottom'
                    className="bg-slate-100 dark:bg-slate-900 w-52"
                >
                    <div className="flex flex-col transition font-semibold space-y-4">
                        <div className="flex items-center gap-3 pb-2 lg:hidden">
                            <p className="text-slate-900 dark:text-foreground font-bold text-xl">{user}</p>
                            <p className="text-slate-500 dark:text-foreground text-sm">{role}</p>
                        </div>

                        <div className="flex flex-col gap-3">
                            {checkPermission('canManageBilling') && (
                                <Link
                                    to="/facturacion"
                                    className={cn("flex items-center justify-between hover:bg-slate-200 rounded-md transition py-2 px-3 hover:text-slate-800 blindcolor:hover:text-white blindcolor:hover:bg-black",
                                        location.pathname === '/facturacion' ? 'bg-slate-200 text-slate-800' : ''
                                    )}
                                >
                                    {t('Billing')}
                                    <ReceiptEuro size={18} />
                                </Link>
                            )}
                            {checkPermission('canManageFiscalData') && (
                                <Link
                                    to="/datos-fiscales"
                                    className={cn("flex items-center justify-between hover:bg-slate-200 rounded-md transition py-2 px-3 hover:text-slate-800 blindcolor:hover:text-white blindcolor:hover:bg-black",
                                        location.pathname === '/datos-fiscales' ? 'bg-slate-200 text-slate-800' : ''
                                    )}
                                >
                                    {t('FiscalData')}
                                    <FileText size={18} />
                                </Link>
                            )}

                            {checkPermission('canCreateUsers') && (
                                <Link
                                    to="/nuevo-usuario"
                                    className={cn("flex items-center justify-between hover:bg-slate-200 rounded-md transition py-2 px-3 hover:text-slate-800 blindcolor:hover:text-white blindcolor:hover:bg-black",
                                        location.pathname === '/nuevo-usuario' ? 'bg-slate-200 text-slate-800' : ''
                                    )}
                                >
                                    {t('AddUser')}
                                    <UserRoundPlus className="w-4 h-4" />
                                </Link>
                            )}
                            {checkPermission('canCreateBusinesses') && (
                                <Button
                                    disabled
                                    variant="ghost"
                                >
                                    <Link
                                        to="/nuevo-negocio"
                                        className={cn("flex items-center gap-10 justify-between hover:bg-slate-200 rounded-md transition py-2 px-3 hover:text-slate-800 blindcolor:hover:text-white blindcolor:hover:bg-black",
                                            location.pathname === '/nuevo-negocio' ? 'bg-slate-200 text-slate-800' : ''
                                        )}
                                    >
                                        {t('AddBusiness')}
                                        <HousePlus className="w-4 h-4" />
                                    </Link>
                                </Button>
                            )}
                            <Link
                                to="/profile"
                                className={cn("hidden items-center justify-between hover:bg-slate-200 rounded-md transition py-2 px-3 hover:text-slate-800 blindcolor:hover:text-white blindcolor:hover:bg-black",
                                    location.pathname === '/profile' ? 'bg-slate-200 text-slate-800' : ''
                                )}
                            >
                                {t('Profile')}
                                <User2 size={18} />
                            </Link>
                        </div>

                        <Separator />
                        <div className="flex flex-col gap-2">
                            {isSuper && (
                                <Link
                                    to="/superadmin"
                                    className={cn("flex items-center justify-between hover:bg-slate-200 rounded-md transition py-2 px-3 hover:text-slate-800 blindcolor:hover:text-white blindcolor:hover:bg-black",
                                        location.pathname === '/superadmin' ? 'bg-slate-200 text-slate-800' : ''
                                    )}
                                >
                                    {t('SuperAdmin')}
                                    <ShieldCheck className="w-4 h-4" />
                                </Link>
                            )}
                            {isCallcenter && (
                                <Link
                                    to="/callcenter"
                                    className={cn("flex items-center justify-between hover:bg-slate-200 rounded-md transition py-2 px-3 hover:text-slate-800 blindcolor:hover:text-white blindcolor:hover:bg-black",
                                        location.pathname === '/callcenter' ? 'bg-slate-200 text-slate-800' : ''
                                    )}
                                >
                                    {t('CallcenterPanel')}
                                    <UserPen className="w-4 h-4" />
                                </Link>
                            )}
                            {/* {role && (
                                <Link
                                    to="/superadmin"
                                    className={cn("flex items-center justify-between hover:bg-slate-200 rounded-md transition py-2 px-3 hover:text-slate-800 blindcolor:hover:text-white blindcolor:hover:bg-black",
                                        location.pathname === '/superadmin' ? 'bg-slate-200 text-slate-800' : ''
                                    )}
                                >
                                    {t('SuperAdmin')}
                                    <ShieldCheck className="w-4 h-4" />
                                </Link>
                            )} */}
                            <Link
                                to="/ajustes"
                                className={cn("flex items-center justify-between hover:bg-slate-200 rounded-md transition py-2 px-3 hover:text-slate-800 blindcolor:hover:text-white blindcolor:hover:bg-black",
                                    location.pathname === '/ajustes' ? 'bg-slate-200 text-slate-800' : ''
                                )}
                            >
                                {t('Settings')}
                                <SettingsGearIcon />
                            </Link>
                        </div>

                        <Button
                            className='group dark:bg-slate-400 hover:dark:bg-slate-900 dark:hover:text-slate-200'
                            onClick={handleLogout}
                        >
                            <p>{t('LogOut')}</p>
                            <LogOut className="group-hover:translate-x-4 transition scale-75" />
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}