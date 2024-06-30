import React from 'react';
import './commentList.scss';
import TableComments from '../TableComments/TableComments';
import JsonComments from '../JsonComments/JsonComments';

const CommentList = ({ comments, title = 'Список Комментариев', display }) => {
  return (
    <div>
      {comments.length ? <h1>{title}</h1> : <h1>Ничего не найдено</h1>}

      {display === 'table' ? (
        <TableComments comments={comments} />
      ) : (
        <JsonComments comments={comments} />
      )}
    </div>
  );
};

export default CommentList;
