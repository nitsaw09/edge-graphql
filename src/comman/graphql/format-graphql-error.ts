import { GraphQLError } from 'graphql';

export const formatGraphQLError = (error: GraphQLError) => {
  const { originalError } = error.extensions;
  return {
    message: error.message,
    originalError,
    ...(process.env.NODE_ENV === 'development' && { stack: error.extensions?.stacktrace }), // optional
  };
};
