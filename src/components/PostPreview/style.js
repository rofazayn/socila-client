import styled from 'styled-components';

const PostPreview = styled.div`
  display: flex;
  padding: 24px 16px 16px 16px;
  margin-bottom: 8px;
  transition: all 250ms ease-in-out;
  /* cursor: pointer; */
  /* border-inline-start: 2px solid transparent; */
  /* cursor: pointer; */
  position: relative;
  &:hover {
    /* cursor: pointer; */
    background: ${({ theme }) => theme.palette.grey[50]};
    /* border-inline-start: 2px solid ${({ theme }) =>
      theme.palette.primary.light}; */
  }
  .post-link {
    &::after {
      position: absolute;
      content: '';
      top: 0;
      left: 0;
      right: 0%;
      bottom: 0;    
      width: 100%;
      height: 100%;
      /* background-color: red; */
      /* z-index: -1; */
    }
  }
  .post-section {
    display: flex;
    flex-direction: column;
    &.details {
      width: 100%;
    }

    .post-header {
      display: flex;
      flex-direction: row;
      /* align-items: center; */
      justify-content: space-between;
      margin-bottom: 8px;
      .header-section {
        display: flex;
        align-items: flex-start;
      }
      .spaced {
        padding-inline-end: 8px;
      }
      .author-name {
        position: relative;
        p {
          font-weight: bold;
        }
      }
      .author-username {
        position: relative;
        p {
          color: ${({ theme }) => theme.palette.text.disabled};
          text-decoration: underline;
        }
      }
      .time-posted {
        p {
          color: ${({ theme }) => theme.palette.text.disabled};
          /* text-decoration: underline; */
        }
      }
    }
    .post-body {
      padding-inline-start: 80px;
      margin-top: -48px;
      p {
        color: ${({ theme }) => theme.palette.text.primary};
        line-height: 1.8;
      }
    }
    .post-footer {
      margin-top: 16px;
      transform: translateX(-8px);
      margin-inline-start: 80px;
      
      .reactions {
        display: flex;
       
        .reaction {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          
          .count {
            margin-inline-start: 8px;
            font-weight: bold;
            color: ${({ theme }) => theme.palette.text.secondary};
          }
          &.filler {
            display: flex;
            flex-grow: 1;
            position: relative;
            .footer-post-link {
              &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0%;
                bottom: 0;    
                width: 100%;
                height: 100%;
              }
            }
          }
          &.love {
            &.--liked {
              button {
                color: ${({ theme }) => theme.palette.primary.main};
                svg {
                  fill: ${({ theme }) => theme.palette.primary.main};
                }
              }
              .count {
                color: ${({ theme }) => theme.palette.primary.main};
                font-weight: bold;
              }
            }
            button:hover {
              svg {
                /* fill: red; */
              }
            }
          }
          &.comment {
            margin-inline-start: 16px;

            button:hover {
              svg {
                /* fill: blue; */
              }
            }
          }
          &.share {
            /* padding-inline-end: 16px; */
            .count {
              margin-inline-end: 8px;
            }
            button:hover {
              svg {
                /* fill: green; */
              }
            }
          }
          
        }
        .reactions-group {
          display: flex;
        }
      }
    }
  }

  .dialog-content {
    .shareable-link {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .link-placeholder {
        display: flex;
        /* justify-content: space-between; */
        align-items: center;
          flex-grow: 1;
          width: 100%;
          margin-inline-end: 8px;
        input {
          max-width: auto;
          width: 100%;
          color: ${({ theme }) => theme.palette.grey[700]};
          /* display: flex; */
          padding: 8px 8px;
          background-color: ${({ theme }) => theme.palette.grey[200]};
          border-radius: 8px;
          border: none;
        }
      }
    }
  }

  
`;

export const Styled = {
  PostPreview,
};
