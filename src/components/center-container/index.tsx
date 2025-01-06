import Box from '@mui/material/Box';
import { LayoutProps } from '@/types';

export default function CenterContainer({ children }: LayoutProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
      }}
    >
      {children}
    </Box>
  );
};

