import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway(8001, { cors: '*' })
// we pass @WebSocketGateway a Port number, cors: '*' means that we want every
// frontend clients to be able to connect with our gateway.
export class ChatGateway {
  @WebSocketServer()
  server: any;
  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    // whenever our frontend emits a 'message' event, @SubscribeMessage runs
    // handleMessage() with the message's data passed to it via @MessageBody
    console.log(message);
    this.server.emit('message', message);
  }
}
