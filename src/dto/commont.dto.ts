import { ApiProperty } from "@nestjs/swagger"

export class PagingDto {
	@ApiProperty()
	limit: number
	@ApiProperty()
	offset: number
}