import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { deleteRef } from '../../utils/delete';

const JsonComments = ({ comments }) => {
  const router = useNavigate();
  const newComments = deleteRef(comments);

  return (
    <TransitionGroup>
      {comments.map((comment, index) => (
        <CSSTransition
          key={comment.id}
          nodeRef={comment.nodeRef}
          timeout={300}
          classNames="comment"
        >
          <div ref={comment.nodeRef}>
            {JSON.stringify(newComments[index])}
            <Button onClick={() => router(`/comments/${comment.id}`)}>
              Открыть
            </Button>
          </div>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default JsonComments;
