import styled from 'styled-components';

const SettingsBox = styled.div`
  border-radius: 16px;
  /* padding: 16px; */
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  padding-bottom: 8px;
  background-color: ${({ theme }) => theme.palette.grey[50]};
  border: 2px solid ${({ theme }) => theme.palette.grey[100]};
  max-width: 480px;
  margin: 0 auto;
  /* margin: 0 16px; */
  padding: 24px;
  box-shadow: 0 0 20px 0 ${({ theme }) => theme.palette.grey[50]};

  .box-header,
  .box-body {
    margin-bottom: 24px;
    .soon {
      display: flex;
      flex-direction: row;
      align-items: center;
      svg {
        fill: ${({ theme }) => theme.palette.warning.main};
        margin-inline-end: 8px;
        width: 20px;
      }
      p {
        color: ${({ theme }) => theme.palette.warning.main};
        font-weight: 700;
      }
    }
  }

  .box-header {
    /* position: relative;
    &:before {
      position: absolute;
      content: '';
      top: 2px;
      bottom: 0;
      left: -26px;
      height: 100%;
      width: 4px;
      background-color: ${({
      theme,
    }) =>
      theme.palette
        .grey[200]};
      border-radius: 16px;
      margin: auto 0;
    } */
    h6 {
      margin-bottom: 8px;
    }
    p {
      color: ${({ theme }) => theme.palette.text.secondary};
      max-width: 360px;
    }
  }

  .box-body {
    form {
      input {
        margin-bottom: 8px;
      }
    }
  }

  .box-footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .status {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      p {
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${({ theme }) => theme.palette.text.disabled};
      }
      svg {
        fill: ${({ theme }) => theme.palette.text.disabled};
        margin-inline-end: 4px;
        width: 20px;
      }
      .status-state {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-inline-start: 8px;

        .info-value {
          color: ${({ theme }) => theme.palette.text.disabled};
          font-weight: 700;
        }

        /* margin-inline-start: 8px; */

        &.--submitting {
          .info-value {
            color: orange;
          }
          svg {
            fill: orange;
          }
          .MuiCircularProgress-svg {
            fill: orange;
            color: orange;
          }
        }
        &.--on-change {
          .info-value {
            color: ${({ theme }) => theme.palette.warning.main};
          }
          svg {
            fill: ${({ theme }) => theme.palette.warning.main};
          }
          .MuiCircularProgress-svg {
            fill: ${({ theme }) => theme.palette.warning.main};
            color: ${({ theme }) => theme.palette.warning.main};
          }
        }
        &.--saved {
          .info-value {
            color: ${({ theme }) => theme.palette.success.main};
          }
          svg {
            fill: ${({ theme }) => theme.palette.success.main};
          }
          .MuiCircularProgress-svg {
            fill: ${({ theme }) => theme.palette.success.main};
            color: ${({ theme }) => theme.palette.success.main};
          }
        }
        &.--submitting {
          .info-value {
            color: ${({ theme }) => theme.palette.text.disabled};
          }
          svg {
            fill: ${({ theme }) => theme.palette.text.disabled};
          }
          .MuiCircularProgress-svg {
            fill: ${({ theme }) => theme.palette.text.disabled};
            color: ${({ theme }) => theme.palette.text.disabled};
          }
        }
      }
    }
    .actions {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export const Styled = {
  SettingsBox,
};
