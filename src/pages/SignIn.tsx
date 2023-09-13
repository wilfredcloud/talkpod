import { Button, Card, Form, Input } from 'antd'
import Title from 'antd/es/typography/Title'

const SignIn = () => {
  return (
    <div className=' w-full h-screen flex justify-center items-center'>
        <Card>
            <Form layout='vertical'>
                <Title>Sign in form</Title>
                <Form.Item label="Email">
                    <Input type='email'/>
                </Form.Item>
                <Form.Item label="Password">
                    <Input type='password'/>
                </Form.Item>
                <Button htmlType='submit' type='primary' size='large'>Sign in</Button>
            </Form>
        </Card>
    </div>
  )
}

export default SignIn
