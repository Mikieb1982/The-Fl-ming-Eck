import React from 'react';

const BilingualSection = ({ de, en, titleDe, titleEn }: { de: React.ReactNode, en: React.ReactNode, titleDe: string, titleEn: string }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
        <div>
            <h3 className="!mt-4 !mb-2 font-semibold text-charcoal dark:text-slate-200">{titleDe}</h3>
            <div className="text-sm prose-p:my-1">{de}</div>
        </div>
        <div>
            <h3 className="!mt-4 !mb-2 font-semibold text-charcoal dark:text-slate-200">{titleEn}</h3>
            <div className="text-sm prose-p:my-1">{en}</div>
        </div>
    </div>
);

export default function Impressum() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <h2 className="!mb-0">Impressum</h2>
          <h2 className="!mb-0">Legal Notice</h2>
      </div>

      <div className="my-6 p-4 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 not-prose">
        <BilingualSection 
            titleDe="Angaben gemäß § 5 TMG"
            titleEn="Information according to § 5 TMG (German Telemedia Act)"
            de={
                <p>
                    Max Mustermann (Einzelunternehmer)
                    <br />
                    Musterstraße 1
                    <br />
                    14806 Bad Belzig
                    <br />
                    Deutschland
                </p>
            }
            en={
                <p>
                    Max Mustermann (Sole Proprietor)
                    <br />
                    Musterstraße 1
                    <br />
                    14806 Bad Belzig
                    <br />
                    Germany
                </p>
            }
        />
        <BilingualSection 
            titleDe="Kontakt"
            titleEn="Contact"
            de={
                <p>
                  Telefon: +49 (0) 123 456789
                  <br />
                  E-Mail: contact@flaeming-eck-example.com
                </p>
            }
            en={
                 <p>
                  Phone: +49 (0) 123 456789
                  <br />
                  Email: contact@flaeming-eck-example.com
                </p>
            }
        />
      </div>
      
       <BilingualSection 
            titleDe="Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV"
            titleEn="Responsible for the content according to § 55 Abs. 2 RStV"
            de={
                <p>
                    Max Mustermann
                    <br />
                    Anschrift wie oben
                </p>
            }
            en={
                <p>
                    Max Mustermann
                    <br />
                    Address as above
                </p>
            }
        />
        
        <BilingualSection 
            titleDe="Haftungsausschluss (Disclaimer)"
            titleEn="Disclaimer"
            de={
                <p className="text-xs">
                    Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>
            }
            en={
                 <p className="text-xs">
                    As a service provider, we are responsible for our own content on these pages in accordance with general laws pursuant to Section 7 (1) of the TMG. According to Sections 8 to 10 of the TMG, however, we as a service provider are not obligated to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.
                </p>
            }
        />
    </div>
  );
}