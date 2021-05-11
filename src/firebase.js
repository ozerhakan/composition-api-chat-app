import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import { ref, computed, onUnmounted } from "vue";

firebase.initializeApp( {
        apiKey: "AIzaSyBVKYUfaOz6MaWVI7ruCybKXN1aRfTYGl4",
        authDomain: "chat-app-35784.firebaseapp.com",
        projectId: "chat-app-35784",
        storageBucket: "chat-app-35784.appspot.com",
        messagingSenderId: "904654768178",
        appId: "1:904654768178:web:7c21dba1eaa037f71b942b"
})

export function useAuth() {
    const auth = firebase.auth();
    const user = ref(null);
    const unsubscribe = auth.onAuthStateChanged(_user => (user.value = _user));
    onUnmounted(unsubscribe);

    const isLogin = computed(() => user.value !== null);

    const signIn = async () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        await auth.signInWithPopup(googleProvider);
    }

    const signOut = () => auth.signOut();

    return {
        user,
        isLogin,
        signIn,
        signOut,
        firebase
    }
}
