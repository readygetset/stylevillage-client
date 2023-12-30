import { Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';
import { RegisterPage } from '../pages/Register';

export function RouteComponent() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Main />} />
      </Route>
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}
