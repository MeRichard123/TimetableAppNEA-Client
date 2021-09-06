export type SubjectType = {
  name: string
  block: number | null,
  yearGroup: string,
  count: number
}
export type TeacherType = {
  id: number,
  name: string,
  Room: string[],
}

export type RoomType = {
  id: number;
  RoomNumber: string;
  RoomType: string;
}
