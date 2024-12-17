import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

import { Button } from '@root/components/ui';
import { routes } from '@root/router/routes';
import { useAuthStore } from '@root/store';

import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ProfileTools: FC = () => {
    const { t } = useTranslation();
    const [isFollow, setIsFollow] = useState(false);
    const { username } = useParams();
    const { isMe } = useAuthStore();
    const me = isMe(username || '');

    const handleSubscribe = () => {
        console.log('Subscribe');
        setIsFollow((prev) => !prev);
    };

    return (
        <div className="flex flex-col gap-4 items-end">
            {me && (
                <Link
                    to={routes.settings}
                    className="flex items-center gap-2 link-thirtiary"
                >
                    <FontAwesomeIcon className="sm:text-2xl" icon={faGear} />
                    <span className=" sm:hidden">{t('General.settings')}</span>
                </Link>
            )}

            {!me && (
                <Button
                    onClick={handleSubscribe}
                    variant={isFollow ? 'primary' : 'accent'}
                >
                    {t(`General.${isFollow ? 'unfollow' : 'follow'}`)}
                </Button>
            )}
        </div>
    );
};
