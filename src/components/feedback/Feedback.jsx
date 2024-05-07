import Success from "./success/Success";
import Error from "./error/Error";

export default function Feedback({ mutationFeedback, setMutationFeedback }) {
  if (mutationFeedback.success === "no") {
    return (
      <Error
        mutationFeedback={mutationFeedback}
        setMutationFeedback={setMutationFeedback}
      />
    );
  }

  if (mutationFeedback.success === "yes") {
    return (
      <Success
        mutationFeedback={mutationFeedback}
        setMutationFeedback={setMutationFeedback}
      />
    );
  }

  return <>feedback</>;
}
