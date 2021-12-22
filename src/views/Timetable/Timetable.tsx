import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import shallow from 'zustand/shallow';
import { Helmet } from 'react-helmet-async';
import { Steps } from 'intro.js-react';
import API from '../../Utils/API';
import StyledPage from '../../components/Layout/Page';
import Tab from '../../components/Shared/Tab';
import { StyledTabGroup, StyledTabContainer, StyledErrorContainer } from './TimeTableStyles';
import { Calendar } from '../../components/Feature';
import { useStore, useAuthToken, useTutorialDone } from '../../Utils/store';

type YearGroupType = string;

const steps = [
  {
    element: '.sc-egiSv',
    intro: 'Start By Selecting a Yeargroup',
  },
  {
    element: '.sc-iwjezw',
    intro: 'Then Select a Class from the dropdown',
  },
];

const Timetable = () => {
  const token = useAuthToken((state) => state.token);
  const tutorialDone = useTutorialDone((state) => state.tutorialDone);
  const [stepsEnabled, setStepsEnabled] = useState(false);
  const {
    data, isLoading, isSuccess, isError,
  } = useQuery<YearGroupType[]>(['getYearGroupData', token], () => API.GetYearGroups(token), {
    staleTime: 8000,
  });

  const { yearGroup, setYear } = useStore((state) => (
    { yearGroup: state.yearGroup, setYear: state.setYear }
  ), shallow);

  useEffect(() => {
    if (isSuccess && !tutorialDone) {
      setStepsEnabled(true);
    }
  }, [isSuccess]);
  return (
    <StyledPage>
      <Helmet>
        <title>KSTabler | Timetable</title>
      </Helmet>
      {isLoading && 'Loading'}
      <Steps
        enabled={stepsEnabled}
        steps={steps}
        initialStep={0}
        onExit={() => { setStepsEnabled(false); }}
      />

      <StyledTabContainer className="tabs">
        {isError && <StyledErrorContainer>Failed to Fetch Data</StyledErrorContainer>}
        {isSuccess
          && (
          <StyledTabGroup>
            {// Slice will make a shallow copy here so I can map in order
              data?.slice(0).reverse()?.map((year: string) => (
                <Tab
                  active={yearGroup === year}
                  onClick={
                  () => setYear(year)
}
                  key={year}
                >
                  {year}
                </Tab>
              ))
            }

          </StyledTabGroup>
          )}

      </StyledTabContainer>
      <Calendar yearGroup={yearGroup} />
    </StyledPage>
  );
};

export default Timetable;
