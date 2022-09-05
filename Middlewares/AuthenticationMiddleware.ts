import { Request, Response, NextFunction, response } from "express";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import admin from "firebase-admin";
import { GenerateValidationResponse } from "../Exceptions/ValidationHandler";
import { getCurrentUser } from "../Services/SessionHandler";


const firebase = admin.initializeApp({
    credential: admin.credential.cert('./firebase/firebasesdkkey.json')
});

// async function Login() {

//     try {

//         const loginResponse = await signInWithEmailAndPassword(auth, 'alam@gmail.com', '123456');
//         const token = await loginResponse.user.getIdToken();

//     } catch (error) {

//         console.log(error);
//     }

// }

async function AuthorizationHandler(req: Request, res: Response, next: NextFunction) {

    // anonymous api paths
    const anonymousPaths = ['/', '/api/v1/company', '/api/v1/companies'];

    // verifing if the current path need token validations
    if (!anonymousPaths.includes(req.path)) {

        try {
            // getting token from headers
            let token = req.headers['authorization']?.split(' ')[1];
            if (token === undefined) {
                return res.status(403).send({ message: "Invalid token" })
            }
            // verify token with firebase
            const userToken = await firebase.auth().verifyIdToken(token ?? "");

            await getCurrentUser(userToken.uid);
            // if token is valid continue
            return next();

        } catch (error) {

            // firebase error
            const firebaseError = (error as FirebaseError);

            if (firebaseError.code === "auth/id-token-expired") {
                const validationResponse = GenerateValidationResponse({ Message: "Token expired", Code: 403 });
                return res.status(403).send(validationResponse)
            }

            if (firebaseError.code === "auth/invalid-id-token" || firebaseError.code === "auth/argument-error") {
                const validationResponse = GenerateValidationResponse({ Message: "Invalid token", Code: 403 });
                return res.status(403).send(validationResponse)
            }

            return res.status(500).send({ Message: "An error has ocurred" });
        }
    }

}

export default AuthorizationHandler;