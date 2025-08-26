import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useTranslation } from "react-i18next"
import { useTour } from "@reactour/tour"
import { useTourSteps } from "@/hooks/useTourSteps"

export default function CalendarRange({ date, setDate }) {
    const formatDate = (date) => {
        return format(date, "d 'de' MMMM", { locale: es })
    }

    const steps = useTourSteps();
    const { isOpen, currentStep, setIsOpen, setCurrentStep, setSteps } = useTour()

    const { t } = useTranslation()

    return (
        <div className={""}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn("justify-start text-left font-normal overflow-hidden w-full md:w-fit", !date && "text-muted-foreground")}
                        onClick={() => {
                            setCurrentStep(2)
                        }}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {formatDate(date.from)} - {formatDate(date.to)}
                                </>
                            ) : (
                                formatDate(date.from)
                            )
                        ) : (
                            // <span>Selecciona una fecha</span>
                            <span>{t("SelectDate")}</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 date-picker" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                        locale={es}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

