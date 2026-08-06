import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useStore, type Action } from '../../../store/useStore';

export default function Progress() {
  const currentAction: Action | null = useStore((state) => state.getCurrentAction());
  const currentActionName: string = currentAction ? `${currentAction.type} - ${currentAction.name} (${currentAction.count})` : "Idle";
  const progress: number = useStore((state) => state.progress);
  const addProgress = useStore((state) => state.addProgress);
  const updateInterval = 33;

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentAction !== null) {
        addProgress(updateInterval / (currentAction.duration * 10));
      }
    }, updateInterval);
    return () => {
      clearInterval(timer);
    };
  }, [currentAction, addProgress]);

  return (
    <Box sx={{ padding: 16 }}>
      <Stack direction="row" sx={{ alignItems: "center", gap: 16 }}>
        <Stack direction="column" sx={{ justifyContent: "center", minWidth: 300 }}>
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Typography noWrap={true} variant="h6" color="textPrimary">{currentActionName}</Typography>
            <Typography noWrap={true} variant="h6" color="textPrimary">{`${Math.round(progress)}%`}</Typography>
          </Stack>
          <LinearProgress variant="determinate" value={progress} sx={{ height: 20, borderRadius: 1, "& .MuiLinearProgress-bar": { transition: "none" } }} />
        </Stack>
        <Button onClick={() => { useStore.getState().removeCurrentAction(); }} variant="contained" color="error">Stop</Button>
      </Stack>
    </Box>
  );
}