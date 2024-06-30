import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Comments from '../../pages/Comments';
import CommentDetail from '../../pages/CommentDetail';

const AppRouter = () => {
  return (
    <Routes>
      <Route path={'/comments'} element={<Comments />} />
      <Route path={'/comments/:id'} element={<CommentDetail />} />
      <Route path={'*'} element={<Comments />} />
    </Routes>
  );
};

export default AppRouter;
