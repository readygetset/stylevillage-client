import { Box } from '@mui/material';
import BottomNav from './components/BottomNavigation';
import './App.css';

function App() {
  return (
    <Box display={'flex'} justifyContent={'center'} sx={{ backgroundColor: 'grey' }}>
      <Box width={390} height="100vh">
        <Box height="90%" sx={{ backgroundColor: '#ffffff' }}>
          ddd
        </Box>
        <BottomNav />
      </Box>
    </Box>
  );
}

export default App;
