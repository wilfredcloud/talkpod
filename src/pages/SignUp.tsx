import { Button, Card, Form, Input, notification } from 'antd'
import Title from 'antd/es/typography/Title'
import Axios from '../utils/Axios';
import { UserType } from '../utils/types';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { getUserHomeRoom } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';

interface signUpData {
    name: string;
    email: string;
    password: string
}

const SignUp = () => {
    const {setUser} = useContext(UserContext);
    const navigate = useNavigate()

 const handleSignUp = async (values: signUpData) => {
   try {
        const response = await Axios.post('/auth/signup', values);
        const user: UserType | null = response.data;

        if (user && user.token) {
            setUser(user);
            notification.success({
                message: "Account created successfully"
            })
            const room = await getUserHomeRoom(user.data.id)
            navigate(`/${room.id}`);
        }else {
            notification.error({
                message: "Account already exist"
            })
        }
   } catch (error) {
        console.log(error)
        notification.error({
            message: "Ooops! something went wrong"
        })
   }
 }

  return (
    <div className=' w-full h-screen flex justify-center items-center'>
        <Card>
            <Form layout='vertical' onFinish={handleSignUp}>
                <Title>Sign up form</Title>
                <Form.Item name="name" label="Name"
                rules={[{
                    required:true,
                    message: "Please enter you name"
                }, {
                    max: 100,
                    min: 2,
                    message: "Name lenght must be with 2 to 100"
                }]}>
                    <Input/>
                </Form.Item>
                <Form.Item name="email" label="Email"
                rules={[
                    {
                        required: true,
                        message: "Enter your email"
                    },
                    {
                        pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                        message: "Enter valid email"
                    }
                ]}>
                    <Input type='email'/>
                </Form.Item>
                <Form.Item name="password" label="Password"
                rules={[
                    {
                        required: true,
                        message: "Enter your password"
                    },
                    {
                        max: 16,
                        min: 4,
                        message: "Password lenght should be within 4 to 16 characters"
                    }
                ]}>
                    <Input type='password'/>
                </Form.Item>
                <div className='flex justify-end'>
                <Button htmlType='submit' type='primary' size='large'>Create Account</Button>

                </div>
            </Form>
        </Card>
    </div>
  )
}

export default SignUp
