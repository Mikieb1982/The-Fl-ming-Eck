
import { Article } from '../types';

// Import all articles. Grouping them can sometimes help with clarity and module resolution.

import altstadtsommerGuide2025 from './altstadtsommer-guide-2025';
// News
import newsAltstadtsommerSuccess20250903 from './news-altstadtsommer-success-2025-09-03';
import newsWorldPeaceDay20250901 from './news-world-peace-day-2025-09-01';
import newsTrabantAccident20250830 from './news-trabant-accident-2025-08-30';
import newsRoadClosures20250820 from './news-road-closures-2025-08-20';

// Community, Events & Commentary
import altstadtsommer2025 from './altstadtsommer-2025';
import commentaryQuietCorner from './commentary-quiet-corner';
import firmenlauf2025 from './firmenlauf-2025';

// Features & History
import featureBurgEisenhardt from './feature-burg-eisenhardt';
import featureBadBelzigHistory from './feature-bad-belzig-history';

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
  altstadtsommerGuide2025,
  newsAltstadtsommerSuccess20250903,
  newsWorldPeaceDay20250901,
  newsTrabantAccident20250830,
  commentaryQuietCorner,
  firmenlauf2025,
  altstadtsommer2025,
  featureBurgEisenhardt,
  featureBadBelzigHistory,
  guideSteinthermeSpa,
  guideNatureExperienceTrail,
  guideWiesenburgPark,
  guideHistoricOldTown,
  guideNaturePark,
  guideHofgartenkino,
  newsRoadClosures20250820,
];