import { Auth0Error } from 'auth0-js';
import { format } from 'util';

export interface Auth0Rule {
  readonly message: string;
  readonly format?: unknown[];
  readonly verified: boolean;
  readonly items?: ReadonlyArray<{
    readonly message: string;
    readonly format?: unknown[];
    readonly verified: boolean;
  }>;
}
// Auth0 errors are actually more complex than the typings claim
export type WebAuthError = Auth0Error & {
  readonly description?: null | string | { rules: ReadonlyArray<Auth0Rule> };
};

const knownErrorCodeMessages: Record<string, string> = {
  invalid_user_password:
    'Your e-mail or password is incorrect. Ensure this is the log in method you used to set up your account.',
};

// Auth0 API has very inconsistent error formats
const extractRuleErrorMessage = (rules: ReadonlyArray<Auth0Rule>): string =>
  rules
    .filter(({ verified }) => !verified)
    .flatMap(
      ({ message: ruleMessage, format: ruleFormat = [], items = [] }) => [
        format(ruleMessage, ...ruleFormat),
        ...items.map(
          ({ message: itemMessage, format: itemFormat = [], verified }) =>
            `${verified ? '✔' : '✖'} ${format(itemMessage, ...itemFormat)}`,
        ),
      ],
    )
    .join('\n');
export const extractErrorMessage = (error: WebAuthError | Error): string =>
  ('code' in error && error.code && knownErrorCodeMessages[error.code]) ||
  ('error_description' in error && error.error_description) ||
  ('errorDescription' in error && error.errorDescription) ||
  ('description' in error &&
    error.description &&
    (typeof error.description === 'object'
      ? extractRuleErrorMessage(error.description.rules)
      : error.description)) ||
  ('message' in error &&
    error.message &&
    `Unknown authentication error: ${error.message}`) ||
  `Unknown authentication error: ${error.name}`;
