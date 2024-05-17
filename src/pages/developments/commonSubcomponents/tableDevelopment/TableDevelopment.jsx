import { useSelector } from "react-redux";

import { Query, GET_DEVELOPMENT_OW } from "../../../../config/api/api";
import TableInstance from "../../../../components/table/TableInstance";
import { columns } from "../../commonSubcomponents/tableDevelopment/tableColumns";
import Loader from "../../../../components/loader/Loader";


export default function TableDevelopment({type}) {
    const pageControl = useSelector(
      (state) => state.reducerPageToRender.pageToRender
    );
  
    const createDevelopment = Query({ key: ["crearFormulacion"], url: GET_DEVELOPMENT_OW });
    const resumeDevelopment = Query({ key: ["crearFormulacion"], url: GET_DEVELOPMENT_OW });
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
  