import React, { useEffect, useState } from 'react';

import { getCommentById } from '../../services/CommentService'
import { spreadDate } from '../../services/DateFormat';

const Comment = (props) => {
    const [comment, setComment] = useState({})

    useEffect(() => {
        getCommentById(props.idComment).then(res => setComment(res))
    }, [props.idComment])

    return (
        <div>
            <div>{props.assign}</div>
            <div>{spreadDate(comment.date)}</div>
            <div>{comment.content}</div>
        </div>
    )
}

export default Comment