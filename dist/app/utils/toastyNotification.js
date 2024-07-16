"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Notify = Notify;
exports.NotifyError = NotifyError;
var _reactToastify = require("react-toastify");
function NotifyError(message) {
  _reactToastify.toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: _reactToastify.Bounce
  });
}
function Notify(message) {
  _reactToastify.toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: _reactToastify.Bounce
  });
}