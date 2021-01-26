import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout'
import BasicTable from '../../components/Table'
import vehicleApi, { VehicleHistoryBody } from '../../src/api/vehicleApi';
import { useRouter } from 'next/router'
import moment from 'moment';
import { Button } from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import TextField from '@material-ui/core/TextField';
const IndexPage = ({ query }) => {
	const router = useRouter()
	const { vehicle_name } = query
	const columns = [
		{ colKey: 'lat', colName: 'Latitude' },
		{ colKey: 'long', colName: 'Longitude' },
		{ colKey: 'created_date', colName: 'Record date' }
	]
	const [rowData, setRowData] = useState<any>([])
	const [paging, setPaging] = useState({ totalRow: 0, totalPage: 1, page: 1, itemPerPage: 10 })
	const [criteria, setCriteria] = useState({ start_date: moment().subtract(1, 'month'), end_date: moment() })
	const handleDateChange = (event: any) => {
		const { id, value } = event.target
		setCriteria({ ...criteria, [id]: moment(value) });
	};
	const getData = async (pageCriteria: any = paging) => {
		try {
			const reqBody: VehicleHistoryBody = {
				vehicle_name: vehicle_name,
				criteria: criteria,
				paging: pageCriteria
			}
			const { data, total } = await vehicleApi.getVehicleHistory(reqBody)
			let newData = data.map(item => {
				const formatDate = moment(item.created_date).format('MM/DD/YYYY')
				return { lat: item.lat, long: item.long, created_date: formatDate, id: item.id }
			})
			setPaging({ ...paging, totalRow: total })
			setRowData(newData)
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
	}, [criteria])
	return (
		<Layout title={`Vehicle ID : ${vehicle_name}`}>
			<Button startIcon={<KeyboardBackspaceIcon />} onClick={() => router.push('/')}>Back</Button>
			<div style={{ textAlign: 'end' }}>
				<TextField
					id="start_date"
					label="From date"
					type="date"
					defaultValue={criteria.start_date.format('yyyy-MM-DD')}
					onChange={handleDateChange}
					InputLabelProps={{ shrink: true, }}
				/>
				<span style={{ margin: '10px' }}></span>
				<TextField
					id="end_date"
					label="To date"
					type="date"
					defaultValue={criteria.end_date.format('yyyy-MM-DD')}
					InputLabelProps={{ shrink: true, }}
					onChange={handleDateChange}
				/>
			</div>
			<BasicTable columns={columns} data={rowData} pageProps={paging} onChange={onChangePage} />
		</Layout>
	)
}
IndexPage.getInitialProps = ({ query }) => {
	return { query }
}

export default IndexPage
