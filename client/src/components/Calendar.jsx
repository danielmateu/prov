import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function DatePickerCalendar({ date, onDateSelect }) {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const handleDateSelect = (selectedDate) => {
        onDateSelect(selectedDate || date);
        setIsPopoverOpen(false);
    };

    return (
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    onClick={() => setIsPopoverOpen(true)}
                    className="w-full font-normal border-gray-300"
                >
                    <CalendarIcon className="h-4 w-4" />
                    {date ? format(date, 'dd-MM-yyyy', { locale: es }) : <span>Selecciona una fecha</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    initialFocus
                    locale={es}
                />
            </PopoverContent>
        </Popover>
    );
};