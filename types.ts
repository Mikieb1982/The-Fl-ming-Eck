// FIX: Create full content for types.ts to resolve module and type errors.
export interface PollOption {
  text: string;
  votes: number;
}

export type ArticleBodyBlock =
  | { type: 'paragraph'; content: string }
  | { type: 'subheading'; content: string }
  | { type: 'audio'; src: string; caption?: string }
  | { type: 'video'; youtubeId: string; caption?: string }
  | { type: 'poll'; question: string; options: PollOption[] };

export interface EventDetails {
    startDate: string;
    endDate?: string;
    locationName: string;
    locationAddress?: string;
    isOnline?: boolean;
}

export interface Article {
  id: string;
  title: string;
  author: string;
  date: string;
  category: string;
  excerpt: string;
  hero: string[];
  body: ArticleBodyBlock[];
  pullQuote?: string;
  tags?: string[];
  eventDetails?: EventDetails;
}

export interface Reply {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

export interface Post {
  id: string;
  author: string;
  title: string;
  content: string;
  timestamp: string;
  replies: Reply[];
  category?: string;
  pinned?: boolean;
  tags?: string[];
}

export interface ValidationCheck {
  id: string;
  english: boolean;
  fresh: boolean;
  ageDays: number;
  hasRequired: boolean;
}

export interface ValidationResult {
  checks: ValidationCheck[];
  allEnglish: boolean;
  allFresh: boolean;
  allRequired: boolean;
}

export interface SelfTest {
    pass: boolean;
    name: string;
}

export interface User {
  name: string;
  email: string;
  picture: string;
}

export interface DownloadItem {
  title: string;
  description: string;
  category: 'Nature Park Offers' | 'Accessibility' | 'Brochures & Maps' | 'Hiking & Cycling' | 'Churches';
  url: string;
  fileType: string;
  size: string;
}

export interface UsefulLink {
    german_title: string;
    english_title: string;
    url: string;
    summary: string;
}

interface Specialization {
    specialization: string;
    doctors: string[];
}

interface IndependentPractice {
    name: string;
    specialization: string;
    address: string;
    phone?: string;
}

interface Pharmacy {
    name: string;
    address: string;
    phone: string;
}

interface Supermarket {
    name: string;
    address: string;
}

interface Bank {
    name: string;
    address: string;
    services: string[];
}

interface PostalLocation {
    name: string;
    address: string;
}

interface Accommodation {
    name: string;
    type: string;
    address: string;
    phone: string;
    website: string;
}

interface Restaurant {
    name: string;
    cuisine: string;
    address: string;
}

interface Cafe {
    name: string;
    cuisine: string;
    address: string;
}

interface Pub {
    name: string;
    cuisine: string;
    address: string;
}

interface Attraction {
    name: string;
    type: string;
    facilities: { [key: string]: string };
    hours?: string;
}

interface TaxiCompany {
    name: string;
    phone: string;
    services: string[];
}

interface VisitorCenter {
    name: string;
    location: string;
    address: string;
    description: string;
    website: string;
}

interface HikingTrail {
    name: string;
    route: string;
    length: string;
    description: string;
}

interface ObservationTower {
    name: string;
    location: string;
    description: string;
}

export interface DirectoryData {
    region: string;
    directory: {
        civic_infrastructure_emergency_services: {
            emergency_numbers: {
                police: string;
                fire_rescue: string;
            };
            municipal_administration: {
                name: string;
                address: string;
                phone: string;
                hours: string;
            };
            tourist_information: {
                name: string;
                address: string;
                phone: string;
                hours: string;
            };
            police: {
                name: string;
                address: string;
                phone: string;
            };
        };
        healthcare_wellness: {
            hospital: {
                name: string;
                address: string;
                phone: string;
                emergency_phone: string;
                website: string;
            };
            medical_center: {
                name: string;
                address: string;
                phone: string;
                specializations: Specialization[];
            };
            independent_practices: IndependentPractice[];
            pharmacies: Pharmacy[];
        };
        commerce_services: {
            retail_shopping: {
                supermarkets: Supermarket[];
                drugstores: Supermarket[];
                bakeries: Supermarket[];
                butchers: Supermarket[];
                bookstores: Supermarket[];
                florists: Supermarket[];
            };
            financial_postal_services: {
                banks: Bank[];
                postal_services: {
                    provider: string;
                    model: string;
                    locations: PostalLocation[];
                };
            };
        };
        tourism_hospitality: {
            accommodation: Accommodation[];
            gastronomy: {
                restaurants: {
                    german_regional: Restaurant[];
                    international: Restaurant[];
                };
                cafes_bistros_ice_cream: Cafe[];
                bars_pubs: Pub[];
            };
        };
        culture_education_recreation: {
            key_attractions: Attraction[];
        };
        transportation_mobility: {
            public_transport: {
                rail: {
                    station: string;
                    address: string;
                    key_service: string;
                    destinations: string;
                    frequency: string;
                    url?: string;
                };
                bus: {
                    operator: string;
                    regional_lines: Array<{
                        name: string;
                        description: string;
                        url: string;
                    }>;
                };
            };
            private_transport: {
                taxi_services: {
                    note: string;
                    companies: TaxiCompany[];
                    fares: {
                        base_fare: string;
                        per_km_rate: string;
                        waiting_time_hourly: string;
                    };
                };
                ride_sharing: {
                    provider: string;
                    service: string;
                    details: string;
                };
            };
        };
        nature_outdoors: {
            visitor_centers: VisitorCenter[];
            key_hiking_trails: HikingTrail[];
            observation_towers: ObservationTower[];
        };
    };
}