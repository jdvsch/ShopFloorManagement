import { useSelector } from "react-redux";

import ButtonAction from './commonSubcomponents/ButtonAction'
import Scale from './commonSubcomponents/Scale'
import Table from './commonSubcomponents/Table'
import FeedbackComponent from "../../../../components/feedbackComponent/FeedbackComponent";

export default function Development() {
  const feedback = useSelector(
    (state) => state.reducerFeedback.feedback
  );

  return (
    <>
    {feedback.itShows &&
    <FeedbackComponent></FeedbackComponent>
    }

    {!feedback.itShows &&
    <div className="container row mt-5">
      <div className="col-3 text-center">
        <Scale/>
      </div>

      <div className="col-6 text-center justify-content-center">
        <Table/>
      </div>

      <div className="col-3 text-center">
        <ButtonAction/>
      </div>
    </div>
    }
    </>
  )
}
