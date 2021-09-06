interface stateTypes{
teachersDisabled:boolean;
  subjectDisabled:boolean;
  roomsDisabled:boolean;
  timeslotFormVisible:boolean;
}

interface actionTypes{
    type: string;
}

const actions = {
  TEACHERS: 'teacherForm',
  SUBJECT: 'subjectForm',
  ROOMS: 'roomsForm',
  TIMESLOT: 'timeslotForm',
};

export const defaultState: stateTypes = {
  teachersDisabled: true,
  subjectDisabled: false,
  roomsDisabled: true,
  timeslotFormVisible: false,
};

export const reducer = (state:stateTypes, action:actionTypes):stateTypes => {
  switch (action.type) {
    case actions.TEACHERS:
      return { ...state, teachersDisabled: !state.teachersDisabled };
    case actions.SUBJECT:
      return { ...state, subjectDisabled: !state.subjectDisabled };
    case actions.ROOMS:
      return { ...state, roomsDisabled: !state.roomsDisabled };
    case actions.TIMESLOT:
      return { ...state, timeslotFormVisible: !state.timeslotFormVisible };
    default:
      return state;
  }
};
