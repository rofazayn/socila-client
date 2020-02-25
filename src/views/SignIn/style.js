import styled from 'styled-components';

const SignInView = styled.main`
  min-height: 80vh;
  max-width: 400px;
  margin: 0 auto;
  padding-top: 5vh;
  .header-section {
    .header-text {
      margin-bottom: ${({ theme }) => `${theme.spacing(3)}px`};
      text-align: center;
    }
  }
  .helper-section {
    margin: ${({ theme }) => `${theme.spacing(4)}px`} 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    .helper-text {
      color: ${({ theme }) => theme.palette.grey[500]};
      text-align: center;
    }
  }
  .illustration-section {
    text-align: center;
    width: 100%;
    margin-bottom: 5rem;
    svg {
      margin-top: ${({ theme }) => `${theme.spacing(2)}px`};
      width: 100%;
      /* background: ${({ theme }) => theme.palette.primary.main}; */
    }
  }
`;

export const Styled = {
  SignInView
};
