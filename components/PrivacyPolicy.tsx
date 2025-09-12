import React from 'react';

const BilingualSection = ({ de, en, titleDe, titleEn }: { de: React.ReactNode, en: React.ReactNode, titleDe: string, titleEn: string }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mt-6">
        <div>
            <h3 className="!mt-0 text-charcoal dark:text-slate-200">{titleDe}</h3>
            {de}
        </div>
        <div>
            <h3 className="!mt-0 text-charcoal dark:text-slate-200">{titleEn}</h3>
            {en}
        </div>
    </div>
);

export default function PrivacyPolicy() {
  return (
    <div className="prose dark:prose-invert max-w-none text-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <h2 className="!mb-0">Datenschutzerklärung</h2>
          <h2 className="!mb-0">Privacy Policy</h2>
        </div>

        <BilingualSection
            titleDe="1. Datenschutz auf einen Blick"
            titleEn="1. Data Protection at a Glance"
            de={
                <>
                    <h4>Allgemeine Hinweise</h4>
                    <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.</p>
                </>
            }
            en={
                <>
                    <h4>General Information</h4>
                    <p>The following information provides a simple overview of what happens to your personal data when you visit this website. Personal data is any data with which you could be personally identified.</p>
                </>
            }
        />

        <BilingualSection
            titleDe="2. Verantwortliche Stelle und Ihre Rechte"
            titleEn="2. Data Controller and Your Rights"
            de={
                <>
                    <h4>Verantwortliche Stelle</h4>
                    <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist im Impressum dieser Website aufgeführt.</p>
                    <h4>Ihre Rechte als Betroffener</h4>
                    <p>Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.</p>
                </>
            }
            en={
                <>
                    <h4>Data Controller</h4>
                    <p>The party responsible for processing data on this website can be found in the Legal Notice (Impressum) of this website.</p>
                    <h4>Your Rights as a Data Subject</h4>
                    <p>Within the scope of the applicable legal provisions, you have the right to be provided at any time with information free of charge about any of your personal data that is stored, as well as its origin, the recipient and the purpose for which it has been processed. You also have the right to have this data corrected or deleted. You can contact us at any time if you have further questions on the topic of personal data.</p>
                </>
            }
        />

        <BilingualSection
            titleDe="3. Datenerfassung auf dieser Website"
            titleEn="3. Data Collection on This Website"
            de={
                <>
                    <h4>Cookies und Lokaler Speicher</h4>
                    <p>Diese Website verwendet Cookies und den lokalen Speicher (Local Storage) Ihres Browsers, um die Funktionalität zu gewährleisten und Ihre Erfahrung zu verbessern. Cookies sind kleine Textdateien. Der lokale Speicher ermöglicht es uns, Daten direkt in Ihrem Browser zu speichern.</p>
                    <ul>
                        <li><strong>cookie_consent:</strong> Speichert Ihre Zustimmung zur Cookie-Nutzung. (Gültigkeit: 1 Jahr)</li>
                        <li><strong>flaming-eck-user-*:</strong> Speichert Ihre Anmeldeinformationen, wenn Sie Google Sign-In verwenden.</li>
                        <li><strong>flaming-eck-theme-setting:</strong> Speichert Ihre bevorzugte Theme-Einstellung (hell/dunkel/system).</li>
                        <li><strong>flaming-eck-bookmarks-*:</strong> Speichert Ihre Lesezeichen.</li>
                        <li><strong>poll-*:</strong> Speichert Ihre Teilnahme an Umfragen, um doppelte Abstimmungen zu verhindern.</li>
                    </ul>
                    <p>Einige davon sind für den Betrieb der Seite unerlässlich. Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben.</p>
                    
                    <h4>Community-Forum</h4>
                    <p>Wenn Sie im Community-Forum Beiträge oder Antworten verfassen, werden die von Ihnen gemachten Angaben (Name, Inhalt) gespeichert und öffentlich angezeigt. Die Angabe Ihres Namens ist erforderlich. Wir moderieren Inhalte, um eine respektvolle Umgebung zu gewährleisten. Die Daten bleiben gespeichert, bis Sie uns zur Löschung auffordern.</p>

                    <h4>Server-Log-Dateien</h4>
                    <p>Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind: Browsertyp, Betriebssystem, Referrer URL, Hostname, Uhrzeit, IP-Adresse. Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.</p>
                </>
            }
            en={
                <>
                    <h4>Cookies and Local Storage</h4>
                    <p>This website uses cookies and your browser's local storage to ensure functionality and improve your experience. Cookies are small text files. Local storage allows us to save data directly in your browser.</p>
                    <ul>
                        <li><strong>cookie_consent:</strong> Stores your consent for cookie usage. (Validity: 1 year)</li>
                        <li><strong>flaming-eck-user-*:</strong> Stores your login information if you use Google Sign-In.</li>
                        <li><strong>flaming-eck-theme-setting:</strong> Stores your preferred theme setting (light/dark/system).</li>
                        <li><strong>flaming-eck-bookmarks-*:</strong> Stores your article bookmarks.</li>
                        <li><strong>poll-*:</strong> Stores your participation in polls to prevent duplicate voting.</li>
                    </ul>
                    <p>Some of these are essential for the site's operation. You can configure your browser to inform you about the use of cookies so that you can decide on a case-by-case basis.</p>

                    <h4>Community Forum</h4>
                    <p>When you write posts or replies in the Community Forum, the information you provide (name, content) will be stored and displayed publicly. Providing your name is required. We moderate content to ensure a respectful environment. The data remains stored until you request its deletion.</p>

                    <h4>Server Log Files</h4>
                    <p>The website provider automatically collects and stores information that your browser automatically transmits to us in "server log files". These are: browser type, operating system, referrer URL, host name, time, IP address. This data will not be combined with data from other sources.</p>
                </>
            }
        />
        
        <BilingualSection
            titleDe="4. Externe Dienste"
            titleEn="4. External Services"
            de={
                 <>
                    <h4>Google Sign-In</h4>
                    <p>Wir bieten die Möglichkeit, sich mit Google Sign-In anzumelden. Anbieter ist die Google Ireland Limited. Wenn Sie sich für die Anmeldung mit Google entscheiden, werden Sie zu Google weitergeleitet, wo Sie sich mit Ihren Nutzerdaten anmelden. Dies verknüpft Ihr Google-Profil mit unserer Website. Dabei können Daten wie Ihr Name, Ihre E-Mail-Adresse und Ihr Profilbild an uns übermittelt werden.</p>
                    <h4>Google Fonts</h4>
                    <p>Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten Web Fonts von Google. Beim Aufruf einer Seite lädt Ihr Browser die benötigten Schriften, wozu eine Verbindung zu den Servern von Google aufgenommen wird.</p>
                    <h4>Open-Meteo (Wetter-API)</h4>
                    <p>Wir nutzen die API von Open-Meteo, um Wetterdaten anzuzeigen. Bei der Abfrage wird Ihre IP-Adresse an die Server von Open-Meteo übertragen.</p>
                </>
            }
            en={
                <>
                    <h4>Google Sign-In</h4>
                    <p>We offer the option to log in using Google Sign-In. The provider is Google Ireland Limited. If you choose to log in with Google, you will be redirected to Google where you can log in with your user data. This links your Google profile to our website. Data such as your name, email address, and profile picture may be transmitted to us.</p>
                    <h4>Google Fonts</h4>
                    <p>This page uses web fonts provided by Google for the uniform display of fonts. When you open a page, your browser loads the required web fonts, which requires a connection to Google's servers.</p>
                    <h4>Open-Meteo (Weather API)</h4>
                    <p>We use the Open-Meteo API to display weather data. During the request, your IP address is transmitted to Open-Meteo's servers.</p>
                </>
            }
        />
    </div>
  );
}