import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  QueryConstraint,
  WithFieldValue,
  UpdateData,
  DocumentData,
} from 'firebase/firestore';
import { Observable, from, map } from 'rxjs';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class FirestoreRepositoryService {
  private db: Firestore;

  constructor(private firebase: FirebaseService) {
    this.db = this.firebase.firestore;
  }

  // ─────────────────────────────────────────────
  // READ
  // ─────────────────────────────────────────────

  /**
   * Récupère tous les documents d'une collection
   * @example getAll('default/main/experiences')
   */
  getAll<T>(collectionPath: string, ...constraints: QueryConstraint[]): Observable<T[]> {
    const ref = collection(this.db, collectionPath);
    const q = constraints.length ? query(ref, ...constraints) : ref;
    return from(getDocs(q)).pipe(
      map((snapshot) =>
        snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as T))
      )
    );
  }

  /**
   * Récupère un document par son ID
   * @example getById('default/main/experiences', 'cv')
   */
  getById<T>(collectionPath: string, id: string): Observable<T | undefined> {
    const ref = doc(this.db, collectionPath, id);
    return from(getDoc(ref)).pipe(
      map((snapshot) =>
        snapshot.exists()
          ? ({ id: snapshot.id, ...snapshot.data() } as T)
          : undefined
      )
    );
  }

  // ─────────────────────────────────────────────
  // WRITE
  // ─────────────────────────────────────────────

  /**
   * Ajoute un document avec ID auto-généré
   */
  add<T extends DocumentData>(collectionPath: string, data: WithFieldValue<T>): Observable<string> {
    const ref = collection(this.db, collectionPath);
    return from(addDoc(ref, data)).pipe(map((docRef) => docRef.id));
  }

  /**
   * Crée ou remplace un document avec un ID précis
   */
  set<T extends DocumentData>(collectionPath: string, id: string, data: WithFieldValue<T>): Observable<void> {
    const ref = doc(this.db, collectionPath, id);
    return from(setDoc(ref, data));
  }

  /**
   * Met à jour partiellement un document existant
   */
  update<T extends DocumentData>(collectionPath: string, id: string, data: UpdateData<T>): Observable<void> {
    const ref = doc(this.db, collectionPath, id);
    return from(updateDoc(ref, data));
  }

  /**
   * Supprime un document
   */
  delete(collectionPath: string, id: string): Observable<void> {
    const ref = doc(this.db, collectionPath, id);
    return from(deleteDoc(ref));
  }

  // ─────────────────────────────────────────────
  // Raccourcis pour ta structure :
  // default -> experiences -> cv | études
  // ─────────────────────────────────────────────

  /**
   * Récupère tous les documents de "experiences"
   * Path : default/{defaultId}/experiences
   */
  getExperiences<T>(defaultId: string = 'main'): Observable<T[]> {
    return this.getAll<T>(`default/${defaultId}/experiences`);
  }

  /**
   * Récupère la sous-collection "cv"
   * Path : default/{defaultId}/experiences/{experienceId}/cv
   */
  getCv<T>(defaultId: string = 'main', experienceId: string): Observable<T[]> {
    return this.getAll<T>(`default/${defaultId}/experiences/${experienceId}/cv`);
  }

  /**
   * Récupère la sous-collection "études"
   * Path : default/{defaultId}/experiences/{experienceId}/études
   */
  getEtudes<T>(defaultId: string = 'main', experienceId: string): Observable<T[]> {
    return this.getAll<T>(`default/${defaultId}/experiences/${experienceId}/études`);
  }
}
