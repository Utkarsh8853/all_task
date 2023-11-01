//grpc server 
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { Server, ServerCredentials } from '@grpc/grpc-js';
// import { FirstRequest, FirstResponse } from '../proto/proto/';


const PROTO_PATH = "/home/appinventiv/Desktop/grpc/mySample/chatgtpCOde/proto/service1.proto";

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
const hello_proto: any = grpc.loadPackageDefinition(packageDefinition);
const helloPackage = hello_proto.first;

// function sayHello(call: { request: { message: string; }; }, callback: (arg0: null, arg1: { message: string; }) => void) {
//     console.log("/////////////",call.request.message);
//     const message = `hello ${call.request.message}`
//     callback(null, {message: message});
// }
function sayHello(call: grpc.ServerUnaryCall<{ message: string }, any>, callback: grpc.sendUnaryData<any>) {
    let data = call.request.message;
    console.log(data);

    callback(null, {message: data });
}

function main() {
    var server = new grpc.Server();
    console.log("//////////////////////");

    server.addService(helloPackage.FirstService.service, { FirstMethod: sayHello });
    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
        server.start();
    });
}

main();
// const server = new Server();

// server.addService(helloPackage.FirstService.service, {
//   FirstMethod: (call, callback) => {
//     const request = call.request as FirstRequest;
//     const response = new FirstResponse();
//     response.setMessage(`Received from First Server: ${request.getMessage()}`);
//     callback(null, response);
//   },
// });

// const PORT = '0.0.0.0:50051';
// server.bindAsync(PORT, ServerCredentials.createInsecure(), () => {
//   server.start();
//   console.log(`First gRPC server is running on ${PORT}`);
// });
