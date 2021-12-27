import React, { useState, useEffect } from 'react';
import { useFormik, FormikErrors } from 'formik';
import { Redirect, useHistory } from 'react-router-dom';
import StyledPage from '../../components/Layout/Page';
import {
  useAuthToken, useAuth, usePermissions, useTutorialDone,
} from '../../Utils/store';
import API from '../../Utils/API';
import Button from '../../components/Shared/Button';
import Eye from '../../components/Shared/Eye';
import EyeCrossed from '../../components/Shared/EyeCrossed';
import {
  StyledError, StyledFormContainer, StyledForm, StyledInput, PageTitle,
  StyledLabel, StyledPShowPassBtn, StyledPasswordLabel,
} from './SigninStyles';

interface FormValues{
  username: string;
  password: string;
}

const validate = (values:FormValues) => {
  const errors: FormikErrors<FormValues> = {};

  if (!values.username) {
    errors.username = 'Username is Required';
  }
  if (!values.password) {
    errors.password = 'Password is Required';
  }

  return errors;
};

const SignIn = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const setToken = useAuthToken((state) => state.setToken);
  const setAuthed = useAuth((state) => state.setAuthed);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const setIsAdmin = usePermissions((state) => state.setIsAdmin);
  const [pendingLogin, setPendingLogin] = useState<boolean>(false);
  const setTutorialDone = useTutorialDone((state) => state.setTutorialDone);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validate,

    onSubmit: async (values) => {
      try {
        setPendingLogin(true);
        const data = await API.LogInUser(values);
        const checkTutDone = await API.CheckTutorialDone(data.token);
        await setTutorialDone(checkTutDone);
        await setToken(data.token);
        await setIsAdmin(data.user.is_staff);
        await setPendingLogin(false);
        if (data.token) {
          await setAuthed(true);
        } else {
          setError('Server Error');
        }
      } catch (e) {
        setError('Username or Password Incorrect');
      }
    },

  });

  if (isAuthenticated) {
    return <Redirect to="/timetable" />;
  }
  return (
    <StyledPage>
      <StyledFormContainer>
        <PageTitle>Sign In</PageTitle>
        {error.length ? <StyledError>{error}</StyledError> : null}
        <StyledForm onSubmit={formik.handleSubmit}>
          <StyledLabel htmlFor="username">
            Username:

            <StyledInput
              id="username"
              name="username"
              type="username"
              onChange={formik.handleChange}
              value={formik.values.username}
            />

          </StyledLabel>
          {formik.errors.username ? <StyledError>{formik.errors.username}</StyledError> : null}
          <StyledPasswordLabel htmlFor="password">
            Password:
            <StyledInput
              id="password"
              name="password"
              type={passwordVisible ? 'text' : 'password'}
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <StyledPShowPassBtn
              type="button"
              onClick={() => setPasswordVisible((visible) => !visible)}
            >
              {passwordVisible ? <Eye /> : <EyeCrossed />}
            </StyledPShowPassBtn>

          </StyledPasswordLabel>
          {formik.errors.password ? <StyledError>{formik.errors.password}</StyledError> : null}
          <Button type="submit">Sign In</Button>
          { pendingLogin && <p>Logging in...</p>}
        </StyledForm>

      </StyledFormContainer>
    </StyledPage>
  );
};

export default SignIn;
