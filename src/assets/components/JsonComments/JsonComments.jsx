import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import cls from './json-comments.module.scss';

const JsonComments = ({ comments }) => {
  const router = useNavigate();

  return (
    <div className={cls.root}>
      {comments.map((comment) => (
        <div className={cls.comment} key={'json' + comment.id}>
          <div className={cls.json}>{JSON.stringify(comment)}</div>
          <Button onClick={() => router(`/comments/${comment.id}`)}>
            Открыть
          </Button>
        </div>
      ))}
    </div>
  );
};

export default JsonComments;
