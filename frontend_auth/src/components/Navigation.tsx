import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import WalletConnection from './WalletConnection';

const Nav = styled.nav`
  background-color: ${props => props.theme.colors.primary};
  padding: 0 ${props => props.theme.spacing.medium};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${props => props.theme.boxShadow};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  height: 64px;
`;

const NavSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    gap: 4px;
  }
`;

const Logo = styled(Link)`
  color: white;
  font-size: 1.2em;
  font-weight: bold;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: ${props => props.theme.borderRadius};
  transition: background-color 0.3s;
  white-space: nowrap;

  &:hover {
    background-color: ${props => props.theme.colors.primaryHover};
  }

  @media (max-width: 768px) {
    font-size: 1em;
    padding: 6px 10px;
  }
`;

const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    gap: 4px;
  }
`;

const NavItem = styled.li`
  margin: 0;
  height: 40px;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    height: 36px;
  }
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  color: white;
  text-decoration: none;
  padding: 6px 12px;
  border-radius: ${props => props.theme.borderRadius};
  transition: background-color 0.3s;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 14px;
  white-space: nowrap;

  &:hover {
    background-color: ${props => props.theme.colors.primaryHover};
  }

  ${props => props.$isActive && `
    background-color: ${props.theme.colors.primaryHover};
  `}

  @media (max-width: 768px) {
    padding: 4px 8px;
    font-size: 12px;
  }
`;

const WalletInfo = styled.div`
  display: flex;
  align-items: center;
  color: white;
  padding: 6px 12px;
  background-color: ${props => props.theme.colors.primaryHover};
  border-radius: ${props => props.theme.borderRadius};
  font-size: 14px;
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: 4px 8px;
    font-size: 12px;
  }
`;

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, walletAddress } = useSelector((state: RootState) => state.auth);

  return (
    <Nav>
      <NavSection>
        <Logo to="/">Ex2Earn</Logo>
        {isAuthenticated && (
          <NavList>
            <NavItem>
              <NavLink to="/profile" $isActive={location.pathname === "/profile"}>
                프로필
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/squat-challenge" $isActive={location.pathname === "/squat-challenge"}>
                운동 시작
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/dashboard" $isActive={location.pathname === "/dashboard"}>
                대시보드
              </NavLink>
            </NavItem>
          </NavList>
        )}
      </NavSection>
      <NavSection>
        {isAuthenticated && (
          <WalletInfo>
            {walletAddress && `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`}
          </WalletInfo>
        )}
        <NavItem>
          <WalletConnection />
        </NavItem>
      </NavSection>
    </Nav>
  );
};

export default Navigation;
