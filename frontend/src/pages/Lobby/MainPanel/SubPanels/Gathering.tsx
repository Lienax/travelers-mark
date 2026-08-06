import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function GatheringPanel() {
  return (
    <Stack direction="column" sx={{ alignItems: "center" }}>
      <Typography noWrap={true} variant="h5" color="textSecondary">Gathering</Typography>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, 120px)", justifyContent: "center", gap: 8, padding: "16px 4px 16px 12px", width: "100%" }}>
        {Array.from({ length: 16 }).map((_, index) => (
          <Button variant="contained" sx={{ height: 120, width: 120, minWidth: 0, aspectRatio: 1, padding: 0 }}>
            {`Gathering ${index + 1}`}
          </Button>
        ))}
      </div>
    </Stack>
  )
};