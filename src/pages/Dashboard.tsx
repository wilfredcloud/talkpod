import { Menu } from "antd"
import Sider from "antd/es/layout/Sider"
import Layout, { Content, Header } from "antd/es/layout/layout"

const Dashboard = () => {
  return (
   <Layout>
    <Header>
        <Menu theme="dark" mode="horizontal" defaultOpenKeys={["home"]} 
        items={[
            {
                label: "Home",
                key: "home"
            },
            {
                label: "Profile",
                key: "Profile"
            }
        ]}>

        </Menu>
    </Header>
    <Layout className="h-[95vh]">
        <Sider className="w-96" theme="light">This is the sider ara</Sider>
        <Content>Contnet area</Content>
    </Layout>
   </Layout>
  )
}

export default Dashboard
