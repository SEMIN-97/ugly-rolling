import { useCreateUsers } from "../useUsers.ts";
import { CreateUserRequest } from "../../types/api";

export function useKakaoLogin() {
  const { mutate } = useCreateUsers();

  const handleKakaoLogin = () => {
    window.Kakao.Auth.login({
      success: function () {
        createUser();
      },
      fail: function (error) {
        console.log(error)
      },
    })
  }

  const createUser = () => {
    window.Kakao.API.request({
      url: '/v2/user/me',
      success: function (response) {
        const body: CreateUserRequest = { kakao_id: response.id };
        mutate(body);
      },
      fail: function (error) {
        console.error(error);
      },
    })
  }

  return { handleKakaoLogin }
}
