import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { Link } from 'react-router-dom';

const HomeContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.large};
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5em;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.medium};
`;

const Description = styled.p`
  font-size: 1.2em;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.large};
`;

const StartButton = styled(Link)`
  background-color: ${props => props.theme.colors.accent};
  color: white;
  padding: ${props => props.theme.spacing.medium} ${props => props.theme.spacing.large};
  border-radius: ${props => props.theme.borderRadius};
  text-decoration: none;
  transition: background-color 0.3s;
  font-weight: bold;

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`;


const Home: React.FC = () => {
  return (
    <HomeContainer>
      <Title>Welcome to Squat Challenge</Title>
      <Description>Start your fitness journey with our squat challenge!</Description>
      <StartButton to="/squat-challenge">Start Challenge</StartButton>
    </HomeContainer>
  );
};

export default Home;
