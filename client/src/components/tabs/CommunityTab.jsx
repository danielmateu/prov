import React from 'react';
import { useTranslation } from 'react-i18next';

import { Globe, MessageCircle, Share2 } from 'lucide-react';
import ToggleSwitch from '../ToggleSwitch';

const CommunityTab = () => {
    const { t } = useTranslation();

    return (
        <div className="py-6 space-y-8">
            <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Globe size={20} className="text-primary-600 dark:text-primary-400" />
                    {/* {t('Visibility')} */}
                    Visibilidad
                </h3>
                <div className="space-y-4">
                    <ToggleSwitch
                        checked={true}
                        onChange={() => { }}
                        // label={t('PublicProfile')}
                        label={'Perfil público'}
                        // description={t('PublicProfileDesc')}
                        description={'Descripción del perfil público'}
                    />
                    <ToggleSwitch
                        checked={false}
                        onChange={() => { }}
                        // label={t('ShowActivity')}
                        label={'Mostrar actividad'}
                        // description={t('ShowActivityDesc')}
                        description={'Descripción de mostrar actividad'}
                    />
                </div>
            </div>

            <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <MessageCircle size={20} className="text-primary-600 dark:text-primary-400" />
                    {/* {t('Interactions')} */}
                    Interacciones
                </h3>
                <div className="space-y-4">
                    <ToggleSwitch
                        checked={true}
                        onChange={() => { }}
                        // label={t('AllowComments')}
                        label={'Permitir comentarios'}
                        // description={t('AllowCommentsDesc')}
                        description={'Descripción de permitir comentarios'}
                    />
                    <ToggleSwitch
                        checked={true}
                        onChange={() => { }}
                        // label={t('AllowMessages')}
                        label={'Permitir mensajes'}
                        // description={t('AllowMessagesDesc')}
                        description={'Descripción de permitir mensajes'}
                    />
                </div>
            </div>

            <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Share2 size={20} className="text-primary-600 dark:text-primary-400" />
                    {/* {t('Sharing')} */}
                    Compartir
                </h3>
                <div className="space-y-4">
                    <ToggleSwitch
                        checked={true}
                        onChange={() => { }}
                        // label={t('AllowSharing')}
                        label={'Permitir compartir'}
                        // description={t('AllowSharingDesc')}
                        description={'Descripción de permitir compartir'}
                    />
                </div>
            </div>
        </div>
    );
};

export default CommunityTab;