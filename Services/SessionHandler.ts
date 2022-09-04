import admin from 'firebase-admin'
import app from 'firebase-admin'

let currentUser: IUserTenant;
interface IUserTenant {
    uid: string
    companyId: string
}
const getCurrentUser = async (uid: string) => {
    const user = await app.auth().getUser(uid);
    currentUser = {
        uid: user.uid,
        companyId: user.customClaims?.companyId
    } as IUserTenant;
    return currentUser;
}

export { getCurrentUser, currentUser }