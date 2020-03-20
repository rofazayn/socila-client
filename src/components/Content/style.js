import styled from 'styled-components';

const Content = styled.div`
  position: relative;
  width: 100%;
  /* background: pink; */
  /* height: 2000px; */
  /* overflow: hidden; */
  max-width: 700px;
  min-width: 720px;
  border-inline-start: 1px solid ${({ theme }) => theme.palette.grey[200]};
  border-inline-end: 1px solid ${({ theme }) => theme.palette.grey[200]};
`;

export const Styled = {
  Content
};
