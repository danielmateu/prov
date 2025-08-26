import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchBar({ searchQuery, handleSearch, placeHolder }) {
    return (
        <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
                type="text"
                placeholder={placeHolder ? `Buscar ${placeHolder}` : ""}
                value={searchQuery}
                onChange={handleSearch}
                className="pl-8 border-gray-300"
            />
        </div>
    );
}
