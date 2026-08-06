import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useStore, type ActionDefinition } from '../../../../store/useStore';

const loggingActions: ActionDefinition[] = [
  {
    name: 'Birch',
    image: '../../../../src/assets/birch.png',
    level: 1,
    type: 'Logging',
    duration: 3,
    exp: 10
  },
  {
    name: 'Cedar',
    image: '../../../../src/assets/cedar.png',
    level: 10,
    type: 'Logging',
    duration: 5,
    exp: 10
  },
  {
    name: 'Cypress',
    image: '../../../../src/assets/cypress.png',
    level: 20,
    type: 'Logging',
    duration: 8,
    exp: 10
  },
  {
    name: 'Hinoki',
    image: '../../../../src/assets/hinoki.png',
    level: 40,
    type: 'Logging',
    duration: 10,
    exp: 10
  },
  {
    name: 'Poplar',
    image: '../../../../src/assets/poplar.png',
    level: 60,
    type: 'Logging',
    duration: 15,
    exp: 10
  },
  {
    name: 'Sequoia',
    image: '../../../../src/assets/sequoia.png',
    level: 80,
    type: 'Logging',
    duration: 20,
    exp: 10
  }
];

type actionSubmitMode = 'prepend' | 'queue';

export default function LoggingPanel() {
  const [inputCount, setInputCount] = useState<string>('');
  const inputCountNumber: number | '∞' = inputCount === '∞' ? '∞' : Number(inputCount || 0);
  const isInvalidCount: boolean = (inputCountNumber === '∞') ? false : (inputCountNumber <= 0 || inputCountNumber > 99999 || Number.isNaN(inputCountNumber));
  const [selectedAction, setSelectedAction] = useState<ActionDefinition | null>(null);
  const [submitMode, setSubmitMode] = useState<actionSubmitMode>('queue');

  const handleClose = () => {
    setInputCount('');
    setSelectedAction(null);
  }

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedAction === null) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const actionCountString = formData.get('count');
    const actionCount: number | '∞' = (actionCountString === '∞' ? '∞' : Number(actionCountString || 0));

    if (submitMode === 'prepend') {
      useStore.getState().prependAction({ ...selectedAction, count: actionCount });
    }
    if (submitMode === 'queue') {
      useStore.getState().queueAction({ ...selectedAction, count: actionCount });
    }
    handleClose();
  }

  return (
    <Stack direction="column" sx={{ alignItems: "center" }}>
      <Typography noWrap={true} variant="h5" color="primaryDark">Logging</Typography>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, 120px)", justifyContent: "center", gap: 8, padding: "16px 4px 16px 12px", width: "100%" }}>
        {
          loggingActions.map((action, index) => (
            <Button key={index} onClick={() => setSelectedAction(action)}
              color="secondaryDark" variant="contained" sx={{ height: 120, width: 120, minWidth: 0, aspectRatio: 1, padding: 0 }}>
              <Stack direction="column" sx={{ alignItems: "center" }}>
                <Typography noWrap={true} variant="body2" color="primaryDark">{action.name}</Typography>
                <img src={action.image} alt={action.name} style={{ width: "100px", height: "100px" }} />
              </Stack>
            </Button>
          ))
        }
        <Dialog disableRestoreFocus open={selectedAction !== null} onClose={handleClose}>
          <DialogTitle>{selectedAction?.name}</DialogTitle>
          <DialogContent sx={{ paddingBottom: 8 }}>
            <DialogContentText>Required Level: {selectedAction?.level}</DialogContentText>
            <DialogContentText>Duration: {selectedAction?.duration}s</DialogContentText>
            <DialogContentText>Exp: {selectedAction?.exp}</DialogContentText>
            <DialogContentText>Total time: {formatTotalDuration((selectedAction?.duration || 0), inputCountNumber)}</DialogContentText>
            <form onSubmit={handleSubmit} id="action-form" style={{ paddingTop: 8, paddingBottom: 8 }}>
              <Stack direction="row" sx={{ gap: 16, alignItems: "center", justifyContent: "space-between" }}>
                <TextField autoFocus type="text" slotProps={{ htmlInput: { min: 1, max: 99999 } }} name="count" placeholder="Count" value={inputCount} onChange={(e) => setInputCount(e.target.value)} variant="standard" color="secondary" sx={{ width: 160 }} />
                <Button color="secondary" onClick={() => setInputCount("1")} variant="contained" sx={{ padding: 0, lineHeight: 1, minWidth: 36, aspectRatio: 1.2 }}>1</Button>
                <Button color="secondary" onClick={() => setInputCount("∞")} variant="contained" sx={{ fontSize: 24, padding: 0, lineHeight: 1, minWidth: 36, aspectRatio: 1.2 }}>∞</Button>
              </Stack>
            </form>
          </DialogContent>
          <DialogActions sx={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 8 }}>
            <Button type="submit" color="secondary" form="action-form" onClick={() => setSubmitMode("queue")} disabled={isInvalidCount} variant="contained">Queue</Button>
            <Button type="submit" color="primary" form="action-form" onClick={() => setSubmitMode("prepend")} disabled={isInvalidCount} variant="contained">Prepend</Button>
          </DialogActions>
        </Dialog>
      </div>
    </Stack>
  )
};

function formatTotalDuration(duration: number, count: number | '∞'): string {
  if (count === '∞') return '∞';
  if (duration <= 0) return '0s';
  if (count < 0 || Number.isNaN(count)) return 'Invalid';

  const totalSeconds = duration * Number(count);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0 || hours > 0) parts.push(`${minutes}m`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);

  return parts.join(' ');
}