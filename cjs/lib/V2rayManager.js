var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};
var V2rayManager_exports = {};
__export(V2rayManager_exports, {
  V2rayManager: () => V2rayManager
});
module.exports = __toCommonJS(V2rayManager_exports);
var import_grpc_js = __toESM(require("@grpc/grpc-js"), 1);
var import_protobufjs = __toESM(require("protobufjs"), 1);
var import_config = require("../config.js");
var _initProtobufRoot, initProtobufRoot_fn, _initServices, initServices_fn, _createGrpcClient, createGrpcClient_fn, _loadAnyMessage, loadAnyMessage_fn, _verifyMessage, verifyMessage_fn, _responseToObject, responseToObject_fn, _error, error_fn, _alterInbound, alterInbound_fn;
const path = require("path");
const SERVICES_PROTO_PATH = {
  hanlder: "app/proxyman/command/command.proto",
  stats: "app/stats/command/command.proto",
  logger: "app/log/command/config.proto"
};
const SERVICES = {
  handler: "v2ray.core.app.proxyman.command.HandlerService",
  stats: "v2ray.core.app.stats.command.StatsService",
  logger: "v2ray.core.app.log.command.LoggerService"
};
const ACCOUNT_PROTO_PATH = {
  torjan: "proxy/trojan/config.proto",
  vmess: "proxy/vmess/account.proto",
  vless: "proxy/vless/account.proto"
};
const PROXYMAN_OPERATIONS = {
  addUser: "v2ray.core.app.proxyman.command.AddUserOperation",
  removeUser: "v2ray.core.app.proxyman.command.RemoveUserOperation"
};
const ACCOUNTS = {
  torjan: "v2ray.core.proxy.torjan.Account",
  vmess: "v2ray.core.proxy.vmess.Account",
  vless: "v2ray.core.proxy.vless.Account"
};
const RECEIVER_SETTING = "v2ray.core.app.proxyman.ReceiverConfig";
const PROXY_SETTINGS = {
  trojan: "v2ray.core.proxy.trojan.ServerConfig",
  vmess: "v2ray.core.proxy.vmess.inbound.Config",
  vless: "v2ray.core.proxy.vless.inbound.Config"
};
const NEEDED_PROTOS = [
  "app/proxyman/config.proto",
  "proxy/vmess/inbound/config.proto",
  "proxy/vless/inbound/config.proto",
  "proxy/trojan/config.proto"
];
class V2rayManager {
  constructor(grpcServerUrl) {
    __privateAdd(this, _initProtobufRoot);
    __privateAdd(this, _initServices);
    __privateAdd(this, _createGrpcClient);
    __privateAdd(this, _loadAnyMessage);
    __privateAdd(this, _verifyMessage);
    __privateAdd(this, _responseToObject);
    __privateAdd(this, _error);
    __privateAdd(this, _alterInbound);
    this.grpcServerUrl = grpcServerUrl;
    this.root = new import_protobufjs.default.Root();
    __privateMethod(this, _initProtobufRoot, initProtobufRoot_fn).call(this);
    this.services = {};
    __privateMethod(this, _initServices, initServices_fn).call(this);
  }
  getSysStats() {
    return new Promise((resolve, reject) => {
      this.services.stats.GetSysStats({}, (error, response) => {
        if (error) {
          __privateMethod(this, _error, error_fn).call(this, "GetSysStats", error);
          resolve({
            error: {
              code: error.code,
              details: error.details
            }
          });
          return false;
        }
        resolve(__privateMethod(this, _responseToObject, responseToObject_fn).call(this, response));
      });
    });
  }
  queryStats(pattern, reset) {
    pattern = pattern || "";
    reset = reset || false;
    return new Promise((resolve, reject) => {
      this.services.stats.QueryStats(
        {
          patterns: [pattern],
          reset,
          regexp: true
        },
        (error, response) => {
          if (error) {
            __privateMethod(this, _error, error_fn).call(this, "QueryStats", error);
            resolve({
              error: {
                code: error.code,
                details: error.details
              }
            });
            return;
          }
          resolve(__privateMethod(this, _responseToObject, responseToObject_fn).call(this, response));
        }
      );
    });
  }
  getStats(name, reset) {
    return new Promise((resolve, reject) => {
      this.services.stats.GetStats(
        {
          name,
          reset
        },
        (error, response) => {
          if (error) {
            __privateMethod(this, _error, error_fn).call(this, "GetStats", error);
            resolve({
              error: {
                code: error.code,
                details: error.details
              }
            });
            return;
          }
          resolve(__privateMethod(this, _responseToObject, responseToObject_fn).call(this, response));
        }
      );
    });
  }
  restartLogger() {
    return new Promise((resolve, reject) => {
      this.services.logger.RestartLogger({}, (error, response) => {
        if (error) {
          __privateMethod(this, _error, error_fn).call(this, "RestartLogger", error);
          resolve({
            error: {
              code: error.code,
              details: error.details
            }
          });
          return;
        }
        resolve(__privateMethod(this, _responseToObject, responseToObject_fn).call(this, response));
      });
    });
  }
  followLog(resolve) {
    this.services.logger.FollowLog({}, (error, response) => {
      if (error) {
        __privateMethod(this, _error, error_fn).call(this, "FollowLog", error);
        resolve({
          error: {
            code: error.code,
            details: error.details
          }
        });
        return;
      }
      resolve(__privateMethod(this, _responseToObject, responseToObject_fn).call(this, response));
    });
  }
  alterOutbound(tag, operation) {
    return new Promise((resolve, reject) => {
      this.services.handler.AlterOutbound(
        {
          tag,
          operation
        },
        (error, response) => {
          if (error) {
            __privateMethod(this, _error, error_fn).call(this, "AlterOutbound", error);
            resolve({
              error: {
                code: error.code,
                details: error.details
              }
            });
            return;
          }
          resolve(response);
        }
      );
    });
  }
  addInbound(settings) {
    return new Promise((resolve, reject) => {
      let message = {
        inbound: {
          tag: settings.tag,
          receiver_settings: __privateMethod(this, _loadAnyMessage, loadAnyMessage_fn).call(this, RECEIVER_SETTING, {
            port_range: {
              from: settings.port,
              to: settings.port
            },
            listen: settings.listen.match(/\d+\.\d+\.\d+\.\d+/) ? { ip: settings.listen } : { domain: settings.listen },
            allocation_strategy: settings.allocate || {},
            stream_settings: settings.streamSettings || {},
            receive_original_destination: false,
            sniffing_settings: settings.sniffing || {}
          }),
          proxy_settings: __privateMethod(this, _loadAnyMessage, loadAnyMessage_fn).call(this, PROXY_SETTINGS[settings.protocol], settings.settings)
        }
      };
      this.services.handler.AddInbound(message, (error, response) => {
        if (error) {
          __privateMethod(this, _error, error_fn).call(this, "AddInbound", error);
          resolve({
            error: {
              code: error.code,
              details: error.details
            }
          });
          return;
        }
        resolve(response);
      });
    });
  }
  async addInboundUser(accountType, user, tag) {
    let operation = __privateMethod(this, _loadAnyMessage, loadAnyMessage_fn).call(this, PROXYMAN_OPERATIONS.addUser, {
      user: {
        level: user.level || 0,
        email: user.email || "",
        account: __privateMethod(this, _loadAnyMessage, loadAnyMessage_fn).call(this, ACCOUNTS[accountType], user.account || {}, ACCOUNT_PROTO_PATH.torjan)
      }
    });
    return __privateMethod(this, _responseToObject, responseToObject_fn).call(this, await __privateMethod(this, _alterInbound, alterInbound_fn).call(this, tag, operation));
  }
  async removeInboundUser(email, tag) {
    let operation = __privateMethod(this, _loadAnyMessage, loadAnyMessage_fn).call(this, PROXYMAN_OPERATIONS.removeUser, {
      email
    });
    return __privateMethod(this, _responseToObject, responseToObject_fn).call(this, await __privateMethod(this, _alterInbound, alterInbound_fn).call(this, tag, operation));
  }
}
_initProtobufRoot = new WeakSet();
initProtobufRoot_fn = function() {
  this.root.resolvePath = function(origin, target) {
    if (/^google\//.test(target))
      return null;
    const originPath = path.join(__dirname, "..", "..", "proto");
    return import_protobufjs.default.util.path.resolve(`${originPath}/`, target || origin);
  };
};
_initServices = new WeakSet();
initServices_fn = function() {
  this.root.loadSync(SERVICES_PROTO_PATH.hanlder);
  let HandlerServiceDefinition = this.root.lookup(SERVICES.handler);
  this.services.handler = __privateMethod(this, _createGrpcClient, createGrpcClient_fn).call(this, HandlerServiceDefinition);
  this.root.loadSync(SERVICES_PROTO_PATH.stats);
  let StatsServiceDefinition = this.root.lookup(SERVICES.stats);
  this.services.stats = __privateMethod(this, _createGrpcClient, createGrpcClient_fn).call(this, StatsServiceDefinition);
  this.root.loadSync(SERVICES_PROTO_PATH.logger);
  let LoggerServiceDefinition = this.root.lookup(SERVICES.logger);
  this.services.logger = __privateMethod(this, _createGrpcClient, createGrpcClient_fn).call(this, LoggerServiceDefinition);
  NEEDED_PROTOS.forEach((proto) => {
    this.root.loadSync(proto);
  });
};
_createGrpcClient = new WeakSet();
createGrpcClient_fn = function(ServiceDefinition) {
  const methods = Object.fromEntries(
    Object.entries(ServiceDefinition.methods).map(([name, method]) => {
      method.resolve();
      return [
        name,
        {
          path: `${ServiceDefinition.fullName.slice(1)}/${name}`,
          requestStream: method.requestStream,
          responseStream: method.responseStream,
          requestType: method.resolvedRequestType.ctor,
          responseType: method.resolvedResponseType.ctor,
          requestSerialize: (message) => {
            let res = method.resolvedRequestType.encode(message).finish();
            return res;
          },
          requestDeserialize: (bytes) => {
            return method.resolvedRequestType.decode(bytes);
          },
          responseSerialize: (message) => {
            return method.resolvedResponseType.encode(message).finish();
          },
          responseDeserialize: (bytes) => {
            return method.resolvedResponseType.decode(bytes);
          }
        }
      ];
    })
  );
  const serviceName = ServiceDefinition.fullName.slice(1);
  const ClientConstructor = import_grpc_js.default.makeGenericClientConstructor(methods, serviceName);
  const client = new ClientConstructor(this.grpcServerUrl, import_grpc_js.default.credentials.createInsecure());
  return client;
};
_loadAnyMessage = new WeakSet();
loadAnyMessage_fn = function(type_url, message, protoPath) {
  if (protoPath) {
    this.root.loadSync(protoPath);
  }
  let AnyMessage = this.root.lookupType(type_url);
  let originMessage = AnyMessage.create(message);
  let verifiedRes = AnyMessage.verify(originMessage);
  if (verifiedRes) {
    __privateMethod(this, _error, error_fn).call(this, "loadAnyMessage", verifiedRes);
  }
  let anyMessageBuffer = AnyMessage.encode(originMessage).finish();
  let anyMessage = {
    type_url,
    value: anyMessageBuffer
  };
  return anyMessage;
};
_verifyMessage = new WeakSet();
verifyMessage_fn = function(type_url, message, protoPath) {
  if (protoPath) {
    this.root.loadSync(protoPath);
  }
  let TheMessage = this.root.lookupType(type_url);
  let originMessage = TheMessage.create(message);
  let verifiedRes = TheMessage.verify(originMessage);
  if (verifiedRes) {
    __privateMethod(this, _error, error_fn).call(this, "loadAnyMessage", verifiedRes);
    return false;
  }
  return true;
};
_responseToObject = new WeakSet();
responseToObject_fn = function(message) {
  let messagePath = `${message.$type.parent.fullName.slice(1)}.${message.$type.name}`;
  let Message = this.root.lookupType(messagePath);
  return Message.toObject(message, {
    longs: String,
    enums: String,
    bytes: String
  });
};
_error = new WeakSet();
error_fn = function(method, error) {
  console.error(`[V2ray API] [${method}] Error: `, error.details || error);
};
_alterInbound = new WeakSet();
alterInbound_fn = function(tag, operation) {
  return new Promise((resolve, reject) => {
    this.services.handler.AlterInbound(
      {
        tag,
        operation
      },
      (error, response) => {
        if (error) {
          __privateMethod(this, _error, error_fn).call(this, "AlterInbound", error);
          resolve({
            error: {
              code: error.code,
              details: error.details
            }
          });
          return;
        }
        resolve(response);
      }
    );
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  V2rayManager
});
//# sourceMappingURL=V2rayManager.js.map
