import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Pagination from '@material-ui/lab/Pagination';
export interface IDataRow {
	className?: string
	[key: string]: any
}
export interface IColumn {
	order?: number,
	className?: string
	colName?: string,
	colKey: string
}
interface IProps {
	columns: IColumn[]
	data: Array<IDataRow>
	onChange?: (data) => any
	pageProps?: {
		totalRow: number,
		totalPage: number,
		page: number,
		itemPerPage: number
	}
}
export default function BasicTable({ columns, data, onChange, pageProps }: IProps) {

	let rows = data.map((item, rowNo) => {
		const cell = columns.map((col, index) => {
			return <TableCell key={index}>{item[col.colKey]}</TableCell>
		})
		return <TableRow key={rowNo}>{cell}</TableRow>
	})
	const [paging, setPaging] = React.useState({
		page: 1,
		totalPage: 1,
		totalRow: 0,
		itemPerPage: 5
	});
	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		const pageUpdate = { ...paging, page: value }
		setPaging(pageUpdate);
		if (onChange) {
			onChange(pageUpdate)
		}
	};
	useEffect(() => {
		if (pageProps) {
			const { totalRow, itemPerPage } = pageProps
			const totalPage = Math.ceil(totalRow / itemPerPage)
			setPaging({ ...pageProps, totalRow, totalPage })
		}
	}, [data, pageProps])
	return (
		<TableContainer component={Paper}>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						{columns.map((col) => (
							<TableCell key={col.colKey} style={{ fontWeight: 'bold' }}>{col.colName}</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{rows}
				</TableBody>
			</Table>
			<div style={{ marginLeft: '1.5rem', float: 'inline-end', padding: '1rem' }}>
				<span style={{ fontFamily: 'Roboto, Helvetica, Arial, sans-serif', fontWeight: 'bold', fontSize: 'small' }}>Total: {paging.totalRow} Page: {paging.page}</span>
				<Pagination count={paging.totalPage} page={paging.page} onChange={handleChange} style={{ display: 'inline-block' }} />
			</div>

		</TableContainer>

	);
}
