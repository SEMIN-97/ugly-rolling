import { createLazyFileRoute } from '@tanstack/react-router';
import { CommonLayout } from '../../layouts/CommonLayout.tsx';
import { Button } from '../../components/Button/Button.tsx';
import styles from './index.module.scss';

export const Route = createLazyFileRoute('/sweaters/$id')({
  component: RouteComponent
});

function RouteComponent() {
  const onClick = () => {};

  return (
    <CommonLayout>
      <div className={styles.pageContainer}>
        <div className={styles.titleContainer}>
          <h1>닉네임님의 스웨터</h1>
          <p className={styles.description}>
            <span className={styles.badge}>WISH</span>
            <span>닉네임님의 한마디</span>
          </p>
        </div>
        <div className={styles.sweaterContainer}>

        </div>
        <Button label="롤링페이퍼 남기기" onClick={onClick}/>
      </div>
    </CommonLayout>
  );
}
