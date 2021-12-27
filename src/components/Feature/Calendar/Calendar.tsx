import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import ReactModal from 'react-modal';
import { useMediaQuery } from 'react-responsive';
import { Steps } from 'intro.js-react';
import {
  StyledTableContainer, StyledLabel, StyledUnitTwo,
  StyledUnitForm, StyledUnitThree, StyledUnitFour, StyledUnitFive,
  StyledUnitFormTwo, StyledMobileSelect, StyledOption, StyledSelectContainer, StyledSelect,
  StyledModalContainer, StyledInfoBox,
} from './CalendarStyles';
import API from '../../../Utils/API';
import { useAuthToken, useTutorialDone } from '../../../Utils/store';

import TimeSlotForm from '../TimeSlotForm/TimeSlotFrom';

ReactModal.setAppElement('#root');

const days:Array<string> = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const units:Array<string> = ['1', '2', 'Form', '3', '4', 'Form2', '5'];

interface Props{
    yearGroup: string,
}

type Timeslot = {
  id: number;
  Day: string;
  Unit: string;
  Teacher: string;
  Room: string;
  Subject: string;
  ClassGroup: string;
};

const DeafultTimeslot = {
  id: 0,
  Day: '',
  Unit: '',
  Teacher: '',
  Room: '',
  Subject: '',
  ClassGroup: '',
};

type ClassType = {
  name: string;
  classes: string[];
  timeslots: Timeslot[];
};

interface ModalProps{
  modalIsOpen: boolean;
  setModalIsOpen: (value:boolean) => void;
  day: string;
  unit: string;
  className: string;
  data: ClassType;
  timeslot: Timeslot | undefined;
  token: string;
}
const steps = [
  {
    element: '#select-subject',
    intro: 'Now choose a subject',
  },
  {
    element: '#set-subject',
    intro: 'submit your selection and follow the form',
  },
];

export const Modal: React.FC<ModalProps> = ({
  modalIsOpen, setModalIsOpen, day, unit, className, data, timeslot, token,
}) => {
  const [stepsEnabled, setStepsEnabled] = useState(false);
  const setTutorialDone = useTutorialDone((state) => state.setTutorialDone);
  const isTutorialDone = useTutorialDone((state) => state.tutorialDone);
  useEffect(() => {
    if (!isTutorialDone) {
      setStepsEnabled(true);
    }
  }, [modalIsOpen]);
  return (
    <ReactModal
      isOpen={modalIsOpen}
      ariaHideApp={false}
      onRequestClose={() => setModalIsOpen(false)}
      style={{
        overlay: { zIndex: 999 },
        content: { zIndex: 999 },
      }}
    >
      <button type="button" onClick={() => setModalIsOpen(false)} className="close-btn">
        <img
          src="https://icongr.am/feather/x.svg?size=25&color=currentColor"
          alt=""
        />
      </button>
      {data && (
        <StyledModalContainer>
          <Steps
            enabled={stepsEnabled}
            steps={steps}
            initialStep={0}
            onExit={() => { setStepsEnabled(false); }}
            onComplete={() => { API.FinishTutorial(token); setTutorialDone(true); }}
          />

          <h1>{`${className} - ${day} - Unit ${unit}`}</h1>
          <TimeSlotForm
            day={day}
            unit={unit}
            className={className}
            timeslot={timeslot}
            setModalIsOpen={setModalIsOpen}
          />
        </StyledModalContainer>
      )}
    </ReactModal>
  );
};
const Calendar: React.FC<Props> = ({ yearGroup }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 900px)' });
  const [classes, setClasses] = useState<string[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [timeslots, setTimeslots] = useState<Timeslot[]>([]);
  const [dayValue, setDay] = useState<string>('');
  const [unitValue, setUnit] = useState<string>('');
  const [className, setClass] = useState<string>('');
  const [classTimeslot, setClassTimeslot] = useState<any>();
  const token = useAuthToken((state) => state.token);
  const { data, isLoading, isSuccess } = useQuery<ClassType>(['getYearClasses', yearGroup, token],
    () => API.GetClasses(yearGroup, token));

  useEffect(() => {
    if (data && isSuccess) {
      setClasses(data?.classes);
      setTimeslots(data?.timeslots);
    }
  }, [data]);
  return (
    <StyledTableContainer>
      {data && (
      <Modal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        day={dayValue}
        unit={unitValue}
        className={className}
        data={data}
        timeslot={classTimeslot}
        token={token}
      />
      )}
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
          {unit === 'Form' || unit === 'Form2' ? (<p>Reg</p>)
            : (
              <div>
                {isMobile ? (
                  <StyledMobileSelect
                    defaultValue="cls"
                    onChange={
                        (e) => {
                          setDay(day);
                          setUnit(unit);
                          setClass(e.target.value);
                          const ClassTimeslot = timeslots.filter(
                            (timeslot) => timeslot.ClassGroup === e.target.value
                              && timeslot.Day === day && timeslot.Unit === `Unit${unit}`,
                          );
                          setClassTimeslot(ClassTimeslot[0]);
                          setModalIsOpen(true);
                        }
                      }
                  >
                    <StyledOption value="cls" disabled style={{ opacity: '50%' }}>cls</StyledOption>
                    {classes.map((cls) => {
                      const ClassTimeslot = timeslots.filter(
                        (timeslot) => timeslot.ClassGroup === cls
                        && timeslot.Day === day && timeslot.Unit === `Unit${unit}`,
                      );
                      return (
                        <StyledOption
                          key={cls}
                          value={cls}
                        >
                          {ClassTimeslot.length !== 0 ? `${cls} 🗸` : cls}
                        </StyledOption>
                      );
                    })}
                  </StyledMobileSelect>
                ) : (
                  <StyledSelectContainer>
                    <StyledSelect
                      defaultValue="Select"
                      onChange={
                        (e) => {
                          setDay(day);
                          setUnit(unit);
                          setClass(e.target.value);
                          const ClassTimeslot = timeslots.filter(
                            (timeslot) => timeslot.ClassGroup === e.target.value
                            && timeslot.Day === day && timeslot.Unit === `Unit${unit}`,
                          );
                          setClassTimeslot(ClassTimeslot[0]);
                          setModalIsOpen(true);
                        }
                        }
                    >
                      <StyledOption
                        value="Select"
                        disabled
                        style={{ opacity: '50%' }}
                      >
                        Select

                      </StyledOption>
                      {classes.map((cls) => {
                        const ClassTimeslot = timeslots.filter(
                          (timeslot) => timeslot.ClassGroup === cls
                              && timeslot.Day === day && timeslot.Unit === `Unit${unit}`,
                        );

                        return (
                          <StyledOption
                            key={cls}
                            value={cls}
                          >
                            {ClassTimeslot.length !== 0 ? `${cls} 🗸` : cls}

                          </StyledOption>
                        );
                      })}
                    </StyledSelect>
                  </StyledSelectContainer>
                )}
              </div>
            )}

        </div>
      )))}
    </StyledTableContainer>
  );
};

export default Calendar;
