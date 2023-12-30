import { BrowserRouter } from 'react-router-dom';

import { RouteComponent } from './route';
import { Layout } from './components/Layout';

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
