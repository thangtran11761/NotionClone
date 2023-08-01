import React, { memo } from 'react'
import ListOfTasks from '../components/ListOfTasks'

const Main = () => {
    console.log('main');
    return (
        <div>
            Notion clone
            <ListOfTasks />
        </div>
    )
}

export default Main