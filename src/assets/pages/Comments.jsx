import React, { useEffect, useState } from 'react';
import { Button, Pagination, Spinner } from 'react-bootstrap';
import { useFetching } from '../hooks/useFetching';
import CommentsApi from '../api/commentsApi';
import CommentList from '../components/CommentsList/CommentList';
import CommentFilter from '../components/CommentFilter/CommentFilter';
import { useComments, usePagination } from '../hooks/useComments';
import { getPagesCount } from '../utils/pages';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [limit] = useState(30);
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

    setComments(response.data);

    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPagesCount(totalCount, limit));
  });
  const pagination = usePagination(totalPages, currentPage, setCurrentPage);
  const optionsOrder = [
    { value: 'name', name: 'По Имени', id: 'order-name' },
    { value: 'body', name: 'По Комментарию', id: 'order-body' },
  ];
  const [optionsQuery, setOptionsQuery] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  useEffect(() => {
    if (comments.length) {
      const options = Object.keys(comments[0]).map((item, index) => {
        return { value: item, name: item, id: `query-${index}` };
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
      <div className={'mt-4'}>
        <Button className={'col-2 me-2'} onClick={() => setDisplay('table')}>
          Таблица
        </Button>
        <Button className={'col-2'} onClick={() => setDisplay('json')}>
          JSON
        </Button>
      </div>
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
