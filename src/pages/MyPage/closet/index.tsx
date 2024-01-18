import { MyPageHeader } from '../myPageHeader';

export default function MyPageCloset() {
  const nickname = sessionStorage.getItem('userNickname');
  return <MyPageHeader nickname={nickname} description="님의 옷장을 관리할 수 있어요" />;
}
