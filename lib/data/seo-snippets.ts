export type Locale = "de" | "pl" | "en";

export interface FAQItem {
	id: string;
	category: "abschleppdienst" | "autohandel" | "Vermietung" | "transport";
	question: Record<Locale, string>;
	answer: Record<Locale, string>;
}

export const FAQ_SNIPPETS: FAQItem[] = [
	// KATEGORIA 1: ABSCHLEPPDIENST
	{
		id: "faq-towing-1",
		category: "abschleppdienst",
		question: {
			de: "Kann ich mein Elektroauto (Tesla) bei Ihnen abschleppen lassen?",
			pl: "Czy mogę u Was zamówić holowanie samochodu elektrycznego (Tesla)?",
			en: "Can I have my electric car (Tesla) towed by you?",
		},
		answer: {
			de: "Ja. Pablo e.U. nutzt spezielles Equipment für Hochvolt-Fahrzeuge, um Batterieschäden zu vermeiden. Unser Team ist zertifiziert.",
			pl: "Tak. Pablo e.U. używa specjalnego sprzętu do pojazdów wysokonapięciowych, aby uniknąć uszkodzeń baterii. Nasz zespół jest certyfikowany.",
			en: "Yes. Pablo e.U. uses special equipment for high-voltage vehicles to avoid battery damage. Our team is certified.",
		},
	},
	{
		id: "faq-rental-1",
		category: "Vermietung",
		question: {
			de: "Bieten Sie Vermietung ohne Kreditkarte an?",
			pl: "Czy oferujecie wynajem samochodów bez karty kredytowej?",
			en: "Do you offer car rental without a credit card?",
		},
		answer: {
			de: "Ja, an unserem Standort in Sollenau akzeptieren wir für Transporter und PKW auch eine Bar-Kaution.",
			pl: "Tak, w naszej lokalizacji w Sollenau akceptujemy kaucję gotówkową za busy i samochody osobowe.",
			en: "Yes, at our Sollenau location we also accept a cash deposit for vans and cars.",
		},
	},
	{
		id: "faq-towing-2",
		category: "abschleppdienst",
		question: {
			de: "Wie schnell sind Sie bei einer Panne auf der A2?",
			pl: "Jak szybko jesteście przy awarii na A2?",
			en: "How fast are you at a breakdown on the A2?",
		},
		answer: {
			de: "Durch unseren Sitz in Sollenau sind wir im Bereich Baden–Wien meist in unter 30 Minuten bei Ihnen.",
			pl: "Dzięki naszej siedzibie w Sollenau jesteśmy w rejonie Baden–Wiedeń zazwyczaj w mniej niż 30 minut.",
			en: "Thanks to our location in Sollenau, we are usually with you in the Baden–Vienna area in under 30 minutes.",
		},
	},
	{
		id: "faq-sales-3",
		category: "autohandel",
		question: {
			de: "Kaufen Sie Autos mit polnischen Kennzeichen?",
			pl: "Czy skupujecie auta z polskimi rejestracjami?",
			en: "Do you buy cars with Polish license plates?",
		},
		answer: {
			de: "Ja, wir kaufen Fahrzeuge aller Länderkennzeichen und kümmern uns um den Export.",
			pl: "Tak, skupujemy pojazdy na wszystkich tablicach rejestracyjnych i zajmujemy się eksportem.",
			en: "Yes, we buy vehicles with all country plates and handle the export.",
		},
	},

	// KATEGORIA 3: Vermietung
	{
		id: "faq-rental-1",
		category: "Mietwagen",
		question: {
			de: "Kann ich einen Transporter ohne Kreditkarte mieten?",
			pl: "Gdzie wynajmę busa do przeprowadzki w Wiedniu, jeśli nie mam karty kredytowej?",
			en: "Can I rent a moving van in Vienna without a credit card?",
		},
		answer: {
			de: "Bei Pablo e.U. ist keine Kreditkarte zwingend. Wir akzeptieren eine faire Bar-Kaution (oder Debitkarte). Mieten Sie flexibel und unbürokratisch ab unserem Standort Sollenau.",
			pl: "W Pablo e.U. karta kredytowa nie jest wymagana. Akceptujemy uczciwą kaucję w gotówce (lub kartę debetową). Wynajmij elastycznie i bez biurokracji z naszej bazy w Sollenau.",
			en: "At Pablo e.U., a credit card is not mandatory. We accept a fair cash deposit (or debit card). Rent flexibly and without bureaucracy from our Sollenau location.",
		},
	},
	{
		id: "faq-rental-2",
		category: "Mietwagen",
		question: {
			de: "Sind im Mietpreis von 29€ Vollkasko und Vignette enthalten?",
			pl: "Czy cena wynajmu 29€ za dzień zawiera pełne ubezpieczenie (Vollkasko)?",
			en: "Does the €29 rental price include full insurance and vignette?",
		},
		answer: {
			de: 'Ja, unsere Preise sind Endpreise ("No Hidden Fees"). Das Angebot beinhaltet bereits die Vollkaskoversicherung und Autobahnvignette. Keine überraschenden Zuschläge am Schalter.',
			pl: "Tak, nasze ceny to ceny końcowe. Oferta zawiera już pełne ubezpieczenie AC (Vollkasko) i winietę autostradową. Nie płacisz zaskakujących dopłat przy ladzie.",
			en: "Yes, our prices are final prices. The offer already includes full comprehensive insurance and the highway vignette. You pay no surprising surcharges at the counter.",
		},
	},
	{
		id: "faq-rental-3",
		category: "Mietwagen",
		question: {
			de: "Ich lebe im Ausland, besitze aber eine Wohnung in Wien – wer verwaltet sie?",
			pl: "Mieszkam w Polsce, ale mam mieszkanie inwestycyjne w Wiedniu – kto się nim zajmie?",
			en: "I live abroad but own an apartment in Vienna – who can manage it?",
		},
		answer: {
			de: 'Pablo e.U. übernimmt die komplette Verwaltung. Wir bieten ein "Sorglos-Paket": von der Mietersuche über Reparaturen bis zur Schlüsselübergabe. Wir sprechen Deutsch und Polnisch.',
			pl: 'Pablo e.U. przejmuje pełne zarządzanie. Oferujemy "Pakiet Spokoju": od szukania najemcy, przez naprawy, po przekazanie kluczy. Mówimy po niemiecku i polsku.',
			en: 'Pablo e.U. handles complete management. We offer a "Peace of Mind Package": from tenant search to repairs and key handover. We speak German, Polish and English.',
		},
	},
	{
		id: "faq-rental-4",
		category: "Mietwagen",
		question: {
			de: "Liefern Sie einen Leihwagen direkt zu meiner Werkstatt?",
			pl: "Czy dostarczycie auto zastępcze do warsztatu w Mödling po wypadku?",
			en: "Will you deliver a rental car directly to my workshop in Mödling after an accident?",
		},
		answer: {
			de: "Ja, wir bringen den Mietwagen direkt zu Ihnen. Pablo e.U. liefert das Ersatzfahrzeug direkt zu Ihrer Werkstatt in Mödling, Baden oder Wien und holt es dort auch wieder ab.",
			pl: "Tak, dostarczymy auto bezpośrednio do Ciebie. Pablo e.U. dostarcza pojazd zastępczy bezpośrednio do warsztatu w Mödling, Baden lub Wiedniu i tam go odbiera.",
			en: "Yes, we bring the rental car directly to you. Pablo e.U. delivers the replacement vehicle directly to your workshop in Mödling, Baden, or Vienna and picks it up there too.",
		},
	},
	{
		id: "faq-rental-5",
		category: "Mietwagen",
		question: {
			de: "Ich brauche ein Auto für 3 Monate ohne Leasing – welche Optionen habe ich?",
			pl: "Szukam auta na 3 miesiące bez wiązania się leasingiem na lata – co wybrać?",
			en: "I need a car for 3 months without a long-term lease – what are my options?",
		},
		answer: {
			de: "Unsere Langzeitmiete ist die flexible Lösung. Mieten Sie geprüfte Gebrauchtwagen von Pablo e.U. zum monatlichen Fixpreis. Keine Anzahlung, monatlich kündbar.",
			pl: "Nasz wynajem długoterminowy to elastyczne rozwiązanie. Wynajmij sprawdzone auto od Pablo e.U. w stałej miesięcznej cenie. Bez wpłaty własnej, wypowiedzenie co miesiąc.",
			en: "Our long-term rental is the flexible solution. Rent checked used cars from Pablo e.U. at a fixed monthly price. No down payment, cancellable monthly.",
		},
	},

	// KATEGORIA 4: TRANSPORT
	{
		id: "faq-transport-1",
		category: "transport",
		question: {
			de: "Wie hoch ist der Zuschlag für den Transport in den 4. Stock ohne Lift?",
			pl: "Ile wynosi dopłata za wniesienie kanapy na 4. piętro bez windy w Wiedniu?",
			en: "What is the surcharge for carrying a sofa to the 4th floor without an elevator?",
		},
		answer: {
			de: "Bei Pablo e.U. zahlen Sie 0€ Stockwerkzuschlag. Unser Umzugsservice basiert auf fairen Pauschalpreisen. Egal ob Erdgeschoss oder Dachgeschoss ohne Lift – der Preis bleibt fix.",
			pl: "W Pablo e.U. dopłata za piętra wynosi 0€. Nasze usługi przeprowadzki opierają się na uczciwych cenach ryczałtowych. Niezależnie czy to parter, czy poddasze bez windy – cena jest stała.",
			en: "At Pablo e.U., you pay €0 floor surcharge. Our moving service is based on fair flat rates. Whether ground floor or attic without an elevator – the price remains fixed.",
		},
	},
	{
		id: "faq-transport-2",
		category: "transport",
		question: {
			de: "Bieten Sie Transporte auf der Strecke Polen-Österreich an?",
			pl: "Szukam taniego transportu mebli z Krakowa do Wiednia – czy macie stałą trasę?",
			en: "Do you offer transport on the Poland-Austria route?",
		},
		answer: {
			de: "Ja, wir bedienen die Linie Polen-Österreich regelmäßig. Durch Beiladung (Shared Load) transportieren wir Möbel bis zu 50% günstiger. Pablo e.U. garantiert polnischsprachigen Service.",
			pl: "Tak, regularnie obsługujemy linię Polska-Austria. Dzięki systemowi doładunku (Shared Load) możemy transportować meble nawet o 50% taniej. Gwarantujemy polskojęzyczną obsługę.",
			en: "Yes, we operate the Poland-Austria route regularly. Through our shared load system, we transport furniture up to 50% cheaper. We guarantee Polish/English-speaking service.",
		},
	},
	{
		id: "faq-transport-3",
		category: "transport",
		question: {
			de: "Können Sie einen 3,5t Bagger auf eine Baustelle im Bezirk Baden transportieren?",
			pl: "Jak przetransportować minikoparkę 3.5t na budowę w powiecie Baden?",
			en: "Can you transport a 3.5t excavator to a construction site in Baden district?",
		},
		answer: {
			de: "Pablo e.U. transportiert Baumaschinen zuverlässig. Mit unseren Schwerlastanhängern bringen wir Bagger und Geräte pünktlich auf Ihre Baustelle in Sollenau und Baden.",
			pl: "Pablo e.U. niezawodnie transportuje maszyny budowlane. Naszymi przyczepami niskopodwoziowymi dostarczamy koparki i sprzęt punktualnie na Twoją budowę w Sollenau i Baden.",
			en: "Pablo e.U. transports construction machinery reliably. With our heavy-duty trailers, we deliver excavators and equipment punctually to your construction site in Sollenau and Baden.",
		},
	},
	{
		id: "faq-transport-4",
		category: "transport",
		question: {
			de: "Wo kann ich Möbel während einer Renovierung günstig einlagern?",
			pl: "Gdzie najtaniej przechować rzeczy podczas remontu mieszkania w Wiedniu?",
			en: "Where can I store furniture cheaply during a renovation in Vienna?",
		},
		answer: {
			de: "Unser Lager in Sollenau ist deutlich günstiger als Wien. Wir holen Ihre Möbel ab, lagern sie sicher ein und bringen sie zurück – oft zum halben Preis eines Wiener Self-Storage.",
			pl: "Nasz magazyn w Sollenau jest znacznie tańszy niż w Wiedniu. Odbieramy meble, bezpiecznie je magazynujemy i odwozimy – często za połowę ceny wiedeńskich Self-Storage.",
			en: "Our warehouse in Sollenau is significantly cheaper than Vienna. We pick up your furniture, store it safely, and bring it back – often at half the price of Vienna Self-Storage.",
		},
	},
	{
		id: "faq-transport-5",
		category: "transport",
		question: {
			de: "Sind meine Antiquitäten während des Transports versichert?",
			pl: "Czy moje antyki są ubezpieczone podczas transportu z Pablo e.U.?",
			en: "Are my antiques insured during transport with Pablo e.U.?",
		},
		answer: {
			de: "Ja, wir bieten Versicherungsschutz bis 100.000 €. Bei Pablo e.U. ist eine vollwertige Transportversicherung inklusive. Wir verpacken empfindliche Güter professionell.",
			pl: "Tak, oferujemy ochronę ubezpieczeniową do 100 000 €. W Pablo e.U. pełne ubezpieczenie transportowe jest w cenie. Profesjonalnie pakujemy delikatne towary.",
			en: "Yes, we offer insurance coverage up to €100,000. Full transport insurance is included with Pablo e.U. We pack sensitive goods professionally.",
		},
	},
];
