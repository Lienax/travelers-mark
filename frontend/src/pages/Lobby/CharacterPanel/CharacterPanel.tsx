import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function CharacterPanel() {
  return (
    <Box sx={{ backgroundColor: "primary.main", height: "100%" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, 60px)", justifyContent: "center", gap: 8, padding: '16px 4px 16px 12px' }}>
        {Array.from({ length: 16 }).map((_, index) => (
          <Button variant="contained" sx={{ height: 60, width: 60, minWidth: 0, aspectRatio: 1, padding: 0 }}>
            {`Item ${index + 1}`}
          </Button>
        ))}
      </div>
    </Box>
  );
}