import axios from 'axios';
import { BASE_URL } from './store';

import type { SubjectType, RoomType, TeacherType } from '../components/Feature/TimeSlotForm/TimeSlotTypes';
import type {
  LoginOutPutType, LoginDetailType, YearGroupType,
  Timeslot, ClassType, OverviewType, CreateTimeslotParams,
} from './APITypes';

export default class API {
  /**
   * Post details to login route and authenticate user
   * @param {LoginDetailType} loginDetails - object with username and password
   * @returns authenticated user and token
   *
   * @example
   * API.LogInUser({username:'user',password:'password'})
   */
  static async LogInUser(loginDetails: LoginDetailType): Promise<LoginOutPutType> {
    const url = `${BASE_URL}/auth/login`;
    const { data } = await axios.post(url, loginDetails);
    return data;
  }

  /**
   * Calls Logout API and logs out user
   * @param {string} token - jwt token
   * @returns Void
   *
   * @example
   * API.LogOutUser('456fsdfs8dgsdf')
   */
  static async LogOutUser(token: string):Promise<void> {
    const url = `${BASE_URL}/auth/logout`;
    await axios.post(url, null, {
      headers: { Authorization: `token ${token}` },
    });
  }

  /**
   * fetch all the yeargroups from the database
   * @param {string} token - jwt token
   * @returns an array of yeargroups
   *
   * @example
   * API.GetYearGroups('456sdfd45dsaf')
   */
  static async GetYearGroups(token: string): Promise<YearGroupType[]> {
    const url = `${BASE_URL}/year`;

    const { data } = await axios.get(url, {
      headers: { Authorization: `token ${token}` },
    });
    return data;
  }

  /**
   * Fetch all classes from database
   * @param {string} yearGroup - The Year code of a Year Group
   * @param token - jwt token
   * @returns an object of classes
   *
   * @example
   * API.GetClasses('Yr8','454fs6d5g4d5f')
   */
  static async GetClasses(yearGroup: string, token: string): Promise<ClassType[]> {
    const year = yearGroup.slice(2);
    const url = `${BASE_URL}/year/${year}`;
    const { data } = await axios.get(url, {
      headers: { Authorization: `Token ${token}` },
    });
    return data;
  }

  /**
   * Filter the recommended subjects by posting to the api
   * @param {string} day - week day identifier eg 'Mon'
   * @param {string} unit - unit of the week
   * @param {string} className - class identifier
   * @param {string} token - jwt token from login
   * @returns a list of subjects
   *
   * @example
   * API.GetFilteredSubject('Mon','1','7A1', '5df56sdf8fd')
   */
  static async GetFilteredSubjects(day: string, unit: string,
    className: string, token: string): Promise<SubjectType[]> {
    // http://localhost:8000/api/subjects/7/?day=Mon&unit=5&class=7B2
    // extract yeargroup from 7A2 and 11A4.
    const YearGroup = className.length === 3 ? className[0] : className.substr(0, 2);
    const url = `${BASE_URL}/subjects/${YearGroup}/?day=${day}&unit=${unit}&class=${className}`;
    const { data } = await axios.get(url, {
      headers: { Authorization: `Token ${token}` },
    });
    return data;
  }

  /**
   * Gets a list of all subjects which exist
   * @param {string} token - jwt token from login
   * @returns array of subjects
   *
   * @example
   * API.GetAllSubjects('fsd54785sad4f87')
   */
  static async GetAllSubjects(token: string):Promise<string[]> {
    const url = `${BASE_URL}/subjects`;
    const { data } = await axios.get(url, {
      headers: { Authorization: `Token ${token}` },
    });
    return data;
  }

  /**
   * call the api to filter subjects passing in the parameters
   * @param {string} day - week day
   * @param {string} unit - unit of the day
   * @param {string} subject - the subject for which you need teachers
   * @param {string} token - jwt auth token from login
   * @returns an array of teachers
   *
   * @example
   * const teachers = API.GetFilteredTeachers('Mon','1','Maths','5564fdsgfg')
   */
  static async GetFilteredTeachers(day: string, unit: string,
    subject: string, token: string): Promise<TeacherType[]> {
    //  http://localhost:8000/api/teachers/?day=Mon&unit=1&subject=Maths
    const url = `${BASE_URL}/teachers/?day=${day}&unit=${unit}&subject=${subject}`;
    const { data } = await axios.get(url, {
      headers: { Authorization: `Token ${token}` },
    });
    return data;
  }

  /**
   * Fetch the api and get all the free rooms
   * @param {string} subject - name of the subject for which you need rooms
   * @param {string} day - the day of the week
   * @param {number} unit - the period of the day
   * @param {string} teacher - the name of the teacher who is teaching
   * @param {string} className - the class code of the class for that day
   * @param {string} token - jwt auth token
   * @returns an array of free rooms of type RoomType
   *
   * @example
   * const rooms = API.GetFilteredRooms('Maths','Mon','1','Mr Stevens','7A1','4564gdsfgf')
   */
  static async GetFilteredRooms(subject: string, day: string,
    unit: string, teacher: string, className: string, token: string): Promise<RoomType[]> {
    // http://localhost:8000/api/rooms/?day=Mon&unit=5&subject=ICT&teacher=Mr%20Swift&class=7B1
    const url = `${BASE_URL}/rooms/?day=${day}&unit=${unit}&subject=${subject}&teacher=${teacher}&class=${className}`;
    const { data } = await axios.get(url, {
      headers: { Authorization: `Token ${token}` },
    });
    return data;
  }

  /**
   *
   * @param {CreateTimeslotParams} params: all the data for timeslot in an object
   * @returns the timeslot object which was created
   *
   * @example
   * API.CreateTimeslot({...data})
   */
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

  /**
   * API call to remove a timeslot from the database
   * @param {number} id - id of the timeslot
   * @param {string} token - auth jwt token
   * @returns a message for the user
   *
   * @example
   * API.DeleteTimeslot(12, '484f8sdfsd87sdfg')
   */
  static async DeleteTimeslot(id: number, token: string): Promise<string> {
    const url = `${BASE_URL}/timeslots/${id}`;
    await axios.delete(url, {
      headers: { Authorization: `Token ${token}` },
    });

    return 'Deleted Data';
  }

  /**
   * return all the overview data at once
   * @param {string} day - day of the week e.g 'Tue'
   * @param {string} unit - unit of the day
   * @param {string} token - jwt auth token
   * @param {string} subject - name of subject for which you needs free teachers
   * @returns an object of free it rooms and teachers
   *
   * @example
   * API.OverviewFreeITRooms('Mon','Unit 1','456dsa46fd','Maths')
   */
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
