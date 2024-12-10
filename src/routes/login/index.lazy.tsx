import { createLazyFileRoute } from '@tanstack/react-router';
import kakaoLogin from '../../assets/login/kakao-login.png';
import { useKakaoInit, useKakaoLogin } from "../../hooks/login";

export const Route = createLazyFileRoute('/login/')({
  component: Login,
});

function Login() {
  useKakaoInit();
  const { handleKakaoLogin } = useKakaoLogin();

  return (
    <button onClick={ handleKakaoLogin }>
      <img src={ kakaoLogin }/>
    </button>
  );
}

