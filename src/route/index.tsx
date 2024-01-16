import { Route, Routes } from 'react-router-dom';

import { RegisterPage } from '../pages/Register';
import { MyPageHeader } from '../pages/MyPage/myPageHeader';
import { MainPage } from '../pages/Main';
import { LoginPage } from '../pages/Login';
import { ListPage } from '../pages/List';

/**
 * 어느 url에 어떤 페이지를 보여줄지 정해주는 컴포넌트입니다.
 * Routes 안에 Route 컴포넌트를 넣어서 사용합니다.
 */
export function RouteComponent() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/list/:age" element={<ListPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/mypage/closet" element={<MyPageHeader description="님의 옷장을 관리할 수 있어요" />} />
      <Route
        path="/mypage/lend/lending"
        element={<MyPageHeader description="님의 대여 신청 내역을 확인할 수 있어요" />}
      />
      <Route path="/mypage/lend/lent" element={<MyPageHeader description="님의 대여 내역을 확인할 수 있어요" />} />
      <Route path="/mypage/wish" element={<MyPageHeader description="님이 찜한 옷이에요" />} />
    </Routes>
  );
}
