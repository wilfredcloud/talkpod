import { Button, Card, Form, Input, notification } from 'antd'
import Title from 'antd/es/typography/Title'
import Axios from '../utils/Axios';
// import useAuth from '../hooks/useAuth';

interface SignInData {
    email: string;
    password: string
}

interface AuthResult {
    result: boolean,
    token: string | null
}

const SignIn = () => {
// useAuth()
 const handleSignin = async (values: SignInData) => {
   try {
        const response = await Axios.post('/auth/signin', values);
        const data: AuthResult = response.data;

        if (data.result && data.token) {
            localStorage.setItem("token", data.token);
            notification.success({
                message: "Succesfully logged in"
            })
            window.location.reload();
        }else {
            notification.error({
                message: "Wrong username or password"
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
            <Form layout='vertical' onFinish={handleSignin}>
                <Title>Sign in form</Title>
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
                <Button htmlType='submit' type='primary' size='large'>Sign in</Button>

                </div>
            </Form>
        </Card>
    </div>
  )
}

export default SignIn
