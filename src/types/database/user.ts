import { SweaterType } from "../enum";

export interface User {
  id: number;
  kakao_id: number;
  created_at: string;
  updated_at: string;
  nickname?: string;
  ornaments?: number[];
  description?: string;
  sweater_type?: SweaterType;
}