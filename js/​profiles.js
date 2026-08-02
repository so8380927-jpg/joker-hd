// نموذج لتعديل بناء البطاقات باستخدام الـ backticks الصحيحة
grid.innerHTML += 
<div class="profile-card" onclick="window.selectProfile('${p.id}')">
    <img loading="lazy" src="${p.avatar || 'default.png'}" alt="${p.name}">
    <h3>${p.name}</h3>
</div>
;
