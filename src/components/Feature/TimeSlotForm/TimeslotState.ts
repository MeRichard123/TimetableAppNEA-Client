interface stateTypes{
teachersDisabled:boolean;
  subjectDisabled:boolean;
  roomsDisabled:boolean;
  timeslotFormVisible:boolean;
}

interface PayloadType{
  value: boolean;
}

interface actionTypes{
  type: string;
  payload?: PayloadType;
}

const actions = {
  TEACHERS: 'teacherForm',
  SUBJECT: 'subjectForm',
  ROOMS: 'roomsForm',
  TIMESLOT: 'timeslotForm',
};

export const defaultState: stateTypes = {
  teachersDisabled: true,
  subjectDisabled: true,
  roomsDisabled: true,
  timeslotFormVisible: false,
};

export const reducer = (state:stateTypes, action:actionTypes):stateTypes => {
  switch (action.type) {
    case actions.TEACHERS:
      return { ...state, teachersDisabled: false };
    case actions.SUBJECT:
      return { ...state, subjectDisabled: !state.subjectDisabled };
    case actions.ROOMS:
      return { ...state, roomsDisabled: false };
    case actions.TIMESLOT:
      if (action.payload) {
        return { ...state, timeslotFormVisible: action.payload.value };
      }
      return { ...state, timeslotFormVisible: !state.timeslotFormVisible };

    default:
      return state;
  }
};
