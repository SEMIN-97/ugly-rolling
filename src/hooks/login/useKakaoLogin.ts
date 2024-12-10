import { useCreateUsers } from "../useUsers.ts";
import { CreateUserRequest } from "../../types/api";

export function useKakaoLogin() {
  const { mutate } = useCreateUsers();

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
      success: function (response: any) {
        const body: CreateUserRequest = { kakao_id: response.id };
        mutate(body);
      },
      fail: function (error: Error) {
        console.error(error);
      },
    });
  };

  return { handleKakaoLogin };
}
