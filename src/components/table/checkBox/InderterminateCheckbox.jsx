import React from 'react'


export default function IndeterminateCheckbox ({
  indeterminate,
  ...rest
}) {

  const ref = React.useRef()

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !(rest.checked ?? false) && indeterminate
    }
  }, [ref, indeterminate])

  return (
    <input
      type="checkbox"
      ref={ref}
      {...rest}
    />
  )
}
