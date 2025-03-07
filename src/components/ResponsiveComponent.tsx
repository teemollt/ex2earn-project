import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Box = styled.div`
  width: 200px;
  height: 100px;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin: 10px;
`;

const ResponsiveComponent: React.FC = () => {
  return (
    <Container>
      <Box>📱 모바일</Box>
      <Box>💻 데스크톱</Box>
    </Container>
  );
};

export default ResponsiveComponent;
