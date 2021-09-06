import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import StyledPage from '../../components/Layout/Page';
import { StyledTabGroup, StyledTabContainer, StyledErrorContainer } from '../Timetable/TimeTableStyles';
import Tab from '../../components/Shared/Tab';
import API from '../../Utils/API';
import { usePermissions, useAuthToken } from '../../Utils/store';
import type { OverviewType, RoomResponseObjectType, TeacherResponseObjectType } from '../../Utils/APITypes';
import { StyledSelect, StyledOption, StyledSelectContainer } from '../../components/Feature/Calendar/CalendarStyles';

const StyledLineBreak = styled.hr`
  width: 200px;
`;
const StyledOverview = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
`;
const StyledInfoContainer = styled.div`
  text-align: center;
  margin: 50px;
`;

const Overview = () => {
  const isAdmin = usePermissions((state) => state.isAdmin);
  const token = useAuthToken((state) => state.token);
  const daysOfTheWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const unitsOfTheWeek = ['Unit 1', 'Unit 2', 'Unit 3', 'Unit 4', 'Unit 5'];
  const [day, setDay] = useState<string>(daysOfTheWeek[0]);
  const [unit, setUnit] = useState<string>(unitsOfTheWeek[0]);
  const [selectedSubject, setSelectedSubject] = useState<string>('');

  const [ComputerRooms, setComputerRooms] = useState<RoomResponseObjectType[]>();
  const [freeTeachers, setFreeTeachers] = useState<TeacherResponseObjectType[]>([]);

  const { data: allSubjects, isLoading, isSuccess } = useQuery<string[]>(['getAllSubjects', token],
    () => API.GetAllSubjects(token));

  useEffect(() => {
    API.OverviewFreeITRooms(day, unit, token, selectedSubject).then(
      (res: OverviewType) => {
        setComputerRooms(res.rooms);
        setFreeTeachers(res.teachers);
      },
    ).catch((e) => {
      console.log(e);
    });
  }, [day, unit, selectedSubject]);
  return (
    <StyledPage>
      <StyledTabContainer className="tabs">
        <StyledTabGroup>
          {daysOfTheWeek.map((weekDay) => (
            <Tab
              key={weekDay}
              onClick={() => { setDay(weekDay); }}
              active={day === weekDay}
            >
              {weekDay}
            </Tab>
          ))}
        </StyledTabGroup>
        <StyledLineBreak />
        <StyledTabGroup>
          {unitsOfTheWeek.map((weekUnit) => (
            <Tab
              key={weekUnit}
              onClick={() => { setUnit(weekUnit); }}
              active={unit === weekUnit}
            >
              {weekUnit}
            </Tab>
          ))}
        </StyledTabGroup>
      </StyledTabContainer>
      <StyledOverview>
        <StyledInfoContainer>
          <p>Free Computer Rooms:</p>
          <ul>
            {ComputerRooms?.map((room: RoomResponseObjectType) => (
              <li key={room.id}>{room.RoomNumber}</li>
            ))}
          </ul>
        </StyledInfoContainer>
        <StyledInfoContainer>
          <p>Free Staff In:</p>
          <StyledSelectContainer>
            <StyledSelect
              onChange={(e) => {
                setSelectedSubject(e.target.value);
              }}
              defaultValue="Select Subject"
            >
              <StyledOption disabled value="Select Subject">Select Subject</StyledOption>
              {allSubjects?.sort().map((subject) => (
                <StyledOption key={subject}>{subject}</StyledOption>
              ))}
            </StyledSelect>
          </StyledSelectContainer>
          <ul>
            {freeTeachers.length > 0 ? freeTeachers?.map((teacher) => (
              <li key={teacher?.id}>{teacher?.name}</li>
            )) : 'No Teachers'}
          </ul>

        </StyledInfoContainer>
      </StyledOverview>

    </StyledPage>
  );
};

export default Overview;
