import { useCreateUsers } from "../useUsers.ts";
import { CreateUserRequest } from "../../types/api";
import useUserStore from "../../stores/userStore.ts";
import { useNavigate } from "@tanstack/react-router";
import { fetchUserByKakaoId } from "../../api";

export function useKakaoLogin() {
  const navigate = useNavigate();
  const { mutateAsync } = useCreateUsers();
  const setId = useUserStore(state => state.setId);

  const handleKakaoLogin = () => {
    (window as any).Kakao.Auth.login({
      success: () => handleKakaoLoginRequest(),
      fail: (error: Error) => console.log(error),
    });
  };

  const handleKakaoLoginRequest = () => {
    (window as any).Kakao.API.request({
      url: '/v2/user/me',
      success: async (response: any) => await loginUser(response),
      fail: (e: Error) => console.error("Kakao API request failed:", e),
    });
  };

  const loginUser = async (response: any) => {
    try {
      const existingUser = await fetchUserByKakaoId(response.id);
      if (existingUser) {
        setId(existingUser.id);

        if (!existingUser.nickname) {
          await navigate({ to: '/user' });
          return;
        }

        return await navigate({ to: '/sweater' });
      }

      await createUser(response.id);
    } catch (e) {
      console.error(e);
    }
  };

  const createUser = async (kakaoId: number) => {
    try {
      const body: CreateUserRequest = { kakao_id: kakaoId };
      const user = await mutateAsync(body);
      setId(user.id);
      await navigate({ to: '/user' });
    } catch (e) {
      console.error(e);
    }
  };

  return { handleKakaoLogin };
}
