import { db, auth } from "./firebase.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { checkProfilePin } from "./parental.js";

let pendingProfile = null;
let userProfilesList = [];

export async function loadProfiles() {
    const user = auth.currentUser;
    if (!user) return;

    const ref = doc(db, "profiles", user.uid);
    const snap = await getDoc(ref);
    const grid = document.getElementById("profilesGrid");
    if (!grid) return;

    grid.innerHTML = "";
    if (!snap.exists()) return;

    userProfilesList = snap.data().profiles || [];
    localStorage.setItem("userProfiles", JSON.stringify(userProfilesList));

    userProfilesList.forEach(p => {
        grid.innerHTML += 
            <div class="profile-card" onclick="window.selectProfile('${p.id}')">
                <img loading="lazy" src="${p.avatar || 'default.png'}" alt="${p.name}">
                <h3 style="margin-top: 8px; color: white; font-size: 14px;">${p.name}</h3>
            </div>
        ;
    });
}

window.selectProfile = function(profileId) {
    const profile = userProfilesList.find(p => p.id === profileId);
    if (!profile) return;

    if (profile.isKids) {
        pendingProfile = profile;
        document.getElementById("profilesPage").classList.remove("active");
        document.getElementById("pinPage").classList.add("active");
    } else {
        finalizeLogin(profile);
    }
}

function finalizeProfileLogin(profile) {
    localStorage.setItem("activeProfile", profile.id);
    localStorage.setItem("activeProfileName", profile.name);

    document.getElementById("pinPage").classList.remove("active");
    document.getElementById("profilesPage").classList.remove("active");
    document.getElementById("homePage").classList.add("active");
}

window.finalizeLogin = finalizeProfileLogin;

const checkPinBtn = document.getElementById("checkPinBtn");
if (checkPinBtn) {
    checkPinBtn.onclick = () => {
        const pinInput = document.getElementById("profilePin").value;
        if (checkProfilePin(pinInput, pendingProfile)) {
            document.getElementById("profilePin").value = "";
            finalizeProfileLogin(pendingProfile);
        } else {
            alert("الرقم السري غير صحيح!");
        }
    };
}
