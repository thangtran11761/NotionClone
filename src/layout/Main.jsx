import React, { memo } from 'react'
import { Col, Row, Layout, Space } from 'antd';

import ListOfTasks from '../components/Task/ListOfTasks'
import SideBar from '../components/SideBar';

import classes from './style.module.css'

const { Sider, Content } = Layout;

const Main = () => {
    return (
        <Layout className={classes.layout}>
            <Sider style={{ backgroundColor: '#fff' }}>
                <SideBar />
            </Sider>
            <Layout>
                <ListOfTasks />
            </Layout>
        </Layout>

    )
}

export default Main