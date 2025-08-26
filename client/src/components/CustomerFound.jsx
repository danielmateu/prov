import { User } from "lucide-react";

export default function CustomerFound({ customerData }) {
    return (
        <div className="mb-8 p-4 dark:bg-green-900 border border-green-200 rounded-lg">
            <div className="flex items-center mb-3">
                <User className="w-5 h-5 text-green-600 mr-2" />
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-50">Cliente Encontrado</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                    <p><span className="font-medium">Nombre:</span> {customerData.Name} {customerData.Surname} {customerData.SecondSurname}</p>
                    <p><span className="font-medium">Email:</span> {customerData.Email}</p>
                    <p><span className="font-medium">ID Cliente:</span> {customerData.CustomerID}</p>
                </div>
                <div>
                    <p><span className="font-medium">Dirección:</span> {customerData.Address} {customerData.AddressNext}</p>
                    <p><span className="font-medium">Ciudad:</span> {customerData.City}</p>
                    <p><span className="font-medium">CP:</span> {customerData.ZipCode}</p>
                </div>
            </div>
        </div>
    );
}