import { BrowserRouter } from 'react-router-dom';

import { RouteComponent } from './route';
import { Layout } from './components/Layout';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <RouteComponent />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
