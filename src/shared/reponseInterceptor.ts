import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const httpRes = context.switchToHttp()
		return next
			.handle()
			.pipe(map(value => this.responseBody(value)));
	}
	responseBody(value) {
		return {
			status: "success",
			data: value
		}
	}
}