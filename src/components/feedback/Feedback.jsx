import Success from './success/Success';
import Error from './error/Error';

export default function Feedback({apiFeedback, query, addNewRecord}) {
  console.log(apiFeedback);

  if (apiFeedback.status === 200) {
    return (
      <Success />
    )
  }

  if (apiFeedback.status !== 200) {
    return (
      <Error query={query}/>
    )
  }

}
