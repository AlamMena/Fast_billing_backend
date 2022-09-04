"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("firebase/auth");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const FirebaseAppConfig_1 = __importDefault(require("../Firebase/FirebaseAppConfig"));
const ValidationHandler_1 = require("../Exceptions/ValidationHandler");
const firebase = firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert('./firebase/firebasesdkkey.json')
});
const auth = (0, auth_1.getAuth)(FirebaseAppConfig_1.default.app);
function Login() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const loginResponse = yield (0, auth_1.signInWithEmailAndPassword)(auth, 'alam@gmail.com', '123456');
            const token = yield loginResponse.user.getIdToken();
        }
        catch (error) {
            console.log(error);
        }
    });
}
function AuthorizationHandler(req, resp, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        // anonymous api paths
        const anonymousPaths = ['/', '/api/v1/company'];
        // verifing if the current path need token validations
        if (!anonymousPaths.includes(req.path)) {
            try {
                // getting token from headers
                let token = (_b = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) !== null && _b !== void 0 ? _b : "";
                if (token === undefined) {
                    resp.status(403).send({ message: "Invalid token" });
                }
                // verify token with firebase
                yield firebase.auth().verifyIdToken(token);
                // if token is valid continue
                next();
            }
            catch (error) {
                // firebase error
                const firebaseError = error;
                if (firebaseError.code === "auth/id-token-expired") {
                    const validationResponse = (0, ValidationHandler_1.GenerateValidationResponse)({ Message: "Token expired", Code: 403 });
                    resp.status(403).send(validationResponse);
                }
                if (firebaseError.code === "auth/invalid-id-token" || firebaseError.code === "auth/argument-error") {
                    const validationResponse = (0, ValidationHandler_1.GenerateValidationResponse)({ Message: "Invalid token", Code: 403 });
                    resp.status(403).send(validationResponse);
                }
                resp.status(500).send({ Message: "An error has ocurred" });
            }
        }
        return next();
    });
}
exports.default = AuthorizationHandler;
