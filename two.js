//rpc client

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync(
    "data.proto", {}
)

const grpcObject = grpc.loadPackageDefinition(packageDefinition);

const package = grpcObject.data;

const client = new package.Testing(
    "localhost:40000",
    grpc.credentials.createInsecure()
);

client.TestCall({name: 'client', id: 7}, (err, response) => {
    const message = response.status;
    console.log(`response: ${message} \n`)
    // console.log(`response message: ${Object.keys(response)}`)

})