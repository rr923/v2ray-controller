var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var esm_exports = {};
__export(esm_exports, {
  V2rayManager: () => import_V2rayManager.V2rayManager
});
module.exports = __toCommonJS(esm_exports);
var import_V2rayManager = require("./lib/V2rayManager.js");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  V2rayManager
});
//# sourceMappingURL=index.js.map
