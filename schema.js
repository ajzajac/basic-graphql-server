const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

// Hardcoded data
// const customers = [
//     {id: '1', name: 'John Doe', email: 'jdoe@gmail.com', age: 35},
//     {id: '2', name: 'Jane Moe', email: 'jMoe@gmail.com', age: 24},
//     {id: '3', name: 'Sam Smith', email: 'ssmith@gmail.com', age: 42},
//     {id: '4', name: 'Tim Thomas', email: 'tthomas@gmail.com', age: 31},
// ]

// Customer Type
const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt},
    })
})

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        customer: {
            type: CustomerType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parentValue, args){
                return axios.get('http://localhost:3000/customers/'+ args.id)
                    .then(resp => resp.data)

            }
        },
    
    customers: {
        type: new GraphQLList(CustomerType),
        resolve(parentValue, args){
            return axios.get('http://localhost:3000/customers/')
            .then(resp => resp.data)
        }
    }
}
})

// Mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addCustomer:{
            type: CustomerType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)},
            },
            resolve(parentValue, args){
                return axios.post('http://localhost:3000/customers', {
                    name: args.name,
                    email: args.email,
                    age: args.age
                })
                .then(resp => resp.data)
            }
        },
        deleteCustomer:{
            type: CustomerType,
            args: {
                id:{type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, args){
                return axios.delete('http://localhost:3000/customers/'+args.id)
                .then(resp => resp.data)
            }
        },
        editCustomer:{
            type: CustomerType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)},
                name: {type: GraphQLString},
                email: {type: GraphQLString},
                age: {type: GraphQLInt},
            },
            resolve(parentValue, args){
                return axios.patch('http://localhost:3000/customers/'+args.id, args)
                .then(resp => resp.data)
            }
        },
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})