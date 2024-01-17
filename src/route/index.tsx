import { Route, Routes } from 'react-router-dom';

import { RegisterPage } from '../pages/Register';
import { ProfilePage } from '../pages/Profile';
import { MyPageHeader } from '../pages/Mypage/myPageHeader';
import { MainPage } from '../pages/Main';
import { LoginPage } from '../pages/Login';
import { ClothesPage } from '../pages/Clothes';

/**
 * 어느 url에 어떤 페이지를 보여줄지 정해주는 컴포넌트입니다.
 * Routes 안에 Route 컴포넌트를 넣어서 사용합니다.
 */
export function RouteComponent() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/clothes/:id" element={<ClothesPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/mypage/closet" element={<MyPageHeader description="님의 옷장을 관리할 수 있어요" />} />
      <Route path="/mypage/apply" element={<MyPageHeader description="님의 대여 신청 내역을 확인할 수 있어요" />} />
      <Route path="/mypage/lend" element={<MyPageHeader description="님의 대여 내역을 확인할 수 있어요" />} />
      <Route path="/mypage/wish" element={<MyPageHeader description="님이 찜한 옷이에요" />} />
    </Routes>
  );
}
