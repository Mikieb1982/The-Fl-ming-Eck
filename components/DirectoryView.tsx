
import React, { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { directoryData } from '../articles/directoryData';
import { CivicEntry, Hospital, MedicalCenter, Practice, Pharmacy, BankEntry, RetailEntry, Restaurant, Accommodation, Attraction, RailTransport, BusTransport, TaxiService, RideSharing } from '../types';

import ChevronDownIcon from './icons/ChevronDownIcon';
import AlertTriangleIcon from './icons/AlertTriangleIcon';
import HospitalIcon from './icons/HospitalIcon';
import TrainIcon from './icons/TrainIcon';
import BusIcon from './icons/BusIcon';
import PhoneIcon from './icons/PhoneIcon';
import LinkIcon from './icons/LinkIcon';
import MapPinIcon from './icons/MapPinIcon';
import BuildingOfficeIcon from './icons/BuildingOfficeIcon';
import UsersIcon from './icons/UsersIcon';
import ClockIcon from './icons/ClockIcon';
import InfoIcon from './icons/InfoIcon';


interface DirectoryViewProps {
  onClose: () => void;
}

const AccordionSection = ({ title, icon, children, isOpen, onToggle }: { title: string, icon: ReactNode, children: ReactNode, isOpen: boolean, onToggle: () => void }) => (
    <div className="border-b border-slate-200 dark:border-slate-700">
        <h2>
            <button
                type="button"
                onClick={onToggle}
                className={`flex items-center justify-between w-full p-5 font-medium text-left text-charcoal dark:text-slate-200 transition-colors ${isOpen ? 'bg-brand-blue/20 dark:bg-brand-blue/30' : 'bg-light-grey dark:bg-zinc-800 bg-texture-fieldstone hover:bg-sandstone-ochre/20 dark:hover:bg-sandstone-ochre/30'}`}
                aria-expanded={isOpen}
            >
                <div className="flex items-center gap-4">
                    <span className="text-brand-green dark:text-green-400">{icon}</span>
                    <span className="text-lg font-serif">{title}</span>
                </div>
                {/* @ts-ignore - The TypeScript types for framer-motion seem to be broken in this environment, causing valid props like 'initial' to be flagged as errors. */}
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                    <ChevronDownIcon className="w-5 h-5 shrink-0" />
                </motion.div>
            </button>
        </h2>
        <AnimatePresence initial={false}>
            {isOpen && (
                // @ts-ignore - The TypeScript types for framer-motion seem to be broken in this environment, causing valid props like 'initial' to be flagged as errors.
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
                    <div className="p-5 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-zinc-900">
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
    <div className="mb-6 last:mb-0">
        <h4 className="text-md font-semibold font-serif text-charcoal dark:text-slate-200 border-b border-slate-200 dark:border-slate-700 pb-2 mb-3">{title}</h4>
        <div className="space-y-4">{children}</div>
    </div>
);

const CivicCard = ({ item }: { item: CivicEntry }) => (
    <div className="space-y-2">
        <p className="font-semibold text-charcoal dark:text-slate-200">{item.name}</p>
        <InfoItem icon={<MapPinIcon />}>{item.address}</InfoItem>
        {item.phone && <InfoItem icon={<PhoneIcon />}><a href={`tel:${item.phone}`} className="hover:underline">{item.phone}</a></InfoItem>}
        {item.hours && <InfoItem icon={<ClockIcon />}><p>{item.hours}</p></InfoItem>}
    </div>
);

const HospitalCard = ({ item }: { item: Hospital }) => (
    <div className="space-y-2">
        <p className="font-semibold text-charcoal dark:text-slate-200">{item.name}</p>
        <InfoItem icon={<MapPinIcon />}>{item.address}</InfoItem>
        <InfoItem icon={<PhoneIcon />}><a href={`tel:${item.phone}`} className="hover:underline">{item.phone}</a></InfoItem>
        <InfoItem icon={<AlertTriangleIcon />}><a href={`tel:${item.emergency_phone}`} className="hover:underline font-semibold text-warm-terracotta">{item.emergency_phone} (Emergency)</a></InfoItem>
        <InfoItem icon={<LinkIcon />}><a href={item.website} target="_blank" rel="noopener noreferrer" className="hover:underline text-brand-blue dark:text-accent-blue">{item.website}</a></InfoItem>
    </div>
);

const MedicalCenterCard = ({ item }: { item: MedicalCenter }) => (
    <div className="space-y-2">
        <p className="font-semibold text-charcoal dark:text-slate-200">{item.name}</p>
        <InfoItem icon={<MapPinIcon />}>{item.address}</InfoItem>
        <InfoItem icon={<PhoneIcon />}><a href={`tel:${item.phone}`} className="hover:underline">{item.phone}</a></InfoItem>
        <div className="pt-2">
            {item.specializations.map(spec => (
                <p key={spec.specialization} className="text-sm text-slate-500 dark:text-slate-400 pl-8 -indent-8"><span className="font-semibold text-charcoal dark:text-slate-300">{spec.specialization}:</span> {spec.doctors.join(', ')}</p>
            ))}
        </div>
    </div>
);

const PracticeCard = ({ item }: { item: Practice }) => (
    <div className="space-y-2">
        <p className="font-semibold text-charcoal dark:text-slate-200">{item.name} <span className="text-sm font-normal text-slate-500 dark:text-slate-400">({item.specialization})</span></p>
        <InfoItem icon={<MapPinIcon />}>{item.address}</InfoItem>
        {item.phone && <InfoItem icon={<PhoneIcon />}><a href={`tel:${item.phone}`} className="hover:underline">{item.phone}</a></InfoItem>}
        {item.doctors && <InfoItem icon={<UsersIcon />}><p>{item.doctors.join(', ')}</p></InfoItem>}
    </div>
);

const PharmacyCard = ({ item }: { item: Pharmacy }) => (
    <div className="space-y-2">
        <p className="font-semibold text-charcoal dark:text-slate-200">{item.name}</p>
        <InfoItem icon={<MapPinIcon />}>{item.address}</InfoItem>
        <InfoItem icon={<PhoneIcon />}><a href={`tel:${item.phone}`} className="hover:underline">{item.phone}</a></InfoItem>
    </div>
);

const RetailCard = ({ item }: { item: RetailEntry }) => (
    <div className="space-y-2">
        <p className="font-semibold text-charcoal dark:text-slate-200">{item.name}</p>
        <InfoItem icon={<MapPinIcon />}>{item.address}</InfoItem>
    </div>
);

const BankCard = ({ item }: { item: BankEntry }) => (
    <div className="space-y-2">
        <p className="font-semibold text-charcoal dark:text-slate-200">{item.name}</p>
        <InfoItem icon={<MapPinIcon />}>{item.address}</InfoItem>
        <InfoItem icon={<InfoIcon />}><p>{item.services.join(', ')}</p></InfoItem>
    </div>
);

const AccommodationCard = ({ item }: { item: Accommodation }) => (
    <div className="space-y-2">
        <p className="font-semibold text-charcoal dark:text-slate-200">{item.name} <span className="text-sm font-normal text-slate-500 dark:text-slate-400">({item.type})</span></p>
        <InfoItem icon={<MapPinIcon />}>{item.address}</InfoItem>
        <InfoItem icon={<PhoneIcon />}><a href={`tel:${item.phone}`} className="hover:underline">{item.phone}</a></InfoItem>
        <InfoItem icon={<LinkIcon />}><a href={item.website} target="_blank" rel="noopener noreferrer" className="hover:underline text-brand-blue dark:text-accent-blue">{item.website}</a></InfoItem>
    </div>
);

const RestaurantCard = ({ item }: { item: Restaurant }) => (
    <div className="space-y-2">
        <p className="font-semibold text-charcoal dark:text-slate-200">{item.name} <span className="text-sm font-normal text-slate-500 dark:text-slate-400">({item.cuisine})</span></p>
        {item.address && <InfoItem icon={<MapPinIcon />}>{item.address}</InfoItem>}
    </div>
);

const AttractionCard = ({ item }: { item: Attraction }) => (
    <div className="space-y-2">
        <p className="font-semibold text-charcoal dark:text-slate-200">{item.name} <span className="text-sm font-normal text-slate-500 dark:text-slate-400">({item.type})</span></p>
        {item.hours && <InfoItem icon={<ClockIcon />}><p>{item.hours}</p></InfoItem>}
        {item.facilities && Object.entries(item.facilities).map(([key, value]) => (
             <p key={key} className="text-sm text-slate-500 dark:text-slate-400 pl-8 -indent-8"><span className="font-semibold text-charcoal dark:text-slate-300">{key}:</span> {value}</p>
        ))}
    </div>
);

const RailCard = ({ item }: { item: RailTransport }) => (
    <div className="space-y-2">
        <p className="font-semibold text-charcoal dark:text-slate-200">{item.station}</p>
        <InfoItem icon={<MapPinIcon />}>{item.address}</InfoItem>
        <InfoItem icon={<InfoIcon />}><p><strong>Service:</strong> {item.key_service}</p></InfoItem>
        <InfoItem icon={<InfoIcon />}><p><strong>Destinations:</strong> {item.destinations}</p></InfoItem>
        <InfoItem icon={<ClockIcon />}><p><strong>Frequency:</strong> {item.frequency}</p></InfoItem>
    </div>
);

const BusCard = ({ item }: { item: BusTransport }) => (
    <div className="space-y-2">
        <p className="font-semibold text-charcoal dark:text-slate-200">{item.operator}</p>
        <div className="pl-4 border-l-2 border-slate-200 dark:border-slate-700 ml-2 mt-2 space-y-2">
            <p className="font-semibold text-charcoal dark:text-slate-200">{item.tourist_line.name}</p>
            <InfoItem icon={<InfoIcon />}><p><strong>Route:</strong> {item.tourist_line.route}</p></InfoItem>
            <InfoItem icon={<ClockIcon />}><p><strong>Frequency:</strong> {item.tourist_line.frequency}</p></InfoItem>
            <InfoItem icon={<InfoIcon />}><p>{item.tourist_line.details}</p></InfoItem>
        </div>
        <InfoItem icon={<InfoIcon />}><p><strong>Regional lines:</strong> {item.regional_lines}</p></InfoItem>
    </div>
);

const TaxiCard = ({ item }: { item: TaxiService }) => (
    <div className="space-y-4">
        <p className="text-sm text-slate-500 dark:text-slate-400 italic">{item.note}</p>
        {item.companies.map(company => (
            <div key={company.name} className="space-y-2">
                <p className="font-semibold text-charcoal dark:text-slate-200">{company.name}</p>
                <InfoItem icon={<PhoneIcon />}><a href={`tel:${company.phone}`} className="hover:underline">{company.phone}</a></InfoItem>
                <InfoItem icon={<InfoIcon />}><p>{company.services.join(', ')}</p></InfoItem>
            </div>
        ))}
         <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Sample Fares</p>
            <p className="text-sm text-slate-600 dark:text-slate-300">Base: {item.fares.base_fare}, Per km: {item.fares.per_km_rate}, Waiting (hourly): {item.fares.waiting_time_hourly}</p>
        </div>
    </div>
);

const RideSharingCard = ({ item }: { item: RideSharing }) => (
    <div className="space-y-2">
        <p className="font-semibold text-charcoal dark:text-slate-200">{item.provider} ({item.service})</p>
        <InfoItem icon={<InfoIcon />}><p>{item.details}</p></InfoItem>
    </div>
);


export default function DirectoryView({ onClose }: DirectoryViewProps) {
    const [openSection, setOpenSection] = useState<string | null>('civic');
    const { directory } = directoryData;

    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        // @ts-ignore - The TypeScript types for framer-motion seem to be broken in this environment, causing valid props like 'initial' to be flagged as errors.
        <motion.div
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
            <p className="mb-6 text-slate-600 dark:text-slate-400">
                A curated list of essential services and points of interest for residents and visitors in {directoryData.region}.
            </p>

            <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                <AccordionSection
                    title="Civic & Emergency"
                    icon={<BuildingOfficeIcon className="w-6 h-6" />}
                    isOpen={openSection === 'civic'}
                    onToggle={() => toggleSection('civic')}
                >
                    <SectionCard title="Emergency Numbers">
                        <div className="flex items-center gap-4 p-4 bg-red-50 dark:bg-red-900/40 rounded-lg border border-red-200 dark:border-red-800">
                            <AlertTriangleIcon className="w-8 h-8 text-red-600 dark:text-red-400 shrink-0" />
                            <div>
                                <p>Police: <a href="tel:110" className="font-bold text-lg hover:underline">110</a></p>
                                <p>Fire & Rescue: <a href="tel:112" className="font-bold text-lg hover:underline">112</a></p>
                            </div>
                        </div>
                    </SectionCard>
                    <SectionCard title="Municipal Services">
                        <CivicCard item={directory.civic_infrastructure_emergency_services.municipal_administration} />
                        <CivicCard item={directory.civic_infrastructure_emergency_services.tourist_information} />
                        <CivicCard item={directory.civic_infrastructure_emergency_services.police} />
                    </SectionCard>
                </AccordionSection>

                <AccordionSection
                    title="Healthcare & Wellness"
                    icon={<HospitalIcon className="w-6 h-6" />}
                    isOpen={openSection === 'healthcare'}
                    onToggle={() => toggleSection('healthcare')}
                >
                    <SectionCard title="Hospital">
                        <HospitalCard item={directory.healthcare_wellness.hospital} />
                    </SectionCard>
                    <SectionCard title="Medical Center (MVZ)">
                        <MedicalCenterCard item={directory.healthcare_wellness.medical_center} />
                    </SectionCard>
                    <SectionCard title="Independent Practices">
                        {directory.healthcare_wellness.independent_practices.map(item => <PracticeCard key={item.name} item={item} />)}
                    </SectionCard>
                    <SectionCard title="Pharmacies">
                        {directory.healthcare_wellness.pharmacies.map(item => <PharmacyCard key={item.name} item={item} />)}
                    </SectionCard>
                </AccordionSection>
                
                <AccordionSection
                    title="Commerce & Services"
                    icon={<UsersIcon className="w-6 h-6" />}
                    isOpen={openSection === 'commerce'}
                    onToggle={() => toggleSection('commerce')}
                >
                    <SectionCard title="Supermarkets">
                        {directory.commerce_services.retail_shopping.supermarkets.map(item => <RetailCard key={item.name} item={item} />)}
                    </SectionCard>
                    <SectionCard title="Other Retail">
                        {directory.commerce_services.retail_shopping.drugstores.map(item => <RetailCard key={item.name} item={item} />)}
                        {directory.commerce_services.retail_shopping.bakeries.map(item => <RetailCard key={item.name} item={item} />)}
                        {directory.commerce_services.retail_shopping.butchers.map(item => <RetailCard key={item.name} item={item} />)}
                        {directory.commerce_services.retail_shopping.bookstores.map(item => <RetailCard key={item.name} item={item} />)}
                        {directory.commerce_services.retail_shopping.florists.map(item => <RetailCard key={item.name} item={item} />)}
                    </SectionCard>
                    <SectionCard title="Financial & Postal">
                        {directory.commerce_services.financial_postal_services.banks.map(item => <BankCard key={item.name} item={item} />)}
                        <div className="space-y-2">
                            <p className="font-semibold text-charcoal dark:text-slate-200">{directory.commerce_services.financial_postal_services.postal_services.provider}</p>
                            <InfoItem icon={<InfoIcon />}>{directory.commerce_services.financial_postal_services.postal_services.model}</InfoItem>
                            {directory.commerce_services.financial_postal_services.postal_services.locations.map(loc => <InfoItem key={loc.name} icon={<MapPinIcon />}>{loc.name} at {loc.address}</InfoItem>)}
                        </div>
                    </SectionCard>
                </AccordionSection>
                
                <AccordionSection
                    title="Tourism & Hospitality"
                    icon={<MapPinIcon className="w-6 h-6" />}
                    isOpen={openSection === 'tourism'}
                    onToggle={() => toggleSection('tourism')}
                >
                    <SectionCard title="Accommodation">
                        {directory.tourism_hospitality.accommodation.map(item => <AccommodationCard key={item.name} item={item} />)}
                    </SectionCard>
                    <SectionCard title="Restaurants (German/Regional)">
                        {directory.tourism_hospitality.gastronomy.restaurants.german_regional.map(item => <RestaurantCard key={item.name} item={item} />)}
                    </SectionCard>
                    <SectionCard title="Restaurants (International)">
                        {directory.tourism_hospitality.gastronomy.restaurants.international.map(item => <RestaurantCard key={item.name} item={item} />)}
                    </SectionCard>
                    <SectionCard title="Cafés, Bistros & Ice Cream">
                        {directory.tourism_hospitality.gastronomy.cafes_bistros_ice_cream.map(item => <RestaurantCard key={item.name} item={item} />)}
                    </SectionCard>
                    <SectionCard title="Bars & Pubs">
                        {directory.tourism_hospitality.gastronomy.bars_pubs.map(item => <RestaurantCard key={item.name} item={item} />)}
                    </SectionCard>
                </AccordionSection>

                <AccordionSection
                    title="Culture, Education & Recreation"
                    icon={<BuildingOfficeIcon className="w-6 h-6" />}
                    isOpen={openSection === 'culture'}
                    onToggle={() => toggleSection('culture')}
                >
                    <SectionCard title="Key Attractions">
                        {directory.culture_education_recreation.key_attractions.map(item => <AttractionCard key={item.name} item={item} />)}
                    </SectionCard>
                </AccordionSection>
                
                <AccordionSection
                    title="Transportation & Mobility"
                    icon={<TrainIcon className="w-6 h-6" />}
                    isOpen={openSection === 'transportation'}
                    onToggle={() => toggleSection('transportation')}
                >
                    <SectionCard title="Rail">
                        <RailCard item={directory.transportation_mobility.public_transport.rail} />
                    </SectionCard>
                    <SectionCard title="Bus">
                        <BusCard item={directory.transportation_mobility.public_transport.bus} />
                    </SectionCard>
                    <SectionCard title="Taxi">
                        <TaxiCard item={directory.transportation_mobility.private_transport.taxi_services} />
                    </SectionCard>
                    <SectionCard title="Ride Sharing">
                        <RideSharingCard item={directory.transportation_mobility.private_transport.ride_sharing} />
                    </SectionCard>
                </AccordionSection>
            </div>
        </motion.div>
    );
}
