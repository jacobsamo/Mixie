import { Timestamp } from "firebase/firestore";

export interface User {
    uid: string;
    photoURL: string;
    createdAt: string | Timestamp;
    displayName: string;
    userName: string;
    email: string;
}