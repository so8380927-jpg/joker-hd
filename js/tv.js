import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const player = document.getElementById("tvPlayer");

export async function loadChannels() {
    const list = document.getElementById("channelList");
    if (!list) return;

    try {
        const snap = await getDocs(collection(db, "channels"));

        list.innerHTML = "";

        if (snap.empty) {
            list.innerHTML = 
                <p style="color:#aaa;text-align:center;">
                    لا توجد قنوات
                </p>
            ;
            return;
        }

        snap.forEach(docSnap => {
            const c = docSnap.data();

            const currentShow = c.epg?.current || "بث مباشر";
            const nextShow = c.epg?.next || "لا توجد تفاصيل";

            list.innerHTML += 
                <div class="channel-item"
                onclick="window.playChannel('${c.url}', '${c.name}', '${currentShow}', '${nextShow}')">

                    <img loading="lazy"
                    src="${c.logo || 'default.png'}"
                    alt="${c.name}">

                    <div style="flex:1;">
                        <span style="font-weight:bold;display:block;font-size:14px;color:white;">
                            ${c.name}
                        </span>

                        <span style="font-size:11px;color:#ffd54a;">
                            حالياً: ${currentShow}
                        </span>
                    </div>

                </div>
            ;
        });

    } catch (error) {
        console.error("خطأ في تحميل القنوات:", error);
    }
}

window.playChannel = function(url, name, currentProg, nextProg) {
    if (!player) return;

    player.src = url;

    player.play()
        .catch(() => console.log("تشغيل تلقائي غير مسموح"));

    const current = document.getElementById("currentProgram");
    const next = document.getElementById("nextProgram");

    if (current) {
        current.innerText = 🔴 يُعرض الآن: ${currentProg};
    }

    if (next) {
        next.innerText = ⏳ يليه لاحقاً: ${nextProg};
    }
};
