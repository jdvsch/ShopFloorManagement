import React from 'react'

import {
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table'

import MenuOptions from './menuOptions/MenuOptions'
import Pagination from './pagination/Pagination'
import Table from './table/Table'

// eslint-disable-next-line react/prop-types
export default function TableInstance ({ tableData, tableColumns, meneOption = false }) {
  const columns = React.useMemo(() => tableColumns, [tableColumns])
  const data = React.useMemo(() => tableData, [tableData])
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    state: {
      sorting,
      columnFilters,
      rowSelection,
      columnVisibility
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility
  })

  return (
    <div style={{
      width: '98%',
      display: 'grid',
      gridTemplateRows: 'auto 1fr auto'
    }}>

      {meneOption &&
      <MenuOptions table={table}/>
      }

      <Table table={table} meneOption={meneOption}/>

      <Pagination
        hasNextPage={table.getCanNextPage()}
        hasPreviousPage={table.getCanPreviousPage()}
        nextPage={table.nextPage}
        pageCount={table.getPageCount()}
        pageIndex={table.getState().pagination.pageIndex}
        pageSize={table.getState().pagination.pageSize}
        previousPage={table.previousPage}
        setPageIndex={table.setPageIndex}
        setPageSize={table.setPageSize}
      />
    </div>
  )
}
