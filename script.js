/* ============================================
   Dev Place - MAD MAN
   All Pages Router - Auth - Projects - Dashboard
   ============================================ */

// ============ حالة التطبيق ============
const APP = {
    page: '/',
    theme: localStorage.getItem('dp-theme') || 'light',
    lang: localStorage.getItem('dp-lang') || 'ar',
    user: JSON.parse(localStorage.getItem('dp-user') || 'null'),
    users: JSON.parse(localStorage.getItem('dp-users') || '[]'),
    projects: JSON.parse(localStorage.getItem('dp-projects') || '[]'),
    deleteId: null,
};

// ============ الترجمة ============
const T = {
    ar: { home:'الرئيسية', about:'عن المطور', projects:'المشاريع', contact:'تواصل', dashboard:'لوحة التحكم', login:'دخول', logout:'خروج', welcome:'مرحباً', owner:'MAD MAN', tagline:'مبرمج محترف - صانع هوستات ومواقع', desc:'مبرمج محترف جداً، متخصص في صناعة الهوستات والمواقع الاحترافية. أقدم حلولاً تقنية متكاملة بجودة عالية.', browseProjects:'تصفح المشاريع', createAccount:'سوي حساب', statsProjects:'مشروع منجز', statsClients:'عميل سعيد', statsSupport:'دعم فني', aboutTitle:'عن المطور', aboutName:'MAD MAN - المبرمج المحترف', aboutDesc1:'مبرمج محترف بخبرة واسعة في مجال البرمجة وتطوير المواقع وصناعة الهوستات. أتمتع بمهارات عالية في لغات البرمجة المختلفة.', aboutDesc2:'متخصص في تصميم وتطوير المواقع الاحترافية، أنظمة إدارة المحتوى، تطبيقات الويب، وحلول الاستضافة المتكاملة.', projectsTitle:'المشاريع', projectsDesc:'مجموعة من المشاريع المجانية المقدمة للجميع', contactTitle:'تواصل معي', contactDesc:'تقدر تتواصل معاي عبر أي من القنوات التالية', addProject:'إضافة مشروع', editProject:'تعديل مشروع', deleteProject:'حذف', download:'تحميل', save:'حفظ', cancel:'إلغاء', confirm:'تأكيد', sureDelete:'متأكد تبي تحذف؟', noProjects:'لا توجد مشاريع', loginTitle:'تسجيل الدخول', registerTitle:'إنشاء حساب', email:'البريد الإلكتروني', username:'اسم المستخدم', password:'كلمة المرور', discord:'ديسكورد', telegram:'تلجرام', notSet:'لم يتم تحديد', profile:'الملف الشخصي', edit:'تعديل', delete:'حذف' },
    en: { home:'Home', about:'About', projects:'Projects', contact:'Contact', dashboard:'Dashboard', login:'Login', logout:'Logout', welcome:'Welcome', owner:'MAD MAN', tagline:'Professional Developer - Host & Website Maker', desc:'A highly professional programmer, specialized in creating hosting services and professional websites.', browseProjects:'Browse Projects', createAccount:'Create Account', statsProjects:'Projects Done', statsClients:'Happy Clients', statsSupport:'24/7 Support', aboutTitle:'About Developer', aboutName:'MAD MAN - Professional Developer', aboutDesc1:'A professional programmer with extensive experience in programming, web development, and hosting services.', aboutDesc2:'Specialized in designing and developing professional websites, content management systems, web applications, and integrated hosting solutions.', projectsTitle:'Projects', projectsDesc:'A collection of free projects available for everyone', contactTitle:'Contact Me', contactDesc:'You can reach me through any of the following channels', addProject:'Add Project', editProject:'Edit Project', deleteProject:'Delete', download:'Download', save:'Save', cancel:'Cancel', confirm:'Confirm', sureDelete:'Are you sure you want to delete?', noProjects:'No projects', loginTitle:'Login', registerTitle:'Register', email:'Email', username:'Username', password:'Password', discord:'Discord', telegram:'Telegram', notSet:'Not set', profile:'Profile', edit:'Edit', delete:'Delete' }
};

function t(key) { return T[APP.lang]?.[key] || T['ar'][key] || key; }

// ============ تهيئة ============
(function init() {
    document.documentElement.setAttribute('data-theme', APP.theme);
    updateThemeIcon();
    if (APP.lang === 'en') { document.documentElement.dir = 'ltr'; document.querySelector('.lang-text').textContent = 'AR'; }

    if (APP.users.length === 0) {
        APP.users.push({ id:1, username:'Owner', email:'mohamedhere63@gmail.com', password:btoa('Owner123'), verified:true, role:'owner', discord:'81a0', telegram:'', created:new Date().toISOString() });
        saveUsers();
    }
    if (APP.projects.length === 0) {
        APP.projects.push(
            { id:1, title:'قالب موقع شخصي', desc:'قالب احترافي متجاوب مع جميع الأجهزة بتصميم عصري', type:'HTML/CSS/JS', status:'completed', file:'', downloads:120, created:new Date().toISOString() },
            { id:2, title:'لوحة تحكم هوست', desc:'لوحة تحكم بسيطة لإدارة ملفات الاستضافة', type:'PHP/MySQL', status:'completed', file:'', downloads:85, created:new Date().toISOString() },
            { id:3, title:'تطبيق مهام', desc:'تطبيق ويب لإدارة المهام اليومية', type:'React/Node.js', status:'in-progress', file:'', downloads:40, created:new Date().toISOString() },
            { id:4, title:'مكتبة أكواد جاهزة', desc:'مجموعة أكواد برمجية جاهزة للاستخدام', type:'JavaScript', status:'completed', file:'', downloads:200, created:new Date().toISOString() }
        );
        saveProjects();
    }
    router();
    updateAuthUI();
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleGlobalClick);
    window.addEventListener('popstate', router);
})();

function saveUsers() { localStorage.setItem('dp-users', JSON.stringify(APP.users)); }
function saveProjects() { localStorage.setItem('dp-projects', JSON.stringify(APP.projects)); }

// ============ Router ============
function router() {
    APP.page = window.location.pathname;
    const app = document.getElementById('app');
    document.querySelectorAll('.nav-link').forEach(link => { link.classList.remove('active'); if (link.getAttribute('href') === APP.page) link.classList.add('active'); });
    switch (APP.page) { case '/': renderHome(app); break; case '/about': renderAbout(app); break; case '/projects': renderProjects(app); break; case '/contact': renderContact(app); break; case '/dashboard': renderDashboard(app); break; case '/register': renderRegister(app); break; case '/verify-email': renderVerify(app); break; case '/profile': renderProfile(app); break; default: render404(app); }
    window.scrollTo(0,0);
}
function navigateTo(path) { history.pushState({}, '', path); router(); }
function handleGlobalClick(e) { const link = e.target.closest('[data-link]'); if (link) { e.preventDefault(); navigateTo(link.getAttribute('href')); } if (e.target.closest('#userBtn')) { document.getElementById('userDropdown').classList.toggle('active'); } else if (!e.target.closest('#userDropdown')) { document.getElementById('userDropdown').classList.remove('active'); } }

// ============ الصفحة الرئيسية ============
function renderHome(app) {
    app.innerHTML = `<section class="hero"><div class="hero-content"><div class="hero-badge">🔥 ${t('tagline')}</div><h1 class="hero-title"><span>MAD MAN</span></h1><p class="hero-subtitle">${t('tagline')}</p><p class="hero-desc">${t('desc')}</p><div class="hero-buttons"><a href="/projects" class="btn btn-primary btn-lg" data-link><i class="fas fa-folder-open"></i> ${t('browseProjects')}</a><a href="/register" class="btn btn-outline btn-lg" data-link><i class="fas fa-user-plus"></i> ${t('createAccount')}</a></div><div class="hero-stats"><div class="stat-item"><span class="stat-number">+50</span><span class="stat-label">${t('statsProjects')}</span></div><div class="stat-item"><span class="stat-number">+30</span><span class="stat-label">${t('statsClients')}</span></div><div class="stat-item"><span class="stat-number">24/7</span><span class="stat-label">${t('statsSupport')}</span></div></div></div></section>`;
}

// ============ عن المطور ============
function renderAbout(app) {
    app.innerHTML = `<section class="about-section"><div class="container"><div class="section-header"><div class="section-badge">👤 ${t('about')}</div><h2 class="section-title">${t('aboutTitle')}</h2></div><div class="about-grid"><div class="about-avatar-wrap"><div class="about-avatar"><i class="fas fa-user-secret"></i></div></div><div class="about-info"><h3>${t('aboutName')}</h3><p>${t('aboutDesc1')}</p><p>${t('aboutDesc2')}</p><div class="about-details"><div class="about-detail"><i class="fas fa-envelope"></i><div><strong>${t('email')}</strong><span>mohamedhere63@gmail.com <button class="copy-btn" onclick="copyText('mohamedhere63@gmail.com')"><i class="fas fa-copy"></i></button></span></div></div><div class="about-detail"><i class="fab fa-discord"></i><div><strong>${t('discord')}</strong><span>81a0 <button class="copy-btn" onclick="copyText('81a0')"><i class="fas fa-copy"></i></button></span></div></div><div class="about-detail"><i class="fab fa-telegram"></i><div><strong>${t('telegram')}</strong><span>${t('notSet')}</span></div></div></div><div class="skills"><span class="skill-tag">HTML5</span><span class="skill-tag">CSS3</span><span class="skill-tag">JavaScript</span><span class="skill-tag">Node.js</span><span class="skill-tag">PHP</span><span class="skill-tag">MySQL</span><span class="skill-tag">React</span><span class="skill-tag">Python</span></div></div></div></div></section>`;
}

// ============ المشاريع ============
function renderProjects(app) {
    const isOwner = APP.user?.role === 'owner' || APP.user?.username === 'Owner';
    let cards = APP.projects.map(p => `<div class="project-card"><div class="project-icon"><i class="fas fa-code"></i></div><h3>${p.title}</h3><p>${p.desc}</p><div class="project-meta"><span><i class="fas fa-download"></i> ${p.downloads||0}</span><span class="badge ${p.status==='completed'?'badge-success':'badge-warning'}">${p.status==='completed'?'مكتمل':'قيد التطوير'}</span></div><div class="project-tags">${p.type.split('/').map(t=>`<span>${t.trim()}</span>`).join('')}</div><div class="project-actions"><button class="btn btn-primary btn-sm" onclick="downloadProject(${p.id})"><i class="fas fa-download"></i> ${t('download')}</button>${isOwner?`<button class="btn btn-outline btn-sm" onclick="editProjectModal(${p.id})"><i class="fas fa-edit"></i></button><button class="btn btn-danger btn-sm" onclick="confirmDeleteProject(${p.id})"><i class="fas fa-trash"></i></button>`:''}</div></div>`).join('');
    app.innerHTML = `<section style="padding:100px 20px 60px;"><div class="container"><div class="section-header"><div class="section-badge">💻 ${t('projects')}</div><h2 class="section-title">${t('projectsTitle')}</h2><p class="section-desc">${t('projectsDesc')}</p></div>${isOwner?`<div style="text-align:center;margin-bottom:30px;"><button class="btn btn-primary btn-lg" onclick="openProjectModal()"><i class="fas fa-plus"></i> ${t('addProject')}</button></div>`:''}<div class="projects-grid">${cards||`<div class="empty-state"><i class="fas fa-folder-open"></i><p>${t('noProjects')}</p></div>`}</div></div></section>`;
}

// ============ تواصل ============
function renderContact(app) {
    app.innerHTML = `<section style="padding:100px 20px 60px;"><div class="container"><div class="section-header"><div class="section-badge">📬 ${t('contact')}</div><h2 class="section-title">${t('contactTitle')}</h2><p class="section-desc">${t('contactDesc')}</p></div><div class="contact-grid"><div class="contact-card"><div class="contact-card-icon"><i class="fas fa-envelope"></i></div><h3>${t('email')}</h3><p>mohamedhere63@gmail.com</p><button class="copy-btn" onclick="copyText('mohamedhere63@gmail.com')"><i class="fas fa-copy"></i> نسخ</button></div><div class="contact-card"><div class="contact-card-icon"><i class="fab fa-discord"></i></div><h3>${t('discord')}</h3><p>81a0</p><button class="copy-btn" onclick="copyText('81a0')"><i class="fas fa-copy"></i> نسخ</button></div><div class="contact-card"><div class="contact-card-icon"><i class="fab fa-telegram"></i></div><h3>${t('telegram')}</h3><p>${t('notSet')}</p></div></div></div></section>`;
}

// ============ لوحة التحكم ============
function renderDashboard(app) {
    if (!APP.user) { navigateTo('/'); showToast('سجل دخولك أول', 'error'); return; }
    const total = APP.projects.length;
    const done = APP.projects.filter(p=>p.status==='completed').length;
    const dls = APP.projects.reduce((s,p)=>s+(p.downloads||0),0);
    const u = APP.users.find(u=>u.username===APP.user.username) || APP.user;
    app.innerHTML = `<div class="dashboard-layout"><aside class="dashboard-sidebar"><div class="sidebar-logo">Dev <span>Place</span></div><div class="sidebar-section"><div class="sidebar-section-title">القائمة</div><a href="/dashboard" class="active"><i class="fas fa-th-large"></i> نظرة عامة</a><a href="/projects" data-link><i class="fas fa-folder-open"></i> المشاريع</a><a href="/profile" data-link><i class="fas fa-id-card"></i> الملف الشخصي</a></div></aside><main class="dashboard-main"><div class="welcome-banner"><div><h2>👋 ${t('welcome')} ${APP.user.username}!</h2><p>آخر تسجيل دخول: اليوم</p></div><a href="/projects" class="btn btn-outline" data-link style="color:#fff;border-color:#fff;">إدارة المشاريع</a></div><div class="stats-grid"><div class="stat-card"><div class="stat-card-icon blue"><i class="fas fa-project-diagram"></i></div><div class="stat-card-info"><h3>${total}</h3><p>مشروع</p></div></div><div class="stat-card"><div class="stat-card-icon green"><i class="fas fa-check-circle"></i></div><div class="stat-card-info"><h3>${done}</h3><p>مكتمل</p></div></div><div class="stat-card"><div class="stat-card-icon purple"><i class="fas fa-download"></i></div><div class="stat-card-info"><h3>${dls}</h3><p>تحميل</p></div></div><div class="stat-card"><div class="stat-card-icon orange"><i class="fas fa-star"></i></div><div class="stat-card-info"><h3>4.9</h3><p>تقييم</p></div></div></div><div class="dashboard-card full"><div class="card-header"><h3>👤 معلومات الحساب</h3></div><div class="card-body"><div class="about-detail"><i class="fas fa-user"></i><div><strong>الاسم</strong><span>${u.username}</span></div></div><div class="about-detail"><i class="fas fa-envelope"></i><div><strong>${t('email')}</strong><span>${u.email} <button class="copy-btn" onclick="copyText('${u.email}')"><i class="fas fa-copy"></i></button></span></div></div><div class="about-detail"><i class="fab fa-discord"></i><div><strong>${t('discord')}</strong><span>${u.discord||'81a0'} <button class="copy-btn" onclick="copyText('${u.discord||'81a0'}')"><i class="fas fa-copy"></i></button></span></div></div><div class="about-detail"><i class="fab fa-telegram"></i><div><strong>${t('telegram')}</strong><span>${u.telegram||t('notSet')}</span></div></div></div></div></main></div>`;
}

// ============ إنشاء حساب ============
function renderRegister(app) {
    if (APP.user) { navigateTo('/dashboard'); return; }
    app.innerHTML = `<section class="auth-page"><div class="auth-box"><div class="auth-header"><div class="auth-logo">Dev Place</div><p>${t('registerTitle')}</p></div><div class="auth-body"><form onsubmit="handleRegister(event)"><div class="form-group"><label>${t('username')}</label><div class="input-with-icon"><i class="fas fa-user"></i><input type="text" id="regUser" placeholder="${t('username')}" required></div></div><div class="form-group"><label>${t('email')}</label><div class="input-with-icon"><i class="fas fa-envelope"></i><input type="email" id="regEmail" placeholder="example@gmail.com" required></div></div><div class="form-group"><label>${t('discord')} (اختياري)</label><input type="text" id="regDiscord" placeholder="اسم#0000"></div><div class="form-group"><label>${t('telegram')} (اختياري)</label><input type="text" id="regTelegram" placeholder="@username"></div><div class="form-group"><label>${t('password')}</label><div class="input-with-icon"><i class="fas fa-lock"></i><input type="password" id="regPass" placeholder="6 أحرف على الأقل" required minlength="6"><button type="button" class="toggle-pass" onclick="togglePassword('regPass',this)"><i class="fas fa-eye"></i></button></div></div><div class="form-error" id="regError"></div><div class="form-success" id="regSuccess"></div><button type="submit" class="btn btn-primary btn-block"><i class="fas fa-user-plus"></i> ${t('registerTitle')}</button></form><p class="form-footer-text">عندك حساب؟ <a href="/" onclick="openModal('loginModal');return false;">${t('loginTitle')}</a></p></div></div></section>`;
}

// ============ تحقق البريد ============
function renderVerify(app) {
    const p = new URLSearchParams(window.location.search);
    const token = p.get('token'), email = p.get('email');
    let html = '';
    if (token && email) {
        const user = APP.users.find(u=>u.email===email&&u.verificationToken===token);
        if (user) { user.verified=true; user.verificationToken=null; saveUsers(); html=`<section class="auth-page"><div class="auth-box"><div class="auth-header"><div class="auth-logo">✅</div><p>تم التفعيل</p></div><div class="auth-body text-center"><p style="font-size:3rem;">✅</p><p>بريدك الإلكتروني تم تفعيله بنجاح</p><a href="/" class="btn btn-primary" style="margin-top:16px;" onclick="openModal('loginModal');return false;">سجل دخولك</a></div></div></section>`; }
        else html = `<section class="auth-page"><div class="auth-box"><div class="auth-header"><div class="auth-logo">❌</div><p>خطأ</p></div><div class="auth-body text-center"><p>رابط التحقق غير صالح</p></div></div></section>`;
    } else html = `<section class="auth-page"><div class="auth-box"><div class="auth-header"><div class="auth-logo">❌</div><p>خطأ</p></div><div class="auth-body text-center"><p>رابط غير صالح</p></div></div></section>`;
    app.innerHTML = html;
}

// ============ الملف الشخصي ============
function renderProfile(app) {
    if (!APP.user) { navigateTo('/'); return; }
    const u = APP.users.find(u=>u.username===APP.user.username) || APP.user;
    app.innerHTML = `<section style="padding:100px 20px 60px;"><div class="container"><div class="profile-container"><div class="profile-header"><div class="profile-avatar"><i class="fas fa-user-secret"></i></div><h2>${u.username}</h2><p style="opacity:0.8;">${u.role==='owner'?'المالك':'مستخدم'}</p></div><div class="profile-body"><div class="profile-detail"><i class="fas fa-envelope"></i><div><strong>${t('email')}</strong><span>${u.email} <button class="copy-btn" onclick="copyText('${u.email}')"><i class="fas fa-copy"></i></button></span></div></div><div class="profile-detail"><i class="fab fa-discord"></i><div><strong>${t('discord')}</strong><span>${u.discord||'81a0'} <button class="copy-btn" onclick="copyText('${u.discord||'81a0'}')"><i class="fas fa-copy"></i></button></span></div></div><div class="profile-detail"><i class="fab fa-telegram"></i><div><strong>${t('telegram')}</strong><span>${u.telegram||t('notSet')}</span></div></div><div class="profile-detail"><i class="fas fa-calendar"></i><div><strong>تاريخ التسجيل</strong><span>${new Date(u.created).toLocaleDateString('ar')}</span></div></div></div></div></div></section>`;
}

// ============ 404 ============
function render404(app) {
    app.innerHTML = `<div class="error-page"><h1>404</h1><p>الصفحة غير موجودة</p><a href="/" class="btn btn-primary btn-lg" data-link><i class="fas fa-home"></i> الرئيسية</a></div>`;
}

// ============ تسجيل الدخول ============
function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('loginUser').value.trim();
    const password = document.getElementById('loginPass').value.trim();
    const err = document.getElementById('loginError');
    const user = APP.users.find(u=>u.username===username||u.email===username);
    if (!user||atob(user.password)!==password) { err.textContent = APP.lang==='en'?'Invalid username or password':'اسم المستخدم أو كلمة المرور غلط'; return; }
    APP.user = { id:user.id, username:user.username, email:user.email, role:user.role, verified:user.verified, discord:user.discord, telegram:user.telegram };
    localStorage.setItem('dp-user', JSON.stringify(APP.user));
    closeModal('loginModal');
    updateAuthUI();
    navigateTo('/dashboard');
    showToast(`👋 ${t('welcome')} ${user.username}!`, 'success');
}

// ============ إنشاء حساب ============
function handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById('regUser').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const discord = document.getElementById('regDiscord').value.trim();
    const telegram = document.getElementById('regTelegram').value.trim();
    const password = document.getElementById('regPass').value.trim();
    const err = document.getElementById('regError');
    const suc = document.getElementById('regSuccess');
    err.textContent = ''; suc.style.display = 'none';
    if (password.length < 6) { err.textContent = APP.lang==='en'?'Password must be at least 6 characters':'كلمة المرور 6 أحرف على الأقل'; return; }
    if (APP.users.find(u=>u.username===username)) { err.textContent = APP.lang==='en'?'Username already taken':'اسم المستخدم مستخدم بالفعل'; return; }
    if (APP.users.find(u=>u.email===email)) { err.textContent = APP.lang==='en'?'Email already used':'البريد مستخدم بالفعل'; return; }
    const token = 'verify_'+Math.random().toString(36).substr(2,9);
    APP.users.push({ id:APP.users.length+1, username, email, password:btoa(password), verified:false, verificationToken:token, role:'user', discord, telegram, created:new Date().toISOString() });
    saveUsers();
    suc.textContent = APP.lang==='en'?'✅ Account created! Check your email.':'✅ تم إنشاء الحساب! شيك على بريدك.';
    suc.style.display = 'block';
    document.getElementById('regUser').value=''; document.getElementById('regEmail').value=''; document.getElementById('regPass').value='';
    console.log(`📧 Verify: /verify-email?token=${token}&email=${email}`);
    setTimeout(()=>{ navigateTo(`/verify-email?token=${token}&email=${email}`); },2000);
}

// ============ خروج ============
function logout() {
    APP.user = null;
    localStorage.removeItem('dp-user');
    updateAuthUI();
    document.getElementById('userDropdown').classList.remove('active');
    navigateTo('/');
    showToast(APP.lang==='en'?'Logged out':'تم تسجيل الخروج');
}

// ============ مشاريع ============
function openProjectModal(id=null) {
    document.getElementById('projectId').value = id||'';
    document.getElementById('projectModalTitle').innerHTML = id ? `<i class="fas fa-edit"></i> ${t('editProject')}` : `<i class="fas fa-plus-circle"></i> ${t('addProject')}`;
    document.getElementById('projectSubmitBtn').textContent = id ? '💾 '+t('save') : '💾 '+t('save');
    if (id) { const p=APP.projects.find(p=>p.id===id); if(p){ document.getElementById('projectTitle').value=p.title; document.getElementById('projectDesc').value=p.desc; document.getElementById('projectType').value=p.type; document.getElementById('projectStatus').value=p.status; document.getElementById('projectFile').value=p.file||''; }}
    else { document.getElementById('projectTitle').value=''; document.getElementById('projectDesc').value=''; document.getElementById('projectType').value=''; document.getElementById('projectStatus').value='completed'; document.getElementById('projectFile').value=''; }
    document.getElementById('projectError').textContent='';
    openModal('projectModal');
}
function editProjectModal(id) { openProjectModal(id); }
function saveProject(e) {
    e.preventDefault();
    const id = parseInt(document.getElementById('projectId').value)||null;
    const title = document.getElementById('projectTitle').value.trim();
    const desc = document.getElementById('projectDesc').value.trim();
    const type = document.getElementById('projectType').value.trim();
    const status = document.getElementById('projectStatus').value;
    const file = document.getElementById('projectFile').value.trim();
    const err = document.getElementById('projectError');
    if (!title||!desc||!type) { err.textContent = APP.lang==='en'?'All fields required':'كل الحقول مطلوبة'; return; }
    if (id) { const p=APP.projects.find(p=>p.id===id); if(p){ p.title=title; p.desc=desc; p.type=type; p.status=status; p.file=file; }}
    else { APP.projects.push({ id:Date.now(), title, desc, type, status, file, downloads:0, created:new Date().toISOString() }); }
    saveProjects();
    closeModal('projectModal');
    router();
    showToast(APP.lang==='en'?'✅ Project saved':'✅ تم حفظ المشروع', 'success');
}
function confirmDeleteProject(id) { APP.deleteId = id; document.getElementById('confirmDeleteBtn').onclick = ()=>{ deleteProject(APP.deleteId); closeModal('deleteModal'); }; openModal('deleteModal'); }
function deleteProject(id) { APP.projects = APP.projects.filter(p=>p.id!==id); saveProjects(); router(); showToast('🗑️ '+t('delete')+'!'); }
function downloadProject(id) { const p=APP.projects.find(p=>p.id===id); if(p){ p.downloads=(p.downloads||0)+1; saveProjects(); showToast(`📥 ${p.title}`,'success'); if(p.file) window.open(p.file,'_blank'); } }

// ============ نوافذ ============
function openModal(id) { document.getElementById(id).classList.add('active'); document.body.style.overflow='hidden'; }
function closeModal(id) { document.getElementById(id).classList.remove('active'); document.body.style.overflow=''; if(id==='loginModal'){ document.getElementById('loginForm').reset(); document.getElementById('loginError').textContent=''; } }
document.addEventListener('DOMContentLoaded',()=>{ document.querySelectorAll('.modal-overlay').forEach(m=>{ m.addEventListener('click',(e)=>{ if(e.target===m) closeModal(m.id); }); }); });

// ============ UI ============
function updateAuthUI() {
    const lb = document.getElementById('loginBtnNav'), ub = document.getElementById('userDropdown');
    if (APP.user) { lb.style.display='none'; ub.style.display='block'; document.getElementById('userBtnName').textContent=APP.user.username; }
    else { lb.style.display='flex'; ub.style.display='none'; }
}
function updateThemeIcon() { const i = document.querySelector('#themeToggle i'); if(i) i.className = APP.theme==='dark'?'fas fa-sun':'fas fa-moon'; }
function handleScroll() { document.getElementById('navbar').classList.toggle('scrolled',window.scrollY>50); document.getElementById('scrollTop').classList.toggle('show',window.scrollY>300); }
function copyText(txt) { navigator.clipboard.writeText(txt).then(()=>showToast('✅ نسخ!','success')); }
function togglePassword(id, btn) { const i=document.getElementById(id); const icon=btn.querySelector('i'); i.type=i.type==='password'?'text':'password'; icon.className=i.type==='password'?'fas fa-eye':'fas fa-eye-slash'; }
function showToast(msg, type='') {
    const c = document.getElementById('toastContainer');
    const t = document.createElement('div'); t.className=`toast ${type}`; t.textContent=msg; c.appendChild(t);
    setTimeout(()=>t.remove(),3000);
}

// ============ أحداث ============
document.getElementById('themeToggle').addEventListener('click',()=>{ APP.theme=APP.theme==='light'?'dark':'light'; document.documentElement.setAttribute('data-theme',APP.theme); localStorage.setItem('dp-theme',APP.theme); updateThemeIcon(); });
document.getElementById('langToggle').addEventListener('click',()=>{ APP.lang=APP.lang==='ar'?'en':'ar'; document.documentElement.dir=APP.lang==='ar'?'rtl':'ltr'; document.querySelector('.lang-text').textContent=APP.lang==='ar'?'EN':'AR'; localStorage.setItem('dp-lang',APP.lang); router(); });
document.getElementById('menuToggle').addEventListener('click',()=>{ document.getElementById('navLinks').classList.toggle('active'); });
document.getElementById('scrollTop').addEventListener('click',()=>{ window.scrollTo({top:0,behavior:'smooth'}); });
