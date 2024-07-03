import React, { useMemo } from 'react';
import { Pagination } from 'react-bootstrap';
// import { useFetching } from './useFetching';
// import CommentsApi from '../api/commentsApi';

export const useSortedComments = (comments, sort) => {
  return useMemo(() => {
    return sort
      ? [...comments].sort((a, b) => a[sort].localeCompare(b[sort]))
      : comments;
  }, [sort, comments]);
};

export const useComments = (comments, sort, query, queryField = 'id') => {
  const sortedComments = useSortedComments(comments, sort);

  return useMemo(() => {
    return sortedComments.filter((comment) => {
      return JSON.stringify(comment[queryField])
        .toLowerCase()
        .includes(query.toLowerCase());
    });
  }, [query, sortedComments]);
};

export const usePagination = (total, current, setCurrent) => {
  return useMemo(() => {
    const items = [];
    for (let number = 1; number <= total; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === current}
          onClick={() => setCurrent(number)}
        >
          {number}
        </Pagination.Item>,
      );
    }
    return items;
  }, [total, current]);
};
