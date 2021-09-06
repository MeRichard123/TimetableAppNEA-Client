import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './store';

type PrivateTypes = {
  component: any;
  path: string;
};

const PrivateRoute = ({ component: Component, ...rest }: PrivateTypes) => {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  return (
    <Route
      {...rest}
      render={(routeProps) => (isAuthenticated ? (
        <Component {...routeProps} />
      ) : (
        <Redirect to="/signin" />
      ))}
    />
  );
};
export default PrivateRoute;
