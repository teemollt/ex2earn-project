import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled.div`
  text-align: center;
  padding: 40px 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: url('/background-image.jpg'); // 배경 이미지 추가 (public 폴더에 이미지를 넣어주세요)
  background-size: cover;
  background-position: center;
`;

const ContentWrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  padding: 30px;
  border-radius: 10px;
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #333;
  font-size: 2.5em;
  margin-bottom: 20px;
`;

const Description = styled.p`
  color: #666;
  margin-bottom: 30px;
  font-size: 1.2em;
  line-height: 1.5;
`;

const StartButton = styled(Link)`
  background-color: #4CAF50;
  color: white;
  padding: 15px 30px;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1.2em;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <ContentWrapper>
        <Title>Welcome to Squat Challenge</Title>
        <Description>
          Get fit and have fun with our AI-powered squat counter! Challenge yourself and track your progress with cutting-edge technology.
        </Description>
        <StartButton to="/squat-challenge">Start Challenge</StartButton>
      </ContentWrapper>
    </HomeContainer>
  );
};

export default Home;
