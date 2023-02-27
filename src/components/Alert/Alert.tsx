import * as React from 'react'
import MuiAlert, { type AlertProps } from '@mui/material/Alert'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert (
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

interface Props {
  message: string
  severity: 'error' | 'warning' | 'info' | 'success'
}

const Alerts = ({ message, severity }: Props) => {
  return (
    <Alert severity={severity} sx={{ width: '100%' }}>
      {message}
    </Alert>
  )
}

export default Alerts
