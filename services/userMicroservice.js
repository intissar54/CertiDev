const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const userProtoPath = path.join(__dirname, '../protos/user.proto');

const userProtoDefinition = protoLoader.loadSync(userProtoPath, {
  keepCase: true, longs: String, enums: String, defaults: true, oneofs: true,
});

const userProto = grpc.loadPackageDefinition(userProtoDefinition).user;

const server = new grpc.Server();

server.addService(userProto.UserService.service, {
  getUser: (call, callback) => {
    // Logique pour récupérer un utilisateur par ID
    const user = { id: call.request.user_id, name: 'John Doe', email: 'johndoe@example.com' }; // Exemple
    callback(null, user);
  },
  createUser: (call, callback) => {
    // Logique pour créer un utilisateur
    const user = { id: '12345', name: call.request.name, email: call.request.email }; // Exemple
    callback(null, user);
  },
});

const port = 50053;
server.bindAsync(`localhost:${port}`, grpc.ServerCredentials.createInsecure(), () => {
  console.log(`User service running on port ${port}`);
  server.start();
});
