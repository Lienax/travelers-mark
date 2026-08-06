import { useState } from 'react';
import { Group, Panel, Separator } from 'react-resizable-panels';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CharacterPanel from './CharacterPanel/CharacterPanel.tsx';
import Header from './Header/Header.tsx';
import MainPanel from './MainPanel/MainPanel.tsx';
import { type PanelKey } from './MainPanel//SubPanels/panelRegistry';
import NavigationPanel from './NavigationPanel/NavigationPanel.tsx';

export default function Lobby() {
  const [activeTab, setActiveTab] = useState<PanelKey>('Explore');

  return (
    <Box sx={{ height: "100dvh", width: "100dvw" }}>
      <Stack direction="column" sx={{ height: "100%" }}>
        <Header />
        <Stack direction="row" sx={{ height: "100%" }}>
          <NavigationPanel setActiveTab={setActiveTab} />
          <Group className="resizable-panel-group">
            <Panel>
              <MainPanel activeTab={activeTab} />
            </Panel>
            <Separator />
            <Panel defaultSize="20%" minSize="10%" maxSize="40%" groupResizeBehavior="preserve-pixel-size">
              <CharacterPanel />
            </Panel>
          </Group>
        </Stack>
      </Stack>
    </Box>
  );
}