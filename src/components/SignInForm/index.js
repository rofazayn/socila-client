import React from 'react';
import { Styled } from './style';
import { Formik, ErrorMessage } from 'formik';
import fb from '../../firebase';

import {
  Button,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Typography,
} from '@material-ui/core';
import TextField from '../layout/TextField';
import vSchema from './validation';
import { motion, AnimatePresence } from 'framer-motion';

const SignInForm = () => {
  return (
    <Styled.SignInForm>
      <Formik
        validationSchema={vSchema}
        validateOnMount
        initialValues={{
          email: '',
          password: '',
          remember: false,
        }}
        onSubmit={(values, { setSubmitting, setFieldError }) => {
          setSubmitting(true);

          fb.auth()
            .signInWithEmailAndPassword(values.email, values.password)
            .catch((err) => {
              setSubmitting(false);
              console.error(err);
              setFieldError('general', err.message);
            });
        }}
      >
        {({
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          isValid,
        }) => (
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              type='email'
              name='email'
              value={values.email}
              placeholder='Email'
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete='email'
              label='Email'
              error={touched.email && errors.email ? true : false}
            >
              {touched.email && errors.email ? (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, y: -20, height: 0 }}
                    exit={{ opacity: 0, y: 20, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: '100%' }}
                    className='error-text'
                  >
                    <ErrorMessage name='email' />
                  </motion.div>
                </AnimatePresence>
              ) : null}
            </TextField>

            <TextField
              type='password'
              name='password'
              value={values.password}
              placeholder='Password'
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete='password'
              label='Password'
              error={touched.password && errors.password ? true : false}
            >
              {touched.password && errors.password ? (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, y: -20, height: 0 }}
                    exit={{ opacity: 0, y: 20, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: '100%' }}
                    className='error-text'
                  >
                    <ErrorMessage name='password' />
                  </motion.div>
                </AnimatePresence>
              ) : null}
            </TextField>

            {errors.general ? (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: -20, height: 0 }}
                  exit={{ opacity: 0, y: 20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: '100%' }}
                  className='--error --center-text'
                >
                  {errors.general}
                </motion.div>
              </AnimatePresence>
            ) : null}

            <Typography variant='body2' className='hint'>
              Pssttt! use this: matt@example.com | secret123
            </Typography>

            <div className='form-controlers'>
              <FormControlLabel
                className='remember-checkbox'
                control={
                  <Checkbox
                    checked={values.remember}
                    onChange={handleChange}
                    name='remember'
                    value='remember'
                    color='primary'
                  />
                }
                label='Remember me'
              />
              <Button
                type='submit'
                variant='contained'
                color='primary'
                disabled={isSubmitting || !isValid}
              >
                Login
                {isSubmitting && (
                  <CircularProgress
                    style={{ marginInlineStart: '16px' }}
                    size={20}
                  />
                )}
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </Styled.SignInForm>
  );
};

export default SignInForm;
