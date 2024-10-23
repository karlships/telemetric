"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelemetricProvider = TelemetricProvider;
exports.useTelemetric = useTelemetric;
var react_1 = __importStar(require("react"));
var telemetric_1 = __importDefault(require("../javascript/telemetric"));
var TelemetricContext = (0, react_1.createContext)(undefined);
function TelemetricProvider(_a) {
    var children = _a.children, projectId = _a.projectId, version = _a.version, _b = _a.trackOnLocalhost, trackOnLocalhost = _b === void 0 ? false : _b;
    (0, react_1.useEffect)(function () {
        telemetric_1.default.init(projectId, version, trackOnLocalhost);
    }, [projectId, version, trackOnLocalhost]);
    var value = {
        event: telemetric_1.default.event.bind(telemetric_1.default),
        revenue: telemetric_1.default.revenue.bind(telemetric_1.default),
        getUserId: telemetric_1.default.getUserID.bind(telemetric_1.default),
        saveUserId: telemetric_1.default.saveUserID.bind(telemetric_1.default),
    };
    return (react_1.default.createElement(TelemetricContext.Provider, { value: value }, children));
}
function useTelemetric() {
    var context = (0, react_1.useContext)(TelemetricContext);
    if (context === undefined) {
        throw new Error("useTelemetric must be used within a TelemetricProvider");
    }
    return context;
}
