import Box from '@mui/material/Box';
import { LayoutProps } from '@/types';

export default function UserLayout({
  children
}: LayoutProps) {
  return (
    <Box sx={{ p: '30px 20px' }}>
      {children}
    </Box>
  );
}
