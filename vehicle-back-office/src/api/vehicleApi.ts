import axios, { AxiosInstance } from 'axios'
import { Moment } from 'moment'
export interface VehicleHistoryBody {
	"vehicle_name": any
	"paging": {
		totalRow: number,
		totalPage: number,
		page: number,
		itemPerPage: number
	},
	"criteria": {
		"start_date": string | Date | Moment,
		"end_date": string | Date | Moment
	}
}
class VehicleApi {
	request: AxiosInstance
	constructor() {
		this.request = axios.create({ baseURL: 'http://localhost:5000' })
	}
	async getVehicle(paging): Promise<any> {
		try {
			const result = await this.request.post('/api/vehicle/list', paging)
			return result.data
		} catch (error) {
			throw error
		}
	}
	async getVehicleHistory(criteria: VehicleHistoryBody): Promise<any> {
		try {
			const result = await this.request.post('/api/vehicle/history', criteria)
			return result.data
		} catch (error) {
			throw error
		}
	}
}

export default new VehicleApi()