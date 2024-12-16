import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from "react";
import { SweaterType } from "../../types/enum";
import { useUpdateUser } from "../../hooks/useUsers.ts";
import { UpdateUserRequest } from "../../types/api";
import useUserStore from "../../stores/userStore.ts";
import { Step1 } from "../../pages/Users/Step1.tsx";
import { Step2 } from "../../pages/Users/Step2.tsx";
import { Step3 } from "../../pages/Users/Step3.tsx";
import styles from './index.lazy.module.scss';
import { CommonLayout } from "../../layouts/CommonLayout.tsx";
import { useToastStore } from "../../stores/toastStore.ts";

export const Route = createLazyFileRoute('/user/')({
  component: User,
});

function User() {
  const id = useUserStore(state => state.id) as number;
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate({ to: '/login' });
    }
  }, [id, navigate]);

  const [nickname, setNickname] = useState('');
  const [sweaterType, setSweaterType] = useState(SweaterType.Green);
  const [description, setDescription] = useState('');
  const [step, setStep] = useState(1);

  const { mutateAsync } = useUpdateUser();
  const { addToast } = useToastStore();

  const handleNextStep = () => step < 3 ? setStep(step + 1) : handleSubmit();
  const handleSubmit = async () => {
    const user: UpdateUserRequest = { nickname, sweater_type: sweaterType, description };

    try {
      await mutateAsync({ id, user });
      navigate({ to: '/sweater' });
    } catch (e) {
      addToast({ message: '유저 정보 업데이트에 실패했습니다.', duration: 2000 });
      console.log(e);
    }
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