import { createLazyFileRoute } from '@tanstack/react-router';
import kakaoLogin from '../../assets/login/kakao-login.png';
import { useKakaoInit, useKakaoLogin } from "../../hooks/login";
import { SubTitle, Title } from "../../components/Title/Title.tsx";
import { CommonLayout } from "../../layouts/CommonLayout.tsx";
import styles from './index.lazy.module.scss';

export const Route = createLazyFileRoute('/login/')({
  component: Login,
});

function Login() {
  useKakaoInit();
  const { handleKakaoLogin } = useKakaoLogin();

  return (
    <CommonLayout>
      <div className={ styles.loginContainer }>
        <Title bold>크리스마스 스웨터 롤링페이퍼</Title>
        <SubTitle>귀여운 스웨터를 통해 메세지를 주고받아요.</SubTitle>
        <div className={ styles.buttonContainer }>
          <button onClick={ handleKakaoLogin }>
            <img src={ kakaoLogin }/>
          </button>
        </div>
      </div>
    </CommonLayout>
  );
}

