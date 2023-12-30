import { Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';

export function RouteComponent() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Main />} />
      </Route>
    </Routes>
  );
}
