import React from 'react';
import { useQuery } from 'react-query';
import shallow from 'zustand/shallow';
import { Helmet } from 'react-helmet-async';
import API from '../../Utils/API';
import StyledPage from '../../components/Layout/Page';
import Tab from '../../components/Shared/Tab';
import { StyledTabGroup, StyledTabContainer, StyledErrorContainer } from './TimeTableStyles';
import { Calendar } from '../../components/Feature';
import { useStore, useAuthToken } from '../../Utils/store';

type YearGroupType = string;

const Timetable = () => {
  const token = useAuthToken((state) => state.token);
  const {
    data, isLoading, isSuccess, isError,
  } = useQuery<YearGroupType[]>(['getYearGroupData', token], () => API.GetYearGroups(token), {
    staleTime: 8000,
  });

  const { yearGroup, setYear } = useStore((state) => (
    { yearGroup: state.yearGroup, setYear: state.setYear }
  ), shallow);

  return (
    <StyledPage>
      <Helmet>
        <title>KSTabler | Timetable</title>
      </Helmet>
      {isLoading && 'Loading'}
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
