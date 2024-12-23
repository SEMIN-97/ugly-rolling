import { SweaterType } from "../../enum";
import { Ornament } from '../../database';

export interface UpdateUserRequest {
  nickname?: string;
  sweater_type?: SweaterType;
  description?: string;
  ornaments?: Ornament[];
}