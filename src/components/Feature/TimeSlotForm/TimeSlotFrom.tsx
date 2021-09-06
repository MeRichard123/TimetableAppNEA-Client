/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, { useEffect, useState, useReducer } from 'react';
import { useQuery } from 'react-query';
import { StyledFormContainer, StyledContainer, StyledOverViewForm } from './TimeslotStyles';
import API from '../../../Utils/API';
import Button from '../../Shared/Button';
import {
  StyledSelectContainer, StyledOption, StyledSelect,
} from '../Calendar/CalendarStyles';
import { useAuthToken } from '../../../Utils/store';
import type { SubjectType, RoomType, TeacherType } from './TimeSlotTypes';
import { reducer, defaultState } from './TimeslotState';

interface Props{
  day: string;
  unit: string;
  className: string;
  timeslot: any;
  setModalIsOpen: (state:boolean) => void;
}

const TimeSlotFrom: React.FC<Props> = ({
  day, unit, className, timeslot, setModalIsOpen,
}) => {
  const [formVisible, setFormVisible] = useReducer(reducer, defaultState);

  const [SubjectDataArray, setSubjectDataArray] = useState<any>([]);
  const [TeacherDataArray, setTeacherDataArray] = useState<any>([]);
  const [RoomDataArray, setRoomDataArray] = useState<any>([]);

  // Form Data
  const [Subject, setSubject] = useState('');
  const [Teacher, setTeacher] = useState('');
  const [Room, setRoom] = useState('');
  const token = useAuthToken((state) => state.token);

  const { data: SubjectData, isLoading, isSuccess } = useQuery<SubjectType[] | SubjectType>(
    ['getFilteredSubjects', day, unit, className, token],
    () => API.GetFilteredSubjects(day, unit, className, token),
  );

  const SubmitSubject = async (e:React.FormEvent) => {
    e.preventDefault();
    if (Subject) {
      try {
        const data = await API.GetFilteredTeachers(day, unit, Subject, token);
        setTeacherDataArray(data);
        setFormVisible({ type: 'teacherForm' });
      } catch (error) {
        console.error(error);
      }
    }
  };
  const SubmitTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Teacher) {
      try {
        const data = await API.GetFilteredRooms(Subject, day, unit, Teacher, className, token);
        setRoomDataArray(data);
        setFormVisible({ type: 'roomsForm' });
      } catch (error) {
        console.error(error);
      }
    }
  };
  const SubmitRooms = (e: React.FormEvent) => {
    e.preventDefault();
    if (Room) {
      setFormVisible({ type: 'timeslotForm' });
    }
  };
  const DeleteTimeslot = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await API.DeleteTimeslot(timeslot.id, token);
    setModalIsOpen(false);
    alert(data);
  };

  const CreateTimeSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await API.CreateTimeSlot({
      Day: day, Unit: unit, Teacher, Room, Subject, ClassGroup: className, token,
    });
    setModalIsOpen(false);
    if (data.msg === 'UNAUTHORISED') {
      alert('You cannot do that now. Reason: Unauthorised');
    } else {
      alert('Timeslot Created');
    }
  };

  useEffect(() => {
    if (timeslot !== undefined) {
      setFormVisible({ type: 'subjectForm' });
    }
    if (!Array.isArray(SubjectData)) {
    // If the API only gives back one result it will be an object
    // So I convert it to an array to make sure I can loop over it
      setSubjectDataArray(Array(SubjectData));
    } else {
      setSubjectDataArray(SubjectData);
    }
  }, [SubjectData, isLoading, isSuccess]);

  return (
    <StyledFormContainer>
      <StyledContainer onSubmit={SubmitSubject} disabled={formVisible.subjectDisabled}>
        <Button type="submit">Set Subject</Button>
        <StyledSelectContainer style={{ width: 'max-content' }}>
          {isLoading ? 'Loading' : (
            <StyledSelect onChange={(e) => setSubject(e.target.value)}>
              <StyledOption>Select Subject</StyledOption>
              {SubjectDataArray.length > 0 ? SubjectDataArray?.map((subject: SubjectType) => (
                <StyledOption key={subject?.name + subject?.count}>{subject?.name}</StyledOption>
              )) : <StyledOption disabled>No Subjects Found</StyledOption>}
            </StyledSelect>
          )}
        </StyledSelectContainer>
      </StyledContainer>

      <StyledContainer onSubmit={SubmitTeacher} disabled={formVisible.teachersDisabled}>
        <Button type="submit">Set Teacher</Button>
        <StyledSelectContainer style={{ width: 'max-content' }}>
          <StyledSelect onChange={(e) => setTeacher(e.target.value)}>
            <StyledOption>Select Teacher</StyledOption>
            {TeacherDataArray.length > 0 ? TeacherDataArray?.map((teacher:TeacherType) => (
              <StyledOption key={teacher.name}>{teacher.name}</StyledOption>

            )) : <StyledOption disabled>No Teachers Found</StyledOption>}
          </StyledSelect>
        </StyledSelectContainer>
      </StyledContainer>

      <StyledContainer disabled={formVisible.roomsDisabled} onSubmit={SubmitRooms}>
        <Button type="submit">Set Room</Button>
        <StyledSelectContainer style={{ width: 'max-content' }}>
          <StyledSelect onChange={(e) => setRoom(e.target.value)}>
            <StyledOption>Select Room</StyledOption>
            {RoomDataArray.length > 0 ? RoomDataArray?.map((room:RoomType) => (
              <StyledOption key={room.RoomNumber + room.RoomType}>{ room.RoomNumber}</StyledOption>
            )) : <StyledOption disabled>No Rooms Found</StyledOption>}
          </StyledSelect>
        </StyledSelectContainer>
      </StyledContainer>
      {formVisible.timeslotFormVisible && (
        <StyledOverViewForm onSubmit={CreateTimeSlot}>
          <p>{`Subject: ${Subject}`}</p>
          <p>{`Teacher: ${Teacher}`}</p>
          <p>{`Room: ${Room}`}</p>
          <Button type="submit">Create Timeslot</Button>
        </StyledOverViewForm>
      )}
      {timeslot !== undefined && (
        <StyledOverViewForm onSubmit={DeleteTimeslot}>
          <p>{`Subject: ${timeslot?.Subject}`}</p>
          <p>{`Teacher: ${timeslot?.Teacher}`}</p>
          <p>{`Room: ${timeslot?.Room}`}</p>
          <Button type="submit">Delete Timeslot</Button>
        </StyledOverViewForm>
      )}
      {SubjectDataArray.length === 1 && <p>* This Subject has been grouped</p>}
    </StyledFormContainer>
  );
};

export default TimeSlotFrom;
