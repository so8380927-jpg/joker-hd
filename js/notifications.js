import { db } from "./firebase.js";
import { collection, query, where, orderBy, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export async function loadNotifications() {
    const box = document.getElementById("notificationList");
    if (!box) return;

    try {
        const q = query(collection(db, "notifications"), where("active", "==", true), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        box.innerHTML = "";
        let count = 0;

        snap.forEach(docSnap => {
            const n = docSnap.data();
            count++;
            box.innerHTML += 
                <div style="background:#240046; padding:12px; border-radius:10px; margin-bottom:10px; border:1px solid #7b2cbf;">
                    <h4 style="color:#ffd54a; font-size:14px; margin-bottom:4px;">${n.title}</h4>
                    <p style="font-size:12px; color:#ddd;">${n.message}</p>
                </div>
            ;
        });

        document.getElementById("notificationCount").innerText = count;
    } catch (e) {
        console.error("خطأ في جلب الإشعارات:", e);
    }
}
