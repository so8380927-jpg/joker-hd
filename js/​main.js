import { loadCategories } from "./categories-home.js";
import { loadChannels } from "./tv.js";
import { loadProfiles } from "./profiles.js";
import { checkUpdate } from "./update.js";
import { loadNotifications } from "./notifications.js";
import { loadSettings, saveSettings } from "./settings.js";
import { loadProfile } from "./profile.js";

document.addEventListener("DOMContentLoaded", async () => {
    // إخفاء شاشة التحميل بعد الجاهزية
    setTimeout(() => {
        const loader = document.getElementById("loader");
        if (loader) {
            loader.style.opacity = "0";
            setTimeout(() => loader.remove(), 400);
        }
    }, 500);

    // فحص التحديثات
    checkUpdate();

    // التحميل المبدئي محمي بـ try...catch لضمان عدم توقف التطبيق
    try {
        await loadCategories();
        await loadChannels();
        await loadProfiles();
        await loadNotifications();
    } catch (error) {
        console.error("خطأ في تحميل البيانات:", error);
    }

    // ربط التنقل بين الشاشات والأزرار
    const homePage = document.getElementById("homePage");
    const profilePage = document.getElementById("profilePage");
    const settingsPage = document.getElementById("settingsPage");
    const notificationPanel = document.getElementById("notificationPanel");

    document.getElementById("profileBtn").onclick = () => {
        homePage.classList.remove("active");
        profilePage.classList.add("active");
        loadProfile();
    };

    document.getElementById("backProfileBtn").onclick = () => {
        profilePage.classList.remove("active");
        homePage.classList.add("active");
    };

    document.getElementById("settingsBtn").onclick = () => {
        homePage.classList.remove("active");
        settingsPage.classList.add("active");
        loadSettings();
    };

    document.getElementById("backSettingsBtn").onclick = () => {
        settingsPage.classList.remove("active");
        homePage.classList.add("active");
    };

    document.getElementById("saveSettingsBtn").onclick = () => {
        saveSettings();
    };

    document.getElementById("notificationBtn").onclick = () => {
        notificationPanel.classList.add("active");
        loadNotifications();
    };

    document.getElementById("closeNotifications").onclick = () => {
        notificationPanel.classList.remove("active");
    };
});
