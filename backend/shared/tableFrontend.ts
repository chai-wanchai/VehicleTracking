import { HttpException, HttpStatus } from "@nestjs/common";

export function pagingProcess(page) {
	try {
		return {
			limit: page.itemPerPage,
			offset: page.itemPerPage * (page.page - 1)
		};
	} catch (error) {
		return {
			limit: 10,
			offset: 1
		}
	}

}
