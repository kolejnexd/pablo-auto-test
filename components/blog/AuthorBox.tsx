import { Locale } from "../../lib/routes";

const AUTHOR_DATA = {
    de: {
        label: "Über den Autor",
        role: "Mobilitätsexperte seit 2018",
        bio: "Inhaber und Experte seit 2018. Spezialisiert auf Pannenhilfe, Fahrzeughandel und internationale Logistik (AT-PL).",
    },
    pl: {
        label: "O Autorze",
        role: "Ekspert Mobilności od 2018",
        bio: "Właściciel i ekspert od 2018 roku. Specjalizacja: pomoc drogowa, handel samochodami i logistyka międzynarodowa (AT-PL).",
    },
    en: {
        label: "About the Author",
        role: "Mobility Expert since 2018",
        bio: "Owner and expert since 2018. Specialized in roadside assistance, car trading, and international logistics (AT-PL).",
    },
};

export default function AuthorBox({ locale = "de" }: { locale?: Locale }) {
    const t = AUTHOR_DATA[locale] || AUTHOR_DATA.de;

    return (
        <div className="my-8 flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 p-6 shadow-sm">
            <div className="flex-shrink-0">
                <div className="h-16 w-16 overflow-hidden rounded-full bg-slate-200">
                    <div className="flex h-full w-full items-center justify-center bg-brand-primary text-xl font-bold text-white">
                        PF
                    </div>
                </div>
            </div>
            <div>
                <p className="text-sm font-medium text-slate-500">{t.label}</p>
                <h4 className="text-lg font-bold text-slate-900">Paweł Bogusław Ferdynus</h4>
                <p className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-1">
                    {t.role}
                </p>
                <p className="text-sm text-slate-600">
                    {t.bio}
                </p>
            </div>
        </div>
    );
}
