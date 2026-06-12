/* ============================================
   Dev Place - MAD MAN | Complete Script v2
   ============================================ */

// ============ App State ============
const APP = {
    page: window.location.pathname,
    theme: localStorage.getItem('dp-theme') || 'dark',
    lang: localStorage.getItem('dp-lang') || 'ar',
    user: JSON.parse(localStorage.getItem('dp-user') || 'null'),
    users: JSON.parse(localStorage.getItem('dp-users') || '[]'),
    projects: JSON.parse(localStorage.getItem('dp-projects') || '[]'),
    deleteId: null
};

// ============ Init ============
(function() {
    document.documentElement.setAttribute('data-theme', APP.theme);
    if (APP.lang === 'en') {
        document.documentElement.dir = 'ltr';
        const lt = document.querySelector('#langToggle span');
        if (lt) lt.textContent = 'AR';
    }
    updateThemeIcon();

    // Default owner
    if (!APP.users.length) {
        APP.users.push({
            id: 1, username: 'Owner', email: 'mohamedhere63@gmail.com',
            password: btoa('Owner123'), verified: true, role: 'owner',
            discord: '81a0', telegram: '', created: new Date().toISOString()
        });
        saveUsers();
    }

    // Default projects
    if (!APP.projects.length) {
        APP.projects.push(
            { id: 1, title: 'قالب موقع شخصي', desc: 'قالب احترافي متجاوب', type: 'HTML/CSS/JS', status: 'completed', file: '', downloads: 120 },
            { id: 2, title: 'لوحة تحكم هوست', desc: 'لوحة تحكم بسيطة', type: 'PHP/MySQL', status: 'completed', file: '', downloads: 85 },
            { id: 3, title: 'تطبيق مهام', desc: 'تطبيق ويب للمهام', type: 'React/Node.js', status: 'in-progress', file: '', downloads: 40 },
            { id: 4, title: 'مكتبة أكواد', desc: 'أكواد جاهزة', type: 'JavaScript', status: 'completed', file: '', downloads: 200 }
        );
        saveProjects();
    }

    createParticles();
    router();
    updateAuthUI();
    bindEvents();
})();

function saveUsers() { localStorage.setItem('dp-users', JSON.stringify(APP.users)); }
function saveProjects() { localStorage.setItem('dp-projects', JSON.stringify(APP.projects)); }

// ============ Particles ============
function createParticles() {
    const c = document.getElementById('particles');
    if (!c) return;
    for (let i = 0; i < 25; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const s = 2 + Math.random() * 3;
        p.style.cssText = `width:${s}px;height:${s}px;left:${Math.random()*100}%;animation-duration:${8+Math.random()*10}s;animation-delay:${Math.random()*8}s`;
        c.appendChild(p);
    }
}

// ============ Theme & Lang ============
function toggleTheme() {
    APP.theme = APP.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', APP.theme);
    localStorage.setItem('dp-theme', APP.theme);
    updateThemeIcon();
}

function toggleLang() {
    APP.lang = APP.lang === 'ar' ? 'en' : 'ar';
    document.documentElement.dir = APP.lang === 'ar' ? 'rtl' : 'ltr';
    const lt = document.querySelector('#langToggle span');
    if (lt) lt.textContent = APP.lang === 'ar' ? 'EN' : 'AR';
    localStorage.setItem('dp-lang', APP.lang);
    router();
}

function updateThemeIcon() {
    const icon = document.querySelector('#themeToggle i');
    if (icon) icon.className = APP.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ============ Events ============
function bindEvents() {
    window.addEventListener('scroll', () => {
        const sy = window.scrollY;
        const h = document.getElementById('header');
        if (h) h.classList.toggle('scrolled', sy > 50);
        const pb = document.getElementById('progressBar');
        if (pb) {
            const total = document.documentElement.scrollHeight - window.innerHeight;
            pb.style.width = total > 0 ? Math.min((sy / total) * 100, 100) + '%' : '0%';
        }
        const st = document.getElementById('scrollTop');
        if (st) st.classList.toggle('show', sy > 300);
    });

    window.addEventListener('popstate', router);

    document.addEventListener('mousemove', (e) => {
        const cur = document.querySelector('.cursor');
        const dot = document.querySelector('.cursor-dot');
        if (cur) { cur.style.left = e.clientX + 'px'; cur.style.top = e.clientY + 'px'; }
        if (dot) { dot.style.left = e.clientX + 'px'; dot.style.top = e.clientY + 'px'; }
    });

    document.addEventListener('click', (e) => {
        const link = e.target.closest('[data-link]');
        if (link) {
            e.preventDefault();
            navigateTo(link.getAttribute('href'));
        }
    });

    const tt = document.getElementById('themeToggle');
    if (tt) tt.addEventListener('click', toggleTheme);
    const lt = document.getElementById('langToggle');
    if (lt) lt.addEventListener('click', toggleLang);
    const mt = document.getElementById('menuToggle');
    if (mt) mt.addEventListener('click', () => {
        const nav = document.getElementById('nav');
        if (nav) nav.classList.toggle('active');
    });
    const st = document.getElementById('scrollTop');
    if (st) st.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    document.querySelectorAll('.modal-backdrop').forEach(bd => {
        bd.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) closeModal(modal.id);
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(m => closeModal(m.id));
        }
    });
}

// ============ Router ============
function router() {
    APP.page = window.location.pathname;
    const app = document.getElementById('app');
    if (!app) return;

    document.querySelectorAll('.nav-item').forEach(l => {
        l.classList.remove('active');
        if (l.getAttribute('href') === APP.page) l.classList.add('active');
    });

    if (APP.page === '/') renderHome(app);
    else if (APP.page === '/about') renderAbout(app);
    else if (APP.page === '/projects') renderProjects(app);
    else if (APP.page === '/contact') renderContact(app);
    else if (APP.page === '/dashboard') renderDashboard(app);
    else if (APP.page === '/register') renderRegister(app);
    else if (APP.page === '/verify-email') renderVerify(app);
    else if (APP.page === '/profile') renderProfile(app);
    else render404(app);

    window.scrollTo(0, 0);
    const nav = document.getElementById('nav');
    if (nav) nav.classList.remove('active');
}

function navigateTo(path) {
    history.pushState({}, '', path);
    router();
}

// ============ PAGE: Home ============
function renderHome(app) {
    app.innerHTML = `
    <section class="hero">
        <div class="hero-bg">
            <div class="hero-orb hero-orb-1"></div><div class="hero-orb hero-orb-2"></div><div class="hero-orb hero-orb-3"></div>
        </div>
        <div class="hero-content">
            <div class="hero-badge"><span class="dot"></span>مبرمج محترف - صانع هوستات ومواقع</div>
            <h1 class="hero-title"><span class="gradient-text">MAD MAN</span></h1>
            <p class="hero-subtitle">مبرمج محترف - صانع هوستات ومواقع</p>
            <p class="hero-desc">مبرمج محترف جداً، متخصص في صناعة الهوستات والمواقع الاحترافية.</p>
            <div class="hero-buttons">
                <a href="/projects" class="btn-glow" data-link><i class="fas fa-code"></i> تصفح المشاريع</a>
                <a href="/register" class="btn-glass" data-link><i class="fas fa-user-plus"></i> سوي حساب</a>
            </div>
            <div class="hero-stats">
                <div class="stat-item"><div class="stat-number">+50</div><div class="stat-label">مشروع منجز</div></div>
                <div class="stat-item"><div class="stat-number">+30</div><div class="stat-label">عميل سعيد</div></div>
                <div class="stat-item"><div class="stat-number">24/7</div><div class="stat-label">دعم فني</div></div>
            </div>
        </div>
    </section>`;
}

// ============ PAGE: About ============
function renderAbout(app) {
    app.innerHTML = `
    <section style="padding:120px 0 80px">
        <div class="container">
            <div class="text-center mx-auto" style="margin-bottom:60px">
                <div class="section-label">👤 عن المطور</div>
                <h2 class="section-title"><span>MAD MAN</span></h2>
            </div>
            <div class="about-grid">
                <div class="about-visual">
                    <div class="about-avatar-wrap">
                        <div class="about-avatar-ring"></div>
                        <div class="about-avatar"><i class="fas fa-user-secret"></i></div>
                        <div class="about-floating-card"><i class="fas fa-circle" style="color:#10b981;"></i> متاح للعمل</div>
                    </div>
                </div>
                <div class="about-info">
                    <h3>MAD MAN</h3>
                    <p>مبرمج محترف بخبرة واسعة في البرمجة وتطوير المواقع وصناعة الهوستات.</p>
                    <p>متخصص في تصميم وتطوير المواقع الاحترافية وحلول الاستضافة المتكاملة.</p>
                    <div class="info-cards">
                        <div class="info-card">
                            <div class="info-card-icon"><i class="fas fa-envelope"></i></div>
                            <div><h4>البريد</h4><span>mohamedhere63@gmail.com <button class="copy-btn" onclick="copyText('mohamedhere63@gmail.com')"><i class="fas fa-copy"></i></button></span></div>
                        </div>
                        <div class="info-card">
                            <div class="info-card-icon"><i class="fab fa-discord"></i></div>
                            <div><h4>ديسكورد</h4><span>81a0 <button class="copy-btn" onclick="copyText('81a0')"><i class="fas fa-copy"></i></button></span></div>
                        </div>
                        <div class="info-card">
                            <div class="info-card-icon"><i class="fab fa-telegram"></i></div>
                            <div><h4>تلجرام</h4><span>لم يتم تحديد</span></div>
                        </div>
                    </div>
                    <div class="skills-wrap">
                        <span class="skill-tag">HTML5</span><span class="skill-tag">CSS3</span>
                        <span class="skill-tag">JavaScript</span><span class="skill-tag">Node.js</span>
                        <span class="skill-tag">PHP</span><span class="skill-tag">MySQL</span>
                        <span class="skill-tag">React</span><span class="skill-tag">Python</span>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
}

// ============ PAGE: Projects ============
function renderProjects(app) {
    const isOwner = APP.user && (APP.user.role === 'owner' || APP.user.username === 'Owner');
    let cards = '';

    if (APP.projects.length === 0) {
        cards = '<div class="empty-state"><i class="fas fa-folder-open"></i><p>لا توجد مشاريع</p></div>';
    } else {
        cards = APP.projects.map(p => `
            <div class="project-card">
                <div class="project-card-icon"><i class="fas fa-code"></i></div>
                <h3>${p.title}</h3>
                <p>${p.desc}</p>
                <div class="project-meta">
                    <span><i class="fas fa-download"></i> ${p.downloads || 0}</span>
                    <span class="badge-sm ${p.status === 'completed' ? 'badge-done' : 'badge-progress'}">${p.status === 'completed' ? 'مكتمل' : 'قيد التطوير'}</span>
                </div>
                <div class="project-tags">${p.type.split('/').map(t => '<span>' + t.trim() + '</span>').join('')}</div>
                <div class="project-actions">
                    <button class="btn-sm-glass" onclick="downloadProject(${p.id})"><i class="fas fa-download"></i> تحميل</button>
                    ${isOwner ? `
                        <button class="btn-sm-glass" onclick="openProjectModal(${p.id})"><i class="fas fa-edit"></i></button>
                        <button class="btn-sm-glass danger" onclick="confirmDeleteProject(${p.id})"><i class="fas fa-trash"></i></button>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }

    app.innerHTML = `
    <section style="padding:120px 0 80px">
        <div class="container">
            <div class="text-center mx-auto" style="margin-bottom:60px">
                <div class="section-label">💻 المشاريع</div>
                <h2 class="section-title">المشاريع</h2>
                <p class="section-sub">مجموعة من المشاريع المجانية للجميع</p>
            </div>
            ${isOwner ? '<div class="text-center" style="margin-bottom:30px"><button class="btn-glow" onclick="openProjectModal()"><i class="fas fa-plus"></i> إضافة مشروع</button></div>' : ''}
            <div class="projects-grid">${cards}</div>
        </div>
    </section>`;
}

// ============ PAGE: Contact ============
function renderContact(app) {
    app.innerHTML = `
    <section style="padding:120px 0 80px">
        <div class="container">
            <div class="text-center mx-auto" style="margin-bottom:60px">
                <div class="section-label">📬 تواصل</div>
                <h2 class="section-title">تواصل معي</h2>
                <p class="section-sub">تقدر تتواصل معاي عبر هالقنوات</p>
            </div>
            <div class="contact-grid">
                <div class="contact-card">
                    <div class="contact-card-icon"><i class="fas fa-envelope"></i></div>
                    <h3>البريد</h3>
                    <p>mohamedhere63@gmail.com</p>
                    <button class="copy-btn" onclick="copyText('mohamedhere63@gmail.com')"><i class="fas fa-copy"></i> نسخ</button>
                </div>
                <div class="contact-card">
                    <div class="contact-card-icon"><i class="fab fa-discord"></i></div>
                    <h3>ديسكورد</h3>
                    <p>81a0</p>
                    <button class="copy-btn" onclick="copyText('81a0')"><i class="fas fa-copy"></i> نسخ</button>
                </div>
                <div class="contact-card">
                    <div class="contact-card-icon"><i class="fab fa-telegram"></i></div>
                    <h3>تلجرام</h3>
                    <p>لم يتم تحديد</p>
                </div>
            </div>
        </div>
    </section>`;
}

// ============ PAGE: Dashboard ============
function renderDashboard(app) {
    if (!APP.user) { navigateTo('/'); showToast('سجل دخولك أول', 'error'); return; }

    const total = APP.projects.length;
    const done = APP.projects.filter(p => p.status === 'completed').length;
    const dls = APP.projects.reduce((s, p) => s + (p.downloads || 0), 0);
    const u = APP.users.find(x => x.username === APP.user.username) || APP.user;

    app.innerHTML = `
    <div class="dashboard-layout">
        <aside class="dashboard-sidebar">
            <div class="sidebar-header"><div class="sidebar-logo">Dev <span>Place</span></div></div>
            <nav class="sidebar-nav">
                <a href="/dashboard" class="active"><i class="fas fa-grid"></i> نظرة عامة</a>
                <a href="/projects" data-link><i class="fas fa-folder"></i> المشاريع</a>
                <a href="/profile" data-link><i class="fas fa-user"></i> الملف الشخصي</a>
                <a href="#" onclick="logout()"><i class="fas fa-logout"></i> خروج</a>
            </nav>
        </aside>
        <main class="dashboard-main">
            <div class="welcome-card">
                <div><h2>👋 مرحباً ${APP.user.username}!</h2><p style="opacity:0.85;">آخر دخول: اليوم</p></div>
                <a href="/projects" class="btn-glass" data-link style="color:#fff;border-color:rgba(255,255,255,0.4);">إدارة المشاريع</a>
            </div>
            <div class="stats-grid">
                <div class="stat-card-db"><div class="stat-icon-db purple"><i class="fas fa-code"></i></div><div class="stat-info-db"><h3>${total}</h3><p>مشروع</p></div></div>
                <div class="stat-card-db"><div class="stat-icon-db green"><i class="fas fa-check"></i></div><div class="stat-info-db"><h3>${done}</h3><p>مكتمل</p></div></div>
                <div class="stat-card-db"><div class="stat-icon-db blue"><i class="fas fa-download"></i></div><div class="stat-info-db"><h3>${dls}</h3><p>تحميل</p></div></div>
                <div class="stat-card-db"><div class="stat-icon-db pink"><i class="fas fa-star"></i></div><div class="stat-info-db"><h3>4.9</h3><p>تقييم</p></div></div>
            </div>
            <div class="info-grid">
                <div class="info-block">
                    <div class="info-block-header">👤 معلومات الحساب</div>
                    <div class="info-block-body">
                        <div class="info-row"><div class="info-row-icon"><i class="fas fa-user"></i></div><div><strong>الاسم</strong><span>${u.username}</span></div></div>
                        <div class="info-row"><div class="info-row-icon"><i class="fas fa-envelope"></i></div><div><strong>البريد</strong><span>${u.email} <button class="copy-btn" onclick="copyText('${u.email}')"><i class="fas fa-copy"></i></button></span></div></div>
                        <div class="info-row"><div class="info-row-icon"><i class="fab fa-discord"></i></div><div><strong>ديسكورد</strong><span>${u.discord || '81a0'}</span></div></div>
                        <div class="info-row"><div class="info-row-icon"><i class="fab fa-telegram"></i></div><div><strong>تلجرام</strong><span>${u.telegram || 'لم يتم تحديد'}</span></div></div>
                    </div>
                </div>
            </div>
        </main>
    </div>`;
}

// ============ PAGE: Register ============
function renderRegister(app) {
    if (APP.user) { navigateTo('/dashboard'); return; }
    app.innerHTML = `
    <section class="auth-page">
        <div class="auth-card">
            <div class="auth-card-header"><div class="auth-logo">Dev Place</div><p>انضم إلينا</p></div>
            <div class="auth-card-body">
                <form onsubmit="handleRegister(event)">
                    <div class="input-group"><i class="fas fa-user"></i><input type="text" id="regUser" placeholder="اسم المستخدم" required></div>
                    <div class="input-group"><i class="fas fa-envelope"></i><input type="email" id="regEmail" placeholder="البريد" required></div>
                    <div class="input-row">
                        <div class="input-group"><i class="fab fa-discord"></i><input type="text" id="regDiscord" placeholder="ديسكورد"></div>
                        <div class="input-group"><i class="fab fa-telegram"></i><input type="text" id="regTelegram" placeholder="تلجرام"></div>
                    </div>
                    <div class="input-group">
                        <i class="fas fa-key"></i>
                        <input type="password" id="regPass" placeholder="كلمة المرور" required minlength="6">
                        <button type="button" class="toggle-pass-btn" onclick="togglePass('regPass',this)"><i class="fas fa-eye"></i></button>
                    </div>
                    <div class="form-error" id="regError"></div>
                    <div class="form-success" id="regSuccess"></div>
                    <button type="submit" class="btn-glow btn-full"><span>إنشاء حساب</span><i class="fas fa-arrow-left"></i></button>
                </form>
                <p class="modal-footer-text">عندك حساب؟ <a href="/" onclick="openModal('loginModal');return false;">دخول</a></p>
            </div>
        </div>
    </section>`;
}

// ============ PAGE: Verify ============
function renderVerify(app) {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const email = params.get('email');
    let html = '';

    if (token && email) {
        const user = APP.users.find(u => u.email === email && u.verificationToken === token);
        if (user) {
            user.verified = true;
            user.verificationToken = null;
            saveUsers();
            html = '<section class="auth-page"><div class="auth-card"><div class="auth-card-header"><div class="auth-logo">✅</div><p>تم التفعيل</p></div><div class="auth-card-body text-center"><p style="font-size:3rem;">✅</p><p>بريدك مفعل</p><a href="/" class="btn-glow" style="margin-top:16px;" onclick="openModal(\'loginModal\');return false;">سجل دخولك</a></div></div></section>';
        } else {
            html = '<section class="auth-page"><div class="auth-card"><div class="auth-card-header"><div class="auth-logo">❌</div></div><div class="auth-card-body text-center"><p>رابط غير صالح</p></div></div></section>';
        }
    } else {
        html = '<section class="auth-page"><div class="auth-card"><div class="auth-card-header"><div class="auth-logo">❌</div></div><div class="auth-card-body text-center"><p>رابط غير صالح</p></div></div></section>';
    }
    app.innerHTML = html;
}

// ============ PAGE: Profile ============
function renderProfile(app) {
    if (!APP.user) { navigateTo('/'); return; }
    const u = APP.users.find(x => x.username === APP.user.username) || APP.user;
    app.innerHTML = `
    <section class="profile-page">
        <div class="profile-card">
            <div class="profile-cover"></div>
            <div class="profile-avatar-lg"><i class="fas fa-user-secret"></i></div>
            <div class="profile-body">
                <h2>${u.username}</h2>
                <div class="role-badge">${u.role === 'owner' ? 'المالك' : 'مستخدم'}</div>
                <div class="profile-details">
                    <div class="pd-row"><div class="pd-icon"><i class="fas fa-envelope"></i></div><div class="pd-info"><strong>البريد</strong><span>${u.email} <button class="copy-btn" onclick="copyText('${u.email}')"><i class="fas fa-copy"></i></button></span></div></div>
                    <div class="pd-row"><div class="pd-icon"><i class="fab fa-discord"></i></div><div class="pd-info"><strong>ديسكورد</strong><span>${u.discord || '81a0'}</span></div></div>
                    <div class="pd-row"><div class="pd-icon"><i class="fab fa-telegram"></i></div><div class="pd-info"><strong>تلجرام</strong><span>${u.telegram || 'لم يتم تحديد'}</span></div></div>
                </div>
            </div>
        </div>
    </section>`;
}

// ============ PAGE: 404 ============
function render404(app) {
    app.innerHTML = `
    <section class="error-section">
        <div>
            <div class="error-code">404</div>
            <p>الصفحة غير موجودة</p>
            <a href="/" class="btn-glow" data-link><i class="fas fa-home"></i> الرئيسية</a>
        </div>
    </section>`;
}

// ============ Auth ============
function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('loginUser').value.trim();
    const password = document.getElementById('loginPass').value.trim();
    const errorEl = document.getElementById('loginError');

    const user = APP.users.find(u => u.username === username || u.email === username);
    if (!user || atob(user.password) !== password) {
        errorEl.textContent = 'غلط في الاسم أو كلمة المرور';
        return;
    }

    APP.user = { id: user.id, username: user.username, email: user.email, role: user.role, verified: user.verified, discord: user.discord, telegram: user.telegram };
    localStorage.setItem('dp-user', JSON.stringify(APP.user));
    closeModal('loginModal');
    updateAuthUI();
    navigateTo('/dashboard');
    showToast('👋 مرحباً ' + user.username + '!', 'success');
}

function handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById('regUser').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const discord = document.getElementById('regDiscord').value.trim();
    const telegram = document.getElementById('regTelegram').value.trim();
    const password = document.getElementById('regPass').value.trim();
    const errorEl = document.getElementById('regError');
    const successEl = document.getElementById('regSuccess');

    errorEl.textContent = '';
    successEl.style.display = 'none';

    if (!username || !email || !password) { errorEl.textContent = 'كل الحقول مطلوبة'; return; }
    if (password.length < 6) { errorEl.textContent = 'كلمة المرور 6 أحرف على الأقل'; return; }
    if (APP.users.find(u => u.username === username)) { errorEl.textContent = 'اسم المستخدم مستخدم'; return; }
    if (APP.users.find(u => u.email === email)) { errorEl.textContent = 'البريد مستخدم'; return; }

    const token = 'v_' + Math.random().toString(36).substr(2, 9);
    APP.users.push({ id: APP.users.length + 1, username, email, password: btoa(password), verified: false, verificationToken: token, role: 'user', discord, telegram, created: new Date().toISOString() });
    saveUsers();

    successEl.textContent = '✅ تم! شيك بريدك';
    successEl.style.display = 'block';
    e.target.reset();

    console.log('Verify link: /verify-email?token=' + token + '&email=' + email);
    setTimeout(function() { navigateTo('/verify-email?token=' + token + '&email=' + email); }, 2000);
}

function logout() {
    APP.user = null;
    localStorage.removeItem('dp-user');
    updateAuthUI();
    navigateTo('/');
    showToast('تم تسجيل الخروج');
}

function updateAuthUI() {
    const lb = document.getElementById('loginBtnHeader');
    const um = document.getElementById('userMenu');
    if (APP.user) {
        if (lb) lb.style.display = 'none';
        if (um) { um.style.display = 'block'; document.getElementById('userMenuName').textContent = APP.user.username; }
    } else {
        if (lb) lb.style.display = 'flex';
        if (um) um.style.display = 'none';
    }
}

// ============ Projects CRUD ============
function openProjectModal(id) {
    id = id || null;
    document.getElementById('projectId').value = id || '';
    document.getElementById('projectModalTitle').textContent = id ? 'تعديل مشروع' : 'إضافة مشروع';
    document.getElementById('projectSubmitBtn').innerHTML = '<span>حفظ</span><i class="fas fa-save"></i>';

    if (id) {
        var p = APP.projects.find(function(x) { return x.id === id; });
        if (p) {
            document.getElementById('projectTitle').value = p.title;
            document.getElementById('projectDesc').value = p.desc;
            document.getElementById('projectType').value = p.type;
            document.getElementById('projectStatus').value = p.status;
            document.getElementById('projectFile').value = p.file || '';
        }
    } else {
        document.getElementById('projectTitle').value = '';
        document.getElementById('projectDesc').value = '';
        document.getElementById('projectType').value = '';
        document.getElementById('projectStatus').value = 'completed';
        document.getElementById('projectFile').value = '';
    }
    document.getElementById('projectError').textContent = '';
    openModal('projectModal');
}

function saveProject(e) {
    e.preventDefault();
    var id = parseInt(document.getElementById('projectId').value) || null;
    var title = document.getElementById('projectTitle').value.trim();
    var desc = document.getElementById('projectDesc').value.trim();
    var type = document.getElementById('projectType').value.trim();
    var status = document.getElementById('projectStatus').value;
    var file = document.getElementById('projectFile').value.trim();
    var errorEl = document.getElementById('projectError');

    if (!title || !desc || !type) { errorEl.textContent = 'كل الحقول مطلوبة'; return; }

    if (id) {
        var p = APP.projects.find(function(x) { return x.id === id; });
        if (p) { p.title = title; p.desc = desc; p.type = type; p.status = status; p.file = file; }
    } else {
        APP.projects.push({ id: Date.now(), title: title, desc: desc, type: type, status: status, file: file, downloads: 0, created: new Date().toISOString() });
    }

    saveProjects();
    closeModal('projectModal');
    router();
    showToast('✅ تم حفظ المشروع', 'success');
}

function confirmDeleteProject(id) {
    APP.deleteId = id;
    document.getElementById('confirmDeleteBtn').onclick = function() {
        APP.projects = APP.projects.filter(function(x) { return x.id !== APP.deleteId; });
        saveProjects();
        closeModal('deleteModal');
        router();
        showToast('🗑️ تم الحذف');
    };
    openModal('deleteModal');
}

function downloadProject(id) {
    var p = APP.projects.find(function(x) { return x.id === id; });
    if (p) {
        p.downloads = (p.downloads || 0) + 1;
        saveProjects();
        showToast('📥 ' + p.title, 'success');
        if (p.file) window.open(p.file, '_blank');
    }
}

// ============ Modal ============
function openModal(id) {
    var m = document.getElementById(id);
    if (m) { m.classList.add('active'); document.body.style.overflow = 'hidden'; }
}

function closeModal(id) {
    var m = document.getElementById(id);
    if (m) {
        m.classList.remove('active');
        document.body.style.overflow = '';
        if (id === 'loginModal') {
            var f = document.getElementById('loginForm');
            if (f) f.reset();
            var e = document.getElementById('loginError');
            if (e) e.textContent = '';
        }
    }
}

// ============ Utility ============
function copyText(txt) {
    navigator.clipboard.writeText(txt).then(function() {
        showToast('✅ تم النسخ!', 'success');
    });
}

function togglePass(id, btn) {
    var inp = document.getElementById(id);
    var icon = btn.querySelector('i');
    if (inp && icon) {
        inp.type = inp.type === 'password' ? 'text' : 'password';
        icon.className = inp.type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
    }
}

function showToast(msg, type) {
    type = type || '';
    var c = document.getElementById('toasts');
    if (!c) return;
    var t = document.createElement('div');
    t.className = 'toast ' + type;
    t.textContent = msg;
    c.appendChild(t);
    setTimeout(function() { t.remove(); }, 3000);
}
