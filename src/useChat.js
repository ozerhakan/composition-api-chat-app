import { onUnmounted, ref } from "vue";
import { useAuth } from "./firebase";

export function useChat() {
    const { firebase, user, isLogin } = useAuth();

    const firestore = firebase.firestore();
    const messagesCollection = firestore.collection('messages');
    const messagesQuery = messagesCollection.orderBy('createdAt','desc').limit(100);

    const messages = ref([]);

    const unsubscribe = messagesQuery.onSnapshot(snapshot => {
        messages.value = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .reverse()
    })

    onUnmounted(unsubscribe)
    const sendMessage = text => {
        if(!isLogin.value) return

        const { photoURL, uid, displayName } = user.value;
        messagesCollection.add({
            userName: displayName,
            userId: uid,
            userPhotoUrl: photoURL,
            text,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    }

    return {
        messages,
        sendMessage
    }
}