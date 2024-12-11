import { useCreateUsers } from "../useUsers.ts";
import { CreateUserRequest } from "../../types/api";
import useUserStore from "../../stores/userStore.ts";
import { useNavigate } from "@tanstack/react-router";

export function useKakaoLogin() {
  const navigate = useNavigate();
  const { mutateAsync } = useCreateUsers();
  const setId = useUserStore(state => state.setId);

  const handleKakaoLogin = () => {
    (window as any).Kakao.Auth.login({
      success: function () {
        createUser();
      },
      fail: function (error: Error) {
        console.log(error);
      },
    });
  };

  const createUser = () => {
    (window as any).Kakao.API.request({
      url: '/v2/user/me',
      success: async function (response: any) {
        const body: CreateUserRequest = { kakao_id: response.id };
        const user = await mutateAsync(body);
        setId(user.id);
        await navigate({ to: '/users' });
      },
      fail: function (error: Error) {
        console.error(error);
      },
    });
  };

  return { handleKakaoLogin };
}
