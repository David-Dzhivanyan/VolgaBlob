import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const TableComments = ({ comments }) => {
  const router = useNavigate();

  return (
    <TransitionGroup>
      {comments.map((comment) => (
        <CSSTransition
          key={comment.id}
          nodeRef={comment.nodeRef}
          timeout={300}
          classNames="comment"
        >
          <Card key={comment.id} ref={comment.nodeRef}>
            <div>id: {comment.id}</div>
            <div>postId: {comment.postId}</div>
            <div>email: {comment.email}</div>
            <Card.Title>{comment.name}</Card.Title>
            <Card.Text>{comment.body}</Card.Text>
            <Button onClick={() => router(`/comments/${comment.id}`)}>
              Открыть
            </Button>
          </Card>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default TableComments;
