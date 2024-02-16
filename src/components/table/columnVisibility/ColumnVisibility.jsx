
export default function ColumnVisibility ({
  table
}) {
  // const personalSettings = useAppSelector(state => state.reducerPersonalSettings.personalSettings)

  return (
    <div>
      <label className={Object.values(table.getState().columnVisibility).includes(false) ? '' : 'disabled' }>
        <input
        disabled={!Object.values(table.getState().columnVisibility).includes(false)}
        type="checkbox"
        checked={table.getIsAllColumnsVisible()}
        onChange={table.getToggleAllColumnsVisibilityHandler()}
        className={Object.values(table.getState().columnVisibility).includes(false) ? '' : 'disabled'}
        />
        Ver todas las columnas
      </label>

      {table.getAllLeafColumns().map(column => (
        <div key={column.id}>
          {column.getCanHide() &&
            <label>
              <input
              type="checkbox"
              checked={column.getIsVisible()}
              onChange={column.getToggleVisibilityHandler()}
              />
              {column.id}
            </label>
          }
        </div >
      ))}
    </div>
  )
}
