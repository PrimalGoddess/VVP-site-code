import { ConnectorConfig, DataConnect, OperationOptions, ExecuteOperationResponse } from 'firebase-admin/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export interface CreateSessionData {
  session_insert: Session_Key;
}

export interface CreateSessionVariables {
  userId: UUIDString;
  sessionToken: string;
  userAgent?: string | null;
  ipAddress?: string | null;
  expiresAt: TimestampString;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  email: string;
  passwordHash: string;
}

export interface DeleteSessionData {
  session_delete?: Session_Key | null;
}

export interface DeleteSessionVariables {
  id: UUIDString;
}

export interface GetUserByEmailData {
  users: ({
    id: UUIDString;
    email: string;
    passwordHash: string;
  } & User_Key)[];
}

export interface GetUserByEmailVariables {
  email: string;
}

export interface PasswordResetToken_Key {
  id: UUIDString;
  __typename?: 'PasswordResetToken_Key';
}

export interface Session_Key {
  id: UUIDString;
  __typename?: 'Session_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

/** Generated Node Admin SDK operation action function for the 'CreateUser' Mutation. Allow users to execute without passing in DataConnect. */
export function createUser(dc: DataConnect, vars: CreateUserVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateUserData>>;
/** Generated Node Admin SDK operation action function for the 'CreateUser' Mutation. Allow users to pass in custom DataConnect instances. */
export function createUser(vars: CreateUserVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateUserData>>;

/** Generated Node Admin SDK operation action function for the 'GetUserByEmail' Query. Allow users to execute without passing in DataConnect. */
export function getUserByEmail(dc: DataConnect, vars: GetUserByEmailVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetUserByEmailData>>;
/** Generated Node Admin SDK operation action function for the 'GetUserByEmail' Query. Allow users to pass in custom DataConnect instances. */
export function getUserByEmail(vars: GetUserByEmailVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetUserByEmailData>>;

/** Generated Node Admin SDK operation action function for the 'CreateSession' Mutation. Allow users to execute without passing in DataConnect. */
export function createSession(dc: DataConnect, vars: CreateSessionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateSessionData>>;
/** Generated Node Admin SDK operation action function for the 'CreateSession' Mutation. Allow users to pass in custom DataConnect instances. */
export function createSession(vars: CreateSessionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateSessionData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteSession' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteSession(dc: DataConnect, vars: DeleteSessionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteSessionData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteSession' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteSession(vars: DeleteSessionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteSessionData>>;

