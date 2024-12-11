import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from "react";
import { SweaterType } from "../../types/enum";
import { useUpdateUser } from "../../hooks/useUsers.ts";
import { UpdateUserRequest } from "../../types/api";
import useUserStore from "../../stores/userStore.ts";
import { Step1 } from "../../pages/Users/Step1.tsx";
import { Step2 } from "../../pages/Users/Step2.tsx";
import { Step3 } from "../../pages/Users/Step3.tsx";

export const Route = createLazyFileRoute('/users/')({
  component: Users,
});

function Users() {
  // TODO 전역 상태값으로 로그인 중인지 아닌지 확인 후 로그인 안되어있으면 로그인페이지로 튕기는 작업 필요
  const [nickname, setNickname] = useState('');
  const [sweaterType, setSweaterType] = useState(SweaterType.None);
  const [description, setDescription] = useState('');
  const [step, setStep] = useState(1);

  const { mutate } = useUpdateUser();
  const id = useUserStore(state => state.id) as number;
  const navigate = useNavigate();

  const handleNextStep = () => step < 3 ? setStep(step + 1) : handleSubmit();
  const handleSubmit = () => {
    const user: UpdateUserRequest = { nickname, sweater_type: sweaterType, description };
    console.log(id, user);
    mutate({ id, user });
// TODO 다음페이지로 네비게이트
//     navigate({ to: '/sweater' });
  };

  const renderUsers = () => {
    switch (step) {
      case 1:
        return <Step1 nickname={ nickname } setNickname={ setNickname } handleNextStep={ handleNextStep } />;
      case 2:
        return <Step2 sweaterType={ sweaterType } setSweaterType={ setSweaterType } handleNextStep={ handleNextStep } />;
      case 3:
        return <Step3 description={ description } setDescription={ setDescription } handleNextStep={ handleNextStep } />;
    }
  };

  return (<div>{ renderUsers() }</div>);
}