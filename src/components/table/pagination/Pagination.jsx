import {
  RiArrowLeftDoubleFill,
  RiArrowRightDoubleFill,
  RiArrowRightSLine,
  RiArrowLeftSLine,
} from "react-icons/ri";
import './styles.css'

export function Pagination({
  hasNextPage,
  hasPreviousPage,
  nextPage,
  pageCount,
  pageIndex,
  pageSize,
  previousPage,
  setPageIndex,
  setPageSize,
}) {

  const rangePagination = [...new Set([5, 10, 20, 30, 40, 50])];

  return (
    <div className="Main-customPagination" >
      <button className="Sbutton-customPagination"
        onClick={() => {
          setPageIndex(0);
        }}
        disabled={!hasPreviousPage}
      >
        <RiArrowLeftDoubleFill />
      </button>
      <button className="Sbutton-customPagination"
        onClick={() => {
          previousPage();
        }}
        disabled={!hasPreviousPage}
      >
        <RiArrowLeftSLine />
      </button>
      <span className="Sspan-customPagination">
        Página{" "}
        <strong>
          {" "}
          {pageIndex + 1} de {pageCount}{" "}
        </strong>
      </span>
      <button className="Sbutton-customPagination"
        onClick={() => {
          nextPage();
        }}
        disabled={!hasNextPage}
      >
        <RiArrowRightSLine />
      </button>
      <button className="Sbutton-customPagination"
        onClick={() => {
          setPageIndex(pageCount - 1);
        }}
        disabled={!hasNextPage}
      >
        <RiArrowRightDoubleFill />
      </button>
      <span className="Sspan-customPagination">
        ir a la página
        <input className="Sinput-customPagination"
          type="number"
          defaultValue={pageIndex + 1}
          onChange={(e) => {
            const page =
              e.target.value.length > 0 ? Number(e.target.value) - 1 : 0;
            setPageIndex(page);
          }}
        />
      </span>
      <select className="Sselect-customPagination"
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
        }}
      >
        {rangePagination.map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            mostrar {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Pagination;
