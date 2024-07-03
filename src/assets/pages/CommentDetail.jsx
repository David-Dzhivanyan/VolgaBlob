import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentsApi from '../api/commentsApi';
import { useFetching } from '../hooks/useFetching';
import { Spinner } from 'react-bootstrap';
import Comment from '../components/Comment/Comment';

const CommentDetail = () => {
  const params = useParams();
  const [comment, setComment] = useState(null);
  const [fetchPostById, isLoading] = useFetching(async (id) => {
    const response = await CommentsApi.getById(id);
    setComment(response.data);
  });

  useEffect(() => {
    fetchPostById(params.id);
  }, []);

  return (
    <div>
      <h1>Комментарий детальная</h1>
      {isLoading ? (
        <div className={'text-center'}>
          <Spinner />
        </div>
      ) : (
        <Comment comment={comment} />
      )}
    </div>
  );
};

export default CommentDetail;
