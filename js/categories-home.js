import { db } from "./firebase.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export async function loadCategories() {
    const grid = document.getElementById("categoriesGrid");
    if (!grid) return;

    try {
        const q = query(collection(db, "categories"), where("active", "==", true));
        const snap = await getDocs(q);
        grid.innerHTML = "";

        snap.forEach(docSnap => {
            const item = docSnap.data();
            grid.innerHTML += 
                <div class="category-card" onclick="openCategory('${item.type}')">
                    <div>${item.icon}</div>
                    <span>${item.name}</span>
                </div>
            ;
        });
    } catch (error) {
        console.error("خطأ في جلب الأقسام:", error);
    }
}
