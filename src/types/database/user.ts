import { OrnamentType, SweaterType } from '../enum';

export interface Ornament {
  ornamentType: OrnamentType;
  content: string;
  positionX: string;
  positionY: string;
  author: {
    id: number;
    nickname: string;
  },
  created_at: string;
}

export interface User {
  id: number;
  kakao_id: number;
  created_at: string;
  updated_at: string;
  nickname?: string;
  ornaments?: Ornament[];
  description?: string;
  sweater_type?: SweaterType;
}
