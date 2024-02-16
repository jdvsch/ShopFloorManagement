import * as XLSX from 'xlsx'

export default function ExportToExcel (
  ColumnHeader,
  RowData,
  wsName) {
  const Header = {}
  // columns tittle
  ColumnHeader.map((data, index) => {
    return (Header[excelColumn(index + 1)] = data.replace('_', ' ').toUpperCase())
  })

  const Table = [Header]

  const gettingKey = Object.keys(RowData[0])

  RowData.map((data) => {
    const Row = {}
    for (let index = 0; index < gettingKey.length; index++) {
      Row[excelColumn(index + 1)] = data[gettingKey[index]]
    }
    return Table.push(Row)
  })

  const libro = XLSX.utils.book_new()
  const hoja = XLSX.utils.json_to_sheet([...Table], { skipHeader: true })

  XLSX.utils.book_append_sheet(libro, hoja, wsName)
  XLSX.writeFile(libro, 'AssetsMinders.xlsx')
}

function excelColumn (n) {
  let s = 1; let e = 26; let result = ''
  while ((n -= s) >= 0) {
    result = String.fromCharCode(((n % e) / s) + 65) + result
    s = e
    e *= 26
  }
  return result
}
