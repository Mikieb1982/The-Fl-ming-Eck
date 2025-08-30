

export interface EventDetails {
  startDate: string; // ISO string
  endDate?: string; // ISO string
  locationName: string;
  locationAddress?: string;
  isOnline?: boolean;
}

export type ArticleBodyBlock =
  | { type: 'paragraph'; content: string }
  | { type: 'subheading'; content: string }
  | { type: 'audio'; src: string; caption?: string }
  | { type: 'video'; youtubeId: string; caption?: string }
  | { type: 'poll'; question: string; options: { text: string; votes: number }[] };

export interface Article {
  id: string;
  title: string;
  author: string;
  date: string; // ISO date string
  category: string;
  excerpt: string;
  hero: string[];
  pullQuote?: string;
  body: ArticleBodyBlock[];
  eventDetails?: EventDetails;
  tags?: string[];
}

export interface ValidationCheck {
  id:string;
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
  name: string;
  pass: boolean;
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

// User Profile Type
export interface User {
  name: string;
  email: string;
  picture: string;
}

// New Directory Types
export interface EmergencyNumbers {
  police: string;
  fire_rescue: string;
}

export interface CivicEntry {
  name: string;
  address: string;
  phone?: string;
  hours?: string;
}

export interface CivicInfrastructure {
  emergency_numbers: EmergencyNumbers;
  municipal_administration: CivicEntry;
  tourist_information: CivicEntry;
  police: CivicEntry;
}

export interface Hospital {
  name: string;
  address: string;
  phone: string;
  emergency_phone: string;
  website: string;
}

export interface Specialization {
  specialization: string;
  doctors: string[];
}

export interface MedicalCenter {
  name: string;
  address: string;
  phone: string;
  specializations: Specialization[];
}

export interface Practice {
  name: string;
  specialization: string;
  address: string;
  phone?: string;
  doctors?: string[];
}

export interface Pharmacy {
  name: string;
  address: string;
  phone: string;
}

export interface Healthcare {
  hospital: Hospital;
  medical_center: MedicalCenter;
  independent_practices: Practice[];
  pharmacies: Pharmacy[];
}

export interface RetailEntry {
  name: string;
  address: string;
}

export interface BankEntry extends RetailEntry {
  services: string[];
}

export interface PostalService {
  provider: string;
  model: string;
  locations: RetailEntry[];
}

export interface Commerce {
  retail_shopping: {
    supermarkets: RetailEntry[];
    drugstores: RetailEntry[];
    bakeries: RetailEntry[];
    butchers: RetailEntry[];
    bookstores: RetailEntry[];
    florists: RetailEntry[];
  };
  financial_postal_services: {
    banks: BankEntry[];
    postal_services: PostalService;
  };
}

export interface Accommodation {
  name: string;
  type: string;
  address: string;
  phone: string;
  website: string;
}

export interface Restaurant {
  name: string;
  cuisine: string;
  address?: string;
}

export interface Tourism {
  accommodation: Accommodation[];
  gastronomy: {
    restaurants: {
      german_regional: Restaurant[];
      international: Restaurant[];
    };
    cafes_bistros_ice_cream: Restaurant[];
    bars_pubs: Restaurant[];
  };
}

export interface Attraction {
    name: string;
    type: string;
    facilities?: Record<string, string>;
    hours?: string;
}

export interface Culture {
    key_attractions: Attraction[];
}

export interface RailTransport {
    station: string;
    address: string;
    key_service: string;
    destinations: string;
    frequency: string;
}

export interface BusTransport {
    operator: string;
    tourist_line: {
        name: string;
        frequency: string;
        route: string;
        details: string;
    };
    regional_lines: string;
}

export interface TaxiCompany {
    name: string;
    phone: string;
    services: string[];
}

export interface TaxiService {
    note: string;
    companies: TaxiCompany[];
    fares: {
        base_fare: string;
        per_km_rate: string;
        waiting_time_hourly: string;
    };
}

export interface RideSharing {
    provider: string;
    service: string;
    details: string;
}

export interface Transportation {
    public_transport: {
        rail: RailTransport;
        bus: BusTransport;
    };
    private_transport: {
        taxi_services: TaxiService;
        ride_sharing: RideSharing;
    }
}


export interface DirectoryData {
  region: string;
  directory: {
    civic_infrastructure_emergency_services: CivicInfrastructure;
    healthcare_wellness: Healthcare;
    commerce_services: Commerce;
    tourism_hospitality: Tourism;
    culture_education_recreation: Culture;
    transportation_mobility: Transportation;
  };
}