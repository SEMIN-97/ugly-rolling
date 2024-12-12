import { createLazyFileRoute } from '@tanstack/react-router';
import kakaoLogin from '../../assets/login/kakao-login.png';
import { useKakaoInit, useKakaoLogin } from "../../hooks/login";
import { SubTitle, Title } from "../../components/Title/Title.tsx";

export const Route = createLazyFileRoute('/login/')({
  component: Login,
});

function Login() {
  useKakaoInit();
  const { handleKakaoLogin } = useKakaoLogin();

  return (
    <>
      <Title bold>크리스마스 스웨터 롤링페이퍼</Title>
      <SubTitle>귀여운 스웨터를 통해 메세지를 주고받아요.</SubTitle>
      <button onClick={ handleKakaoLogin }>
        <img src={ kakaoLogin }/>
      </button>
    </>
  );
}

