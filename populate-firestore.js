const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// ⚠️ IMPORTANT: Vous devez obtenir votre fichier de clés (serviceAccountKey.json) depuis Firebase Console
// 1. Allez à Firebase Console > votre projet > Paramètres > Comptes de service
// 2. Cliquez "Générer une nouvelle clé privée"
// 3. Sauvegardez le fichier JSON dans le dossier scripts/

const serviceAccount = require('./serv-account-firestore.json');

// Initialiser Firebase Admin
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: 'ervan-cv'
  });
} catch (error) {
  if (!error.message.includes('already initialized')) {
    throw error;
  }
}

const db = admin.firestore();

// Charger les données depuis le fichier JSON
const dataPath = path.join(__dirname, './siteervan-export.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

async function populateFirestore() {
  try {
    console.log('🚀 Début du remplissage de Firestore...');

    // Créer la structure: default/main/
    const defaultRef = db.collection('default').doc('cv');

    // ==========================================
    // Peupler les expériences
    // ==========================================
    console.log('📝 Ajout des expériences...');
    const experiencesRef = defaultRef.collection('experiences');

    for (const [key, experience] of Object.entries(data.experiences)) {
      const docId = `experience_${experience.id}`;
      await experiencesRef.doc(docId).set({
        ...experience,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log(`  ✓ ${experience.societe} (${docId})`);
    }

    // ==========================================
    // Peupler les études
    // ==========================================
    console.log('📚 Ajout des études...');
    const etudesRef = defaultRef.collection('etudes');

    for (const [key, etude] of Object.entries(data.etudes)) {
      const docId = `etude_${etude.id}`;
      await etudesRef.doc(docId).set({
        ...etude,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log(`  ✓ ${etude.nomFormation} (${docId})`);
    }

    console.log('\n✅ Firestore a été peuplé avec succès!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Erreur lors du remplissage:', error);
    process.exit(1);
  }
}

populateFirestore();
