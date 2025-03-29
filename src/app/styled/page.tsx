'use client';

import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #333;
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  margin-right: 0.5rem;

  background: ${(props) =>
    props.variant === 'primary' ? '#0070f3' : '#f5f5f5'};
  color: ${(props) => (props.variant === 'primary' ? 'white' : '#333')};

  &:hover {
    opacity: 0.9;
  }
`;

export default function StyledPage() {
  return (
    <Container>
      <Title>Styled Components 예제</Title>

      <Card>
        <h2>카드 제목</h2>
        <p>이것은 styled-components를 사용한 카드 컴포넌트입니다.</p>
        <Button variant="primary">확인</Button>
        <Button variant="secondary">취소</Button>
      </Card>

      <Card>
        <h2>또 다른 카드</h2>
        <p>스타일드 컴포넌트로 일관된 디자인을 쉽게 적용할 수 있습니다.</p>
        <Button variant="primary">자세히 보기</Button>
      </Card>
    </Container>
  );
}
