import { RiFileExcel2Fill } from 'react-icons/ri'
import './styles.css'

import ExportToExcel from '../exportToExcel/ExportToExcel'

export default function MenuOptions ({
  table, setShowModal
}) {
  // EXPORT SELECTED ROWS TO EXCEL
  const exportDataExcel = () => {
    // if (table.getSelectedRowModel().flatRows.length === 0) {
    //   return dispatch(setFeedbackModal({
    //     initialState: true,
    //     type: 'warning',
    //     message: 'debe elegir por lo menos un registro'
    //   }))
    // }

    const Data = []

    table.getSelectedRowModel().flatRows.map((data) => {
      return Data.push(data.original)
    })
    const ColumnHeader = Object.keys(Data[0])

    ExportToExcel(ColumnHeader, Data, 'excel')
  }

  return (
    <div className='MainDiv-menuOptions'>
        <button className='Sbutton-menuOptions' onClick={exportDataExcel}>
          <RiFileExcel2Fill />
        </button>
    </div>
  )
}
