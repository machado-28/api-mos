"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _crypto = _interopRequireDefault(require("crypto"));
var _path = require("path");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = {
  storage: _multer.default.diskStorage({
    destination: (0, _path.resolve)(__dirname, '..', '..', 'temp', 'upload'),
    filename: (req, file, cb) => {
      _crypto.default.randomBytes(16, (err, res) => {
        if (err) return cd(err);
        return cb(null, res.toLocaleString('hex') + (0, _path.extname)(file.originalname));
      });
    }
  })
};