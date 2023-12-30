import { Route, Routes } from 'react-router-dom';

import { RegisterPage } from '../pages/Register';
import Main from '../pages/Main';

export function RouteComponent() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}
