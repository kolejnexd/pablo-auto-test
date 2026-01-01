export type Locale = 'de' | 'pl' | 'en';

export interface FAQItem {
    id: string;
    category: 'abschleppdienst' | 'autohandel' | 'vermietung' | 'transport';
    question: Record<Locale, string>;
    answer: Record<Locale, string>;
}

export const FAQ_SNIPPETS: FAQItem[] = [
    // KATEGORIA 1: ABSCHLEPPDIENST
    {
        id: 'faq-towing-1',
        category: 'abschleppdienst',
        question: {
            de: 'Ist das Abschleppen eines beschädigten Tesla sicher für die Hochvoltbatterie?',
            pl: 'Czy holowanie uszkodzonej Tesli na lawecie jest bezpieczne dla baterii?',
            en: 'Is towing a damaged Tesla on a flatbed safe for the high-voltage battery?'
        },
        answer: {
            de: 'Ja, aber nur mit speziellem Equipment. Pablo e.U. nutzt isolierte Verladesysteme, um Schäden am Hochvoltsystem von Elektrofahrzeugen (Tesla, VW ID) zu verhindern. Unser Team in Sollenau ist für den Umgang mit beschädigten Akkus zertifiziert.',
            pl: 'Tak, ale tylko specjalistycznym sprzętem. W Pablo e.U. używamy izolowanych systemów załadunku, aby chronić system wysokiego napięcia w autach elektrycznych (Tesla, VW ID). Nasz zespół w Sollenau posiada certyfikaty do obsługi uszkodzonych baterii.',
            en: 'Yes, but only with specialized equipment. Pablo e.U. uses isolated loading systems to prevent damage to the high-voltage systems of EVs (Tesla, VW ID). Our team in Sollenau is certified to handle damaged batteries.'
        }
    },
    {
        id: 'faq-towing-2',
        category: 'abschleppdienst',
        question: {
            de: 'Wie lange ist die Wartezeit auf der A2 zwischen Baden und Wien im Berufsverkehr?',
            pl: 'Jak długo trzeba czekać na lawetę na autostradzie A2 między Baden a Wiedniem w godzinach szczytu?',
            en: 'How long is the wait time for a tow truck on the A2 between Baden and Vienna during rush hour?'
        },
        answer: {
            de: 'Wir garantieren eine Ankunft in 30 Minuten. Dank unseres Standorts in Sollenau (direkt an der A2) ist Pablo e.U. oft schneller vor Ort als Dienste aus dem Wiener Zentrum. Wir nennen Ihnen am Telefon sofort die exakte Ankunftszeit.',
            pl: 'Gwarantujemy dojazd w 30 minut. Dzięki bazie w Sollenau (bezpośrednio przy A2), Pablo e.U. dociera na miejsce szybciej niż serwisy z centrum Wiednia. Już podczas rozmowy telefonicznej podajemy dokładny czas przybycia.',
            en: 'We guarantee arrival within 30 minutes. Thanks to our Sollenau location (directly on the A2), Pablo e.U. often arrives faster than services from Vienna city center. We give you an exact arrival time immediately over the phone.'
        }
    },
    {
        id: 'faq-towing-3',
        category: 'abschleppdienst',
        question: {
            de: 'Ich habe Benzin statt Diesel getankt (Wiener Neustadt) – muss ich zur Werkstatt abgeschleppt werden?',
            pl: 'Zatankowałem benzynę do diesla w Wiener Neustadt – czy muszę holować auto do warsztatu?',
            en: 'I put gasoline in a diesel car in Wiener Neustadt – do I need to be towed to a garage?'
        },
        answer: {
            de: 'Nein, starten Sie den Motor nicht! Pablo e.U. bietet einen mobilen Abpump-Service direkt an der Tankstelle in Wiener Neustadt und Umgebung. Wir reinigen den Tank vor Ort, was Ihnen Zeit und teure Abschleppkosten spart.',
            pl: 'Nie, nie uruchamiaj silnika! Pablo e.U. oferuje mobilną usługę wypompowywania paliwa bezpośrednio na stacji w Wiener Neustadt i okolicach. Czyścimy bak na miejscu, co oszczędza Twój czas i koszt holowania do warsztatu.',
            en: 'No, do not start the engine! Pablo e.U. offers a mobile fuel pumping service directly at the gas station in Wiener Neustadt and surroundings. We clean the tank on-site, saving you time and expensive towing costs.'
        }
    },
    {
        id: 'faq-towing-4',
        category: 'abschleppdienst',
        question: {
            de: 'Was kostet das Abschleppen am Sonntag ohne Schutzbrief (Assistance)?',
            pl: 'Ile kosztuje holowanie powypadkowe w niedzielę, jeśli nie mam ubezpieczenia Assistance?',
            en: 'How much does accident towing cost on Sunday without roadside assistance coverage?'
        },
        answer: {
            de: 'Bei Pablo e.U. erhalten Sie vorab einen transparenten Fixpreis. Wir verrechnen keine versteckten Wochenendzuschläge. Zudem unterstützen wir Sie bei der Schadensabwicklung, falls der Unfallgegner schuld ist.',
            pl: 'W Pablo e.U. otrzymasz z góry transparentną, stałą cenę. Nie doliczamy ukrytych opłat za weekendy. Dodatkowo pomagamy w likwidacji szkody – jeśli sprawcą jest inny kierowca.',
            en: 'At Pablo e.U., you get a transparent fixed price upfront. We charge no hidden weekend surcharges. Additionally, we assist with claims handling if the other driver is at fault.'
        }
    },
    {
        id: 'faq-towing-5',
        category: 'abschleppdienst',
        question: {
            de: 'Können Sie einen tiefergelegten Sportwagen ohne Schäden verladen?',
            pl: 'Czy laweta zabierze obniżone auto sportowe bez uszkodzenia zderzaka?',
            en: 'Can you load a lowered sports car without damaging the bumper?'
        },
        answer: {
            de: 'Ja, wir sind auf tiefergelegte Fahrzeuge spezialisiert. Pablo e.U. nutzt spezielle flache Auffahrtsrampen und Hebetechnik, um Sportwagen ohne Kontaktschäden am Unterboden zu verladen.',
            pl: 'Tak, specjalizujemy się w autach obniżonych. Pablo e.U. używa specjalnych płaskich najazdów i podnośników, aby załadować auta sportowe bez uszkodzenia podwozia czy zderzaka.',
            en: 'Yes, we specialize in lowered vehicles. Pablo e.U. uses special flat ramps and lifting technology to load sports cars without damaging the underbody.'
        }
    },

    // KATEGORIA 2: AUTOHANDEL
    {
        id: 'faq-sales-1',
        category: 'autohandel',
        question: {
            de: 'Wie kann ich vor dem Kauf prüfen, ob der Kilometerstand echt ist?',
            pl: 'Jak mogę sprawdzić, czy przebieg auta używanego nie jest cofnięty przed zakupem?',
            en: 'How can I check if the mileage of a used car is genuine before buying?'
        },
        answer: {
            de: 'Wir nutzen carLOG und digitale Servicehefte. Bei Pablo e.U. ist Transparenz Standard: Wir legen Ihnen die komplette Historie und alle §57a-Gutachten (Pickerl) offen, bevor Sie kaufen.',
            pl: 'Używamy carLOG i cyfrowych książek serwisowych. W Pablo e.U. transparentność to standard: Przed zakupem udostępniamy pełną historię i wszystkie raporty §57a (Pickerl).',
            en: 'We use carLOG and digital service records. At Pablo e.U., transparency is standard: We disclose the full history and all §57a reports (inspection stickers) before you buy.'
        }
    },
    {
        id: 'faq-sales-2',
        category: 'autohandel',
        question: {
            de: 'Bekomme ich als EU-Bürger ohne österreichischen Pass eine Finanzierung?',
            pl: 'Czy dostanę kredyt na auto w Austrii pracując tu, ale nie mając austriackiego obywatelstwa?',
            en: 'Can I get car financing in Austria working here but without Austrian citizenship?'
        },
        answer: {
            de: 'Ja, eine Finanzierung ist mit Wohnsitz in Österreich möglich. Pablo e.U. arbeitet mit Banken zusammen, die Kredite auch an EU-Bürger ohne österreichischen Pass vergeben.',
            pl: 'Tak, finansowanie jest możliwe z meldunkiem w Austrii. Pablo e.U. współpracuje z bankami udzielającymi kredytów obywatelom UE bez austriackiego paszportu.',
            en: 'Yes, financing is possible with residence in Austria. Pablo e.U. works with banks that grant loans to EU citizens without an Austrian passport.'
        }
    },
    {
        id: 'faq-sales-3',
        category: 'autohandel',
        question: {
            de: 'Wo kann ich in Wien ein Auto mit polnischen Kennzeichen verkaufen?',
            pl: 'Gdzie sprzedać auto na polskich tablicach w Wiedniu bez przerejestrowywania?',
            en: 'Where can I sell a car with Polish license plates in Vienna without re-registering?'
        },
        answer: {
            de: 'Verkaufen Sie es direkt an Pablo e.U. Wir spezialisieren uns auf den Ankauf von Fahrzeugen mit ausländischen Kennzeichen (PL, DE, etc.) und erledigen alle Export-Formalitäten.',
            pl: 'Sprzedaj je bezpośrednio do Pablo e.U. Specjalizujemy się w skupie aut na zagranicznych tablicach (PL, DE itp.) i załatwiamy wszystkie formalności eksportowe.',
            en: 'Sell it directly to Pablo e.U. We specialize in buying vehicles with foreign license plates (PL, DE, etc.) and handle all export formalities.'
        }
    },
    {
        id: 'faq-sales-4',
        category: 'autohandel',
        question: {
            de: 'Was ist der Unterschied zwischen Ihrer Garantie und der Gewährleistung?',
            pl: 'Czym różni się wasza gwarancja od zwykłej rękojmi przy zakupie używanego auta?',
            en: 'What is the difference between your guarantee and the standard warranty?'
        },
        answer: {
            de: 'Mehr Sicherheit als gesetzlich vorgeschrieben. Neben der Gewährleistung bietet Pablo e.U. eine 12-Monats-Garantie, die auch unerwartete Schäden abdeckt. Jedes Auto durchläuft einen strengen Technik-Check.',
            pl: 'Większe bezpieczeństwo niż wymogi prawne. Oprócz rękojmi, Pablo e.U. oferuje 12-miesięczną gwarancję, pokrywającą niespodziewane awarie. Każde auto przechodzi rygorystyczny przegląd.',
            en: 'More security than legally required. Beyond the warranty, Pablo e.U. offers a 12-month guarantee covering unexpected damages. Every car undergoes a strict technical check.'
        }
    },
    {
        id: 'faq-sales-5',
        category: 'autohandel',
        question: {
            de: 'Ich habe keine Möglichkeit nach Sollenau zu kommen – liefern Sie das Auto?',
            pl: 'Chę kupić auto, ale nie mam jak dojechać do Sollenau z Wiednia – czy pomagacie?',
            en: 'I want to buy a car but can\'t get to Sollenau from Vienna – do you help?'
        },
        answer: {
            de: 'Ja, wir bieten einen kostenlosen Shuttle-Service vom Bahnhof oder liefern Ihr neu gekauftes Fahrzeug mit unserem eigenen Transporter direkt zu Ihnen nach Wien vor die Haustür.',
            pl: 'Tak, oferujemy darmowy transport z dworca lub dostarczymy Twoje nowo zakupione auto naszą lawetą bezpośrednio pod Twoje drzwi w Wiedniu.',
            en: 'Yes, we offer a free shuttle service from the train station or deliver your newly purchased vehicle directly to your doorstep in Vienna with our own transporter.'
        }
    },

    // KATEGORIA 3: VERMIETUNG
    {
        id: 'faq-rental-1',
        category: 'vermietung',
        question: {
            de: 'Kann ich einen Transporter ohne Kreditkarte mieten?',
            pl: 'Gdzie wynajmę busa do przeprowadzki w Wiedniu, jeśli nie mam karty kredytowej?',
            en: 'Can I rent a moving van in Vienna without a credit card?'
        },
        answer: {
            de: 'Bei Pablo e.U. ist keine Kreditkarte zwingend. Wir akzeptieren eine faire Bar-Kaution (oder Debitkarte). Mieten Sie flexibel und unbürokratisch ab unserem Standort Sollenau.',
            pl: 'W Pablo e.U. karta kredytowa nie jest wymagana. Akceptujemy uczciwą kaucję w gotówce (lub kartę debetową). Wynajmij elastycznie i bez biurokracji z naszej bazy w Sollenau.',
            en: 'At Pablo e.U., a credit card is not mandatory. We accept a fair cash deposit (or debit card). Rent flexibly and without bureaucracy from our Sollenau location.'
        }
    },
    {
        id: 'faq-rental-2',
        category: 'vermietung',
        question: {
            de: 'Sind im Mietpreis von 29€ Vollkasko und Vignette enthalten?',
            pl: 'Czy cena wynajmu 29€ za dzień zawiera pełne ubezpieczenie (Vollkasko)?',
            en: 'Does the €29 rental price include full insurance and vignette?'
        },
        answer: {
            de: 'Ja, unsere Preise sind Endpreise ("No Hidden Fees"). Das Angebot beinhaltet bereits die Vollkaskoversicherung und Autobahnvignette. Keine überraschenden Zuschläge am Schalter.',
            pl: 'Tak, nasze ceny to ceny końcowe. Oferta zawiera już pełne ubezpieczenie AC (Vollkasko) i winietę autostradową. Nie płacisz zaskakujących dopłat przy ladzie.',
            en: 'Yes, our prices are final prices. The offer already includes full comprehensive insurance and the highway vignette. You pay no surprising surcharges at the counter.'
        }
    },
    {
        id: 'faq-rental-3',
        category: 'vermietung',
        question: {
            de: 'Ich lebe im Ausland, besitze aber eine Wohnung in Wien – wer verwaltet sie?',
            pl: 'Mieszkam w Polsce, ale mam mieszkanie inwestycyjne w Wiedniu – kto się nim zajmie?',
            en: 'I live abroad but own an apartment in Vienna – who can manage it?'
        },
        answer: {
            de: 'Pablo e.U. übernimmt die komplette Verwaltung. Wir bieten ein "Sorglos-Paket": von der Mietersuche über Reparaturen bis zur Schlüsselübergabe. Wir sprechen Deutsch und Polnisch.',
            pl: 'Pablo e.U. przejmuje pełne zarządzanie. Oferujemy "Pakiet Spokoju": od szukania najemcy, przez naprawy, po przekazanie kluczy. Mówimy po niemiecku i polsku.',
            en: 'Pablo e.U. handles complete management. We offer a "Peace of Mind Package": from tenant search to repairs and key handover. We speak German, Polish and English.'
        }
    },
    {
        id: 'faq-rental-4',
        category: 'vermietung',
        question: {
            de: 'Liefern Sie einen Leihwagen direkt zu meiner Werkstatt?',
            pl: 'Czy dostarczycie auto zastępcze do warsztatu w Mödling po wypadku?',
            en: 'Will you deliver a rental car directly to my workshop in Mödling after an accident?'
        },
        answer: {
            de: 'Ja, wir bringen den Mietwagen direkt zu Ihnen. Pablo e.U. liefert das Ersatzfahrzeug direkt zu Ihrer Werkstatt in Mödling, Baden oder Wien und holt es dort auch wieder ab.',
            pl: 'Tak, dostarczymy auto bezpośrednio do Ciebie. Pablo e.U. dostarcza pojazd zastępczy bezpośrednio do warsztatu w Mödling, Baden lub Wiedniu i tam go odbiera.',
            en: 'Yes, we bring the rental car directly to you. Pablo e.U. delivers the replacement vehicle directly to your workshop in Mödling, Baden, or Vienna and picks it up there too.'
        }
    },
    {
        id: 'faq-rental-5',
        category: 'vermietung',
        question: {
            de: 'Ich brauche ein Auto für 3 Monate ohne Leasing – welche Optionen habe ich?',
            pl: 'Szukam auta na 3 miesiące bez wiązania się leasingiem na lata – co wybrać?',
            en: 'I need a car for 3 months without a long-term lease – what are my options?'
        },
        answer: {
            de: 'Unsere Langzeitmiete ist die flexible Lösung. Mieten Sie geprüfte Gebrauchtwagen von Pablo e.U. zum monatlichen Fixpreis. Keine Anzahlung, monatlich kündbar.',
            pl: 'Nasz wynajem długoterminowy to elastyczne rozwiązanie. Wynajmij sprawdzone auto od Pablo e.U. w stałej miesięcznej cenie. Bez wpłaty własnej, wypowiedzenie co miesiąc.',
            en: 'Our long-term rental is the flexible solution. Rent checked used cars from Pablo e.U. at a fixed monthly price. No down payment, cancellable monthly.'
        }
    },

    // KATEGORIA 4: TRANSPORT
    {
        id: 'faq-transport-1',
        category: 'transport',
        question: {
            de: 'Wie hoch ist der Zuschlag für den Transport in den 4. Stock ohne Lift?',
            pl: 'Ile wynosi dopłata za wniesienie kanapy na 4. piętro bez windy w Wiedniu?',
            en: 'What is the surcharge for carrying a sofa to the 4th floor without an elevator?'
        },
        answer: {
            de: 'Bei Pablo e.U. zahlen Sie 0€ Stockwerkzuschlag. Unser Umzugsservice basiert auf fairen Pauschalpreisen. Egal ob Erdgeschoss oder Dachgeschoss ohne Lift – der Preis bleibt fix.',
            pl: 'W Pablo e.U. dopłata za piętra wynosi 0€. Nasze usługi przeprowadzki opierają się na uczciwych cenach ryczałtowych. Niezależnie czy to parter, czy poddasze bez windy – cena jest stała.',
            en: 'At Pablo e.U., you pay €0 floor surcharge. Our moving service is based on fair flat rates. Whether ground floor or attic without an elevator – the price remains fixed.'
        }
    },
    {
        id: 'faq-transport-2',
        category: 'transport',
        question: {
            de: 'Bieten Sie Transporte auf der Strecke Polen-Österreich an?',
            pl: 'Szukam taniego transportu mebli z Krakowa do Wiednia – czy macie stałą trasę?',
            en: 'Do you offer transport on the Poland-Austria route?'
        },
        answer: {
            de: 'Ja, wir bedienen die Linie Polen-Österreich regelmäßig. Durch Beiladung (Shared Load) transportieren wir Möbel bis zu 50% günstiger. Pablo e.U. garantiert polnischsprachigen Service.',
            pl: 'Tak, regularnie obsługujemy linię Polska-Austria. Dzięki systemowi doładunku (Shared Load) możemy transportować meble nawet o 50% taniej. Gwarantujemy polskojęzyczną obsługę.',
            en: 'Yes, we operate the Poland-Austria route regularly. Through our shared load system, we transport furniture up to 50% cheaper. We guarantee Polish/English-speaking service.'
        }
    },
    {
        id: 'faq-transport-3',
        category: 'transport',
        question: {
            de: 'Können Sie einen 3,5t Bagger auf eine Baustelle im Bezirk Baden transportieren?',
            pl: 'Jak przetransportować minikoparkę 3.5t na budowę w powiecie Baden?',
            en: 'Can you transport a 3.5t excavator to a construction site in Baden district?'
        },
        answer: {
            de: 'Pablo e.U. transportiert Baumaschinen zuverlässig. Mit unseren Schwerlastanhängern bringen wir Bagger und Geräte pünktlich auf Ihre Baustelle in Sollenau und Baden.',
            pl: 'Pablo e.U. niezawodnie transportuje maszyny budowlane. Naszymi przyczepami niskopodwoziowymi dostarczamy koparki i sprzęt punktualnie na Twoją budowę w Sollenau i Baden.',
            en: 'Pablo e.U. transports construction machinery reliably. With our heavy-duty trailers, we deliver excavators and equipment punctually to your construction site in Sollenau and Baden.'
        }
    },
    {
        id: 'faq-transport-4',
        category: 'transport',
        question: {
            de: 'Wo kann ich Möbel während einer Renovierung günstig einlagern?',
            pl: 'Gdzie najtaniej przechować rzeczy podczas remontu mieszkania w Wiedniu?',
            en: 'Where can I store furniture cheaply during a renovation in Vienna?'
        },
        answer: {
            de: 'Unser Lager in Sollenau ist deutlich günstiger als Wien. Wir holen Ihre Möbel ab, lagern sie sicher ein und bringen sie zurück – oft zum halben Preis eines Wiener Self-Storage.',
            pl: 'Nasz magazyn w Sollenau jest znacznie tańszy niż w Wiedniu. Odbieramy meble, bezpiecznie je magazynujemy i odwozimy – często za połowę ceny wiedeńskich Self-Storage.',
            en: 'Our warehouse in Sollenau is significantly cheaper than Vienna. We pick up your furniture, store it safely, and bring it back – often at half the price of Vienna Self-Storage.'
        }
    },
    {
        id: 'faq-transport-5',
        category: 'transport',
        question: {
            de: 'Sind meine Antiquitäten während des Transports versichert?',
            pl: 'Czy moje antyki są ubezpieczone podczas transportu z Pablo e.U.?',
            en: 'Are my antiques insured during transport with Pablo e.U.?'
        },
        answer: {
            de: 'Ja, wir bieten Versicherungsschutz bis 100.000 €. Bei Pablo e.U. ist eine vollwertige Transportversicherung inklusive. Wir verpacken empfindliche Güter professionell.',
            pl: 'Tak, oferujemy ochronę ubezpieczeniową do 100 000 €. W Pablo e.U. pełne ubezpieczenie transportowe jest w cenie. Profesjonalnie pakujemy delikatne towary.',
            en: 'Yes, we offer insurance coverage up to €100,000. Full transport insurance is included with Pablo e.U. We pack sensitive goods professionally.'
        }
    }
];
