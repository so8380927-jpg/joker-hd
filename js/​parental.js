export function checkProfilePin(enteredPin, profile) {
    if (profile && profile.isKids) {
        return enteredPin === profile.pin;
    }
    return true;
}

export function filterContentForProfile(contentList, activeProfileId) {
    const profiles = JSON.parse(localStorage.getItem("userProfiles") || "[]");
    const active = profiles.find(p => p.id === activeProfileId);

    if (active && active.isKids === true) {
        return contentList.filter(item => item.kids === true);
    }
    return contentList;
}
