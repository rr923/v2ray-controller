var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var import_fs = __toESM(require("fs"), 1);
var import_config = require("../config.js");
const mkdirAndCp = (originFile, targetFile) => {
  let targetDir = targetFile.substring(0, targetFile.lastIndexOf("/"));
  import_fs.default.mkdirSync(targetDir, { recursive: true });
  import_fs.default.copyFileSync(originFile, targetFile);
};
const cpProtoFiles = async (V2RAY_CORE_PATH2, target_path) => {
  import_fs.default.readdirSync(V2RAY_CORE_PATH2).forEach((file) => {
    if (file.endsWith(".proto")) {
      mkdirAndCp(`${V2RAY_CORE_PATH2}/${file}`, `${target_path}/${file}`);
    } else {
      import_fs.default.statSync(`${V2RAY_CORE_PATH2}/${file}`).isDirectory() && cpProtoFiles(`${V2RAY_CORE_PATH2}/${file}`, `${target_path}/${file}`);
    }
  });
};
const main = async () => {
  cpProtoFiles(import_config.V2RAY_CORE_PATH, import_config.PROTOS_DIR);
  console.info("INFO: proto files sync done.");
};
main();
//# sourceMappingURL=sync_proto_files.js.map
