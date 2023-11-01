//client.ts
import * as protoLoader from '@grpc/proto-loader';
import * as grpc from "grpc";
import path from 'path';
const PROTO_PATH = "/proto/service1.proto";
console.log(__dirname,'///');

const packageDefinition = protoLoader.loadSync(path.join("/home/appinventiv/Desktop/grpc/mySample/chatgtpCOde", PROTO_PATH), {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const usersProto: any = grpc.loadPackageDefinition(packageDefinition);
const userPackage = usersProto.first;

const client = new userPackage.FirstService("localhost:50051", grpc.credentials.createInsecure());

export default client;