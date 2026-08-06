import Box from '@mui/material/Box';
import Progress from './Progress.tsx';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function Header() {
  return (
    <Box sx={{ backgroundColor: "primary.dark" }}>
      <Stack direction="row" sx={{ alignItems: "center", padding: 16, gap: 16 }}>
        <Skeleton variant="rounded" height={80} width={120} animation={false} />
        <Progress />
      </Stack>
    </Box>
  );
}