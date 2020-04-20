const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

// Hardcoded data
const customers = [
    {id: '1', name: 'John Doe', email: 'jdoe@gmail.com', age: 35},
    {id: '2', name: 'Jane Moe', email: 'jMoe@gmail.com', age: 24},
    {id: '3', name: 'Sam Smith', email: 'ssmith@gmail.com', age: 42},
    {id: '4', name: 'Tim Thomas', email: 'tthomas@gmail.com', age: 31},
]

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
                for(let i = 0; i < customers.length; i++){
                    if(customers[i].id == args.id){
                        return customers[i]
                    }
                }
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})