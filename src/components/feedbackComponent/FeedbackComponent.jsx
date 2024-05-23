import { useDispatch, useSelector } from "react-redux";
import { setResetFeedback } from "../../redux/slices/feedbackSlice";

import Success from "./success/Success";
import Error from "./error/Error";

export default function FeedbackComponent({children}) {
  const dispatch = useDispatch();
  const feedback = useSelector(
    (state) => state.reducerFeedback.feedback
  );

  const childrenToShow = feedback.children.length !==0 ? feedback.children : children

  const closeFeedback = () => {
    dispatch(setResetFeedback())
  }

  if (!feedback.success && feedback.children.length === 0) {
    return (
      <Error/>
    );
  }

  if (feedback.success && feedback.children.length === 0) {
    return (
      <Success/>
    );
  }

  return (  
    <div className="container mt-5">
      { childrenToShow }

      <button type="button" className="btn btn-primary" onClick={closeFeedback}>Cerrar</button>
    </div>
  )
}
