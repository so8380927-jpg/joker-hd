import { db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const appVersion = "1.0.0";

export async function checkUpdate() {
    try {
        const ref = doc(db, "app_update", "config");
        const snap = await getDoc(ref);
        if (!snap.exists()) return;

        const data = snap.data();
        if (data.currentVersion !== appVersion) {
            showUpdateModal(data);
        }
    } catch (e) {
        console.error("خطأ في فحص التحديثات:", e);
    }
}

function showUpdateModal(data) {
    if (document.getElementById("appUpdateModal")) return;
    const box = document.createElement("div");
    box.id = "appUpdateModal";
    box.className = "update-box";

    box.innerHTML = 
        <h3 style="color:#ffd54a; margin-bottom:10px;">تحديث جديد متوفر 🔄</h3>
        <p style="font-size:13px; margin-bottom:15px;">${data.message}</p>
        <button id="updateNowBtn" style="background:#7b2cbf; color:white; border:none; padding:10px 20px; border-radius:10px; cursor:pointer; width:100%;">تحديث الآن</button>
    ;
    document.body.appendChild(box);

    document.getElementById("updateNowBtn").onclick = () => {
        if (data.updateUrl) window.open(data.updateUrl, "_blank");
    };
}
