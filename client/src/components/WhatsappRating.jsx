import { Button } from "@/components/ui/button"

// import { WhatsappIcon } from "lucide-react"
import WhatsAppIcon from '../../public/icons/whatsapp-icon'
import useFormStore from "@/zustand/formStore"
import { cn } from "@/lib/utils"


export function WhatsAppRating({ phoneNumber, userName, customerName, isEditing = false }) {

    const { isWhatsAppSelected, setIsWhatsAppSelected, setTotalPoints } = useFormStore()

    const generateWhatsAppLink = () => {
        const message = encodeURIComponent(
            `Buenos días, soy ${userName} tal y como hemos hablado anteriormente. ` +
            `Agradecería que valorara la atención recibida por mi parte en el link adjunto. ` +
            `Le pediría que hiciera constar mi nombre ya que es muy importante para mi trabajo. ` +
            `Muchas gracias, ${customerName}.\n\n` +
            `✅ Enlace para valorar nuestra atención: https://rapitecnic.com/whatsapp/\n\n` +
            `Para cualquier trámite, gestión o consulta puede contactar al teléfono ☎ 93 737 62 93 de ` +
            `⏰ Lunes a Jueves de 9 a 17 y Viernes de 9 a 13h.`
        )

        return `https://wa.me/${phoneNumber}?text=${message}`
    }

    return (
        <Button
            variant="outline"
            className={cn("gap-2 text-green-600 hover:text-green-700 hover:bg-green-50 blindcolor:bg-white blindcolor:text-black",
                isWhatsAppSelected && "bg-green-50"
            )}
            onClick={() => {
                window.open(generateWhatsAppLink(), '_blank');
                setIsWhatsAppSelected(!isWhatsAppSelected);
            }}
            type="button"
            disabled={!isEditing}
        >
            {/* <WhatsappIcon className="h-4 w-4" /> */}
            <WhatsAppIcon className="h-4 w-4" />
            Solicitar valoración
            <span>(+1)</span>
        </Button>
    )
}