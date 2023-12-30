import { Box } from '@mui/material';
import BottomNav from '../BottomNavigation';

interface LayoutProps {
  children: React.ReactNode;
}
export function Layout({ children }: LayoutProps) {
  return (
    <Box display={'flex'} justifyContent={'center'} sx={{ backgroundColor: 'grey' }}>
      <Box maxWidth={430} width={'100%'} height="100vh">
        <Box height="90%" sx={{ backgroundColor: '#ffffff' }}>
          {children}
        </Box>
        <BottomNav />
      </Box>
    </Box>
  );
}
