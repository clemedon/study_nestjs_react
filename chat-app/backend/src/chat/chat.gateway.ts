import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

// TODO dynamic socket port
//
// Cause this does not work outside class function:
//  const port = process.env.PORT;
//  console.log("chat.gateway.ts: port = " + port);
//
// https://stackoverflow.com/questions/69435506/how-to-pass-a-dynamic-port-to-the-websockets-gateway-in-nestjs
// https://dev.to/one-beyond/how-to-configure-and-use-environment-variables-in-nestjs-3cm2
// https://progressivecoder.com/one-stop-guide-to-nestjs-config-environment-variables/

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
