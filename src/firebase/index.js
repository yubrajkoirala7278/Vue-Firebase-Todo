import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCHwaNUi4xzdeH-UTwKlt_xCWDaFnSapvI',
  authDomain: 'badass-todo-370c6.firebaseapp.com',
  projectId: 'badass-todo-370c6',
  storageBucket: 'badass-todo-370c6.appspot.com',
  messagingSenderId: '649833834622',
  appId: '1:649833834622:web:717a70fa53751f0a2f902f'
};

const app = initializeApp(firebaseConfig);
const db=getFirestore(app);

export{
    db
}