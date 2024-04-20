import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {collection, getDocs,getDoc,doc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCNfV0qe3WLDQ-fv97MhvSQKrlfW4ws9JY",
  authDomain: "news-media-ea4e2.firebaseapp.com",
  projectId: "news-media-ea4e2",
  storageBucket: "news-media-ea4e2.appspot.com",
  messagingSenderId: "301906506874",
  appId: "1:301906506874:web:73f376184175ba6906f7c3",
  measurementId: "G-WKQ74C5HPZ"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };

// Update fetchUserData in firebase.js
export const fetchUserData = async () => {
  const usersCollection = collection(firestore, 'users');
  const usersSnapshot = await getDocs(usersCollection);

  // Convert the snapshot data to an array of user objects
  const usersData = usersSnapshot.docs.map((doc) => doc.data());

  return usersData;
};

 // Define fetchUserDataById function
 export const fetchUserDataById = async (userId) => {
  try {
    // Fetch user document from Firestore using the provided user ID
    const userDoc = await getDoc(doc(firestore, 'users', userId));
    if (userDoc.exists()) {
      // If user document exists, return user data
      return userDoc.data();
    } else {
      // If user document does not exist, log error and return null
      console.log('User document does not exist');
      return null;
    }
  } catch (error) {
    // Handle any errors that occur during fetching
    console.error('Error fetching user data by ID:', error);
    return null;
  }
};
