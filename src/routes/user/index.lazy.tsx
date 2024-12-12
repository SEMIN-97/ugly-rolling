import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from "react";
import { SweaterType } from "../../types/enum";
import { useUpdateUser } from "../../hooks/useUsers.ts";
import { UpdateUserRequest } from "../../types/api";
import useUserStore from "../../stores/userStore.ts";
import { Step1 } from "../../pages/Users/Step1.tsx";
import { Step2 } from "../../pages/Users/Step2.tsx";
import { Step3 } from "../../pages/Users/Step3.tsx";
import styles from './index.lazy.module.scss';
import { CommonLayout } from "../../layouts/CommonLayout.tsx";

export const Route = createLazyFileRoute('/user/')({
  component: User,
});

function User() {
  // TODO 전역 상태값으로 로그인 중인지 아닌지 확인 후 로그인 안되어있으면 로그인페이지로 튕기는 작업 필요
  const [nickname, setNickname] = useState('');
  const [sweaterType, setSweaterType] = useState(SweaterType.Red);
  const [description, setDescription] = useState('');
  const [step, setStep] = useState(1);

  const { mutate } = useUpdateUser();
  const id = useUserStore(state => state.id) as number;
  const navigate = useNavigate();

  const handleNextStep = () => step < 3 ? setStep(step + 1) : handleSubmit();
  const handleSubmit = () => {
    const user: UpdateUserRequest = { nickname, sweater_type: sweaterType, description };
    // TODO 유저 정보 업데이트에서 에러 날 시 navigate하지 않고 toast 알람 띄우기
    mutate({ id, user });
    navigate({ to: '/sweaters' });
  };

  const renderUser = () => {
    switch (step) {
      case 1:
        return <Step1 nickname={ nickname } setNickname={ setNickname } handleNextStep={ handleNextStep } />;
      case 2:
        return <Step2 sweaterType={ sweaterType } setSweaterType={ setSweaterType } handleNextStep={ handleNextStep } />;
      case 3:
        return <Step3 description={ description } setDescription={ setDescription } handleNextStep={ handleNextStep } />;
    }
  };

  return (
    <CommonLayout>
      <div className={ styles.userContainer }>{ renderUser() }</div>
    </CommonLayout>
  );
}