import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const TableComments = ({ comments }) => {
  const router = useNavigate();

  return (
    <div>
      {comments.map((comment) => (
        <Card key={comment.id}>
          <div>id: {comment.id}</div>
          <div>postId: {comment.postId}</div>
          <div>email: {comment.email}</div>
          <Card.Title>{comment.name}</Card.Title>
          <Card.Text>{comment.body}</Card.Text>
          <Button onClick={() => router(`/comments/${comment.id}`)}>
            Открыть
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default TableComments;
