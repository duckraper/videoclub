import React from 'react'
import FilmsTable from '../../components/tables/FilmsTable'
import SupportTable from '../../components/tables/SupportTables'

const AdminInv = () => {

  return (
    <div className=' flex flex-row'>
      <FilmsTable />
      <SupportTable />
    </div>
  )
}

export default AdminInv