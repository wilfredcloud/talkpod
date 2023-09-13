import { Card, Form, Input } from 'antd'

const SignUp = () => {
  return (
    <div className=' w-full h-screen flex justify-center items-center'>
        <Card>
            <Form >
                <Form.Item label="Name">
                    <Input/>
                </Form.Item>
            </Form>
        </Card>
    </div>
  )
}

export default SignUp
