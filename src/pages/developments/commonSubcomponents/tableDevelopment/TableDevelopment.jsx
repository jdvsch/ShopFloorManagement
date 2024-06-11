import { useSelector } from "react-redux";

import { GET_DEVELOPMENT_OW, GET_DEVELOPMENT_OW_PAUSED } from "../../../../config/api/api";
import useAskQuery from "../../../../hooks/useAskQuery";
import TableInstance from "../../../../components/table/TableInstance";
import { columns } from "../../commonSubcomponents/tableDevelopment/tableColumns";
import Loader from "../../../../components/loader/Loader";


// eslint-disable-next-line react/prop-types
export default function TableDevelopment({type}) {
    const pageControl = useSelector(
      (state) => state.reducerPageToRender.pageToRender
    );

    const createDevelopment = useAskQuery({queryKey: ['crearFormulacion'], url: GET_DEVELOPMENT_OW})
    const resumeDevelopment = useAskQuery({queryKey: ['resumeFormulacion'], url: GET_DEVELOPMENT_OW_PAUSED})

    const query = type === "create" ? createDevelopment : resumeDevelopment
  
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        {(query.isLoading || query.isFetching) && <Loader />}
  
        {query.data && pageControl.data.length === 0 && (
          <TableInstance tableData={query.data} tableColumns={columns} />
        )}
      </div>
    );
  }
  