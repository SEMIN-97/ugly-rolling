import { createLazyFileRoute } from '@tanstack/react-router';
import { useKakaoInit, useKakaoLogin } from "../../hooks/login";
import { CommonLayout } from "../../layouts/CommonLayout.tsx";
import styles from './index.lazy.module.scss';
import { Typography } from "../../components/Typography/Typography.tsx";

export const Route = createLazyFileRoute('/login/')({
  component: Login,
});

function Login() {
  useKakaoInit();
  const { handleLogin } = useKakaoLogin();

  return (
    <CommonLayout>
      <div className={ styles.loginContainer }>
        <Typography as='h2' bold>크리스마스 스웨터 롤링페이퍼</Typography>
        <Typography as='h2'>귀여운 스웨터를 통해 메세지를 주고받아요.</Typography>
        <div className={ styles.buttonContainer }>
          <button className={ styles.loginButton } onClick={ handleLogin }></button>
        </div>
      </div>
    </CommonLayout>
  );
}

