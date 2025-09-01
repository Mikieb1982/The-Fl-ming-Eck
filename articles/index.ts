import { Article } from '../types';

// Import all articles. Grouping them can sometimes help with clarity and module resolution.

// News
import newsTrabantAccident20250830 from './news-trabant-accident-2025-08-30';

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
  newsTrabantAccident20250830,
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
];
