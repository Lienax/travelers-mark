import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import { Panels, type PanelKey } from '../MainPanel/SubPanels/panelRegistry.ts';

interface NavigationPanelProps {
  setActiveTab: (tabName: PanelKey) => void;
}

export default function NavigationPanel({ setActiveTab }: NavigationPanelProps) {
  return (
    <Box sx={{ backgroundColor: "primary.main", height: "100%", minWidth: 150 }}>
      <List>
        {Object.keys(Panels).map((panelName) => (
          <ListItem disableGutters>
            <ListItemButton onClick={() => setActiveTab(panelName as PanelKey)}>
              <Typography noWrap={true} variant="body2" color="textPrimary">{panelName}</Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}