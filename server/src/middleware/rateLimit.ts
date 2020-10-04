import { getGraphQLRateLimiter } from "graphql-rate-limit";
import { MiddlewareFn } from "type-graphql";
import { ApolloError } from "apollo-server-express";

const rateLimiter = getGraphQLRateLimiter({ identifyContext: (context) => context.ip });

export function rateLimit(max: number, window: number): MiddlewareFn {
  return async ({ args, context, info }, next) => {
    const errorMessage = await rateLimiter(
      { parent: undefined, args, context, info },
      { max: max, window: `${window}s` }
    );
    if (errorMessage) throw new ApolloError(errorMessage, "429");
    return next();
  };
}
