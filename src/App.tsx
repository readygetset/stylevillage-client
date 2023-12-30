import { Box } from '@mui/material';
import BottomNav from './components/BottomNavigation';
import './App.css';

function App() {
  return (
    <Box display={'flex'} justifyContent={'center'} sx={{ backgroundColor: 'grey' }}>
      <Box maxWidth={430} width={'100%'} height="100vh">
        <Box height="90%" sx={{ backgroundColor: '#ffffff' }}>
          ddd
        </Box>
        <BottomNav />
      </Box>
    </Box>
  );
}

export default App;
