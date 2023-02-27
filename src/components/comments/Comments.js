import { useState, useEffect, useCallback } from "react";
import useHttp from "../../hooks/use-http";
import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import { getAllComments } from "../../lib/api";
import CommentsList from "./CommentsList";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();
  const {
    sendRequest,
    status,
    error,
    data: loadedComments,
  } = useHttp(getAllComments, true);

  
  let comments;

  const { quoteId } = params;

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const onAddCommentHandler = useCallback(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <h1 className="centered">cant get comments from server!</h1>;
  }

  if (status === "completed" && (loadedComments || loadedComments.length > 0)) {
    comments = <CommentsList comments={loadedComments} />;
  }

  if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <h1 className="centered">No comments yet</h1>;
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm onAddComment={onAddCommentHandler} quoteId={quoteId} />
      )}
      {comments}
    </section>
  );
};

export default Comments;
