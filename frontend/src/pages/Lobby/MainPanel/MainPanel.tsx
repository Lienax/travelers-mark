import Box from '@mui/material/Box';
import { Panels, type PanelKey } from './SubPanels/panelRegistry';

interface MainPanelProps {
  activeTab: PanelKey;
}

export default function MainPanel({ activeTab }: MainPanelProps) {
  const CurrentPanel = Panels[activeTab];
  return (
    <Box sx={{ backgroundColor: "primary.light", height: "100%" }}>
      <CurrentPanel />
    </Box>
  );
}