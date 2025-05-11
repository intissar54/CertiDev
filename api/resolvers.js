const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Chargement des fichiers proto pour certificat et compétence
const certificatProtoPath = path.join(__dirname, '../protos/certificat.proto');
const competenceProtoPath = path.join(__dirname, '../protos/competence.proto');
const userProtoPath = path.join(__dirname, '../protos/user.proto'); // UserService gRPC

// Chargement des définitions des fichiers proto
const certificatProtoDefinition = protoLoader.loadSync(certificatProtoPath, {
  keepCase: true, longs: String, enums: String, defaults: true, oneofs: true,
});
const competenceProtoDefinition = protoLoader.loadSync(competenceProtoPath, {
  keepCase: true, longs: String, enums: String, defaults: true, oneofs: true,
});
const userProtoDefinition = protoLoader.loadSync(userProtoPath, {
  keepCase: true, longs: String, enums: String, defaults: true, oneofs: true,
});

// Chargement des services gRPC
const certificatProto = grpc.loadPackageDefinition(certificatProtoDefinition).certificat;
const competenceProto = grpc.loadPackageDefinition(competenceProtoDefinition).competence;
const userProto = grpc.loadPackageDefinition(userProtoDefinition).user;

// Résolveurs GraphQL
const resolvers = {
  Query: {
    // Récupérer un certificat par ID
    certificat: (_, { id }) => {
      const client = new certificatProto.CertificatService('localhost:50051', grpc.credentials.createInsecure());
      return new Promise((resolve, reject) => {
        client.getCertificat({ certificat_id: id }, (err, res) => {
          if (err) reject(err);
          else resolve(res);
        });
      });
    },
    // Rechercher des certificats
    certificats: (_, { query }) => {
      const client = new certificatProto.CertificatService('localhost:50051', grpc.credentials.createInsecure());
      return new Promise((resolve, reject) => {
        client.searchCertificats({ query }, (err, res) => {
          if (err) reject(err);
          else resolve(res.certificats);
        });
      });
    },
    // Récupérer une compétence par ID
    competence: (_, { id }) => {
      const client = new competenceProto.CompetenceService('localhost:50052', grpc.credentials.createInsecure());
      return new Promise((resolve, reject) => {
        client.getCompetence({ competence_id: id }, (err, res) => {
          if (err) reject(err);
          else resolve(res);
        });
      });
    },
    // Rechercher des compétences
    competences: (_, { query }) => {
      const client = new competenceProto.CompetenceService('localhost:50052', grpc.credentials.createInsecure());
      return new Promise((resolve, reject) => {
        client.searchCompetences({ query }, (err, res) => {
          if (err) reject(err);
          else resolve(res.competences);
        });
      });
    },
    // Récupérer un utilisateur par ID
    user: (_, { id }) => {
      const client = new userProto.UserService('localhost:50053', grpc.credentials.createInsecure());
      return new Promise((resolve, reject) => {
        client.getUser({ user_id: id }, (err, res) => {
          if (err) reject(err);
          else resolve(res);
        });
      });
    },
  },

  Mutation: {
    // Créer un certificat
    createCertificat: (_, { nom, organisation, date_obtention }) => {
      const client = new certificatProto.CertificatService('localhost:50051', grpc.credentials.createInsecure());
      return new Promise((resolve, reject) => {
        client.createCertificat({ nom, organisation, date_obtention }, (err, res) => {
          if (err) reject(err);
          else resolve(res);
        });
      });
    },
    // Mettre à jour un certificat
    updateCertificat: (_, { id, nom, organisation, date_obtention }) => {
      const client = new certificatProto.CertificatService('localhost:50051', grpc.credentials.createInsecure());
      return new Promise((resolve, reject) => {
        client.updateCertificat({ 
          certificat_id: id, 
          nom, 
          organisation, 
          date_obtention 
        }, (err, res) => {
          if (err) reject(err);
          else resolve(res);
        });
      });
    },
    // Supprimer un certificat
    deleteCertificat: (_, { id }) => {
      const client = new certificatProto.CertificatService('localhost:50051', grpc.credentials.createInsecure());
      return new Promise((resolve, reject) => {
        client.deleteCertificat({ certificat_id: id }, (err, res) => {
          if (err) reject(err);
          else resolve(res);
        });
      });
    },
    // Créer une compétence
    createCompetence: (_, { nom, niveau, categorie }) => {
      const client = new competenceProto.CompetenceService('localhost:50052', grpc.credentials.createInsecure());
      return new Promise((resolve, reject) => {
        client.createCompetence({ nom, niveau, categorie }, (err, res) => {
          if (err) reject(err);
          else resolve(res);
        });
      });
    },
    // Mettre à jour une compétence
    updateCompetence: (_, { id, nom, niveau, categorie }) => {
      const client = new competenceProto.CompetenceService('localhost:50052', grpc.credentials.createInsecure());
      return new Promise((resolve, reject) => {
        client.updateCompetence({ 
          competence_id: id, 
          nom, 
          niveau, 
          categorie 
        }, (err, res) => {
          if (err) reject(err);
          else resolve(res);
        });
      });
    },
    // Supprimer une compétence
    deleteCompetence: (_, { id }) => {
      const client = new competenceProto.CompetenceService('localhost:50052', grpc.credentials.createInsecure());
      return new Promise((resolve, reject) => {
        client.deleteCompetence({ competence_id: id }, (err, res) => {
          if (err) reject(err);
          else resolve(res);
        });
      });
    },
    // Créer un utilisateur
    createUser: (_, { name, email }) => {
      const client = new userProto.UserService('localhost:50053', grpc.credentials.createInsecure());
      return new Promise((resolve, reject) => {
        client.createUser({ name, email }, (err, res) => {
          if (err) reject(err);
          else resolve(res);
        });
      });
    },
  }
};

module.exports = resolvers;
