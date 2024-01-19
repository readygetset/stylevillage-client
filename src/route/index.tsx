import { Route, Routes } from 'react-router-dom';

import { UserProfilePage } from '../pages/UserProfile';
import { SearchPage } from '../pages/Search';
import { RegisterPage } from '../pages/Register';
import { ProfilePage } from '../pages/Profile';
import MyPageWish from '../pages/MyPage/wish';
import MyPageLend from '../pages/MyPage/lend';
import MyPageCloset from '../pages/MyPage/closet';
import MyPageApply from '../pages/MyPage/apply';
import { MainPage } from '../pages/Main';
import { LoginPage } from '../pages/Login';
import { ClothesPage } from '../pages/Clothes';
import { ClosetPage } from '../pages/Closet';

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
      <Route path="/closet/:id" element={<ClosetPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/mypage/closet" element={<MyPageCloset />} />
      <Route path="/mypage/apply" element={<MyPageApply />} />
      <Route path="/mypage/lend" element={<MyPageLend />} />
      <Route path="/mypage/wish" element={<MyPageWish />} />
      <Route path="/user/:id" element={<UserProfilePage />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
}
