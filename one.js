//rpc server

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync(
    "data.proto", {}
)
console.log("one: " + Object.keys(packageDefinition) +  '\n');


const grpcObject = grpc.loadPackageDefinition(packageDefinition);
console.log("2 " + Object.keys(grpcObject) + '\n');


const package = grpcObject.data;
console.log("3 " + Object.keys(package) + '\n');


function testcall(call, callback) {
    // console.log("call: " + call+ "\n");
    // console.log(`callrequest: ${call.request} \n`);
    console.log(`callrequestname: ${call.request.name} \n`);
    console.log(`callrequestid: ${call.request.id} \n`);
    // console.log(`response: ${callback} \n`);
    callback(null, {status: "hello " + call.request.name});
    console.log('sent response');
}



const gserver = new grpc.Server();



gserver.addService(package.Testing.service, {
    "TestCall": testcall
})

gserver.bindAsync(
    "0.0.0.0:40000", 
    grpc.ServerCredentials.createInsecure(),
    () => gserver.start()
);






