import { Article } from '../types';

import altstadtsommerGuide2025 from './altstadtsommer-guide-2025';
import firmenlauf2025 from './firmenlauf-2025';
import guideWiesenburgPark from './guide-wiesenburg-park';
// eventsWeekly is now used for the sidebar, not in the main article list
import featureBurgEisenhardt from './feature-burg-eisenhardt';
import guideHistoricOldTown from './guide-historic-old-town';
import guideHofgartenkino from './guide-hofgartenkino';
import guideNaturePark from './guide-nature-park';
import guideSteinthermeSpa from './guide-steintherme-spa';
import guideNatureExperienceTrail from './guide-nature-experience-trail';

export const articles: Article[] = [
  altstadtsommerGuide2025,
  firmenlauf2025,
  guideSteinthermeSpa,
  guideWiesenburgPark,
  guideNatureExperienceTrail,
  featureBurgEisenhardt,
  guideHistoricOldTown,
  guideHofgartenkino,
  guideNaturePark,
];
