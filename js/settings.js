import { db, auth } from "./firebase.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export async function loadSettings() {
    const user = auth.currentUser;
    if (!user) return;

    try {
        const ref = doc(db, "settings", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
            const data = snap.data();
            document.getElementById("notificationsToggle").checked = data.notifications;
            document.getElementById("qualitySelect").value = data.quality || "auto";
        }
    } catch (e) {
        console.error("خطأ في جلب الإعدادات:", e);
    }
}

export async function saveSettings() {
    const user = auth.currentUser;
    if (!user) return;

    try {
        await setDoc(doc(db, "settings", user.uid), {
            notifications: document.getElementById("notificationsToggle").checked,
            quality: document.getElementById("qualitySelect").value,
            language: "ar"
        });
        alert("تم حفظ الإعدادات بنجاح");
    } catch (e) {
        alert("حدث خطأ أثناء الحفظ");
    }
}
