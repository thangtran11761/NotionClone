import React, { memo, useContext } from 'react'
import { Col, Row, Layout, Space } from 'antd';

import Task from '../pages/Task'
import Text from '../pages/Text';
import Schedule from '../pages/Schedule';
import Project from '../pages/Project';
import SideBar from '../components/SideBar/SideBar';

import classes from './style.module.css'
import { PageContext } from '../context/Page.context';

const { Sider, Content } = Layout;

const Main = () => {
    const pageCtx = useContext(PageContext)

    return (
        <Layout className={classes.layout}>
            <Sider width={240}>
                <SideBar />
            </Sider>
            <Layout className={classes.content}>
                {pageCtx.page?.type === 'task' && (< Task page={pageCtx.page} />)}
                {pageCtx.page?.type === 'schedule' && (< Schedule page={pageCtx.page} />)}
                {pageCtx.page?.type === 'project' && (< Project page={pageCtx.page} />)}
                {pageCtx.page?.type === 'text' && (< Text page={pageCtx.page} />)}
            </Layout>
        </Layout>
    )
}

export default Main