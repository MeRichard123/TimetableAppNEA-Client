export type Timeslot = {
  id: number;
  Day: string;
  Unit: string;
  Teacher: string;
  Room: string;
  Subject: string;
  ClassGroup: string;
  msg: string;
};

export interface CreateTimeslotParams{
  Day: string;
  Unit: string;
  Teacher: string;
  Room: string;
  Subject: string;
  ClassGroup: string;
  token: string;
}

export type YearGroupType = string;

export type ClassType = {
  name: string;
  classes: string[];
  timeslots: Timeslot[];
};
export type LoginDetailType = {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  // eslint-disable-next-line camelcase
  is_staff: boolean;
}

export interface LoginOutPutType {
  user: User;
  token: string;
}

export interface RoomResponseObjectType {
  id: number;
  RoomNumber: string;
  RoomType: string;
}
export interface TeacherResponseObjectType{
  id: number;
  name: string;
  Room: string[];
}

export interface OverviewType{
  rooms: RoomResponseObjectType[];
  teachers: TeacherResponseObjectType[];
}
