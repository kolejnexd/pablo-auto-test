import { getTranslations } from '../lib/i18n';
import { getServerLocale } from '../lib/serverLocale';
import { Button } from './Button';
import { company } from '../lib/siteConfig';

export default function MobileStickyBar() {
    const locale = getServerLocale();
    const t = getTranslations(locale);

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex h-16 w-full gap-0 md:hidden">
            <Button
                href={`tel:${company.phone.replace(/[^0-9+]/g, '')}`}
                variant="primary"
                className="flex-1 rounded-none text-sm"
            >
                <span className="mr-2">📞</span>
                {t.common.callNow}
            </Button>
            <Button
                href={`https://wa.me/${company.phone.replace(/[^0-9]/g, '')}?text=SOS`}
                variant="primary-blue"
                className="flex-1 rounded-none text-sm"
            >
                <span className="mr-2">📍</span>
                {t.common.whatsappAction}
            </Button>
        </div>
    );
}
