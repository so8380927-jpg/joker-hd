import { db, auth } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export async function loadProfile() {
    const user = auth.currentUser;
    if (!user) return;

    try {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);
        if (!snap.exists()) return;

        const data = snap.data();
        document.getElementById("profileName").innerText = data.name || "مستخدم";
        document.getElementById("profileEmail").innerText = data.email || user.email;
        document.getElementById("profileImage").src = data.photo || "default.png";
        document.getElementById("vipStatus").innerText = data.vipActive ? "VIP فعال ⭐️" : "غير مشترك";
    } catch (e) {
        console.error("خطأ في جلب الملف الشخصي:", e);
    }
}
