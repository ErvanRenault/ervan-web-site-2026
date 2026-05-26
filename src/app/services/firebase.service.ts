// firebase.service.ts
import { Injectable } from '@angular/core';
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import {environment} from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  app: FirebaseApp;
  firestore: Firestore;
  auth: Auth;

  constructor() {
    this.app = getApps().length
      ? getApps()[0]
      : initializeApp(environment.firebase);
    this.firestore = getFirestore(this.app);
    this.auth = getAuth(this.app);
  }
}
