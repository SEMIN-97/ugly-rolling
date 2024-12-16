import { useCreateUsers } from "../useUsers.ts";
import { CreateUserRequest } from "../../types/api";
import useUserStore from "../../stores/userStore.ts";
import { useNavigate } from "@tanstack/react-router";
import { fetchUserByKakaoId } from "../../api";

export function useKakaoLogin() {
  const kakao = (window as any).Kakao;
  const navigate = useNavigate();
  const { mutateAsync } = useCreateUsers();
  const setUser = useUserStore(state => state.setUser);

  const handleLogin = () => {
    return kakao.Auth.getAccessToken ?
      handleKakaoLoginRequest() :
      handleKakaoLogin();
  };

  const handleKakaoLogin = () => {
    kakao.Auth.login({
      success: () => handleKakaoLoginRequest(),
      fail: (error: Error) => console.log(error),
    });
  };


  const handleKakaoLoginRequest = () => {
    kakao.API.request({
      url: '/v2/user/me',
      success: async (response: any) => await loginUser(response),
      fail: (e: Error) => console.error("Kakao API request failed:", e),
    });
  };

  const loginUser = async (response: any) => {
    try {
      const existingUser = await fetchUserByKakaoId(response.id);

      if (!existingUser) return await createUser(response.id);

      setUser({ id: existingUser.id, nickname: existingUser.nickname || null });

      if (!existingUser.nickname) return await navigate({ to: '/user' });

      return await navigate({ to: `/sweaters/${ existingUser.id }` });
    } catch (e) {
      console.error(e);
    }
  };

  const createUser = async (kakaoId: number) => {
    try {
      const body: CreateUserRequest = { kakao_id: kakaoId };
      const user = await mutateAsync(body);
      setUser({ id: user.id, nickname: user.nickname || null });
      await navigate({ to: '/user' });
    } catch (e) {
      console.error(e);
    }
  };

  return { handleLogin };
}
