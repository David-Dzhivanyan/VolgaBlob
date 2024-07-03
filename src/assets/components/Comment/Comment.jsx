import React from 'react';
import cls from './comment.module.scss';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Comment = ({ comment }) => {
  const router = useNavigate();
  if (!comment) return;

  return (
    <div className={cls.root}>
      <Table>
        <tbody>
          {Object.keys(comment).map((key) => (
            <tr key={key}>
              <td className={cls.key}>{key}</td>
              <td
                className={cls.link}
                onClick={() => router(`/comments?${key}=${comment[key]}`)}
              >
                {comment[key]}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Comment;
