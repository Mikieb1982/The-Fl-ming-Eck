// FIX: Create content for DirectoryView.tsx to resolve module not found error.
import React from 'react';
import { motion } from 'framer-motion';
import { directoryData } from '../data/directoryData';
import AlertTriangleIcon from './icons/AlertTriangleIcon';
import HospitalIcon from './icons/HospitalIcon';
import TrainIcon from './icons/TrainIcon';
import PhoneIcon from './icons/PhoneIcon';
import LinkIcon from './icons/LinkIcon';
import MapPinIcon from './icons/MapPinIcon';
import DownloadIcon from './icons/DownloadIcon';

interface DirectoryViewProps {
  onClose: () => void;
}

const MotionDiv = motion.div as any;

const Section = ({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) => (
    <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
            <div className="flex-shrink-0 w-10 h-10 bg-slate-100 dark:bg-slate-700/50 rounded-lg flex items-center justify-center">
                {icon}
            </div>
            <h3 className="text-2xl font-serif font-bold text-charcoal dark:text-slate-200">{title}</h3>
        </div>
        <div className="space-y-4 pl-2 border-l-2 border-slate-200 dark:border-slate-700 ml-5">
            {children}
        </div>
    </section>
);

const Entry = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="pl-6">
        <h4 className="font-bold text-charcoal dark:text-slate-200">{title}</h4>
        <div className="text-sm text-slate-600 dark:text-slate-300 space-y-1 mt-1">{children}</div>
    </div>
);

const RailCard = ({ railData }: { railData: any }) => (
    <Entry title={`Rail (${railData.key_service})`}>
        <p><MapPinIcon className="inline w-4 h-4 mr-1"/> {railData.address}</p>
        <p>{railData.destinations}</p>
        {railData.url && (
             <a href={railData.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-2 px-3 py-1 text-xs font-semibold text-white bg-ocean rounded-md hover:bg-ocean-dark transition-colors shadow-sm">
                <LinkIcon className="w-3 h-3" />
                <span>Journey Planner (VBB)</span>
            </a>
        )}
    </Entry>
);

const BusCard = ({ busData }: { busData: any }) => (
    <Entry title={`Bus (${busData.operator})`}>
        <p className="mb-2">Timetables for lines serving the Bad Belzig area:</p>
        <div className="space-y-2">
            {busData.regional_lines.map((line: any) => (
                <div key={line.name} className="flex items-center justify-between p-2 rounded-md bg-slate-50 dark:bg-slate-700/50">
                    <div>
                        <p className="font-semibold text-charcoal dark:text-slate-200">
                           Line {line.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{line.description}</p>
                    </div>
                     <a href={line.url} target="_blank" rel="noopener noreferrer" title={`Download timetable for line ${line.name}`} className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-ocean rounded-md hover:bg-ocean/10 transition-colors shrink-0 ml-2">
                        <DownloadIcon className="w-4 h-4" />
                        <span className="hidden sm:inline">Timetable</span>
                    </a>
                </div>
            ))}
        </div>
    </Entry>
);

export default function DirectoryView({ onClose }: DirectoryViewProps) {
    const data = directoryData.directory;

    return (
        <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <div className="flex justify-between items-center mb-6 border-b-2 border-slate-200 dark:border-slate-700 pb-2">
                <h2 className="text-3xl font-serif font-bold text-charcoal dark:text-green-300">Community Directory</h2>
                <button 
                    onClick={onClose}
                    className="shrink-0 ml-4 px-4 py-2 text-sm font-semibold text-charcoal dark:text-slate-300 bg-slate-100 dark:bg-zinc-800 rounded-lg hover:bg-light-grey dark:hover:bg-zinc-700 transition-colors"
                >
                    &larr; Back to Magazine
                </button>
            </div>

            <Section title="Emergency & Civic" icon={<AlertTriangleIcon className="w-6 h-6 text-red-600" />}>
                <Entry title="Emergency Numbers">
                    <p>Police: <strong>{data.civic_infrastructure_emergency_services.emergency_numbers.police}</strong></p>
                    <p>Fire & Rescue: <strong>{data.civic_infrastructure_emergency_services.emergency_numbers.fire_rescue}</strong></p>
                </Entry>
                <Entry title="City Administration (Rathaus)">
                    <p><MapPinIcon className="inline w-4 h-4 mr-1"/> {data.civic_infrastructure_emergency_services.municipal_administration.address}</p>
                    <p><PhoneIcon className="inline w-4 h-4 mr-1"/> {data.civic_infrastructure_emergency_services.municipal_administration.phone}</p>
                </Entry>
                 <Entry title="Tourist Information">
                    <p><MapPinIcon className="inline w-4 h-4 mr-1"/> {data.civic_infrastructure_emergency_services.tourist_information.address}</p>
                    <p><PhoneIcon className="inline w-4 h-4 mr-1"/> {data.civic_infrastructure_emergency_services.tourist_information.phone}</p>
                </Entry>
            </Section>

            <Section title="Healthcare" icon={<HospitalIcon className="w-6 h-6 text-blue-600" />}>
                 <Entry title="Hospital (Klinikum)">
                    <p><MapPinIcon className="inline w-4 h-4 mr-1"/> {data.healthcare_wellness.hospital.address}</p>
                    <p><PhoneIcon className="inline w-4 h-4 mr-1"/> {data.healthcare_wellness.hospital.phone}</p>
                    <a href={data.healthcare_wellness.hospital.website} target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline"><LinkIcon className="inline w-4 h-4 mr-1"/> Website</a>
                </Entry>
                <Entry title="Pharmacies">
                    {data.healthcare_wellness.pharmacies.map(p => <p key={p.name}>{p.name}: {p.address}</p>)}
                </Entry>
            </Section>

            <Section title="Transportation & Mobility" icon={<TrainIcon className="w-6 h-6 text-slate-600" />}>
                <RailCard railData={data.transportation_mobility.public_transport.rail} />
                <BusCard busData={data.transportation_mobility.public_transport.bus} />
                 <Entry title="Taxi Services">
                    {data.transportation_mobility.private_transport.taxi_services.companies.map(c => (
                        <p key={c.name}>{c.name}: <PhoneIcon className="inline w-4 h-4 mr-1"/>{c.phone}</p>
                    ))}
                </Entry>
            </Section>
        </MotionDiv>
    );
}