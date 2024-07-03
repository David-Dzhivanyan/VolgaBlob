import React from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import cls from './table-comments.module.scss';

const TableComments = ({ comments }) => {
  const router = useNavigate();

  if (!comments.length) return;

  return (
    <Table striped bordered hover className={cls.root}>
      <thead>
        <tr>
          {Object.keys(comments[0]).map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {comments.map((comment) => (
          <tr
            key={'comment' + comment.id}
            onClick={() => router(`/comments/${comment.id}`)}
            className={cls.tr}
          >
            {Object.keys(comment).map((key) => (
              <td key={key + comment.id}>{comment[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableComments;
