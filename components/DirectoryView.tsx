import React, { useState, ReactNode, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { directoryData } from '../data/directoryData';
import { CivicEntry, Hospital, MedicalCenter, Practice, Pharmacy, BankEntry, RetailEntry, Restaurant, Accommodation, Attraction, RailTransport, BusTransport, TaxiService, RideSharing, VisitorCenter, HikingTrail, ObservationTower, PostalService } from '../types';
import { fuzzySearch } from '../utils/helpers';

import ChevronDownIcon from './icons/ChevronDownIcon';
import AlertTriangleIcon from './icons/AlertTriangleIcon';
import HospitalIcon from './icons/HospitalIcon';
import TrainIcon from './icons/TrainIcon';
import PhoneIcon from './icons/PhoneIcon';
import LinkIcon from './icons/LinkIcon';
import MapPinIcon from './icons/MapPinIcon';
import BuildingOfficeIcon from './icons/BuildingOfficeIcon';
import UsersIcon from './icons/UsersIcon';
import ClockIcon from './icons/ClockIcon';
import InfoIcon from './icons/InfoIcon';
import LeafIcon from './icons/LeafIcon';
import PaletteIcon from './icons/PaletteIcon';
import SearchIcon from './icons/SearchIcon';

const MotionDiv = motion.div as any;

interface DirectoryViewProps {
  onClose: () => void;
}

const AccordionSection = ({ title, icon, children, isOpen, onToggle }: { title: string, icon: ReactNode, children: ReactNode, isOpen: boolean, onToggle: () => void }) => (
    <div className="border-b border-slate-200 dark:border-slate-700">
        <h2>
            <button
                type="button"
                onClick={onToggle}
                className={`flex items-center justify-between w-full p-5 font-medium text-left text-charcoal dark:text-slate-200 transition-colors ${isOpen ? 'bg-ocean/10 dark:bg-ocean/20' : 'bg-slate-50 dark:bg-slate-800 hover:bg-ocean/5 dark:hover:bg-ocean/10'}`}
                aria-expanded={isOpen}
            >
                <div className="flex items-center gap-4">
                    <span className="text-ocean dark:text-green-300">{icon}</span>
                    <span className="text-lg font-serif">{title}</span>
                </div>
                <MotionDiv animate={{ rotate: isOpen ? 180 : 0 }}>
                    <ChevronDownIcon className="w-5 h-5 shrink-0" />
                </MotionDiv>
            </button>
        </h2>
        <AnimatePresence initial={false}>
            {isOpen && (
                <MotionDiv
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
                    <div className="p-5 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                        {children}
                    </div>
                </MotionDiv>
            )}
        </AnimatePresence>
    </div>
);

const InfoItem = ({ icon, children }: { icon: ReactNode, children: ReactNode }) => (
    <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-5 h-5 mt-0.5 text-slate-500 dark:text-slate-400">{icon}</div>
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
        <InfoItem icon={<AlertTriangleIcon />}><a href={`tel:${item.emergency_phone}`} className="hover:underline font-semibold text-poppy">{item.emergency_phone} (Emergency)</a></InfoItem>
        <InfoItem icon={<LinkIcon />}><a href={item.website} target="_blank" rel="noopener noreferrer" className="hover:underline text-ocean dark:text-cyan-400">{item.website}</a></InfoItem>
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
        <p className="font-semibold text-charcoal dark:text-slate-200">{item.name} <span className="text-sm font-normal text-slate-500 dark:text-slate-300">({item.specialization})</span></p>
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
        <p className="font-semibold text-charcoal dark:text-slate-200">{item.name} <span className="text-sm font-normal text-slate-500 dark:text-slate-300">({item.type})</span></p>
        <InfoItem icon={<MapPinIcon />}>{item.address}</InfoItem>
        <InfoItem icon={<PhoneIcon />}><a href={`tel:${item.phone}`} className="hover:underline">{item.phone}</a></InfoItem>
        <InfoItem icon={<LinkIcon />}><a href={item.website} target="_blank" rel="noopener noreferrer" className="hover:underline text-ocean dark:text-cyan-400">{item.website}</a></InfoItem>
    </div>
);

const RestaurantCard = ({ item }: { item: Restaurant }) => (
    <div className="space-y-2">
        <p className="font-semibold text-charcoal dark:text-slate-200">{item.name} <span className="text-sm font-normal text-slate-500 dark:text-slate-300">({item.cuisine})</span></p>
        {item.address && <InfoItem icon={<MapPinIcon />}>{item.address}</InfoItem>}
    </div>
);

const AttractionCard = ({ item }: { item: Attraction }) => (
    <div className="space-y-2">
        <p className="font-semibold text-charcoal dark:text-slate-200">{item.name} <span className="text-sm font-normal text-slate-500 dark:text-slate-300">({item.type})</span></p>
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
        <p className="text-sm text-slate-500 dark:text-slate-300 italic">{item.note}</p>
        {item.companies.map(company => (
            <div key={company.name} className="space-y-2">
                <p className="font-semibold text-charcoal dark:text-slate-200">{company.name}</p>
                <InfoItem icon={<PhoneIcon />}><a href={`tel:${company.phone}`} className="hover:underline">{company.phone}</a></InfoItem>
                <InfoItem icon={<InfoIcon />}><p>{company.services.join(', ')}</p></InfoItem>
            </div>
        ))}
         <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-300">Sample Fares</p>
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

const VisitorCenterCard = ({ item }: { item: VisitorCenter }) => (
    <div className="space-y-2">
        <p className="font-semibold text-charcoal dark:text-slate-200">{item.name}</p>
        <InfoItem icon={<MapPinIcon />}>{item.location} - {item.address}</InfoItem>
        <InfoItem icon={<InfoIcon />}>{item.description}</InfoItem>
        {item.website && <InfoItem icon={<LinkIcon />}><a href={item.website} target="_blank" rel="noopener noreferrer" className="hover:underline text-ocean dark:text-cyan-400">Visit Website</a></InfoItem>}
    </div>
);

const HikingTrailCard = ({ item }: { item: HikingTrail }) => (
    <div className="space-y-2">
        <p className="font-semibold text-charcoal dark:text-slate-200">{item.name} <span className="text-sm font-normal text-slate-500 dark:text-slate-300">({item.length})</span></p>
        <InfoItem icon={<MapPinIcon />}><strong>Route:</strong> {item.route}</InfoItem>
        <InfoItem icon={<InfoIcon />}>{item.description}</InfoItem>
    </div>
);

const ObservationTowerCard = ({ item }: { item: ObservationTower }) => (
    <div className="space-y-2">
        <p className="font-semibold text-charcoal dark:text-slate-200">{item.name}</p>
        <InfoItem icon={<MapPinIcon />}>{item.location}</InfoItem>
        <InfoItem icon={<InfoIcon />}>{item.description}</InfoItem>
    </div>
);


export default function DirectoryView({ onClose }: DirectoryViewProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [openSection, setOpenSection] = useState<string | null>('civic');

    const { directory } = directoryData;
    const q = searchQuery.trim();

    const filteredData = useMemo(() => {
        if (!q) {
            const d = directory;
            return {
                hasResults: true,
                civic: { 
                    admin: d.civic_infrastructure_emergency_services.municipal_administration, 
                    tourist: d.civic_infrastructure_emergency_services.tourist_information, 
                    police: d.civic_infrastructure_emergency_services.police, 
                    hasResults: true 
                },
                health: { 
                    hospital: d.healthcare_wellness.hospital, 
                    medical_center: d.healthcare_wellness.medical_center, 
                    practices: d.healthcare_wellness.independent_practices, 
                    pharmacies: d.healthcare_wellness.pharmacies, 
                    hasResults: true 
                },
                comm: { 
                    supermarkets: d.commerce_services.retail_shopping.supermarkets, 
                    drugstores: d.commerce_services.retail_shopping.drugstores, 
                    bakeries: d.commerce_services.retail_shopping.bakeries, 
                    butchers: d.commerce_services.retail_shopping.butchers, 
                    bookstores: d.commerce_services.retail_shopping.bookstores, 
                    florists: d.commerce_services.retail_shopping.florists, 
                    banks: d.commerce_services.financial_postal_services.banks, 
                    postal: d.commerce_services.financial_postal_services.postal_services, 
                    hasResults: true 
                },
                tour: { 
                    accommodation: d.tourism_hospitality.accommodation, 
                    german: d.tourism_hospitality.gastronomy.restaurants.german_regional, 
                    international: d.tourism_hospitality.gastronomy.restaurants.international, 
                    cafes: d.tourism_hospitality.gastronomy.cafes_bistros_ice_cream, 
                    bars: d.tourism_hospitality.gastronomy.bars_pubs, 
                    hasResults: true 
                },
                cult: { 
                    attractions: d.culture_education_recreation.key_attractions, 
                    hasResults: true 
                },
                trans: { 
                    rail: d.transportation_mobility.public_transport.rail, 
                    bus: d.transportation_mobility.public_transport.bus, 
                    taxi: d.transportation_mobility.private_transport.taxi_services, 
                    rideSharing: d.transportation_mobility.private_transport.ride_sharing, 
                    hasResults: true 
                },
                nat: { 
                    visitorCenters: d.nature_outdoors.visitor_centers, 
                    hikingTrails: d.nature_outdoors.key_hiking_trails, 
                    observationTowers: d.nature_outdoors.observation_towers, 
                    hasResults: true 
                },
            };
        }

        const check = (text: any) => typeof text === 'string' && fuzzySearch(q, text);
        const checkArray = (arr: any) => Array.isArray(arr) && arr.some(item => check(item));

        const isCivicEntryMatch = (item: CivicEntry) => check(item.name) || check(item.address);
        const isHospitalMatch = (item: Hospital) => check(item.name) || check(item.address);
        const isMedicalCenterMatch = (item: MedicalCenter) => check(item.name) || item.specializations.some(s => check(s.specialization) || checkArray(s.doctors));
        const isPracticeMatch = (item: Practice) => check(item.name) || check(item.specialization) || checkArray(item.doctors);
        const isPharmacyMatch = (item: Pharmacy) => check(item.name);
        const isRetailMatch = (item: RetailEntry) => check(item.name);
        const isBankMatch = (item: BankEntry) => check(item.name) || checkArray(item.services);
        const isPostalMatch = (item: PostalService) => check(item.provider) || item.locations.some(isRetailMatch);
        const isAccommodationMatch = (item: Accommodation) => check(item.name) || check(item.type);
        const isRestaurantMatch = (item: Restaurant) => check(item.name) || check(item.cuisine);
        const isAttractionMatch = (item: Attraction) => check(item.name) || check(item.type) || (item.facilities && Object.values(item.facilities).some(check));
        const isRailMatch = (item: RailTransport) => check(item.station) || check(item.key_service) || check(item.destinations);
        const isBusMatch = (item: BusTransport) => check(item.operator) || check(item.tourist_line.name) || check(item.tourist_line.route);
        const isTaxiMatch = (item: TaxiService) => item.companies.some(c => check(c.name) || checkArray(c.services));
        const isRideSharingMatch = (item: RideSharing) => check(item.provider) || check(item.service);
        const isVisitorCenterMatch = (item: VisitorCenter) => check(item.name) || check(item.description) || check(item.location);
        const isHikingTrailMatch = (item: HikingTrail) => check(item.name) || check(item.description) || check(item.route);
        const isObservationTowerMatch = (item: ObservationTower) => check(item.name) || check(item.description) || check(item.location);

        const civicAdmin = isCivicEntryMatch(directory.civic_infrastructure_emergency_services.municipal_administration) ? directory.civic_infrastructure_emergency_services.municipal_administration : null;
        const civicTourist = isCivicEntryMatch(directory.civic_infrastructure_emergency_services.tourist_information) ? directory.civic_infrastructure_emergency_services.tourist_information : null;
        const civicPolice = isCivicEntryMatch(directory.civic_infrastructure_emergency_services.police) ? directory.civic_infrastructure_emergency_services.police : null;
        const civicHasResults = !!(civicAdmin || civicTourist || civicPolice || fuzzySearch(q, 'emergency'));

        const healthHospital = isHospitalMatch(directory.healthcare_wellness.hospital) ? directory.healthcare_wellness.hospital : null;
        const healthMedicalCenter = isMedicalCenterMatch(directory.healthcare_wellness.medical_center) ? directory.healthcare_wellness.medical_center : null;
        const healthPractices = directory.healthcare_wellness.independent_practices.filter(isPracticeMatch);
        const healthPharmacies = directory.healthcare_wellness.pharmacies.filter(isPharmacyMatch);
        const healthHasResults = !!(healthHospital || healthMedicalCenter || healthPractices.length > 0 || healthPharmacies.length > 0);
        
        const commSupermarkets = directory.commerce_services.retail_shopping.supermarkets.filter(isRetailMatch);
        const commDrugstores = directory.commerce_services.retail_shopping.drugstores.filter(isRetailMatch);
        const commBakeries = directory.commerce_services.retail_shopping.bakeries.filter(isRetailMatch);
        const commButchers = directory.commerce_services.retail_shopping.butchers.filter(isRetailMatch);
        const commBookstores = directory.commerce_services.retail_shopping.bookstores.filter(isRetailMatch);
        const commFlorists = directory.commerce_services.retail_shopping.florists.filter(isRetailMatch);
        const commBanks = directory.commerce_services.financial_postal_services.banks.filter(isBankMatch);
        const commPostal = isPostalMatch(directory.commerce_services.financial_postal_services.postal_services) ? { ...directory.commerce_services.financial_postal_services.postal_services, locations: directory.commerce_services.financial_postal_services.postal_services.locations.filter(isRetailMatch) } : null;
        const commHasResults = !!(commSupermarkets.length > 0 || commDrugstores.length > 0 || commBakeries.length > 0 || commButchers.length > 0 || commBookstores.length > 0 || commFlorists.length > 0 || commBanks.length > 0 || commPostal);

        const tourAccommodation = directory.tourism_hospitality.accommodation.filter(isAccommodationMatch);
        const tourGerman = directory.tourism_hospitality.gastronomy.restaurants.german_regional.filter(isRestaurantMatch);
        const tourInternational = directory.tourism_hospitality.gastronomy.restaurants.international.filter(isRestaurantMatch);
        const tourCafes = directory.tourism_hospitality.gastronomy.cafes_bistros_ice_cream.filter(isRestaurantMatch);
        const tourBars = directory.tourism_hospitality.gastronomy.bars_pubs.filter(isRestaurantMatch);
        const tourHasResults = !!(tourAccommodation.length > 0 || tourGerman.length > 0 || tourInternational.length > 0 || tourCafes.length > 0 || tourBars.length > 0);

        const cultAttractions = directory.culture_education_recreation.key_attractions.filter(isAttractionMatch);
        const cultHasResults = cultAttractions.length > 0;
        
        const transRail = isRailMatch(directory.transportation_mobility.public_transport.rail) ? directory.transportation_mobility.public_transport.rail : null;
        const transBus = isBusMatch(directory.transportation_mobility.public_transport.bus) ? directory.transportation_mobility.public_transport.bus : null;
        const transTaxi = isTaxiMatch(directory.transportation_mobility.private_transport.taxi_services) ? directory.transportation_mobility.private_transport.taxi_services : null;
        const transRideSharing = isRideSharingMatch(directory.transportation_mobility.private_transport.ride_sharing) ? directory.transportation_mobility.private_transport.ride_sharing : null;
        const transHasResults = !!(transRail || transBus || transTaxi || transRideSharing);

        const natVisitorCenters = directory.nature_outdoors.visitor_centers.filter(isVisitorCenterMatch);
        const natHikingTrails = directory.nature_outdoors.key_hiking_trails.filter(isHikingTrailMatch);
        const natObservationTowers = directory.nature_outdoors.observation_towers.filter(isObservationTowerMatch);
        const natHasResults = natVisitorCenters.length > 0 || natHikingTrails.length > 0 || natObservationTowers.length > 0;

        return {
            hasResults: civicHasResults || healthHasResults || commHasResults || tourHasResults || cultHasResults || transHasResults || natHasResults,
            civic: { admin: civicAdmin, tourist: civicTourist, police: civicPolice, hasResults: civicHasResults },
            health: { hospital: healthHospital, medical_center: healthMedicalCenter, practices: healthPractices, pharmacies: healthPharmacies, hasResults: healthHasResults },
            comm: { supermarkets: commSupermarkets, drugstores: commDrugstores, bakeries: commBakeries, butchers: commButchers, bookstores: commBookstores, florists: commFlorists, banks: commBanks, postal: commPostal, hasResults: commHasResults },
            tour: { accommodation: tourAccommodation, german: tourGerman, international: tourInternational, cafes: tourCafes, bars: tourBars, hasResults: tourHasResults },
            cult: { attractions: cultAttractions, hasResults: cultHasResults },
            trans: { rail: transRail, bus: transBus, taxi: transTaxi, rideSharing: transRideSharing, hasResults: transHasResults },
            nat: { visitorCenters: natVisitorCenters, hikingTrails: natHikingTrails, observationTowers: natObservationTowers, hasResults: natHasResults },
        };
    }, [q, directory]);


    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };

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
            <p className="mb-4 text-slate-600 dark:text-slate-300">
                A curated list of essential services and points of interest for residents and visitors in {directoryData.region}.
            </p>

            <div className="relative mb-6">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <SearchIcon className="h-5 w-5 text-slate-400" />
                </div>
                <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm pl-10 pr-4 py-2 focus:border-ocean focus:ring-ocean sm:text-sm bg-white dark:bg-slate-900 dark:placeholder-slate-400"
                    placeholder="Search directory (e.g., 'pharmacy', 'REWE', 'dentist')..."
                />
            </div>

            {filteredData.hasResults ? (
                <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                    {filteredData.civic.hasResults && (
                        <AccordionSection
                            title="Civic & Emergency"
                            icon={<BuildingOfficeIcon className="w-6 h-6" />}
                            isOpen={q ? true : openSection === 'civic'}
                            onToggle={() => toggleSection('civic')}
                        >
                            {(q ? fuzzySearch(q, 'emergency') : true) && <SectionCard title="Emergency Numbers">
                                <div className="flex items-center gap-4 p-4 bg-red-50 dark:bg-red-900/40 rounded-lg border border-red-200 dark:border-red-800">
                                    <AlertTriangleIcon className="w-8 h-8 text-red-600 dark:text-red-400 shrink-0" />
                                    <div>
                                        <p>Police: <a href="tel:110" className="font-bold text-lg hover:underline">110</a></p>
                                        <p>Fire & Rescue: <a href="tel:112" className="font-bold text-lg hover:underline">112</a></p>
                                    </div>
                                </div>
                            </SectionCard>}
                            {(filteredData.civic.admin || filteredData.civic.tourist || filteredData.civic.police) && <SectionCard title="Municipal Services">
                                {filteredData.civic.admin && <CivicCard item={filteredData.civic.admin} />}
                                {filteredData.civic.tourist && <CivicCard item={filteredData.civic.tourist} />}
                                {filteredData.civic.police && <CivicCard item={filteredData.civic.police} />}
                            </SectionCard>}
                        </AccordionSection>
                    )}

                    {filteredData.health.hasResults && (
                        <AccordionSection
                            title="Healthcare & Wellness"
                            icon={<HospitalIcon className="w-6 h-6" />}
                            isOpen={q ? true : openSection === 'healthcare'}
                            onToggle={() => toggleSection('healthcare')}
                        >
                            {filteredData.health.hospital && <SectionCard title="Hospital"><HospitalCard item={filteredData.health.hospital} /></SectionCard>}
                            {filteredData.health.medical_center && <SectionCard title="Medical Center (MVZ)"><MedicalCenterCard item={filteredData.health.medical_center} /></SectionCard>}
                            {filteredData.health.practices.length > 0 && <SectionCard title="Independent Practices">{filteredData.health.practices.map(item => <PracticeCard key={item.name} item={item} />)}</SectionCard>}
                            {filteredData.health.pharmacies.length > 0 && <SectionCard title="Pharmacies">{filteredData.health.pharmacies.map(item => <PharmacyCard key={item.name} item={item} />)}</SectionCard>}
                        </AccordionSection>
                    )}
                    
                    {filteredData.comm.hasResults && (
                         <AccordionSection
                            title="Commerce & Services"
                            icon={<UsersIcon className="w-6 h-6" />}
                            isOpen={q ? true : openSection === 'commerce'}
                            onToggle={() => toggleSection('commerce')}
                        >
                            {filteredData.comm.supermarkets.length > 0 && <SectionCard title="Supermarkets">{filteredData.comm.supermarkets.map(item => <RetailCard key={item.name} item={item} />)}</SectionCard>}
                            { (filteredData.comm.drugstores.length > 0 || filteredData.comm.bakeries.length > 0 || filteredData.comm.butchers.length > 0 || filteredData.comm.bookstores.length > 0 || filteredData.comm.florists.length > 0) &&
                                <SectionCard title="Other Retail">
                                    {filteredData.comm.drugstores.map(item => <RetailCard key={item.name} item={item} />)}
                                    {filteredData.comm.bakeries.map(item => <RetailCard key={item.name} item={item} />)}
                                    {filteredData.comm.butchers.map(item => <RetailCard key={item.name} item={item} />)}
                                    {filteredData.comm.bookstores.map(item => <RetailCard key={item.name} item={item} />)}
                                    {filteredData.comm.florists.map(item => <RetailCard key={item.name} item={item} />)}
                                </SectionCard>
                            }
                            {(filteredData.comm.banks.length > 0 || filteredData.comm.postal) &&
                                <SectionCard title="Financial & Postal">
                                    {filteredData.comm.banks.map(item => <BankCard key={item.name} item={item} />)}
                                    {filteredData.comm.postal && (
                                        <div className="space-y-2">
                                            <p className="font-semibold text-charcoal dark:text-slate-200">{filteredData.comm.postal.provider}</p>
                                            <InfoItem icon={<InfoIcon />}>{filteredData.comm.postal.model}</InfoItem>
                                            {filteredData.comm.postal.locations.map(loc => <InfoItem key={loc.name} icon={<MapPinIcon/>}>{loc.name} - {loc.address}</InfoItem>)}
                                        </div>
                                    )}
                                </SectionCard>
                            }
                        </AccordionSection>
                    )}
                    
                    {filteredData.tour.hasResults && (
                         <AccordionSection
                            title="Tourism & Hospitality"
                            icon={<MapPinIcon className="w-6 h-6" />}
                            isOpen={q ? true : openSection === 'tourism'}
                            onToggle={() => toggleSection('tourism')}
                        >
                            {filteredData.tour.accommodation.length > 0 && <SectionCard title="Accommodation">{filteredData.tour.accommodation.map(item => <AccommodationCard key={item.name} item={item} />)}</SectionCard>}
                            {filteredData.tour.german.length > 0 && <SectionCard title="Restaurants (German/Regional)">{filteredData.tour.german.map(item => <RestaurantCard key={item.name} item={item} />)}</SectionCard>}
                            {filteredData.tour.international.length > 0 && <SectionCard title="Restaurants (International)">{filteredData.tour.international.map(item => <RestaurantCard key={item.name} item={item} />)}</SectionCard>}
                            {filteredData.tour.cafes.length > 0 && <SectionCard title="Cafés, Bistros & Ice Cream">{filteredData.tour.cafes.map(item => <RestaurantCard key={item.name} item={item} />)}</SectionCard>}
                            {filteredData.tour.bars.length > 0 && <SectionCard title="Bars & Pubs">{filteredData.tour.bars.map(item => <RestaurantCard key={item.name} item={item} />)}</SectionCard>}
                        </AccordionSection>
                    )}

                    {filteredData.cult.hasResults && (
                        <AccordionSection
                            title="Culture, Education & Recreation"
                            icon={<PaletteIcon className="w-6 h-6" />}
                            isOpen={q ? true : openSection === 'culture'}
                            onToggle={() => toggleSection('culture')}
                        >
                            <SectionCard title="Key Attractions & Venues">
                                {filteredData.cult.attractions.map(item => <AttractionCard key={item.name} item={item} />)}
                            </SectionCard>
                        </AccordionSection>
                    )}
                    
                    {filteredData.trans.hasResults && (
                        <AccordionSection
                            title="Transportation & Mobility"
                            icon={<TrainIcon className="w-6 h-6" />}
                            isOpen={q ? true : openSection === 'transportation'}
                            onToggle={() => toggleSection('transportation')}
                        >
                            {filteredData.trans.rail && <SectionCard title="Public Transport: Rail"><RailCard item={filteredData.trans.rail} /></SectionCard>}
                            {filteredData.trans.bus && <SectionCard title="Public Transport: Bus"><BusCard item={filteredData.trans.bus} /></SectionCard>}
                            {filteredData.trans.taxi && <SectionCard title="Taxi Services"><TaxiCard item={filteredData.trans.taxi} /></SectionCard>}
                            {filteredData.trans.rideSharing && <SectionCard title="Ride Sharing"><RideSharingCard item={filteredData.trans.rideSharing} /></SectionCard>}
                        </AccordionSection>
                    )}

                    {filteredData.nat.hasResults && (
                        <AccordionSection
                            title="Nature & Outdoors"
                            icon={<LeafIcon className="w-6 h-6" />}
                            isOpen={q ? true : openSection === 'nature'}
                            onToggle={() => toggleSection('nature')}
                        >
                            {filteredData.nat.visitorCenters.length > 0 && <SectionCard title="Visitor Centers">{filteredData.nat.visitorCenters.map(item => <VisitorCenterCard key={item.name} item={item} />)}</SectionCard>}
                            {filteredData.nat.hikingTrails.length > 0 && <SectionCard title="Key Hiking Trails">{filteredData.nat.hikingTrails.map(item => <HikingTrailCard key={item.name} item={item} />)}</SectionCard>}
                            {filteredData.nat.observationTowers.length > 0 && <SectionCard title="Observation Towers">{filteredData.nat.observationTowers.map(item => <ObservationTowerCard key={item.name} item={item} />)}</SectionCard>}
                        </AccordionSection>
                    )}
                </div>
            ) : (
                <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                    <p className="text-slate-600 dark:text-slate-300 font-semibold">No results found for "{searchQuery}"</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Try searching for a different term or check your spelling.</p>
                </div>
            )}
        </MotionDiv>
    );
}