import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { getUserProfile } from '../services/apiService';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 20px;
  text-align: center;
`;

const ProfileInfo = styled.div`
  margin: 20px 0;
  padding: 15px;
  border-radius: 8px;
  background-color: ${props => props.theme.colors.background};
`;

const InfoItem = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid ${props => props.theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

const Label = styled.span`
  font-weight: bold;
  color: ${props => props.theme.colors.text};
`;

const Value = styled.span`
  color: ${props => props.theme.colors.primary};
`;

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { walletAddress } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfile(data);
        setError(null);
      } catch (err) {
        setError('프로필을 불러오는데 실패했습니다.');
        console.error('프로필 조회 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  return (
    <Container>
      <Title>내 프로필</Title>
      <ProfileInfo>
        <InfoItem>
          <Label>지갑 주소</Label>
          <Value>{walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'N/A'}</Value>
        </InfoItem>
        <InfoItem>
          <Label>총 스쿼트 횟수</Label>
          <Value>{profile?.totalSquats || 0} 회</Value>
        </InfoItem>
        <InfoItem>
          <Label>레벨</Label>
          <Value>{profile?.level || 1}</Value>
        </InfoItem>
        <InfoItem>
          <Label>보상</Label>
          <Value>{profile?.rewards || 0} SOL</Value>
        </InfoItem>
      </ProfileInfo>
    </Container>
  );
};

export default Profile; 