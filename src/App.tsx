import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HelmetProvider } from 'react-helmet-async';
import {
  Home, FourOFour, Timetable, Overview, SignIn, SignOut,
} from './views';
import NavBar from './components/Layout/NavBar';
import PrivateRoute from './Utils/PrivateRoute';
import GlobalStyle from './style';
import { DarkTheme, LightTheme } from './Themes';
import ThemeToggle from './components/Feature/ThemeToggle';
import Footer from './components/Layout/Footer';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const StyledApp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: ${(props) => props.theme.background};
  transform: all 500ms ease;
`;

function App() {
  const [theme, setTheme] = useState<string>('light');

  useEffect(() => {
    const body = document.querySelector('body');
    if (theme === 'dark') {
      body?.classList.add('dark');
    }
    // If the time is past 12:00 set to dark theme
    const currentTime = new Date();
    if (currentTime.getHours() >= 12) {
      setTheme('dark');
      body?.classList.add('dark');
    }
  }, []);
  return (
    <HelmetProvider>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <Router>
          <ThemeProvider theme={theme === 'dark' ? DarkTheme : LightTheme}>
            <ThemeToggle setTheme={setTheme} theme={theme} />
            <NavBar />
            <Switch>
              <Route path="/" exact component={Main} />
              <PrivateRoute path="/timetable" component={Timetable} />
              <PrivateRoute path="/overview" component={Overview} />
              <Route path="/signin" component={SignIn} />
              <Route path="/signout" component={SignOut} />
              {/* Other routes need to above the 404 */}
              <Route component={FourOFour} />
            </Switch>
            <Footer />
          </ThemeProvider>
        </Router>
      </QueryClientProvider>
    </HelmetProvider>

  );
}

export default App;

const Main = () => (
  <StyledApp>
    <Home />
  </StyledApp>
);
