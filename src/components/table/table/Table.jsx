import { useDispatch } from 'react-redux'
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

import { flexRender } from '@tanstack/react-table'
import Filter from '../columsFilter/Filter'

import { setPageToRender } from '../../../redux/slices/pageToRenderSlice'
import "./styles.css"

export default function Table ({ table, meneOption }) {
  const dispatch = useDispatch()
  const editViewRecord = (cellData) => {
    if (cellData.column.id !== 'select') {
      dispatch(setPageToRender({data: [cellData.row.original]}))
    }

  }

  const height = meneOption ? '77vh' : '82vh'

  return (
    <div
    style={{display: 'flex', justifyContent: 'center', height, overflow: 'auto'}}
    >

    <table {...{ style: { width: table.getCenterTotalSize() + 150, borderCollapse: 'collapse' } }} >
      <thead className='Sthead-customTable'>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th
                key={header.id}
                style={{
                  width: header.id === 'select'
                    ? '45px'
                    : header.getSize() + 150
                }}
                className='Sth-customTable'
                >
                <div onClick={header.column.getToggleSortingHandler()} 
                className={header.id === 'select' ? 'ColumnTittle-customTable select ' : 'ColumnTittle-customTable'}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: <div style={{marginLeft: '8px', fontSize: '18px'}}><IoIosArrowUp color='rgba(84, 245, 39, 0.8)' /></div>,
                      desc: <div style={{marginLeft: '8px', fontSize: '18px'}}><IoIosArrowDown color='rgba(245, 39, 39, 0.8)' /></div>
                    }[header.column.getIsSorted()] ?? null}
                </div>
                {header.column.getCanFilter()
                  ? <Filter column={header.column} table={table}/>
                  : null
                }
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id} className={table.getState().rowSelection[row.id] ? 'Str-customTable rowSelected' : 'Str-customTable'} >
            {row.getVisibleCells().map(cell => (
              <td
                className={cell.column.id === 'select' ? 'checkbox Std-customTable' : 'noCheckbox Std-customTable'}
                onClick={() => { editViewRecord(cell) }}
                key={cell.id}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>

    </div>
  )
}
