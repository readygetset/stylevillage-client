import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';

import { RouteComponent } from './route';
import { Layout } from './components/Layout';

import './App.css';

const theme = createTheme({
  typography: {
    fontFamily: 'Pretendard-Regular',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <RouteComponent />
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
