import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import type { ClassType, Timeslot } from '../../Utils/APITypes';
import { Modal } from '../../components/Feature/Calendar/Calendar';
import {
  StyledTableContainer, StyledLabel, StyledUnitTwo,
  StyledUnitForm, StyledUnitThree, StyledUnitFour, StyledUnitFive,
  StyledUnitFormTwo, StyledModalContainer,
} from '../../components/Feature/Calendar/CalendarStyles';

const days:Array<string> = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const units:Array<string> = ['1', '2', 'Form', '3', '4', 'Form2', '5'];

ReactModal.setAppElement('#root');

interface PropTypes{
    classCode: string;
  timeslots: Timeslot[];
  data: ClassType;
}

const AddBtn = styled.div`
    background: #6b6565;
    padding: 1rem 1.5rem;
    user-select: none;
    margin: 1px;
    border-radius: 12px;
    cursor: pointer;
`;

const StyledTimeslot = styled.div`
  margin: 2px;
  font-size: clamp(0.5rem, 2vw, 1rem);
`;

const OverviewTimetable: React.FC<PropTypes> = ({ classCode, timeslots, data }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 900px)' });
  const [timeslotsFiltered, setFilteredTimeslots] = useState<Timeslot[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [currentDay, setCurrentDay] = useState<any>();
  const [currentUnit, setCurrentUnit] = useState<any>();
  useEffect(() => {
    setFilteredTimeslots(timeslots.filter((timeslot) => timeslot.ClassGroup === classCode));
  }, [classCode]);

  return (
    <StyledTableContainer>
      <Modal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        day={currentDay}
        unit={currentUnit}
        className={classCode}
        data={data}
        timeslot={undefined}
      />

      <p />
      <StyledLabel>{isMobile ? 'Mon' : 'Monday'}</StyledLabel>
      <StyledLabel>{isMobile ? 'Tue' : 'Tuesday'}</StyledLabel>
      <StyledLabel>{isMobile ? 'Wed' : 'Wednesday'}</StyledLabel>
      <StyledLabel>{isMobile ? 'Thu' : 'Thursday'}</StyledLabel>
      <StyledLabel>{isMobile ? 'Fri' : 'Friday'}</StyledLabel>
      <StyledLabel>{isMobile ? 'U1' : 'Unit 1'}</StyledLabel>
      <StyledUnitTwo>{isMobile ? 'U2' : 'Unit 2'}</StyledUnitTwo>
      <StyledUnitForm>{isMobile ? 'Reg' : 'Form'}</StyledUnitForm>
      <StyledUnitThree>{isMobile ? 'U3' : 'Unit 3'}</StyledUnitThree>
      <StyledUnitFour>{isMobile ? 'U4' : 'Unit 4'}</StyledUnitFour>
      <StyledUnitFormTwo>{isMobile ? 'Reg' : 'Form'}</StyledUnitFormTwo>
      <StyledUnitFive>{isMobile ? 'U5' : 'Unit 5'}</StyledUnitFive>
      {units.map((unit) => days.map((day) => (
        <div key={`${day}-${unit}`}>
          {(unit === 'Form' || unit === 'Form2') && (<p>Reg</p>)}
          {(timeslotsFiltered.filter((timeslot) => timeslot.Day === day
                  && timeslot.Unit === `Unit${unit}`).length === 0
                  && (!['Form', 'Form2'].includes(unit))
            && (
              <AddBtn onClick={(e) => {
                setCurrentDay(day);
                setCurrentUnit(unit);
                setModalIsOpen(true);
              }}
              >
                +
              </AddBtn>
            )
          )}
          {
                  timeslotsFiltered.filter((timeslot) => timeslot.Day === day && timeslot.Unit === `Unit${unit}`).map((timeslot) => (
                    <StyledTimeslot key={timeslot.id}>
                      <p>{timeslot.Subject}</p>
                      <p>{timeslot.Teacher }</p>
                      <p>{timeslot.Room}</p>
                    </StyledTimeslot>
                  ))

         }
        </div>
      )))}
    </StyledTableContainer>
  );
};

export default OverviewTimetable;
