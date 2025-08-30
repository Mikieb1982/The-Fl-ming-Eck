
import { DirectoryData } from '../types';

export const directoryData: DirectoryData = {
  region: "Bad Belzig & Hoher Fläming",
  directory: {
    civic_infrastructure_emergency_services: {
      emergency_numbers: {
        police: "110",
        fire_rescue: "112"
      },
      municipal_administration: {
        name: "Stadtverwaltung Bad Belzig (Rathaus)",
        address: "Wiesenburger Str. 6, 14806 Bad Belzig",
        phone: "+49 33841 940",
        hours: "Mon-Fri 09:00-12:00, Tue 13:00-18:00"
      },
      tourist_information: {
        name: "Tourist-Information Bad Belzig",
        address: "Marktplatz 1, 14806 Bad Belzig",
        phone: "+49 33841 94900",
        hours: "Varies seasonally, check website"
      },
      police: {
        name: "Polizeirevier Bad Belzig",
        address: "Berliner Str. 13, 14806 Bad Belzig",
        phone: "+49 33841 530",
      }
    },
    healthcare_wellness: {
      hospital: {
        name: "Klinikum Ernst von Bergmann",
        address: "Niemegker Str. 45, 14806 Bad Belzig",
        phone: "+49 33841 930",
        emergency_phone: "112",
        website: "https://www.klinikumevb.de/bad-belzig"
      },
      medical_center: {
        name: "MVZ am Klinikum Bad Belzig",
        address: "Niemegker Str. 45, 14806 Bad Belzig",
        phone: "+49 33841 93450",
        specializations: [
            {specialization: "Ophthalmology", doctors: ["Frank Heinemann"]},
            {specialization: "Surgery", doctors: ["Dr. med. Karsten Kuttner"]},
            {specialization: "Gastroenterology", doctors: ["Dr. med. Thomas Wex"]},
            {specialization: "Orthopedics & Trauma Surgery", doctors: ["Dr. med. Jörg-Peter Zische"]},
            {specialization: "Radiology", doctors: ["Dr. med. Ulrike Massel"]},
            {specialization: "Urology", doctors: ["Dr. med. Jörg Köbe"]}
        ]
      },
      independent_practices: [
        {
          name: "Hausarztpraxis Bad Belzig",
          specialization: "General Medicine",
          address: "Brücker Landstraße 3, 14806 Bad Belzig",
          phone: "+49 33841 30141",
        },
        {
          name: "Praxis Dr. Christian Hartung",
          specialization: "General Medicine",
          address: "Ragösener Straße 45, 14806 Bad Belzig"
        },
      ],
      pharmacies: [
        { name: "Burgen-Apotheke", address: "Straße der Einheit 42, 14806 Bad Belzig", phone: "+49 33841 31375" },
        { name: "Gertrauden-Apotheke", address: "Brücker Landstraße 2, 14806 Bad Belzig", phone: "+49 33841 30130" }
      ]
    },
    commerce_services: {
      retail_shopping: {
        supermarkets: [
            { name: "REWE", address: "Brücker Landstraße 22, 14806 Bad Belzig" },
            { name: "Netto Marken-Discount", address: "Berliner Str. 5, 14806 Bad Belzig" },
            { name: "ALDI Nord", address: "Brücker Landstraße 22A, 14806 Bad Belzig" }
        ]
      },
      financial_postal_services: {
        banks: [
            { name: "Mittelbrandenburgische Sparkasse", address: "Straße der Einheit 38, 14806 Bad Belzig", services: ["ATM", "Full Service"] },
            { name: "Volksbank", address: "Wiesenburger Str. 2, 14806 Bad Belzig", services: ["ATM", "Full Service"] }
        ],
        postal_services: {
          provider: "Deutsche Post / DHL",
          model: "Utilizes partner businesses as 'Postfilialen' and 'DHL Paketshops'.",
          locations: [
            { name: "Partner Filiale im REWE", address: "Brücker Landstraße 22, 14806 Bad Belzig" }
          ]
        }
      }
    },
    tourism_hospitality: {
        accommodation: [
            { name: "Burghotel Eisenhardt", type: "Hotel", address: "Wittenberger Str. 14, 14806 Bad Belzig", phone: "+49 33841 38830", website: "https://burghotel-bad-belzig.de/" },
            { name: "Paulinenhof", type: "Hotel & Seminarhaus", address: "Kuhlowitzer Dorfstraße 1, 14806 Bad Belzig", phone: "+49 33841 44080", website: "https://www.paulinenhof.de/" }
        ],
        gastronomy: {
            restaurants: {
                german_regional: [
                    { name: "Restaurant im Burghotel", cuisine: "German (Modern/Regional)", address: "Wittenberger Str. 14, 14806 Bad Belzig" },
                    { name: "Restaurant KURPARK15", cuisine: "German (Healthy/Regional)", address: "Am Kurpark 15, 14806 Bad Belzig" }
                ],
                international: [
                    { name: "Pizzeria 'La Piazzetta'", cuisine: "Italian" },
                    { name: "China-Bistro \"Panda\"", cuisine: "Asian" }
                ]
            },
            cafes_bistros_ice_cream: [
                { name: "Burg-Café", cuisine: "Café & Cakes" }
            ]
        }
    },
    culture_education_recreation: {
      key_attractions: [
        {
          name: "Burg Eisenhardt",
          type: "Castle & Museum",
          facilities: {
            "Keep (Bergfried)": "Offers panoramic views of the town and region.",
            "Museum": "Exhibits on local and castle history.",
            "Library": "Public library with regular events."
          }
        },
        {
          name: "SteinTherme Bad Belzig",
          type: "Thermal Brine Spa",
          facilities: {
            "Bathing World": "Indoor/outdoor pools, LichtKlangRaum (floatation pool).",
            "Sauna World": "Finnish saunas, Bio-sauna, Banja, steam bath, sauna garden.",
            "Wellness & Beauty": "Massages, cosmetic treatments, Hamam rituals."
          },
          hours: "Daily, with extended hours on Fridays and Saturdays until 22:00."
        }
      ]
    },
    transportation_mobility: {
      public_transport: {
        rail: {
          station: "Bad Belzig station",
          address: "Am Bahnhof 11, 14806 Bad Belzig",
          key_service: "Regionalexpress RE7",
          destinations: "Direct connection to Berlin Hauptbahnhof (~41 mins) and Dessau.",
          frequency: "Hourly"
        },
        bus: {
          operator: "regiobus Potsdam Mittelmark GmbH",
          tourist_line: {
            name: "Burgenlinie 572",
            frequency: "Year-round, 7 days a week, 5 daily trips.",
            route: "Connects Bad Belzig train station with Burg Eisenhardt, Raben, and Wiesenburg.",
            details: "Schedule is coordinated with train arrivals/departures."
          },
          regional_lines: "Connect Bad Belzig with Görzke, Ziesar, and Brandenburg an der Havel."
        }
      },
      private_transport: {
        taxi_services: {
          note: "Taxis must generally be booked in advance.",
          companies: [
            {
              name: "Noelte Service GmbH",
              phone: "+49 33841 33331",
              services: ["Passenger transport", "Medical transport"]
            }
          ],
          fares: {
            base_fare: "€4.50",
            per_km_rate: "Variable, lower for longer distances",
            waiting_time_hourly: "€36.00"
          }
        },
        ride_sharing: {
          provider: "Uber",
          service: "UberX",
          details: "Available in Bad Belzig, provides an alternative to traditional taxis."
        }
      }
    }
  }
};
