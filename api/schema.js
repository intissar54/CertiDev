const { gql } = require('@apollo/server');

const typeDefs = `#graphql
  # Définition du type User
  type User {
    id: String!
    name: String!
    email: String!
  }

  # Définition du type Certificat
  type Certificat {
    id: String!
    nom: String!
    organisation: String!
    date_obtention: String!
  }

  # Définition du type Competence
  type Competence {
    id: String!
    nom: String!
    niveau: String!
    categorie: String!
  }

  # Définition du type de réponse de suppression
  type DeleteResponse {
    success: Boolean!
  }

  # Définition des Queries
  type Query {
    # Requête pour obtenir un utilisateur
    user(id: String!): User

    # Requête pour obtenir un certificat
    certificat(id: String!): Certificat
    
    # Requête pour obtenir une liste de certificats
    certificats(query: String): [Certificat]
    
    # Requête pour obtenir une compétence
    competence(id: String!): Competence
    
    # Requête pour obtenir une liste de compétences
    competences(query: String): [Competence]
  }

  # Définition des Mutations
  type Mutation {
    # Mutation pour créer un utilisateur
    createUser(name: String!, email: String!): User

    # Mutation pour créer un certificat
    createCertificat(nom: String!, organisation: String!, date_obtention: String!): Certificat
    
    # Mutation pour mettre à jour un certificat
    updateCertificat(id: String!, nom: String, organisation: String, date_obtention: String): Certificat
    
    # Mutation pour supprimer un certificat
    deleteCertificat(id: String!): DeleteResponse
    
    # Mutation pour créer une compétence
    createCompetence(nom: String!, niveau: String!, categorie: String!): Competence
    
    # Mutation pour mettre à jour une compétence
    updateCompetence(id: String!, nom: String, niveau: String, categorie: String): Competence
    
    # Mutation pour supprimer une compétence
    deleteCompetence(id: String!): DeleteResponse
  }
`;

module.exports = typeDefs;
