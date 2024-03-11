import Success from './success/Success';
import Error from './error/Error';

export default function Feedback({query, queryName, addNewRecord}) {
  // console.log(query.data.data.sqlMessage);
  if (query.data.data.sqlMessage === undefined) {
    return (
      <Success queryName={queryName}/>
    )
  }

  if (query.data.data.sqlMessage !== '') {
    return (
      <Error query={query} onError={queryName}/>
    )
  }

}
