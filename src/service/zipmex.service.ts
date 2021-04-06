import { Injectable } from "@nestjs/common";
import { ZipmexManager } from "src/manager/zipmex.manager";
import { WSService } from "./socket.service";
@Injectable()
export class ZipmexService {
	i: number = 0
	ws = new WSService()
	constructor() {
	}
	async connectSocket() {
		const zmtManager = new ZipmexManager()
		const url = 'wss://api.exchange.zipmex.com/WSGateway/'
		await this.ws.init(url, (data) => zmtManager.checkResponseType(data))
	}
	setSendData(event: string, data: object | any) {
		let sendData = { "m": 0, "i": this.i, "n": event, "o": JSON.stringify(data) }
		this.i++
		return sendData
	}
	getSummary(instrumentId: number) {
		const data = { "OMSId": 1, "InstrumentId": instrumentId, "Interval": 60 }
		const newItem = this.setSendData('SubscribeLevel1', data)
		return JSON.stringify(newItem)
	}
	tracker(InstrumentId: number) {
		const data = { "OMSId": 1, "InstrumentId": InstrumentId, "Interval": 60, "IncludeLastCount": 5000 }
		const sendData = this.setSendData("SubscribeTicker", data)
		return JSON.stringify(sendData)
	}
	getProduct() {
		const data = { "OMSId": 1 }
		const sendData = this.setSendData("GetProducts", data)
		return JSON.stringify(sendData)
	}
	getInstruments() {
		const data = { "OMSId": 1 }
		const sendData = this.setSendData("GetInstruments", data)
		return JSON.stringify(sendData)
	}
	sendOrder(type: 'buy' | 'sell', InstrumentId: number, AccountId: number, Quantity: string, Price: number) {
		let side = type === 'buy' ? 0 : 1
		let objectData = {
			"OMSId": 1, "InstrumentId": InstrumentId, "AccountId": AccountId, "TimeInForce": 1,
			"ClientOrderId": 0, "OrderIdOCO": 0, "TimeInOrder": 0, "UseDisplayQuantity": false,
			"Side": side, "Quantity": Quantity, "OrderType": 2, "PegPriceType": "2", "LimitPrice": Price
		}
		const sendData = this.setSendData("SendOrder", objectData)
		return JSON.stringify(sendData)
	}
	cancelOrder(OrderId: number, AccountId: number) {
		const data = { "OMSId": 1, "OrderId": OrderId, "AccountId": AccountId }
		const sendData = this.setSendData("CancelOrder", data)
		return JSON.stringify(sendData)
	}
	getOrder(AccountId: number) {
		const data = { "OMSId": 1, "AccountId": AccountId, "OMSID": 1 }
		const sendData = this.setSendData("GetOpenOrders", data)
		return JSON.stringify(sendData)
	}
	getTransfersReceived(AccountId: number) {
		const data = { "OMSId": 1, "AccountId": AccountId }
		const sendData = this.setSendData("GetTransfersReceived", data)
		return JSON.stringify(sendData)
	}
}