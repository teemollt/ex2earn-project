import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  
  @media (min-width: 600px) {
    flex-direction: row;
    padding: 2rem;
  }
`;

const Content = styled.div`
  min-width: 100px;
  max-width: 500px;
  width: 80%;
  margin: 0 auto;
`;

const Typography = styled.p`
  font-size: calc(12px + 1vw);
  line-height: 1.5;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  max-width: 300px;
`;

const ResponsiveComponent = () => {
  return (
    <Container>
      <Content>
        <Typography>This is a responsive component</Typography>
        <Image src="example.jpg" alt="Responsive image" />
      </Content>
    </Container>
  );
};

export default ResponsiveComponent;
