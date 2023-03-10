import { useRef, useEffect } from "react";
import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";
import classes from "./NewCommentForm.module.css";

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const { sendRequest, status } = useHttp(addComment);

  const { onAddComment, quoteId } = props;

  useEffect(() => {
    if (status === "completed") {
      onAddComment();
    }
  }, [status, onAddComment]);

  const submitFormHandler = (event) => {
    event.preventDefault();

    const enteredComment = commentTextRef.current.value;

    sendRequest({ commentData: { text: enteredComment }, quoteId: quoteId });
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
