import { GET_NEW_OC } from "../../../../../config/api/api";
import useAskQuery from "../../../../../hooks/useAskQuery";
import TableInstance from "../../../../../components/table/TableInstance";
import { columns } from "./tableColumns";
import Loader from "../../../../../components/loader/Loader";

export default function Table() {
  
    const query = useAskQuery({queryKey: ['nuevaOC'], url: GET_NEW_OC})
  
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        {(query.isLoading || query.isFetching) && <Loader />}
  
        {query.data && (
          <TableInstance tableData={query.data} tableColumns={columns} />
        )}
      </div>
    );
  }
  