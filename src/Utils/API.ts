import axios from 'axios';
import { BASE_URL } from './store';

import type { SubjectType, RoomType, TeacherType } from '../components/Feature/TimeSlotForm/TimeSlotTypes';
import type {
  LoginOutPutType, LoginDetailType, YearGroupType,
  Timeslot, ClassType, OverviewType, CreateTimeslotParams,
} from './APITypes';

export default class API {
  static async LogInUser(loginDetails: LoginDetailType): Promise<LoginOutPutType> {
    const url = `${BASE_URL}/auth/login`;
    const { data } = await axios.post(url, loginDetails);
    return data;
  }

  static async LogOutUser(token: string):Promise<void> {
    const url = `${BASE_URL}/auth/logout`;
    await axios.post(url, null, {
      headers: { Authorization: `token ${token}` },
    });
  }

  static async GetYearGroups(token: string): Promise<YearGroupType[]> {
    const url = `${BASE_URL}/year`;

    const { data } = await axios.get(url, {
      headers: { Authorization: `token ${token}` },
    });
    return data;
  }

  static async GetClasses(yearGroup: string, token: string): Promise<ClassType> {
    const year = yearGroup.slice(2);
    const url = `${BASE_URL}/year/${year}`;
    const { data } = await axios.get(url, {
      headers: { Authorization: `Token ${token}` },
    });
    return data;
  }

  static async GetFilteredSubjects(day: string, unit: string,
    className: string, token: string): Promise<SubjectType[]> {
    // http://localhost:8000/api/subjects/7/?day=Mon&unit=5&class=7B2
    const YearGroup = className.length === 3 ? className[0] : className.substr(0, 2);
    const url = `${BASE_URL}/subjects/${YearGroup}/?day=${day}&unit=${unit}&class=${className}`;
    const { data } = await axios.get(url, {
      headers: { Authorization: `Token ${token}` },
    });
    return data;
  }

  static async GetAllSubjects(token: string):Promise<string[]> {
    const url = `${BASE_URL}/subjects`;
    const { data } = await axios.get(url, {
      headers: { Authorization: `Token ${token}` },
    });
    return data;
  }

  static async GetFilteredTeachers(day: string, unit: string,
    subject: string, token: string): Promise<TeacherType> {
    //  http://localhost:8000/api/teachers/?day=Mon&unit=1&subject=Maths
    const url = `${BASE_URL}/teachers/?day=${day}&unit=${unit}&subject=${subject}`;
    const { data } = await axios.get(url, {
      headers: { Authorization: `Token ${token}` },
    });
    return data;
  }

  static async GetFilteredRooms(subject: string, day: string,
    unit: string, teacher: string, className: string, token: string): Promise<RoomType> {
    // http://localhost:8000/api/rooms/?day=Mon&unit=5&subject=ICT&teacher=Mr%20Swift&class=7B1
    const url = `${BASE_URL}/rooms/?day=${day}&unit=${unit}&subject=${subject}&teacher=${teacher}&class=${className}`;
    const { data } = await axios.get(url, {
      headers: { Authorization: `Token ${token}` },
    });
    return data;
  }

  static async CreateTimeSlot(params: CreateTimeslotParams): Promise<Timeslot> {
    const url = `${BASE_URL}/timeslots/`;
    const dataRequest = {
      Day: params.Day,
      Unit: `Unit${params.Unit}`,
      Teacher: params.Teacher,
      Room: params.Room,
      Subject: params.Subject,
      ClassGroup: params.ClassGroup,
    };
    const { data } = await axios.post(url, dataRequest, {
      headers: { Authorization: `Token ${params.token}` },
    });
    return data;
  }

  static async DeleteTimeslot(id: number, token: string): Promise<string> {
    const url = `${BASE_URL}/timeslots/${id}`;
    await axios.delete(url, {
      headers: { Authorization: `Token ${token}` },
    });

    return 'Deleted Data';
  }

  static async OverviewFreeITRooms(day: string, unit: string,
    token: string, subject?: string): Promise<OverviewType> {
    const dayIdentifier:string = day.slice(0, 3); // Monday -> Mon
    const unitIdentifier:string = unit.slice(-1); // Unit 1 -> 1
    // api/overview/?day=Mon&unit=3
    let url: string;
    if (subject) {
      url = `${BASE_URL}/overview/?day=${dayIdentifier}&unit=${unitIdentifier}&subject=${subject}`;
    } else {
      url = `${BASE_URL}/overview/?day=${dayIdentifier}&unit=${unitIdentifier}`;
    }
    const { data } = await axios.get(url, {
      headers: { Authorization: `Token ${token}` },
    });
    return data;
  }
}
