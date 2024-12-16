import { SweaterType } from "../../enum";

export interface UpdateUserRequest {
  nickname: string;
  sweater_type: SweaterType;
  description: string;
}