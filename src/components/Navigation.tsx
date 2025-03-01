import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import WalletConnection from './WalletConnection';

const Nav = styled.nav`
  background-color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.medium};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${props => props.theme.boxShadow};
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
  margin: 0 ${theme.spacing.medium};

  @media (max-width: 768px) {
    margin: ${theme.spacing.large} 0;
  }
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  color: white;
  text-decoration: none;
  padding: ${props => props.theme.spacing.small} ${props => props.theme.spacing.medium};
  border-radius: ${props => props.theme.borderRadius};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.theme.colors.primaryHover};
  }

  ${props => props.$isActive && `
    background-color: ${props.theme.colors.primaryHover};
  `}
`;

const WalletButton = styled.div`
  display: flex;
  align-items: center;
  color: white;
  padding: ${props => props.theme.spacing.small} ${props => props.theme.spacing.medium};
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.colors.secondary};
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.colors.secondaryHover};
  }
`;
const Navigation: React.FC = () => {
  const { isConnected, walletAddress } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  return (
    <Nav>
      <Logo to="/">Squat Challenge</Logo>
      <NavList>
        <NavItem><NavLink to="/" $isActive={location.pathname === "/"}>Home</NavLink></NavItem>
        {isConnected && (
          <>
            <NavItem><NavLink to="/squat-challenge" $isActive={location.pathname === "/squat-challenge"}>Squat Challenge</NavLink></NavItem>
            <NavItem><NavLink to="/dashboard" $isActive={location.pathname === "/dashboard"}>Dashboard</NavLink></NavItem>
            <NavItem>
              <span style={{ color: 'white', marginRight: '10px' }}>
                {walletAddress?.slice(0, 4)}...{walletAddress?.slice(-4)}
              </span>
            </NavItem>
          </>
        )}
        <NavItem><WalletConnection /></NavItem>
      </NavList>
    </Nav>
  );
};

export default Navigation;