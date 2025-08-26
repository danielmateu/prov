import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const ModuleCard = ({ title, icon, path, description = '' }) => {
    const location = useLocation();

    return (
        <Link
            to={path}
            className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:via-blue-500/10 group-hover:to-blue-500/5 transition-all duration-500"></div>
            <div className={cn(
                "px-4 py-[22px] flex items-center justify-center gap-2 w-auto lg:w-44",
                location.pathname === path ? "bg-gray-100 dark:bg-gray-700" : "bg-white dark:bg-gray-800"
            )}>
                <div className="text-blue-500 dark:text-blue-400 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    {icon}
                </div>
                <h3 className="hidden lg:block text-xl font-semibold text-gray-900 dark:text-white">
                    {title}
                </h3>
                <div className="absolute bottom-2 right-4 opacity-0 transform translate-x-4 group-hover:opacity-100 sm:group-hover:translate-x-0 transition-all duration-300 group-hover:translate-x-[8px]">
                    <ArrowRight className="text-blue-500 dark:text-blue-400" size={16} />
                </div>
            </div>
        </Link>
    );
};

export default ModuleCard;