import React, { useState } from 'react'
import { Row, Col, InputGroup, Form, Button, Card } from 'react-bootstrap'
import Swal from 'sweetalert2';
import { login } from '../../api/AuthApi';

const LoginPage = () => {
    const [form, setform] = useState({
        username: '',
        password: ''
    })

    const { username, password } = form;

    const onChangeForm = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    const onClickLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await login({ username, password }); // 키 이름 주의!
            const data = res.data;

            if (data.result === 0) {
                Swal.fire({
                    icon: "error",
                    title: "아이디가 존재하지 않습니다.",
                });
            } else if (data.result === 1) {
                Swal.fire({
                    icon: "error",
                    title: "비밀번호가 일치하지 않습니다.",
                });
            } else if (data.result === 2) {
                Swal.fire({
                    icon: "success",
                    title: "로그인 성공",
                    showConfirmButton: false,
                    timer: 1500
                });

                const target = sessionStorage.getItem('target');
                window.location.href = target || `/main/${username}`;
            }

        } catch (err) {
            console.error('Login error:', err);
            Swal.fire({
                icon: "error",
                title: "서버 오류가 발생했습니다.",
            });
        }
    };

    return (
        <div className='d-flex justify-content-center'>
            <Card style={{ width: "50rem" }} className='text-center mt-5 o-hidden border-0 shadow-lg'>
                <Row className='mt-5'>
                    <div>
                        <img src='/images/seoportfolio_logo.png' alt="로그인 이미지" style={{ width: "15rem" }} />
                    </div>
                </Row>
                <Row className='justify-content-center mb-5' >
                    <Col className='d-flex justify-content-center align-items-center'>
                        <div className='loginbox px-0'>
                            <form onSubmit={onClickLogin}>
                                <InputGroup className='h-25'>
                                    <InputGroup.Text style={{ backgroundColor: "#002412", color: 'white' }} className=' justify-content-center w-25'><b>ID</b></InputGroup.Text>
                                    <Form.Control name="username" value={username} onChange={onChangeForm} />
                                </InputGroup >
                                <InputGroup>
                                    <InputGroup.Text style={{ backgroundColor: "#002412", color: 'white' }} className='justify-content-center w-25'><b>PW</b></InputGroup.Text>
                                    <Form.Control type="password" name="password" value={password} onChange={onChangeForm} />
                                </InputGroup>
                                <Button style={{ backgroundColor: "orange", borderColor: "orange", color: 'white' }} className='w-100 mt-2' type='submit' ><b>로그인</b></Button>
                                <div className='text-center mt-2'>
                                    <span>
                                        <a href='/auth/register'>회원가입</a>
                                    </span>
                                    <span className='mx-3'>
                                        <a href='/user/searchId'>아이디 찾기</a>
                                    </span>
                                    <span>
                                        <a href='/user/searchPass'>비밀번호 찾기</a>
                                    </span>
                                </div>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}
export default LoginPage