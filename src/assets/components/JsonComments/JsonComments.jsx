import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const JsonComments = ({ comments }) => {
  const router = useNavigate();

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          {JSON.stringify(comment)}
          <Button onClick={() => router(`/comments/${comment.id}`)}>
            Открыть
          </Button>
        </div>
      ))}
    </div>
  );
};

export default JsonComments;
