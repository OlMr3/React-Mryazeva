import styled from 'styled-components';

export const ProfileContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  margin: 0 auto 1.5rem;
`;

export const UserInfo = styled.div`
  margin-top: 1.5rem;
`;

export const Field = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #ddd;

  label {
    font-weight: bold;
    margin-right: 1rem;
  }

  span {
    color: #555;
  }
`;
