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
            {specialization: "Urology", doctors: ["Dr. med. Jörg Köbe"]},
            {specialization: "Dermatology", doctors: ["Dr. med. Kathrin Eberle"]},
            {specialization: "ENT", doctors: ["Dr. med. Stefan Erfurth"]}
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
          address: "Ragösener Straße 45, 14806 Bad Belzig",
        },
        {
          name: "Kinderarztpraxis Dr. med. Antje Karras",
          specialization: "Pediatrics",
          address: "Straße der Einheit 38, 14806 Bad Belzig",
          phone: "+49 33841 31631",
        },
        {
          name: "Zahnarztpraxis Dr. med. dent. Ines Peter",
          specialization: "Dentistry",
          address: "Niemegker Str. 2, 14806 Bad Belzig",
          phone: "+49 33841 31215",
        },
        {
          name: "Zahnarztpraxis Dipl.-Stom. U. Martens",
          specialization: "Dentistry",
          address: "Puschkinstraße 15, 14806 Bad Belzig",
          phone: "+49 33841 32185",
        },
        {
          name: "Physiotherapie & Rehasport Bad Belzig",
          specialization: "Physiotherapy",
          address: "Puschkinstraße 14, 14806 Bad Belzig",
          phone: "+49 33841 45353",
        },
        {
          name: "Augenoptikermeister Franke",
          specialization: "Optician",
          address: "Wiesenburger Str. 8, 14806 Bad Belzig",
          phone: "+49 33841 31548",
        }
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
            { name: "EDEKA", address: "Berliner Str. 16, 14806 Bad Belzig" },
            { name: "LIDL", address: "Brücker Landstraße 22B, 14806 Bad Belzig" },
            { name: "Netto Marken-Discount", address: "Berliner Str. 5, 14806 Bad Belzig" },
            { name: "ALDI Nord", address: "Brücker Landstraße 22A, 14806 Bad Belzig" }
        ],
        drugstores: [
            { name: "Rossmann", address: "Wiesenburger Str. 3, 14806 Bad Belzig" }
        ],
        bakeries: [
            { name: "Bäckerei & Konditorei Gericke", address: "Straße der Einheit 25, 14806 Bad Belzig" }
        ],
        butchers: [
            { name: "Fleischerei J. Lehmann", address: "Straße der Einheit 43, 14806 Bad Belzig" }
        ],
        bookstores: [
            { name: "Buchhandlung 'Zum Eselsohr'", address: "Straße der Einheit 27, 14806 Bad Belzig" }
        ],
        florists: [
            { name: "Blumen-Schubert", address: "Wiesenburger Str. 12, 14806 Bad Belzig" }
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
            { name: "Partner Filiale im REWE", address: "Brücker Landstraße 22, 14806 Bad Belzig" },
            { name: "DHL Paketshop bei 'Zum Eselsohr'", address: "Straße der Einheit 27, 14806 Bad Belzig" }
          ]
        }
      }
    },
    tourism_hospitality: {
        accommodation: [
            { name: "Burghotel Eisenhardt", type: "Hotel", address: "Wittenberger Str. 14, 14806 Bad Belzig", phone: "+49 33841 38830", website: "https://burghotel-bad-belzig.de/" },
            { name: "Paulinenhof", type: "Hotel & Seminarhaus", address: "Kuhlowitzer Dorfstraße 1, 14806 Bad Belzig", phone: "+49 33841 44080", website: "https://www.paulinenhof.de/" },
            { name: "Pension zur alten Posthalterei", type: "Guesthouse", address: "Sandberger Str. 3, 14806 Bad Belzig", phone: "+49 33841 45290", website: "https://www.pension-bad-belzig.de/" },
            { name: "Hotel & Restaurant 'Am Schlosstor'", type: "Hotel", address: "Schloßstraße 1, 14827 Wiesenburg/Mark", phone: "+49 33849 7980", website: "https://www.schlosstor-wiesenburg.de/" }
        ],
        gastronomy: {
            restaurants: {
                german_regional: [
                    { name: "Restaurant im Burghotel", cuisine: "German (Modern/Regional)", address: "Wittenberger Str. 14, 14806 Bad Belzig" },
                    { name: "Restaurant KURPARK15", cuisine: "German (Healthy/Regional)", address: "Am Kurpark 15, 14806 Bad Belzig" },
                    { name: "Gasthof zur Post", cuisine: "German (Traditional)", address: "Dorfstraße 19, 14806 Bad Belzig OT Lüsse" }
                ],
                international: [
                    { name: "Pizzeria 'La Piazzetta'", cuisine: "Italian", address: "Straße der Einheit 45, 14806 Bad Belzig" },
                    { name: "Delphi", cuisine: "Greek", address: "Wittenberger Str. 7, 14806 Bad Belzig" },
                    { name: "China-Bistro \"Panda\"", cuisine: "Asian", address: "Wiesenburger Str. 1, 14806 Bad Belzig" }
                ]
            },
            cafes_bistros_ice_cream: [
                { name: "Burg-Café", cuisine: "Café & Cakes", address: "Wittenberger Str. 14, 14806 Bad Belzig" },
                { name: "Conditorei & Café Jester", cuisine: "Café & Confectionery", address: "Straße der Einheit 33, 14806 Bad Belzig" },
                { name: "Eiscafé am Markt", cuisine: "Ice Cream Parlor", address: "Marktplatz 3, 14806 Bad Belzig" }
            ],
            bars_pubs: [
                { name: "Assel-Beiz", cuisine: "Pub / Kneipe", address: "Straße der Einheit 50, 14806 Bad Belzig" }
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
          }
        },
        {
            name: "Stadtbibliothek 'Bücher-Wurm'",
            type: "Public Library",
            facilities: {
                "Location": "Located within the grounds of Burg Eisenhardt.",
                "Services": "Book and media lending, public computers, children's section, events."
            },
            hours: "Check website for current hours."
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
        },
        {
          name: "Hofgartenkino",
          type: "Cinema",
          facilities: {
            "Programming": "Mix of current blockbusters and art-house films ('Xtra-Film' series)."
          },
          hours: "Check website for current showtimes."
        },
        {
          name: "Schlosspark Wiesenburg",
          type: "Landscaped Park",
          facilities: {
            "Features": "One of Brandenburg's most significant English-style landscape gardens."
          }
        },
        {
            name: "Naturparkzentrum Hoher Fläming",
            type: "Nature Park Visitor Center",
            facilities: {
                "Location": "At the 'Alte Schmiede' in Raben.",
                "Exhibition": "Interactive displays on the region's nature and history.",
                "Shop": "Regional products and maps.",
                "Events": "Guided tours and workshops."
            },
            hours: "Located in Raben, check website for seasonal hours."
        },
        {
            name: "Heinrich-Rau-Stadion",
            type: "Sports Facility",
            facilities: {
                "Home of": "FC Viktoria 1913 Bad Belzig e.V.",
                "Features": "Football pitch and athletics facilities."
            }
        },
        {
            name: "Freilichtbühne an der Burg",
            type: "Open-Air Stage",
            facilities: {
                "Events": "Hosts concerts, theatre performances, and the annual summer cinema."
            }
        }
      ]
    },
    transportation_mobility: {
      // FIX: Updated `public_transport` to conform to the `DirectoryData` type. `regional_lines` is now an array of objects and the invalid `tourist_line` property was removed.
      public_transport: {
        rail: {
          station: "Bad Belzig station",
          address: "Am Bahnhof 11, 14806 Bad Belzig",
          key_service: "Regionalexpress RE7",
          destinations: "Direct connection to Berlin Hauptbahnhof (~41 mins) and Dessau.",
          frequency: "Hourly",
          url: "https://www.vbb.de/fahrinfo"
        },
        bus: {
          operator: "regiobus Potsdam Mittelmark GmbH",
          regional_lines: [
            { name: "555", description: "(Bad Belzig –) Niemegk – Treuenbrietzen", url: "https://www.regiobus-pm.de/wp-content/uploads/2024/07/555_240819.pdf" },
            { name: "572 (Burgenlinie)", description: "Bad Belzig – Niemegk – Raben – Wiesenburg", url: "https://www.regiobus-pm.de/wp-content/uploads/2024/07/572_240819.pdf" },
            { name: "580", description: "Bad Belzig – Golzow – Brandenburg", url: "https://www.regiobus-pm.de/wp-content/uploads/2024/07/580_240819.pdf" },
            { name: "581", description: "Bad Belzig – Golzow – Lehnin", url: "https://www.regiobus-pm.de/wp-content/uploads/2024/07/581_240819.pdf" },
            { name: "582", description: "Bad Belzig – Niemegk", url: "https://www.regiobus-pm.de/wp-content/uploads/2024/07/582_240819.pdf" },
            { name: "583", description: "Bad Belzig – Baitz – Brück", url: "https://www.regiobus-pm.de/wp-content/uploads/2024/07/583_240819.pdf" },
            { name: "584", description: "Bad Belzig – Wiesenburg – Görzke", url: "https://www.regiobus-pm.de/wp-content/uploads/2024/07/584_240819.pdf" },
            { name: "585", description: "Bad Belzig – Wiesenburg", url: "https://www.regiobus-pm.de/wp-content/uploads/2024/07/585_240819.pdf" },
            { name: "586", description: "Bad Belzig – Lüsse – Neschholz – Hohenspringe", url: "https://www.regiobus-pm.de/wp-content/uploads/2024/07/586_240819.pdf" },
            { name: "587", description: "Bad Belzig – Lüsse – Fredersdorf – Linthe", url: "https://www.regiobus-pm.de/wp-content/uploads/2024/07/587_240819.pdf" },
            { name: "588 (PlusBus)", description: "Bad Belzig – Lehnin – Potsdam", url: "https://www.regiobus-pm.de/wp-content/uploads/2024/07/588_240819.pdf" }
          ]
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
            },
            {
              name: "Taxi-Belzig e.K.",
              phone: "+49 33841 445566",
              services: ["Passenger transport", "Airport transfers"]
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
    },
    nature_outdoors: {
      visitor_centers: [
        {
          name: "Naturparkzentrum Hoher Fläming",
          location: "Raben",
          address: "Brennereiweg 45, 14823 Rabenstein/Fläming OT Raben",
          description: "Visitor center located in the historic 'Alte Schmiede' (Old Smithy). Features an interactive exhibition on the region's nature, geology, and history. Offers maps, regional products, and event information.",
          website: "https://www.hoher-flaeming-naturpark.de/service-kontakt/naturparkzentrum/"
        }
      ],
      key_hiking_trails: [
        {
          name: "Burgenwanderweg (Castle Hiking Trail)",
          route: "Connects the four great castles of the Fläming",
          length: "147 km",
          description: "A long-distance trail linking the castles of Belzig, Rabenstein, Wiesenburg, and Ziesar, passing through diverse landscapes."
        },
        {
          name: "Kunstwanderweg (Art Trail)",
          route: "Between Bad Belzig and Wiesenburg/Mark stations",
          length: "Two routes, ~17 km each",
          description: "An internationally recognized trail featuring numerous sculptures and art installations in the landscape."
        },
        {
          name: "Panoramaweg",
          route: "Circular route around Bad Belzig",
          length: "18 km",
          description: "Offers scenic views of the town and the surrounding Fläming hills."
        }
      ],
      observation_towers: [
        {
          name: "Aussichtsturm auf dem Hagelberg",
          location: "Hagelberg, near Bad Belzig",
          description: "An observation tower on the Hagelberg (200m), the highest elevation in the Hoher Fläming, offering panoramic views of the landscape."
        }
      ]
    }
  }
};
