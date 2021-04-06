import { Injectable } from "@nestjs/common";
import * as WebSocket from "ws";

@Injectable()
export class WSService {
    ws: WebSocket = null
    async init(url: string, onMessage: any) {
        const socket = new WebSocket(url)
        return new Promise((resolve, reject) => {
            socket
                .on("open", () => {
                    this.ws = socket
                    resolve(socket);
                })
                .on('message', onMessage)
                .on('error', (err) => {
                    reject(err)
                })
        });
    }
    async send(msg) {
        this.ws.send(msg)
    }
}