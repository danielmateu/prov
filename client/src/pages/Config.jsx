import useUser from "@/hooks/useUser"

export default function Config() {

    const { username } = useUser()

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 ">
                <div className="flex flex-col md:flex-row justify-between items-center gap-2">
                    <h1 className="text-3xl font-bold">Configuración de la cuenta de {username}</h1>

                </div>

            </div>
        </div>
    )
}