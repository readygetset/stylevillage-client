import { MyPageHeader } from '../myPageHeader';

export default function MyPageLend() {
  const nickname = sessionStorage.getItem('userNickname');
  return <MyPageHeader nickname={nickname} description="님의 대여 내역을 확인할 수 있어요" />;
}
