import { Article } from '../types';

// Import all articles. Grouping them can sometimes help with clarity and module resolution.

// News
import newsWorldPeaceDay20250901 from './news-world-peace-day-2025-09-01';
import newsTrabantAccident20250830 from './news-trabant-accident-2025-08-30';
import newsShedFire20250828 from './news-shed-fire-2025-08-28';
import newsRoadClosures20250820 from './news-road-closures-2025-08-20';

// Community, Events & Commentary
import altstadtsommer2025 from './altstadtsommer-2025';
import altstadtsommerGuide2025 from './altstadtsommer-guide-2025';
import commentaryQuietCorner from './commentary-quiet-corner';
import eventsWeekly from './events-weekly';
import firmenlauf2025 from './firmenlauf-2025';

// Features & History
import featureBurgEisenhardt from './feature-burg-eisenhardt';

// Guides
import guideHistoricOldTown from './guide-historic-old-town';
import guideHofgartenkino from './guide-hofgartenkino';
import guideNatureExperienceTrail from './guide-nature-experience-trail';
import guideNaturePark from './guide-nature-park';
import guideSteinthermeSpa from './guide-steintherme-spa';
import guideWiesenburgPark from './guide-wiesenburg-park';

// This master list must contain an import for every article file.
// If an article is missing from this list, it will cause routing failures.
// The order of this list determines the initial order on the homepage.
export const articles: Article[] = [
  newsWorldPeaceDay20250901,
  newsTrabantAccident20250830,
  newsShedFire20250828,
  commentaryQuietCorner,
  altstadtsommerGuide2025,
  firmenlauf2025,
  altstadtsommer2025,
  featureBurgEisenhardt,
  guideSteinthermeSpa,
  guideNatureExperienceTrail,
  guideWiesenburgPark,
  guideHistoricOldTown,
  guideNaturePark,
  guideHofgartenkino,
  eventsWeekly,
  newsRoadClosures20250820,
];
