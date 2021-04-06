export class ZipmexManager {
	checkResponseType(response) {
		response = JSON.parse(response.toString())
		let data = JSON.parse(response.o)
		console.log(data)
		switch (response.n) {
			case 'GetInstruments': this.GetInstruments(data)
				break;
			case 'GetProducts': this.GetProducts(data)
				break;
			case 'GetTransfersReceived': this.GetTransfersReceived(data)
				break;
			case 'GetOpenOrders': this.GetOpenOrders(data)
				break;
			default:
				break;
		}
	}
	GetInstruments(data) {
		console.log(data)
	}
	GetProducts(data) {

	}
	GetTransfersReceived(data) {

	}
	GetOpenOrders(data) {

	}
}
export default new ZipmexManager()