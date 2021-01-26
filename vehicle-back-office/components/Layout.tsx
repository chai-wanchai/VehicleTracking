import React, { ReactNode } from 'react'
import AppBar from '@material-ui/core/AppBar';
type Props = {
  children?: ReactNode
  title?: string
}
const Layout = ({ children, title = '' }: Props) => (
  <div>
    <title>{title}</title>

    <AppBar style={{ height: '50px', width: '100%' }}>
      <div style={{ margin: 'auto 50px', fontFamily: 'Roboto, Helvetica, Arial, sans-serif', fontWeight: 'bold' }}>{title}</div>
    </AppBar>
    <div style={{ margin: '50px', position: 'absolute', padding: '1rem', minWidth: '90%' }}>
      {children}
    </div>
  </div>
)

export default Layout
