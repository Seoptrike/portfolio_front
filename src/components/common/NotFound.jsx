import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

const NotFoundPage = () => {
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8f9fa',
            textAlign: 'center'
        }}>
            <Container>
                <h1 style={{ fontSize: '5rem', fontWeight: 'bold', color: '#343a40' }}>404</h1>
                <p style={{ fontSize: '1.5rem', color: '#6c757d' }}>
                    찾을 수 없는 페이지입니다.<br />
                    존재하지 않는 사용자거나 잘못된 경로입니다.
                </p>
                <Link to="/">
                    <Button variant="dark" size="lg" className="mt-3">
                        홈으로 돌아가기
                    </Button>
                </Link>
            </Container>
        </div>
    );
};

export default NotFoundPage;
