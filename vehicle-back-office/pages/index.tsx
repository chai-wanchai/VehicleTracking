import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout'
import BasicTable, { IColumn, IDataRow } from '../components/Table'
import vehicleApi from '../src/api/vehicleApi';
import { useRouter } from 'next/router'
const IndexPage = () => {
  const router = useRouter()
  const columns: IColumn[] = [
    { colKey: 'vehicle_name', colName: 'Vehicle ID' },
    { colKey: 'time_line', colName: '' }
  ]
  const [rowData, setRowData] = useState<any>([])
  const [paging, setPaging] = useState({ totalRow: 0, totalPage: 1, page: 1, itemPerPage: 10 })
  const onClickView = (vehicleData: any) => {
    const { vehicle_name } = vehicleData
    router.push(`/history/${vehicle_name}`)
  }
  const getData = async (pageCriteria: any = paging) => {
    try {
      const { data, total } = await vehicleApi.getVehicle(pageCriteria)
      let newData = data.map(item => {
        const timeLine = <div style={{ textAlign: 'end' }}><Button variant="contained" color="primary" onClick={() => onClickView(item)}>View TimeLine</Button></div>
        return { vehicle_name: item.vehicle_name, time_line: timeLine }
      })
      setRowData(newData)
      setPaging({ ...paging, totalRow: total })
    } catch (error) {
      alert(error.message)
    }
  }
  const onChangePage = async (pageChange) => {
    await getData(pageChange)
    setPaging(pageChange)
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <Layout title="Vehicles">
      <BasicTable columns={columns} data={rowData} pageProps={paging} onChange={onChangePage} />
    </Layout>
  )
}

export default IndexPage
