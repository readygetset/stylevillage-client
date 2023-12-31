import { Route, Routes } from 'react-router-dom';

import { RegisterPage } from '../pages/Register';
import { MainPage } from '../pages/Main';
import { ListPage } from '../pages/List';

export function RouteComponent() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/list/:age" element={<ListPage />} />
    </Routes>
  );
}
