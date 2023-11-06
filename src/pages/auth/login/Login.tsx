import React from 'react';
import { loginApi } from '@/api/auth.api';
import { LoginProps } from '@/model/auth.model';
import { Button, Checkbox, Col, Form, Input, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { setLocalStorageId, setLocalStorageToken } from '@/utils/auth.util';
import { useAppDispatch } from '@/app/hook';
import { getCurrentUserByIdAsync } from '@/features/auth/authSlice';
import { isRejected } from '@reduxjs/toolkit';

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onFinish = async (values: LoginProps) => {
    await loginApi(values)
      .then((res) => {
        const data = res?.data;
        const token = data?.token;
        setLocalStorageToken(token);
        setLocalStorageId(data?.id);
        const currentUserRes = dispatch(getCurrentUserByIdAsync(data?.id));
        if (isRejected(currentUserRes)) {
          return;
        }
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <div className="h-full flex items-center justify-center min-h-screen">
        <div
          className="bg-white rounded shadow-lg sm:w-4/5 lg:w-3/5 md:w-2/3 xl:w-2/5 max-sm:w-4/5"
          style={{ maxWidth: '600px' }}
        >
          <div className="container">
            <div>
              <h1 className="text-2xl font-bold text-center my-3">Admin</h1>
              <h2 className="text-xl font-bold text-center mb-3">Sign In</h2>
              <h5 className="text-center mb-3 text-slate-500 font-semibold">Sign in to your account</h5>
            </div>

            {/* form */}
            <div className="p-3">
              <Form
                name="basic"
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 32 }}
                style={{ maxWidth: '100%' }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                colon={false}
                layout="vertical"
              >
                <Col span={32}>
                  <Form.Item<FieldType>
                    label="Email"
                    name="email"
                    rules={[
                      {
                        type: 'email',
                        message: 'The input is not valid Email!',
                      },
                      {
                        required: true,
                        message: 'Please input your Email!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={32}>
                  <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                  >
                    <Input.Password />
                  </Form.Item>
                </Col>

                {/* <Col span={32}>
                  <Form.Item<FieldType> name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                </Col> */}

                <Form.Item>
                  <Button className="w-full" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>

            {/* footer */}
            <div className="mb-3">
              {/* <div className="flex items-center justify-center">
                <h1>Not a member ?</h1>
                <Link to={'/sign-up'} className="text-sky-500 ml-1">
                  Sign up{' '}
                </Link>
              </div> */}
              <div className="text-center">
                <Link to={'/forgot-password'} className="text-sky-500">
                  Forgot password
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
