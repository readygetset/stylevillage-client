import { BrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout';
import { RouteComponent } from './route';

import './App.css';

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <RouteComponent />
      </BrowserRouter>
    </Layout>
  );
}

export default App;
