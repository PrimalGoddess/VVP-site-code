import {validateAdminArgs} from "firebase-admin/data-connect";

const connectorConfig = {
  connector: "example",
  serviceId: "vvp-site-code",
  location: "us-east4"
};
const _connectorConfig = connectorConfig;
export {_connectorConfig as connectorConfig};

function createUser(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation("CreateUser", inputVars, inputOpts);
}
const _createUser = createUser;
export {_createUser as createUser};

function getUserByEmail(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery("GetUserByEmail", inputVars, inputOpts);
}
const _getUserByEmail = getUserByEmail;
export {_getUserByEmail as getUserByEmail};

function createSession(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation("CreateSession", inputVars, inputOpts);
}
const _createSession = createSession;
export {_createSession as createSession};

function deleteSession(dcOrVarsOrOptions, varsOrOptions, options) {
  const {dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation("DeleteSession", inputVars, inputOpts);
}
const _deleteSession = deleteSession;
export {_deleteSession as deleteSession};
