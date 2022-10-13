import { GraphQLScalarType, Kind } from 'graphql';
import moment from 'moment';

const durationScalar = new GraphQLScalarType({
  name: 'Duration',
  description: 'Duration custom scalar type',
  serialize(value) {
    return value;
  },
  parseValue(value) {
    return value;
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      // Convert hard-coded AST string to integer and then to Date
      return parseFloat(ast.value, 10);
    }
    // Invalid hard-coded value (not an integer)
    return null;
  },
});

export default durationScalar