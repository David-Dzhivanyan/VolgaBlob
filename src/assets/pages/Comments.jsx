import React, { createRef, useEffect, useState } from 'react';
import { Button, Pagination, Spinner } from 'react-bootstrap';
import { useFetching } from '../hooks/useFetching';
import CommentsApi from '../api/commentsApi';
import CommentList from '../components/CommentsList/CommentList';
import CommentFilter from '../components/CommentFilter/CommentFilter';
import { useComments, usePagination } from '../hooks/useComments';
import { getPagesCount } from '../utils/pages';
import { deleteRef } from '../utils/delete';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [limit] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [filter, setFilter] = useState({
    sort: 'name',
    query: '',
    queryField: 'id',
  });
  const sortedComments = useComments(
    comments,
    filter.sort,
    filter.query,
    filter.queryField,
  );
  const [display, setDisplay] = useState('table');
  const [fetchPosts, isPostLoading] = useFetching(async () => {
    const response = await CommentsApi.getAll(limit, currentPage);

    const newComments = response.data.map((item) => {
      return { ...item, nodeRef: createRef(null) };
    });

    setComments(newComments);

    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPagesCount(totalCount, limit));
  });
  const pagination = usePagination(totalPages, currentPage, setCurrentPage);
  const optionsOrder = [
    { value: 'name', name: 'По Имени', id: 'name0' },
    { value: 'body', name: 'По Комментарию', id: 'body1' },
  ];
  const [optionsQuery, setOptionsQuery] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  useEffect(() => {
    if (comments.length) {
      const options = Object.keys(deleteRef(comments)[0]).map((item, index) => {
        return { value: item, name: item, id: index };
      });
      setOptionsQuery([...options]);
    }
  }, [comments]);

  return (
    <div>
      <h1>Comments</h1>
      <CommentFilter
        optionsOrder={optionsOrder}
        optionsQuery={optionsQuery}
        filter={filter}
        setFilter={setFilter}
      />
      <Button onClick={() => setDisplay('table')}>Таблица</Button>
      <Button onClick={() => setDisplay('json')}>JSON</Button>
      {isPostLoading ? (
        <div className={'text-center'}>
          <Spinner />
        </div>
      ) : (
        <CommentList comments={sortedComments} display={display} />
      )}
      <Pagination>{pagination}</Pagination>
    </div>
  );
};

export default Comments;
