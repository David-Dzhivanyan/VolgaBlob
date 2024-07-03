import React, { useMemo } from 'react';
import { Pagination } from 'react-bootstrap';

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
      const json = JSON.stringify(comment[queryField]);

      return json ? json.toLowerCase().includes(query.toLowerCase()) : true;
    });
  }, [query, sortedComments]);
};

export const usePagination = (total, current, setCurrent) => {
  return useMemo(() => {
    const items = [];
    for (let number = 1; number <= total; number++) {
      items.push(
        <Pagination.Item
          key={'pagination' + number}
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
