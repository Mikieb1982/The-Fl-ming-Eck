



import React, { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { directoryData } from '../articles/directoryData';
import { DirectoryData, CivicEntry, Hospital, MedicalCenter, Practice, Pharmacy, BankEntry, RetailEntry, Restaurant, Accommodation, Attraction, RailTransport, BusTransport, TaxiService, RideSharing } from '../types';

import ChevronDownIcon from './icons/ChevronDownIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';
import AlertTriangleIcon from './icons/AlertTriangleIcon';
import HospitalIcon from './icons/HospitalIcon';
import StethoscopeIcon from './icons/StethoscopeIcon';
import TrainIcon from './icons/TrainIcon';
import BusIcon from './icons/BusIcon';
import PhoneIcon from './icons/PhoneIcon';
import LinkIcon from './icons/LinkIcon';
import MapPinIcon from './icons/MapPinIcon';
import BuildingOfficeIcon from './icons/BuildingOfficeIcon';
import UsersIcon from './icons/UsersIcon';


interface DirectoryViewProps {
  onClose: () => void;
}

const AccordionSection = ({ title, icon, children, isOpen, onToggle }: { title: string, icon: ReactNode, children: ReactNode, isOpen: boolean, onToggle: () => void }) => (
    <div className="border-b border-slate-200 dark:border-slate-700">
        <h2>
            <button
                type="button"
                onClick={onToggle}
                className="flex items-center justify-between w-full p-5 font-medium text-left text-charcoal dark:text-slate-200 bg-light-grey dark:bg-slate-800 bg-texture-fieldstone transition-colors"
                aria-expanded={isOpen}
            >
                <div className="flex items-center gap-4">
                    <span className="text-brand-green dark:text-green-400">{icon}</span>
                    <span className="text-lg font-serif">{title}</span>
                </div>
                {/* FIX: Suppress TypeScript error. The framer-motion props are not recognized in this environment. */}
                {/* @ts-ignore */}
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                    <ChevronDownIcon className="w-5 h-5 shrink-0" />
                </motion.div>
            </button>
        </h2>
        <AnimatePresence initial={false}>
            {isOpen && (
                // FIX: Suppress TypeScript error. The framer-motion props are not recognized in this environment.
                // @ts-ignore
                <motion.div
                    key="content"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                        open: { opacity: 1, height: "auto" },
                        collapsed: { opacity: 0, height: 0 }
                    }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                >
                    <div className="p-5 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const InfoItem = ({ icon, children }: { icon: ReactNode, children: ReactNode }) => (
    <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-5 h-5 mt-0.5 text-slate-400">{icon}</div>
        <div className="text-sm text-slate-600 dark:text-slate-300">{children}</div>
    </div>
);

const SectionCard = ({ title, children }: { title: string, children: ReactNode }) => (
    <div className="mb-6">
        <h4 className="text-md font-semibold font-serif text-charcoal dark:text-slate-200 border-b border-slate-200 dark:border-slate-700 pb-2 mb-3">{title}</h4>
        <div className="space-y-4">{children}</div>
    </div>
);

const CivicCard = ({ item }: { item: CivicEntry }) => (
    <div className="space-y-2">
        <p className="font-semibold text-charcoal dark:text-slate-200">{item.name}</p>
        <InfoItem icon={<MapPinIcon />}>{item.address}</InfoItem>
        {item.phone && <InfoItem icon={<PhoneIcon />}><a href={`tel:${item.phone}`} className="hover:underline">{item.phone}</a></InfoItem>}
        {item.hours && <InfoItem icon={<ChevronRightIcon className="w-5 h-5" />}>{item.hours}</InfoItem>}
    </div>
);


export default function DirectoryView({ onClose }: DirectoryViewProps) {
    const [openSection, setOpenSection] = useState<string | null>('Civic & Emergency');
    const { directory } = directoryData;

    const toggleSection = (title: string) => {
        setOpenSection(openSection === title ? null : title);
    };
    
    const sections = [
        { 
            title: 'Civic & Emergency', 
            icon: <AlertTriangleIcon className="w-6 h-6"/>, 
            content: (
                <div className="space-y-6">
                    <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800">
                        <h4 className="font-bold text-amber-800 dark:text-amber-200">Emergency Numbers</h4>
                        <div className="mt-2 flex gap-6">
                            <p><strong className="font-mono">Police:</strong> {directory.civic_infrastructure_emergency_services.emergency_numbers.police}</p>
                            <p><strong className="font-mono">Fire & Rescue:</strong> {directory.civic_infrastructure_emergency_services.emergency_numbers.fire_rescue}</p>
                        </div>
                    </div>
                    <SectionCard title="Municipal Administration"><CivicCard item={directory.civic_infrastructure_emergency_services.municipal_administration} /></SectionCard>
                    <SectionCard title="Tourist Information"><CivicCard item={directory.civic_infrastructure_emergency_services.tourist_information} /></SectionCard>
                    <SectionCard title="Police Station"><CivicCard item={directory.civic_infrastructure_emergency_services.police} /></SectionCard>
                </div>
            )
        },
        { 
            title: 'Healthcare & Wellness', 
            icon: <HospitalIcon className="w-6 h-6"/>, 
            content: (
                 <div className="space-y-6">
                    <SectionCard title="Hospital">
                        <div className="space-y-2">
                             <p className="font-semibold text-charcoal dark:text-slate-200">{directory.healthcare_wellness.hospital.name}</p>
                             <InfoItem icon={<MapPinIcon />}>{directory.healthcare_wellness.hospital.address}</InfoItem>
                             <InfoItem icon={<PhoneIcon />}><a href={`tel:${directory.healthcare_wellness.hospital.phone}`} className="hover:underline">{directory.healthcare_wellness.hospital.phone}</a></InfoItem>
                             <InfoItem icon={<LinkIcon />}><a href={directory.healthcare_wellness.hospital.website} target="_blank" rel="noopener noreferrer" className="hover:underline">Website</a></InfoItem>
                        </div>
                    </SectionCard>
                     <SectionCard title="Medical Center (MVZ)">
                        <div className="space-y-2">
                             <p className="font-semibold text-charcoal dark:text-slate-200">{directory.healthcare_wellness.medical_center.name}</p>
                             <InfoItem icon={<MapPinIcon />}>{directory.healthcare_wellness.medical_center.address}</InfoItem>
                            <div className="pl-8 pt-2 space-y-2">
                                {directory.healthcare_wellness.medical_center.specializations.map(s => (
                                    <p key={s.specialization} className="text-sm"><strong>{s.specialization}:</strong> {s.doctors.join(', ')}</p>
                                ))}
                            </div>
                        </div>
                    </SectionCard>
                    <SectionCard title="Independent Practices">
                         {directory.healthcare_wellness.independent_practices.map(p => (
                             <div key={p.name} className="pb-2">
                                 <p className="font-semibold text-charcoal dark:text-slate-200">{p.name}</p>
                                 <InfoItem icon={<StethoscopeIcon />}>{p.specialization}</InfoItem>
                                 <InfoItem icon={<MapPinIcon />}>{p.address}</InfoItem>
                                 {p.phone && <InfoItem icon={<PhoneIcon />}><a href={`tel:${p.phone.replace(/\s/g, '')}`}>{p.phone}</a></InfoItem>}
                             </div>
                         ))}
                    </SectionCard>
                 </div>
            )
        },
        { 
            title: 'Transportation', 
            icon: <TrainIcon className="w-6 h-6"/>, 
            content: (
                <div className="space-y-6">
                    <SectionCard title="Rail">
                         <InfoItem icon={<TrainIcon />}><strong>{directory.transportation_mobility.public_transport.rail.key_service}</strong> to {directory.transportation_mobility.public_transport.rail.destinations}</InfoItem>
                         <InfoItem icon={<MapPinIcon />}>{directory.transportation_mobility.public_transport.rail.station}, {directory.transportation_mobility.public_transport.rail.address}</InfoItem>
                         <InfoItem icon={<ChevronRightIcon className="w-5 h-5" />}>Frequency: {directory.transportation_mobility.public_transport.rail.frequency}</InfoItem>
                    </SectionCard>
                    <SectionCard title="Bus">
                        <p className="text-sm">Operator: {directory.transportation_mobility.public_transport.bus.operator}</p>
                        <div className="mt-2 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                             <p className="font-semibold">{directory.transportation_mobility.public_transport.bus.tourist_line.name}</p>
                             <p className="text-sm">{directory.transportation_mobility.public_transport.bus.tourist_line.route}</p>
                             <p className="text-xs mt-1 text-slate-500">{directory.transportation_mobility.public_transport.bus.tourist_line.details}</p>
                        </div>
                    </SectionCard>
                    <SectionCard title="Taxi & Ride Sharing">
                         {directory.transportation_mobility.private_transport.taxi_services.companies.map(c => (
                            <div key={c.name} className="pb-2">
                                <p className="font-semibold text-charcoal dark:text-slate-200">{c.name}</p>
                                <InfoItem icon={<PhoneIcon />}><a href={`tel:${c.phone.replace(/\s/g, '')}`}>{c.phone}</a></InfoItem>
                            </div>
                         ))}
                         <p className="text-xs text-slate-500">{directory.transportation_mobility.private_transport.taxi_services.note}</p>
                         <div className="pt-2">
                            <p className="text-sm"><strong>Ride Sharing:</strong> {directory.transportation_mobility.private_transport.ride_sharing.provider} {directory.transportation_mobility.private_transport.ride_sharing.service} is available.</p>
                         </div>
                    </SectionCard>
                </div>
            ) 
        },
    ];

  return (
    // FIX: Suppress TypeScript error. The framer-motion props are not recognized in this environment.
    // @ts-ignore
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="flex justify-between items-center mb-6 border-b-2 border-slate-200 dark:border-slate-700 pb-2">
        <h2 className="text-3xl font-serif font-bold text-charcoal dark:text-green-300">Local Directory</h2>
        <button 
            onClick={onClose}
            className="shrink-0 ml-4 px-4 py-2 text-sm font-semibold text-charcoal dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-light-grey dark:hover:bg-slate-700 transition-colors"
        >
            &larr; Back to Magazine
        </button>
      </div>
        <div className="bg-off-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            {sections.map(section => (
                <AccordionSection 
                    key={section.title}
                    title={section.title}
                    icon={section.icon}
                    isOpen={openSection === section.title}
                    onToggle={() => toggleSection(section.title)}
                >
                    {section.content}
                </AccordionSection>
            ))}
        </div>
    </motion.div>
  );
}