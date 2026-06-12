/* ============================================
   Dev Place - MAD MAN | Complete Script
   All Pages: Home, About, Projects, Contact,
   Dashboard, Register, Verify, Profile, 404
   ============================================ */

// ============ State ============
const APP = {
    page: window.location.pathname,
    theme: localStorage.getItem('dp-theme') || 'dark',
    lang: localStorage.getItem('dp-lang') || 'ar',
    user: JSON.parse(localStorage.getItem('dp-user') || 'null'),
    users: JSON.parse(localStorage.getItem('dp-users') || '[]'),
    projects: JSON.parse(localStorage.getItem('dp-projects') || '[]'),
    deleteId: null
};

// ============ Translations ============
const TR = {
    ar: {
        home: 'الرئيسية', about: 'عن المطور', projects: 'المشاريع', contact: 'تواصل',
        dashboard: 'لوحة التحكم', welcome: 'مرحباً', tagline: 'مبرمج محترف - صانع هوستات ومواقع',
        desc: 'مبرمج محترف جداً، متخصص في صناعة الهوستات والمواقع الاحترافية. أقدم حلولاً تقنية متكاملة بجودة عالية.',
        browse: 'تصفح المشاريع', signup: 'سوي حساب', stats1: 'مشروع منجز', stats2: 'عميل سعيد',
        stats3: 'دعم فني', aboutMe: 'عن المطور', name: 'MAD MAN',
        aboutDesc1: 'مبرمج محترف بخبرة واسعة في البرمجة وتطوير المواقع وصناعة الهوستات.',
        aboutDesc2: 'متخصص في تصميم وتطوير المواقع الاحترافية وحلول الاستضافة المتكاملة.',
        projectsTitle: 'المشاريع', projectsDesc: 'مجموعة من المشاريع المجانية للجميع',
        contactTitle: 'تواصل معي', contactDesc: 'تقدر تتواصل معاي عبر هالقنوات',
        add: 'إضافة مشروع', edit: 'تعديل', save: 'حفظ', cancel: 'إلغاء', delete: 'حذف',
        download: 'تحميل', login: 'دخول', logout: 'خروج', email: 'البريد الإلكتروني',
        discord: 'ديسكورد', telegram: 'تلجرام', notSet: 'لم يتم تحديد',
        profile: 'الملف الشخصي', role: 'المالك', completed: 'مكتمل', inProgress: 'قيد التطوير',
        noProjects: 'لا توجد مشاريع حالياً', loginTitle: 'تسجيل الدخول',
        loginSub: 'أهلاً بعودتك يا بطل', registerTitle: 'إنشاء حساب', registerSub: 'انضم إلينا',
        verifySuccess: 'تم تفعيل البريد بنجاح', verifyError: 'رابط التحقق غير صالح',
        error404: 'الصفحة غير موجودة', backHome: 'الرجوع للرئيسية',
        copy: 'نسخ', available: 'متاح للعمل', manageProjects: 'إدارة المشاريع',
        accountInfo: 'معلومات الحساب', username: 'اسم المستخدم', lastLogin: 'آخر دخول: اليوم',
        overview: 'نظرة عامة', myProjects: 'مشاريعي', account: 'الحساب',
        ownerEmail: 'mohamedhere63@gmail.com', ownerDiscord: '81a0',
        password: 'كلمة المرور', loginError: 'غلط في الاسم أو كلمة المرور',
        registerSuccess: '✅ تم إنشاء الحساب! شيك بريدك', fillAll: 'كل الحقول مطلوبة',
        passLength: 'كلمة المرور 6 أحرف على الأقل', userTaken: 'اسم المستخدم مستخدم',
        emailTaken: 'البريد مستخدم', projectSaved: '✅ تم حفظ المشروع',
        projectDeleted: '🗑️ تم حذف المشروع', logoutMsg: 'تم تسجيل الخروج',
        copied: '✅ تم النسخ!', downloadMsg: '📥 جاري التحميل',
        loginRequired: 'سجل دخولك أول', deleteConfirm: 'متأكد تبي تحذف؟ متقدر ترجع!'
    },
    en: {
        home: 'Home', about: 'About', projects: 'Projects', contact: 'Contact',
        dashboard: 'Dashboard', welcome: 'Welcome', tagline: 'Professional Developer - Host & Website Maker',
        desc: 'A highly professional programmer specialized in hosting and professional websites.',
        browse: 'Browse Projects', signup: 'Create Account', stats1: 'Projects Done', stats2: 'Happy Clients',
        stats3: '24/7 Support', aboutMe: 'About Me', name: 'MAD MAN',
        aboutDesc1: 'Professional programmer with extensive experience in web development and hosting.',
        aboutDesc2: 'Specialized in professional website design and hosting solutions.',
        projectsTitle: 'Projects', projectsDesc: 'Free projects available for everyone',
        contactTitle: 'Contact Me', contactDesc: 'Reach me through these channels',
        add: 'Add Project', edit: 'Edit', save: 'Save', cancel: 'Cancel', delete: 'Delete',
        download: 'Download', login: 'Login', logout: 'Logout', email: 'Email',
        discord: 'Discord', telegram: 'Telegram', notSet: 'Not set',
        profile: 'Profile', role: 'Owner', completed: 'Completed', inProgress: 'In Progress',
        noProjects: 'No projects yet', loginTitle: 'Login', loginSub: 'Welcome back hero',
        registerTitle: 'Register', registerSub: 'Join us', verifySuccess: 'Email verified successfully',
        verifyError: 'Invalid verification link', error404: 'Page not found', backHome: 'Back to Home',
        copy: 'Copy', available: 'Available for work', manageProjects: 'Manage Projects',
        accountInfo: 'Account Info', username: 'Username', lastLogin: 'Last login: today',
        overview: 'Overview', myProjects: 'My Projects', account: 'Account',
        ownerEmail: 'mohamedhere63@gmail.com', ownerDiscord: '81a0',
        password: 'Password', loginError: 'Invalid username or password',
        registerSuccess: '✅ Account created! Check your email', fillAll: 'All fields are required',
        passLength: 'Password must be at least 6 characters', userTaken: 'Username already taken',
        emailTaken: 'Email already used', projectSaved: '✅ Project saved',
        projectDeleted: '🗑️ Project deleted', logoutMsg: 'Logged out',
        copied: '✅ Copied!', downloadMsg: '📥 Downloading',
        loginRequired: 'Please login first', deleteConfirm: 'Are you sure? This cannot be undone!'
    }
};

function t(key) { return TR[APP.lang]?.[key] || TR['ar'][key] || key; }

// ============ Init ============
(function init() {
    document.documentElement.setAttribute('data-theme', APP.theme);
    updateThemeIcon();
    if (APP.lang === 'en') {
        document.documentElement.dir = 'ltr';
        document.querySelector('#langToggle span').textContent = 'AR';
    }

    if (!APP.users.length) {
        APP.users.push({
            id: 1, username: 'Owner', email: 'mohamedhere63@gmail.com',
            password: btoa('Owner123'), verified: true, role: 'owner',
            discord: '81a0', telegram: '', created: new Date().toISOString()
        });
        saveUsers();
    }

    if (!APP.projects.length) {
        APP.projects.push(
            { id: 1, title: 'قالب موقع شخصي', desc: 'قالب احترافي متجاوب مع جميع الأجهزة بتصميم عصري', type: 'HTML/CSS/JS', status: 'completed', file: '', downloads: 120, created: new Date().toISOString() },
            { id: 2, title: 'لوحة تحكم هوست', desc: 'لوحة تحكم بسيطة لإدارة ملفات الاستضافة مع دعم العربية', type: 'PHP/MySQL', status: 'completed', file: '', downloads: 85, created: new Date().toISOString() },
            { id: 3, title: 'تطبيق مهام', desc: 'تطبيق ويب لإدارة المهام اليومية بواجهة عربية أنيقة', type: 'React/Node.js', status: 'in-progress', file: '', downloads: 40, created: new Date().toISOString() },
            { id: 4, title: 'مكتبة أكواد جاهزة', desc: 'مجموعة من الأكواد البرمجية الجاهزة للاستخدام', type: 'JavaScript', status: 'completed', file: '', downloads: 200, created: new Date().toISOString() }
        );
        saveProjects();
    }

    createParticles();
    router();
    updateAuthUI();
    setupEventListeners();
})();

function saveUsers() { localStorage.setItem('dp-users', JSON.stringify(APP.users)); }
function saveProjects() { localStorage.setItem('dp-projects', JSON.stringify(APP.projects)); }

// ============ Particles ============
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = 2 + Math.random() * 4;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDuration = 8 + Math.random() * 12 + 's';
        p.style.animationDelay = Math.random() * 10 + 's';
        container.appendChild(p);
    }
}

// ============ Event Listeners ============
function setupEventListeners() {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('popstate', router);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleGlobalClick);

    document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
    document.getElementById('langToggle')?.addEventListener('click', toggleLang);
    document.getElementById('menuToggle')?.addEventListener('click', () => {
        document.getElementById('nav').classList.toggle('active');
    });
    document.getElementById('loginBtnHeader')?.addEventListener('click', () => openModal('loginModal'));
    document.getElementById('scrollTop')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    document.querySelectorAll('.modal-backdrop').forEach(bd => {
        bd.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) closeModal(modal.id);
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(m => closeModal(m.id));
        }
    });
}

function handleScroll() {
    const scrollY = window.scrollY;
    document.getElementById('header')?.classList.toggle('scrolled', scrollY > 50);
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        progressBar.style.width = total > 0 ? Math.min((scrollY / total) * 100, 100) + '%' : '0%';
    }
    document.getElementById('scrollTop')?.classList.toggle('show', scrollY > 300);
}

function handleMouseMove(e) {
    const cursor = document.querySelector('.cursor');
    const dot = document.querySelector('.cursor-dot');
    if (cursor) { cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px'; }
    if (dot) { dot.style.left = e.clientX + 'px'; dot.style.top = e.clientY + 'px'; }
}

function handleGlobalClick(e) {
    const link = e.target.closest('[data-link]');
    if (link) {
        e.preventDefault();
        navigateTo(link.getAttribute('href'));
    }
    const nav = document.getElementById('nav');
    const menuBtn = document.getElementById('menuToggle');
    if (nav && nav.classList.contains('active') && !nav.contains(e.target) && e.target !== menuBtn) {
        nav.classList.remove('active');
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
    document.querySelector('#langToggle span').textContent = APP.lang === 'ar' ? 'EN' : 'AR';
    localStorage.setItem('dp-lang', APP.lang);
    router();
}

function updateThemeIcon() {
    const icon = document.querySelector('#themeToggle i');
    if (icon) icon.className = APP.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ============ Router ============
function router() {
    APP.page = window.location.pathname;
    const app = document.getElementById('app');
    if (!app) return;

    document.querySelectorAll('.nav-item').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === APP.page) link.classList.add('active');
    });

    switch (APP.page) {
        case '/': renderHome(app); break;
        case '/about': renderAbout(app); break;
        case '/projects': renderProjects(app); break;
        case '/contact': renderContact(app); break;
        case '/dashboard': renderDashboard(app); break;
        case '/register': renderRegister(app); break;
        case '/verify-email': renderVerifyEmail(app); break;
        case '/profile': renderProfile(app); break;
        default: render404(app);
    }

    window.scrollTo(0, 0);
    document.getElementById('nav').classList.remove('active');
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
            <div class="hero-orb hero-orb-1"></div>
            <div class="hero-orb hero-orb-2"></div>
            <div class="hero-orb hero-orb-3"></div>
        </div>
        <div class="hero-content">
            <div class="hero-badge"><span class="dot"></span>${t('tagline')}</div>
            <h1 class="hero-title"><span class="gradient-text">MAD MAN</span></h1>
            <p class="hero-subtitle">${t('tagline')}</p>
            <p class="hero-desc">${t('desc')}</p>
            <div class="hero-buttons">
                <a href="/projects" class="btn-glow" data-link><i class="fas fa-code"></i> ${t('browse')}</a>
                <a href="/register" class="btn-glass" data-link><i class="fas fa-user-plus"></i> ${t('signup')}</a>
            </div>
            <div class="hero-stats">
                <div class="stat-item"><div class="stat-number">+50</div><div class="stat-label">${t('stats1')}</div></div>
                <div class="stat-item"><div class="stat-number">+30</div><div class="stat-label">${t('stats2')}</div></div>
                <div class="stat-item"><div class="stat-number">24/7</div><div class="stat-label">${t('stats3')}</div></div>
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
                <div class="section-label">👤 ${t('aboutMe')}</div>
                <h2 class="section-title"><span>MAD MAN</span></h2>
                <p class="section-sub">${t('aboutMe')}</p>
            </div>
            <div class="about-grid">
                <div class="about-visual">
                    <div class="about-avatar-wrap">
                        <div class="about-avatar-ring"></div>
                        <div class="about-avatar"><i class="fas fa-user-secret"></i></div>
                        <div class="about-floating-card">
                            <i class="fas fa-circle" style="color:#10b981;"></i> ${t('available')}
                        </div>
                    </div>
                </div>
                <div class="about-info">
                    <h3>${t('name')}</h3>
                    <p>${t('aboutDesc1')}</p>
                    <p>${t('aboutDesc2')}</p>
                    <div class="info-cards">
                        <div class="info-card">
                            <div class="info-card-icon"><i class="fas fa-envelope"></i></div>
                            <div>
                                <h4>${t('email')}</h4>
                                <span>${t('ownerEmail')} <button class="copy-btn" onclick="copyText('${t('ownerEmail')}')"><i class="fas fa-copy"></i></button></span>
                            </div>
                        </div>
                        <div class="info-card">
                            <div class="info-card-icon"><i class="fab fa-discord"></i></div>
                            <div>
                                <h4>${t('discord')}</h4>
                                <span>${t('ownerDiscord')} <button class="copy-btn" onclick="copyText('${t('ownerDiscord')}')"><i class="fas fa-copy"></i></button></span>
                            </div>
                        </div>
                        <div class="info-card">
                            <div class="info-card-icon"><i class="fab fa-telegram"></i></div>
                            <div>
                                <h4>${t('telegram')}</h4>
                                <span>${t('notSet')}</span>
                            </div>
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
    const isOwner = APP.user?.role === 'owner' || APP.user?.username === 'Owner';
    let cards = '';

    if (APP.projects.length === 0) {
        cards = `<div class="empty-state"><i class="fas fa-folder-open"></i><p>${t('noProjects')}</p></div>`;
    } else {
        cards = APP.projects.map(p => `
            <div class="project-card">
                <div class="project-card-icon"><i class="fas fa-code"></i></div>
                <h3>${p.title}</h3>
                <p>${p.desc}</p>
                <div class="project-meta">
                    <span><i class="fas fa-download"></i> ${p.downloads || 0}</span>
                    <span class="badge-sm ${p.status === 'completed' ? 'badge-done' : 'badge-progress'}">
                        ${p.status === 'completed' ? t('completed') : t('inProgress')}
                    </span>
                </div>
                <div class="project-tags">
                    ${p.type.split('/').map(tag => `<span>${tag.trim()}</span>`).join('')}
                </div>
                <div class="project-actions">
                    <button class="btn-sm-glass" onclick="downloadProject(${p.id})">
                        <i class="fas fa-download"></i> ${t('download')}
                    </button>
                    ${isOwner ? `
                        <button class="btn-sm-glass" onclick="openProjectModal(${p.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-sm-glass danger" onclick="confirmDeleteProject(${p.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }

    app.innerHTML = `
    <section style="padding:120px 0 80px">
        <div class="container">
            <div class="text-center mx-auto" style="margin-bottom:60px">
                <div class="section-label">💻 ${t('projects')}</div>
                <h2 class="section-title">${t('projectsTitle')}</h2>
                <p class="section-sub">${t('projectsDesc')}</p>
            </div>
            ${isOwner ? `
                <div class="text-center" style="margin-bottom:30px">
                    <button class="btn-glow" onclick="openProjectModal()">
                        <i class="fas fa-plus"></i> ${t('add')}
                    </button>
                </div>
            ` : ''}
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
                <div class="section-label">📬 ${t('contact')}</div>
                <h2 class="section-title">${t('contactTitle')}</h2>
                <p class="section-sub">${t('contactDesc')}</p>
            </div>
            <div class="contact-grid">
                <div class="contact-card">
                    <div class="contact-card-icon"><i class="fas fa-envelope"></i></div>
                    <h3>${t('email')}</h3>
                    <p>${t('ownerEmail')}</p>
                    <button class="copy-btn" onclick="copyText('${t('ownerEmail')}')">
                        <i class="fas fa-copy"></i> ${t('copy')}
                    </button>
                </div>
                <div class="contact-card">
                    <div class="contact-card-icon"><i class="fab fa-discord"></i></div>
                    <h3>${t('discord')}</h3>
                    <p>${t('ownerDiscord')}</p>
                    <button class="copy-btn" onclick="copyText('${t('ownerDiscord')}')">
                        <i class="fas fa-copy"></i> ${t('copy')}
                    </button>
                </div>
                <div class="contact-card">
                    <div class="contact-card-icon"><i class="fab fa-telegram"></i></div>
                    <h3>${t('telegram')}</h3>
                    <p>${t('notSet')}</p>
                </div>
            </div>
        </div>
    </section>`;
}

// ============ PAGE: Dashboard ============
function renderDashboard(app) {
    if (!APP.user) {
        navigateTo('/');
        showToast(t('loginRequired'), 'error');
        return;
    }

    const totalProjects = APP.projects.length;
    const completedProjects = APP.projects.filter(p => p.status === 'completed').length;
    const totalDownloads = APP.projects.reduce((sum, p) => sum + (p.downloads || 0), 0);
    const currentUser = APP.users.find(u => u.username === APP.user.username) || APP.user;

    app.innerHTML = `
    <div class="dashboard-layout">
        <aside class="dashboard-sidebar">
            <div class="sidebar-header">
                <div class="sidebar-logo">Dev <span>Place</span></div>
            </div>
            <nav class="sidebar-nav">
                <a href="/dashboard" class="active"><i class="fas fa-grid"></i> ${t('overview')}</a>
                <a href="/projects" data-link><i class="fas fa-folder"></i> ${t('myProjects')}</a>
                <a href="/profile" data-link><i class="fas fa-user"></i> ${t('profile')}</a>
                <a href="#" onclick="logout()"><i class="fas fa-logout"></i> ${t('logout')}</a>
            </nav>
        </aside>
        <main class="dashboard-main">
            <div class="welcome-card">
                <div>
                    <h2>👋 ${t('welcome')} ${APP.user.username}!</h2>
                    <p style="opacity:0.85;">${t('lastLogin')}</p>
                </div>
                <a href="/projects" class="btn-glass" data-link style="color:#fff;border-color:rgba(255,255,255,0.4);">
                    ${t('manageProjects')}
                </a>
            </div>
            <div class="stats-grid">
                <div class="stat-card-db">
                    <div class="stat-icon-db purple"><i class="fas fa-code"></i></div>
                    <div class="stat-info-db"><h3>${totalProjects}</h3><p>${t('projects')}</p></div>
                </div>
                <div class="stat-card-db">
                    <div class="stat-icon-db green"><i class="fas fa-check"></i></div>
                    <div class="stat-info-db"><h3>${completedProjects}</h3><p>${t('completed')}</p></div>
                </div>
                <div class="stat-card-db">
                    <div class="stat-icon-db blue"><i class="fas fa-download"></i></div>
                    <div class="stat-info-db"><h3>${totalDownloads}</h3><p>${t('download')}</p></div>
                </div>
                <div class="stat-card-db">
                    <div class="stat-icon-db pink"><i class="fas fa-star"></i></div>
                    <div class="stat-info-db"><h3>4.9</h3><p>${t('stats2')}</p></div>
                </div>
            </div>
            <div class="info-grid">
                <div class="info-block">
                    <div class="info-block-header">👤 ${t('accountInfo')}</div>
                    <div class="info-block-body">
                        <div class="info-row">
                            <div class="info-row-icon"><i class="fas fa-user"></i></div>
                            <div><strong>${t('username')}</strong><span>${currentUser.username}</span></div>
                        </div>
                        <div class="info-row">
                            <div class="info-row-icon"><i class="fas fa-envelope"></i></div>
                            <div><strong>${t('email')}</strong><span>${currentUser.email} <button class="copy-btn" onclick="copyText('${currentUser.email}')"><i class="fas fa-copy"></i></button></span></div>
                        </div>
                        <div class="info-row">
                            <div class="info-row-icon"><i class="fab fa-discord"></i></div>
                            <div><strong>${t('discord')}</strong><span>${currentUser.discord || t('ownerDiscord')}</span></div>
                        </div>
                        <div class="info-row">
                            <div class="info-row-icon"><i class="fab fa-telegram"></i></div>
                            <div><strong>${t('telegram')}</strong><span>${currentUser.telegram || t('notSet')}</span></div>
                        </div>
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
            <div class="auth-card-header">
                <div class="auth-logo">Dev Place</div>
                <p>${t('registerSub')}</p>
            </div>
            <div class="auth-card-body">
                <form onsubmit="handleRegister(event)">
                    <div class="input-group">
                        <i class="fas fa-user"></i>
                        <input type="text" id="regUser" placeholder="${t('username')}" required>
                    </div>
                    <div class="input-group">
                        <i class="fas fa-envelope"></i>
                        <input type="email" id="regEmail" placeholder="${t('email')}" required>
                    </div>
                    <div class="input-row">
                        <div class="input-group">
                            <i class="fab fa-discord"></i>
                            <input type="text" id="regDiscord" placeholder="${t('discord')}">
                        </div>
                        <div class="input-group">
                            <i class="fab fa-telegram"></i>
                            <input type="text" id="regTelegram" placeholder="${t('telegram')}">
                        </div>
                    </div>
                    <div class="input-group">
                        <i class="fas fa-key"></i>
                        <input type="password" id="regPass" placeholder="${t('password')}" required minlength="6">
                        <button type="button" class="toggle-pass-btn" onclick="togglePassword('regPass',this)">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                    <div class="form-error" id="regError"></div>
                    <div class="form-success" id="regSuccess"></div>
                    <button type="submit" class="btn-glow btn-full">
                        <span>${t('registerTitle')}</span><i class="fas fa-arrow-left"></i>
                    </button>
                </form>
                <p class="modal-footer-text">
                    ${t('loginTitle')}? <a href="/" onclick="openModal('loginModal');return false;">${t('login')}</a>
                </p>
            </div>
        </div>
    </section>`;
}

// ============ PAGE: Verify Email ============
function renderVerifyEmail(app) {
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
            html = `
            <section class="auth-page">
                <div class="auth-card">
                    <div class="auth-card-header">
                        <div class="auth-logo">✅</div>
                        <p>${t('verifySuccess')}</p>
                    </div>
                    <div class="auth-card-body text-center">
                        <p style="font-size:3rem;">✅</p>
                        <p>${t('verifySuccess')}</p>
                        <a href="/" class="btn-glow" style="margin-top:16px;" onclick="openModal('loginModal');return false;">
                            ${t('login')}
                        </a>
                    </div>
                </div>
            </section>`;
        } else {
            html = `
            <section class="auth-page">
                <div class="auth-card">
                    <div class="auth-card-header"><div class="auth-logo">❌</div></div>
                    <div class="auth-card-body text-center"><p>${t('verifyError')}</p></div>
                </div>
            </section>`;
        }
    } else {
        html = `
        <section class="auth-page">
            <div class="auth-card">
                <div class="auth-card-header"><div class="auth-logo">❌</div></div>
                <div class="auth-card-body text-center"><p>${t('verifyError')}</p></div>
            </div>
        </section>`;
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
                <div class="role-badge">${u.role === 'owner' ? t('role') : 'مستخدم'}</div>
                <div class="profile-details">
                    <div class="pd-row">
                        <div class="pd-icon"><i class="fas fa-envelope"></i></div>
                        <div class="pd-info">
                            <strong>${t('email')}</strong>
                            <span>${u.email} <button class="copy-btn" onclick="copyText('${u.email}')"><i class="fas fa-copy"></i></button></span>
                        </div>
                    </div>
                    <div class="pd-row">
                        <div class="pd-icon"><i class="fab fa-discord"></i></div>
                        <div class="pd-info">
                            <strong>${t('discord')}</strong>
                            <span>${u.discord || t('ownerDiscord')}</span>
                        </div>
                    </div>
                    <div class="pd-row">
                        <div class="pd-icon"><i class="fab fa-telegram"></i></div>
                        <div class="pd-info">
                            <strong>${t('telegram')}</strong>
                            <span>${u.telegram || t('notSet')}</span>
                        </div>
                    </div>
                    <div class="pd-row">
                        <div class="pd-icon"><i class="fas fa-calendar"></i></div>
                        <div class="pd-info">
                            <strong>تاريخ التسجيل</strong>
                            <span>${new Date(u.created).toLocaleDateString('ar')}</span>
                        </div>
                    </div>
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
            <p>${t('error404')}</p>
            <a href="/" class="btn-glow" data-link><i class="fas fa-home"></i> ${t('backHome')}</a>
        </div>
    </section>`;
}

// ============ Auth Functions ============
function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('loginUser').value.trim();
    const password = document.getElementById('loginPass').value.trim();
    const errorEl = document.getElementById('loginError');

    const user = APP.users.find(u => u.username === username || u.email === username);
    if (!user || atob(user.password) !== password) {
        errorEl.textContent = t('loginError');
        return;
    }

    APP.user = {
        id: user.id, username: user.username, email: user.email,
        role: user.role, verified: user.verified,
        discord: user.discord, telegram: user.telegram
    };
    localStorage.setItem('dp-user', JSON.stringify(APP.user));
    closeModal('loginModal');
    updateAuthUI();
    navigateTo('/dashboard');
    showToast(`👋 ${t('welcome')} ${user.username}!`, 'success');
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

    if (!username || !email || !password) { errorEl.textContent = t('fillAll'); return; }
    if (password.length < 6) { errorEl.textContent = t('passLength'); return; }
    if (APP.users.find(u => u.username === username)) { errorEl.textContent = t('userTaken'); return; }
    if (APP.users.find(u => u.email === email)) { errorEl.textContent = t('emailTaken'); return; }

    const token = 'verify_' + Math.random().toString(36).substr(2, 9);
    APP.users.push({
        id: APP.users.length + 1, username, email,
        password: btoa(password), verified: false,
        verificationToken: token, role: 'user',
        discord, telegram, created: new Date().toISOString()
    });
    saveUsers();

    successEl.textContent = t('registerSuccess');
    successEl.style.display = 'block';
    e.target.reset();

    console.log(`📧 Verify link: /verify-email?token=${token}&email=${email}`);
    setTimeout(() => navigateTo(`/verify-email?token=${token}&email=${email}`), 2000);
}

function logout() {
    APP.user = null;
    localStorage.removeItem('dp-user');
    updateAuthUI();
    navigateTo('/');
    showToast(t('logoutMsg'));
}

function updateAuthUI() {
    const loginBtn = document.getElementById('loginBtnHeader');
    const userMenu = document.getElementById('userMenu');
    if (APP.user) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (userMenu) {
            userMenu.style.display = 'block';
            document.getElementById('userMenuName').textContent = APP.user.username;
        }
    } else {
        if (loginBtn) loginBtn.style.display = 'flex';
        if (userMenu) userMenu.style.display = 'none';
    }
}

// ============ Project Functions ============
function openProjectModal(id = null) {
    document.getElementById('projectId').value = id || '';
    document.getElementById('projectModalTitle').textContent = id ? t('edit') + ' ' + t('projects') : t('add');
    document.getElementById('projectSubmitBtn').innerHTML = `<span>${t('save')}</span><i class="fas fa-save"></i>`;

    if (id) {
        const p = APP.projects.find(x => x.id === id);
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
    const id = parseInt(document.getElementById('projectId').value) || null;
    const title = document.getElementById('projectTitle').value.trim();
    const desc = document.getElementById('projectDesc').value.trim();
    const type = document.getElementById('projectType').value.trim();
    const status = document.getElementById('projectStatus').value;
    const file = document.getElementById('projectFile').value.trim();
    const errorEl = document.getElementById('projectError');

    if (!title || !desc || !type) {
        errorEl.textContent = t('fillAll');
        return;
    }

    if (id) {
        const p = APP.projects.find(x => x.id === id);
        if (p) {
            p.title = title; p.desc = desc; p.type = type;
            p.status = status; p.file = file;
        }
    } else {
        APP.projects.push({
            id: Date.now(), title, desc, type, status, file,
            downloads: 0, created: new Date().toISOString()
        });
    }

    saveProjects();
    closeModal('projectModal');
    router();
    showToast(t('projectSaved'), 'success');
}

function confirmDeleteProject(id) {
    APP.deleteId = id;
    document.getElementById('confirmDeleteBtn').onclick = function() {
        deleteProject(APP.deleteId);
        closeModal('deleteModal');
    };
    openModal('deleteModal');
}

function deleteProject(id) {
    APP.projects = APP.projects.filter(x => x.id !== id);
    saveProjects();
    router();
    showToast(t('projectDeleted'));
}

function downloadProject(id) {
    const p = APP.projects.find(x => x.id === id);
    if (p) {
        p.downloads = (p.downloads || 0) + 1;
        saveProjects();
        showToast(`${t('downloadMsg')}: ${p.title}`, 'success');
        if (p.file) window.open(p.file, '_blank');
    }
}

// ============ Modal Functions ============
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        if (id === 'loginModal') {
            const form = document.getElementById('loginForm');
            if (form) form.reset();
            const err = document.getElementById('loginError');
            if (err) err.textContent = '';
        }
    }
}

// ============ Utility Functions ============
function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(t('copied'), 'success');
    }).catch(() => {
        showToast('Failed to copy', 'error');
    });
}

function togglePassword(inputId, btn) {
    const input = document.getElementById(inputId);
    const icon = btn.querySelector('i');
    if (input && icon) {
        input.type = input.type === 'password' ? 'text' : 'password';
        icon.className = input.type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
    }
}

function showToast(message, type = '') {
    const container = document.getElementById('toasts');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}
