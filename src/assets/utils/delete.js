export const deleteRef = (comments) => {
  return [
    ...comments.map((comment) => {
      delete comment.nodeRef;
      return comment;
    }),
  ];
};
