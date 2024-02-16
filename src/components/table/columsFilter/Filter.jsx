import React from 'react'

import DebouncedInput from '../debounce/DebouncedInput'


const NumberInput = ({
  columnFilterValue,
  setFilterValue
}) => {
  // const personalSettings = useAppSelector(state => state.reducerPersonalSettings.personalSettings)

  return (
    <>
      <DebouncedInput
      style={{
        width: '70px',
        textAlign: 'center',
        borderRadius: '5px',
        cursor: 'pointer'
      }}
        type="number"
        value={columnFilterValue?.[0] ?? ''}
        onChange={value => { setFilterValue((old) => [value, old?.[1]]) }
        }
        placeholder='Min...'
      />
      <DebouncedInput
      style={{
        width: '70px',
        textAlign: 'center',
        borderRadius: '5px',
        cursor: 'pointer'
      }}
        type="number"
        value={columnFilterValue?.[1] ?? ''}
        onChange={value => { setFilterValue((old) => [old?.[0], value]) }
        }
        placeholder='Max...'
      />
    </>
  )
}


const TextInput = ({
  columnId,
  columnFilterValue,
  setFilterValue,
  sortedUniqueValues
}) => {
  // const personalSettings = useAppSelector(state => state.reducerPersonalSettings.personalSettings)
  const dataListId = columnId + 'list'

  return (
    <>
      <datalist id={dataListId}>
        {sortedUniqueValues.slice(0, 5000).map((value) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        style={{ width: '140px', textAlign: 'center', borderRadius: '5px', cursor: 'pointer' }}
        type="text"
        value={columnFilterValue ?? ''}
        onChange={value => { setFilterValue(value) }}
        placeholder='Buscar...'
        list={dataListId}
      />
    </>
  )
}

export function Filter ({ column, table }) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()
  const uniqueValues = column.getFacetedUniqueValues()

  const sortedUniqueValues = React.useMemo(
    () =>
      typeof firstValue === 'number'
        ? []
        : Array.from(uniqueValues.keys()).sort(),
    [uniqueValues]
  )

  return typeof firstValue === 'number'
    ? (
    <NumberInput
      columnFilterValue={columnFilterValue}
      getFacetedMinMaxValues={column.getFacetedMinMaxValues}
      setFilterValue={column.setFilterValue}
    />
      )
    : (
    <TextInput
      columnId={column.id}
      columnFilterValue={columnFilterValue}
      columnSize={uniqueValues.size}
      setFilterValue={column.setFilterValue}
      sortedUniqueValues={sortedUniqueValues}
    />
      )
}

export default Filter
