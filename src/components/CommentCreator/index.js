import React, { useContext } from 'react';
import { Styled } from './style';
import {
  Dialog,
  DialogTitle,
  CircularProgress,
  IconButton,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core';
import { Typography, Link } from '@material-ui/core';
import Avatar from '../Avatar';
import dayjs from '../../helpers/dayjs';
import { ReactComponent as PenIconSvg } from '../../assets/icons/bx-pen.svg';
import { ReactComponent as CloseIconSvg } from '../../assets/icons/bx-x.svg';
import { ReactComponent as SendIconSvg } from '../../assets/icons/bx-send.svg';

import { AuthContext } from '../../context/auth-context';
import { AnimatePresence, motion } from 'framer-motion';
import { ErrorMessage, Formik } from 'formik';
import usePosts from '../../hooks/usePosts';
const CommentCreator = (props) => {
  const {
    postId,
    authorId,
    authorImage,
    authorFullName,
    authorUsername,
    createdAt,
    body,
    openCommentDialog,
    setOpenCommentDialog,
  } = props;

  function handleCommentClose() {
    setOpenCommentDialog(false);
  }

  const { userDetails } = useContext(AuthContext);
  const { postsActions } = usePosts();

  return (
    <Styled.CommentCreator>
      <Dialog
        open={openCommentDialog}
        onClose={handleCommentClose}
        disableScrollLock={true}
        className='comment-creator'
        disablePortal
        fullWidth
        maxWidth='sm'
      >
        <Formik
          validateOnMount={true}
          initialValues={{ body: '' }}
          onSubmit={postsActions.createPost}
          // validationSchema={vSchema}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            isValid,
            touched,
            errors,
          }) => (
            <>
              <DialogTitle className='title' disableTypography>
                <div className='text'>
                  <PenIconSvg />
                  <Typography variant='body2'>
                    Commenting on {authorFullName}'s post
                  </Typography>
                </div>
                <IconButton size='medium' onClick={handleCommentClose}>
                  <CloseIconSvg className='create-post-icon' />
                </IconButton>
              </DialogTitle>
              <DialogContent dividers>
                <div className='inner'>
                  <div className='post-section post'>
                    <div className='post-header'>
                      <div className='header-section'>
                        <div className='avatar'>
                          <Avatar imgUrl={authorImage} alt={authorFullName} />
                        </div>

                        <div className='author-name spaced'>
                          <Typography variant='body2'>
                            {authorFullName}
                          </Typography>
                        </div>

                        <div className='header-section'>
                          <div className='author-username spaced'>
                            <Typography variant='body2'>
                              @{authorUsername}
                            </Typography>
                          </div>
                        </div>
                      </div>

                      <div className='time-posted spaced'>
                        <Typography variant='body2'>
                          {dayjs(createdAt).fromNow()}
                        </Typography>
                      </div>
                    </div>

                    <div className='post-main'>
                      <div className='post-body'>
                        <Typography variant='body1'>{body}</Typography>
                      </div>
                    </div>
                  </div>
                  <div className='post-section reply'>
                    <div className='section avatar'>
                      <Avatar
                        imgUrl={userDetails.profileImage}
                        alt={userDetails.profileImage}
                        size='48px'
                      />
                    </div>
                    <div className='section reply-form'>
                      <div className='form-wrapper'>
                        <>
                          <form noValidate onSubmit={handleSubmit}>
                            <textarea
                              type='text'
                              name='body'
                              value={values.body}
                              autoComplete='false'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder={`Write your comment here`}
                            />
                            <div className='submit-button'>
                              <IconButton
                                type='submit'
                                size='medium'
                                disabled={isSubmitting || !isValid}
                              >
                                {isSubmitting ? (
                                  <CircularProgress size={32} />
                                ) : (
                                  <SendIconSvg className='create-post-icon' />
                                )}
                              </IconButton>
                            </div>
                          </form>
                          <div className='error-area'>
                            {errors.body && false ? (
                              <AnimatePresence>
                                <motion.div
                                  initial={{ opacity: 0, y: -20, height: 0 }}
                                  exit={{ opacity: 0, y: 20, height: 0 }}
                                  animate={{ opacity: 1, y: 0, height: '100%' }}
                                  className='--error --center-text'
                                >
                                  <ErrorMessage name='body' />
                                </motion.div>
                              </AnimatePresence>
                            ) : null}
                          </div>
                        </>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </>
          )}
        </Formik>
      </Dialog>
    </Styled.CommentCreator>
  );
};

export default CommentCreator;
