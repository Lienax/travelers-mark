import ExplorePanel from './ExplorePanel.tsx';
import LoggingPanel from './LoggingPanel.tsx';
import LumberingPanel from './LumberingPanel.tsx';
import MiningPanel from './MiningPanel.tsx';
import GatheringPanel from './Gathering.tsx';

export const Panels = {
  Explore: ExplorePanel,
  Logging: LoggingPanel,
  Lumbering: LumberingPanel,
  Mining: MiningPanel,
  Gathering: GatheringPanel
};

export type PanelKey = keyof typeof Panels;