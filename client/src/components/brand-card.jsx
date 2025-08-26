
import { Mail, Phone } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { useTranslation } from 'react-i18next';

const BrandCard = ({ brand, onClick, index }) => {

    const { t } = useTranslation();

    return (
        <Card
            className="overflow-hidden hover:shadow-lg transition cursor-pointer group dark:hover:bg-slate-700 content-transition brand-info"
            onClick={onClick}
            data-index={index % 4}
        >
            <div className="p-6">
                <CardHeader className="flex items-center mb-4">
                    {brand.logo ? (
                        <img
                            src={brand.logo}
                            alt={`${brand.name} logo`}
                            className="aspect-retro object-cover rounded dark:bg-slate-200 dark:px-2 dark:py-1"
                            style={{ viewTransitionName: `brand-logo-${brand.id}` }}
                        />
                    ) : (
                        <CardTitle
                            className=""
                            style={{ viewTransitionName: `brand-logo-${brand.id}` }}
                        >
                            {brand.name}
                        </CardTitle>
                    )}
                </CardHeader>
                <CardDescription
                    className="text-md font-bold"
                    style={{ viewTransitionName: `brand-name-${brand.id}` }}
                >
                    {brand.name}
                </CardDescription>

                {brand.contacts && brand.contacts.length > 0 && (
                    <CardContent className="pl-2">
                        {/* <h3 className="text-sm font-semibold text-gray-500 mb-2 dark:group-hover:text-slate-100 transition">
                            Contactos principales:
                        </h3> */}
                        <h3 className="text-sm font-semibold text-gray-500 mb-2 dark:group-hover:text-slate-100 transition">
                            {t('MainContacts')}
                        </h3>
                        <div>
                            {brand.contacts.slice(0, 1).map((contact, index) => (
                                <div key={index} className="text-sm">
                                    {contact.name && <p className="font-medium">{contact.name}</p>}
                                    {contact.phone && (
                                        <p className="flex items-center">
                                            <Phone className="mr-1" size={12} /> {contact.phone}
                                        </p>
                                    )}
                                    {contact.email && (
                                        <p className="flex items-center">
                                            <Mail className="mr-1" size={12} /> {contact.email}
                                        </p>
                                    )}
                                </div>
                            ))}
                            {brand.contacts.length > 1 && (
                                // <p className="text-sm text-gray-500 mt-1 dark:group-hover:text-blue-500 transition group-hover:text-blue-500">
                                //     +{brand.contacts.length - 1} contactos más
                                // </p>
                                <p className="text-sm text-gray-500 mt-1 dark:group-hover:text-blue-500 transition group-hover:text-blue-500">
                                    +{t('MoreContacts', { count: brand.contacts.length })}
                                </p>
                            )}
                        </div>
                    </CardContent>
                )}
            </div>
        </Card>
    );
};

export default BrandCard;