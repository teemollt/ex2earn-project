import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #333;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: white;
  font-size: 1.5em;
  font-weight: bold;
  text-decoration: none;
`;

const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const NavItem = styled.li`
  margin: 0 10px;

  @media (max-width: 768px) {
    margin: 10px 0;
  }
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  color: white;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #555;
  }

  ${props => props.$isActive && `
    background-color: #4CAF50;
    &:hover {
      background-color: #45a049;
    }
  `}
`;

const Navigation: React.FC = () => {
    const location = useLocation();
  
    return (
      <Nav>
        <Logo to="/">Squat Challenge</Logo>
        <NavList>
          <NavItem><NavLink to="/" $isActive={location.pathname === "/"}>Home</NavLink></NavItem>
          <NavItem><NavLink to="/squat-challenge" $isActive={location.pathname === "/squat-challenge"}>Squat Challenge</NavLink></NavItem>
          <NavItem><NavLink to="/dashboard" $isActive={location.pathname === "/dashboard"}>Dashboard</NavLink></NavItem>
          <NavItem><NavLink to="/register" $isActive={location.pathname === "/register"}>Register</NavLink></NavItem>
        </NavList>
      </Nav>
    );
  };

export default Navigation;
