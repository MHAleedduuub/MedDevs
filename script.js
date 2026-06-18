/* ============================================
   Dev Place - MAD MAN | Final Fixed Script
   No Double Hash - Clean Router
   ============================================ */

// ============ State ============
const APP = {
    page: 'home',
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
        var lt = document.querySelector('#langToggle span');
        if (lt) lt.textContent = 'AR';
    }
    updateThemeIcon();

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
            { id: 1, title: 'قالب موقع شخصي', desc: 'قالب احترافي متجاوب', type: 'HTML/CSS/JS', status: 'completed', file: '', downloads: 120 },
            { id: 2, title: 'لوحة تحكم هوست', desc: 'لوحة تحكم بسيطة', type: 'PHP/MySQL', status: 'completed', file: '', downloads: 85 },
            { id: 3, title: 'تطبيق مهام', desc: 'تطبيق ويب للمهام', type: 'React/Node.js', status: 'in-progress', file: '', downloads: 40 },
            { id: 4, title: 'مكتبة أكواد', desc: 'أكواد جاهزة', type: 'JavaScript', status: 'completed', file: '', downloads: 200 }
        );
        saveProjects();
    }

    createParticles();
    updateNavLinks();
    router();
    updateAuthUI();
    bindEvents();
})();

function saveUsers() { localStorage.setItem('dp-users', JSON.stringify(APP.users)); }
function saveProjects() { localStorage.setItem('dp-projects', JSON.stringify(APP.projects)); }

// ============ Translation ============
function t(key) {
    var ar = {
        home: 'الرئيسية', about: 'عن المطور', projects: 'المشاريع', contact: 'تواصل',
        dashboard: 'لوحة التحكم', login: 'دخول', logout: 'خروج', register: 'إنشاء حساب',
        tagline: 'مبرمج محترف - صانع هوستات ومواقع',
        heroDesc: 'مبرمج محترف جداً، متخصص في صناعة الهوستات والمواقع الاحترافية.',
        browse: 'تصفح المشاريع', signup: 'سوي حساب',
        stats1: 'مشروع منجز', stats2: 'عميل سعيد', stats3: 'دعم فني',
        aboutMe: 'عن المطور', aboutName: 'MAD MAN',
        aboutDesc1: 'مبرمج محترف بخبرة واسعة في البرمجة وتطوير المواقع وصناعة الهوستات.',
        aboutDesc2: 'متخصص في تصميم وتطوير المواقع الاحترافية وحلول الاستضافة المتكاملة.',
        available: 'متاح للعمل', email: 'البريد', discord: 'ديسكورد', telegram: 'تلجرام',
        notSet: 'لم يتم تحديد', copy: 'نسخ',
        projectsTitle: 'المشاريع', projectsDesc: 'مجموعة من المشاريع المجانية للجميع',
        addProject: 'إضافة مشروع', editProject: 'تعديل مشروع', save: 'حفظ',
        delete: 'حذف', download: 'تحميل', completed: 'مكتمل', inProgress: 'قيد التطوير',
        noProjects: 'لا توجد مشاريع',
        contactTitle: 'تواصل معي', contactDesc: 'تقدر تتواصل معاي عبر هالقنوات',
        overview: 'نظرة عامة', myProjects: 'مشاريعي', profile: 'الملف الشخصي',
        accountInfo: 'معلومات الحساب', manageProjects: 'إدارة المشاريع',
        welcome: 'مرحباً', lastLogin: 'آخر دخول: اليوم', username: 'اسم المستخدم',
        password: 'كلمة المرور', loginTitle: 'تسجيل الدخول', loginSub: 'أهلاً بعودتك يا بطل',
        registerSub: 'انضم إلينا', haveAccount: 'عندك حساب؟',
        loginError: 'غلط في الاسم أو كلمة المرور',
        regSuccess: '✅ تم إنشاء الحساب! شيك بريدك',
        fillAll: 'كل الحقول مطلوبة', passLength: 'كلمة المرور 6 أحرف على الأقل',
        userTaken: 'اسم المستخدم مستخدم', emailTaken: 'البريد مستخدم',
        projectSaved: '✅ تم حفظ المشروع', projectDeleted: '🗑️ تم الحذف',
        logoutMsg: 'تم تسجيل الخروج', copied: '✅ تم النسخ!',
        loginRequired: 'سجل دخولك أول', deleteConfirm: 'متأكد تبي تحذف؟',
        verifySuccess: 'تم تفعيل البريد بنجاح', verifyError: 'رابط غير صالح',
        error404: 'الصفحة غير موجودة', backHome: 'الرجوع للرئيسية',
        role: 'المالك', userRole: 'مستخدم'
    };
    var en = {
        home: 'Home', about: 'About', projects: 'Projects', contact: 'Contact',
        dashboard: 'Dashboard', login: 'Login', logout: 'Logout', register: 'Register',
        tagline: 'Professional Developer - Host & Website Maker',
        heroDesc: 'A highly professional programmer specialized in hosting and websites.',
        browse: 'Browse Projects', signup: 'Create Account',
        stats1: 'Projects Done', stats2: 'Happy Clients', stats3: '24/7 Support',
        aboutMe: 'About Me', aboutName: 'MAD MAN',
        aboutDesc1: 'Professional programmer with extensive experience in web development and hosting.',
        aboutDesc2: 'Specialized in professional website design and hosting solutions.',
        available: 'Available for work', email: 'Email', discord: 'Discord', telegram: 'Telegram',
        notSet: 'Not set', copy: 'Copy',
        projectsTitle: 'Projects', projectsDesc: 'Free projects available for everyone',
        addProject: 'Add Project', editProject: 'Edit Project', save: 'Save',
        delete: 'Delete', download: 'Download', completed: 'Completed', inProgress: 'In Progress',
        noProjects: 'No projects yet',
        contactTitle: 'Contact Me', contactDesc: 'Reach me through these channels',
        overview: 'Overview', myProjects: 'My Projects', profile: 'Profile',
        accountInfo: 'Account Info', manageProjects: 'Manage Projects',
        welcome: 'Welcome', lastLogin: 'Last login: today', username: 'Username',
        password: 'Password', loginTitle: 'Login', loginSub: 'Welcome back hero',
        registerSub: 'Join us', haveAccount: 'Have an account?',
        loginError: 'Invalid username or password',
        regSuccess: '✅ Account created! Check your email',
        fillAll: 'All fields required', passLength: 'Password must be 6+ characters',
        userTaken: 'Username taken', emailTaken: 'Email taken',
        projectSaved: '✅ Project saved', projectDeleted: '🗑️ Deleted',
        logoutMsg: 'Logged out', copied: '✅ Copied!',
        loginRequired: 'Please login first', deleteConfirm: 'Are you sure?',
        verifySuccess: 'Email verified successfully', verifyError: 'Invalid link',
        error404: 'Page not found', backHome: 'Back to Home',
        role: 'Owner', userRole: 'User'
    };
    return APP.lang === 'en' ? (en[key] || ar[key] || key) : (ar[key] || key);
}

// ============ Update Nav Links ============
function updateNavLinks() {
    var texts = ['home', 'about', 'projects', 'contact', 'dashboard'];
    var navLinks = document.querySelectorAll('.nav-item');
    navLinks.forEach(function(link, i) {
        if (texts[i]) {
            link.textContent = t(texts[i]);
            if (i === 0) {
                link.setAttribute('href', '#/');
            } else {
                link.setAttribute('href', '#/' + texts[i]);
            }
        }
    });
    var loginBtn = document.getElementById('loginBtnHeader');
    if (loginBtn && !APP.user) {
        loginBtn.innerHTML = '<i class="fas fa-arrow-right"></i> ' + t('login');
    }
}

// ============ Particles ============
function createParticles() {
    var c = document.getElementById('particles');
    if (!c) return;
    for (var i = 0; i < 25; i++) {
        var p = document.createElement('div');
        p.className = 'particle';
        var s = 2 + Math.random() * 3;
        p.style.cssText = 'width:' + s + 'px;height:' + s + 'px;left:' + Math.random() * 100 + '%;animation-duration:' + (8 + Math.random() * 10) + 's;animation-delay:' + Math.random() * 8 + 's';
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
    var lt = document.querySelector('#langToggle span');
    if (lt) lt.textContent = APP.lang === 'ar' ? 'EN' : 'AR';
    localStorage.setItem('dp-lang', APP.lang);
    updateNavLinks();
    router();
}

function updateThemeIcon() {
    var icon = document.querySelector('#themeToggle i');
    if (icon) icon.className = APP.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ============ Events ============
function bindEvents() {
    window.addEventListener('scroll', function() {
        var sy = window.scrollY;
        var h = document.getElementById('header');
        if (h) h.classList.toggle('scrolled', sy > 50);
        var pb = document.getElementById('progressBar');
        if (pb) pb.style.width = Math.min((sy / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100) + '%';
        var st = document.getElementById('scrollTop');
        if (st) st.classList.toggle('show', sy > 300);
    });

    window.addEventListener('hashchange', router);

    document.addEventListener('mousemove', function(e) {
        var cur = document.querySelector('.cursor');
        var dot = document.querySelector('.cursor-dot');
        if (cur) { cur.style.left = e.clientX + 'px'; cur.style.top = e.clientY + 'px'; }
        if (dot) { dot.style.left = e.clientX + 'px'; dot.style.top = e.clientY + 'px'; }
    });

    // Fix: proper click handler for data-link
    document.addEventListener('click', function(e) {
        var link = e.target.closest('[data-link]');
        if (link) {
            e.preventDefault();
            var href = link.getAttribute('href');
            if (href) {
                // Remove any existing hash, keep only the path
                href = href.replace(/^#/, '').replace(/^\/#/, '').replace(/^\//, '');
                if (href === '' || href === '/') {
                    window.location.hash = '#/';
                } else {
                    window.location.hash = '#/' + href;
                }
            }
        }
    });

    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('langToggle').addEventListener('click', toggleLang);
    document.getElementById('menuToggle').addEventListener('click', function() {
        document.getElementById('nav').classList.toggle('active');
    });
    document.getElementById('scrollTop').addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.querySelectorAll('.modal-backdrop').forEach(function(bd) {
        bd.addEventListener('click', function() {
            closeModal(this.closest('.modal').id);
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(function(m) { closeModal(m.id); });
        }
    });
}

// ============ Router ============
function router() {
    var hash = window.location.hash;
    var page = 'home';

    // Clean hash: remove #, /, and query params
    if (hash && hash !== '#/' && hash !== '#') {
        page = hash.replace(/^#\/?/, '').split('?')[0];
    }

    APP.page = page;
    var app = document.getElementById('app');
    if (!app) return;

    // Update active nav
    document.querySelectorAll('.nav-item').forEach(function(l) {
        l.classList.remove('active');
        var href = l.getAttribute('href');
        if (href) {
            var cleanHref = href.replace(/^#\/?/, '');
            if (cleanHref === page || (page === 'home' && cleanHref === '')) {
                l.classList.add('active');
            }
        }
    });

    // Render page
    if (page === 'home') renderHome(app);
    else if (page === 'about') renderAbout(app);
    else if (page === 'projects') renderProjects(app);
    else if (page === 'contact') renderContact(app);
    else if (page === 'dashboard') renderDashboard(app);
    else if (page === 'register') renderRegister(app);
    else if (page === 'verify-email') renderVerify(app);
    else if (page === 'profile') renderProfile(app);
    else render404(app);

    window.scrollTo(0, 0);
    var nav = document.getElementById('nav');
    if (nav) nav.classList.remove('active');
}

function getCurrentUserInfo() {
    if (!APP.user) return null;
    return APP.users.find(function(x) { return x.username === APP.user.username; }) || APP.user;
}

// ============ PAGE: Home ============
function renderHome(app) {
    app.innerHTML = '<section class="hero"><div class="hero-bg"><div class="hero-orb hero-orb-1"></div><div class="hero-orb hero-orb-2"></div><div class="hero-orb hero-orb-3"></div></div><div class="hero-content"><div class="hero-badge"><span class="dot"></span>' + t('tagline') + '</div><h1 class="hero-title"><span class="gradient-text">MAD MAN</span></h1><p class="hero-subtitle">' + t('tagline') + '</p><p class="hero-desc">' + t('heroDesc') + '</p><div class="hero-buttons"><a href="#/projects" class="btn-glow" data-link><i class="fas fa-code"></i> ' + t('browse') + '</a><a href="#/register" class="btn-glass" data-link><i class="fas fa-user-plus"></i> ' + t('signup') + '</a></div><div class="hero-stats"><div class="stat-item"><div class="stat-number">+50</div><div class="stat-label">' + t('stats1') + '</div></div><div class="stat-item"><div class="stat-number">+30</div><div class="stat-label">' + t('stats2') + '</div></div><div class="stat-item"><div class="stat-number">24/7</div><div class="stat-label">' + t('stats3') + '</div></div></div></div></section>';
}

// ============ PAGE: About ============
function renderAbout(app) {
    app.innerHTML = '<section style="padding:120px 0 80px"><div class="container"><div class="text-center mx-auto" style="margin-bottom:60px"><div class="section-label">👤 ' + t('aboutMe') + '</div><h2 class="section-title"><span>MAD MAN</span></h2></div><div class="about-grid"><div class="about-visual"><div class="about-avatar-wrap"><div class="about-avatar-ring"></div><div class="about-avatar"><i class="fas fa-user-secret"></i></div><div class="about-floating-card"><i class="fas fa-circle" style="color:#10b981;"></i> ' + t('available') + '</div></div></div><div class="about-info"><h3>' + t('aboutName') + '</h3><p>' + t('aboutDesc1') + '</p><p>' + t('aboutDesc2') + '</p><div class="info-cards"><div class="info-card"><div class="info-card-icon"><i class="fas fa-envelope"></i></div><div><h4>' + t('email') + '</h4><span>mohamedhere63@gmail.com <button class="copy-btn" onclick="copyText(\'mohamedhere63@gmail.com\')"><i class="fas fa-copy"></i></button></span></div></div><div class="info-card"><div class="info-card-icon"><i class="fab fa-discord"></i></div><div><h4>' + t('discord') + '</h4><span>81a0 <button class="copy-btn" onclick="copyText(\'81a0\')"><i class="fas fa-copy"></i></button></span></div></div><div class="info-card"><div class="info-card-icon"><i class="fab fa-telegram"></i></div><div><h4>' + t('telegram') + '</h4><span>' + t('notSet') + '</span></div></div></div><div class="skills-wrap"><span class="skill-tag">HTML5</span><span class="skill-tag">CSS3</span><span class="skill-tag">JavaScript</span><span class="skill-tag">Node.js</span><span class="skill-tag">PHP</span><span class="skill-tag">MySQL</span><span class="skill-tag">React</span><span class="skill-tag">Python</span></div></div></div></div></section>';
}

// ============ PAGE: Projects ============
function renderProjects(app) {
    var isOwner = APP.user && (APP.user.role === 'owner' || APP.user.username === 'Owner');
    var cards = '';

    if (APP.projects.length === 0) {
        cards = '<div class="empty-state"><i class="fas fa-folder-open"></i><p>' + t('noProjects') + '</p></div>';
    } else {
        APP.projects.forEach(function(p) {
            cards += '<div class="project-card"><div class="project-card-icon"><i class="fas fa-code"></i></div><h3>' + p.title + '</h3><p>' + p.desc + '</p><div class="project-meta"><span><i class="fas fa-download"></i> ' + (p.downloads || 0) + '</span><span class="badge-sm ' + (p.status === 'completed' ? 'badge-done' : 'badge-progress') + '">' + (p.status === 'completed' ? t('completed') : t('inProgress')) + '</span></div><div class="project-tags">' + p.type.split('/').map(function(tag) { return '<span>' + tag.trim() + '</span>'; }).join('') + '</div><div class="project-actions"><button class="btn-sm-glass" onclick="downloadProject(' + p.id + ')"><i class="fas fa-download"></i> ' + t('download') + '</button>' + (isOwner ? '<button class="btn-sm-glass" onclick="openProjectModal(' + p.id + ')"><i class="fas fa-edit"></i></button><button class="btn-sm-glass danger" onclick="confirmDeleteProject(' + p.id + ')"><i class="fas fa-trash"></i></button>' : '') + '</div></div>';
        });
    }

    app.innerHTML = '<section style="padding:120px 0 80px"><div class="container"><div class="text-center mx-auto" style="margin-bottom:60px"><div class="section-label">💻 ' + t('projects') + '</div><h2 class="section-title">' + t('projectsTitle') + '</h2><p class="section-sub">' + t('projectsDesc') + '</p></div>' + (isOwner ? '<div class="text-center" style="margin-bottom:30px"><button class="btn-glow" onclick="openProjectModal()"><i class="fas fa-plus"></i> ' + t('addProject') + '</button></div>' : '') + '<div class="projects-grid">' + cards + '</div></div></section>';
}

// ============ PAGE: Contact ============
function renderContact(app) {
    app.innerHTML = '<section style="padding:120px 0 80px"><div class="container"><div class="text-center mx-auto" style="margin-bottom:60px"><div class="section-label">📬 ' + t('contact') + '</div><h2 class="section-title">' + t('contactTitle') + '</h2><p class="section-sub">' + t('contactDesc') + '</p></div><div class="contact-grid"><div class="contact-card"><div class="contact-card-icon"><i class="fas fa-envelope"></i></div><h3>' + t('email') + '</h3><p>mohamedhere63@gmail.com</p><button class="copy-btn" onclick="copyText(\'mohamedhere63@gmail.com\')"><i class="fas fa-copy"></i> ' + t('copy') + '</button></div><div class="contact-card"><div class="contact-card-icon"><i class="fab fa-discord"></i></div><h3>' + t('discord') + '</h3><p>81a0</p><button class="copy-btn" onclick="copyText(\'81a0\')"><i class="fas fa-copy"></i> ' + t('copy') + '</button></div><div class="contact-card"><div class="contact-card-icon"><i class="fab fa-telegram"></i></div><h3>' + t('telegram') + '</h3><p>' + t('notSet') + '</p></div></div></div></section>';
}

// ============ PAGE: Dashboard ============
function renderDashboard(app) {
    if (!APP.user) { window.location.hash = '#/'; showToast(t('loginRequired'), 'error'); return; }

    var total = APP.projects.length;
    var done = APP.projects.filter(function(p) { return p.status === 'completed'; }).length;
    var dls = APP.projects.reduce(function(s, p) { return s + (p.downloads || 0); }, 0);
    var u = getCurrentUserInfo();

    app.innerHTML = '<div class="dashboard-layout"><aside class="dashboard-sidebar"><div class="sidebar-header"><div class="sidebar-logo">Dev <span>Place</span></div></div><nav class="sidebar-nav"><a href="#/dashboard" class="active" data-link><i class="fas fa-grid"></i> ' + t('overview') + '</a><a href="#/projects" data-link><i class="fas fa-folder"></i> ' + t('myProjects') + '</a><a href="#/profile" data-link><i class="fas fa-user"></i> ' + t('profile') + '</a><a href="#" onclick="logout()"><i class="fas fa-logout"></i> ' + t('logout') + '</a></nav></aside><main class="dashboard-main"><div class="welcome-card"><div><h2>👋 ' + t('welcome') + ' ' + APP.user.username + '!</h2><p style="opacity:0.85;">' + t('lastLogin') + '</p></div><a href="#/projects" class="btn-glass" data-link style="color:#fff;border-color:rgba(255,255,255,0.4);">' + t('manageProjects') + '</a></div><div class="stats-grid"><div class="stat-card-db"><div class="stat-icon-db purple"><i class="fas fa-code"></i></div><div class="stat-info-db"><h3>' + total + '</h3><p>' + t('projects') + '</p></div></div><div class="stat-card-db"><div class="stat-icon-db green"><i class="fas fa-check"></i></div><div class="stat-info-db"><h3>' + done + '</h3><p>' + t('completed') + '</p></div></div><div class="stat-card-db"><div class="stat-icon-db blue"><i class="fas fa-download"></i></div><div class="stat-info-db"><h3>' + dls + '</h3><p>' + t('download') + '</p></div></div><div class="stat-card-db"><div class="stat-icon-db pink"><i class="fas fa-star"></i></div><div class="stat-info-db"><h3>4.9</h3><p>' + t('stats2') + '</p></div></div></div><div class="info-grid"><div class="info-block"><div class="info-block-header">👤 ' + t('accountInfo') + '</div><div class="info-block-body"><div class="info-row"><div class="info-row-icon"><i class="fas fa-user"></i></div><div><strong>' + t('username') + '</strong><span>' + u.username + '</span></div></div><div class="info-row"><div class="info-row-icon"><i class="fas fa-envelope"></i></div><div><strong>' + t('email') + '</strong><span>' + u.email + ' <button class="copy-btn" onclick="copyText(\'' + u.email + '\')"><i class="fas fa-copy"></i></button></span></div></div><div class="info-row"><div class="info-row-icon"><i class="fab fa-discord"></i></div><div><strong>' + t('discord') + '</strong><span>' + (u.discord || '81a0') + '</span></div></div><div class="info-row"><div class="info-row-icon"><i class="fab fa-telegram"></i></div><div><strong>' + t('telegram') + '</strong><span>' + (u.telegram || t('notSet')) + '</span></div></div></div></div></div></main></div>';
}

// ============ PAGE: Register ============
function renderRegister(app) {
    if (APP.user) { window.location.hash = '#/dashboard'; return; }
    app.innerHTML = '<section class="auth-page"><div class="auth-card"><div class="auth-card-header"><div class="auth-logo">Dev Place</div><p>' + t('registerSub') + '</p></div><div class="auth-card-body"><form onsubmit="handleRegister(event)"><div class="input-group"><i class="fas fa-user"></i><input type="text" id="regUser" placeholder="' + t('username') + '" required></div><div class="input-group"><i class="fas fa-envelope"></i><input type="email" id="regEmail" placeholder="' + t('email') + '" required></div><div class="input-row"><div class="input-group"><i class="fab fa-discord"></i><input type="text" id="regDiscord" placeholder="' + t('discord') + '"></div><div class="input-group"><i class="fab fa-telegram"></i><input type="text" id="regTelegram" placeholder="' + t('telegram') + '"></div></div><div class="input-group"><i class="fas fa-key"></i><input type="password" id="regPass" placeholder="' + t('password') + '" required minlength="6"><button type="button" class="toggle-pass-btn" onclick="togglePass(\'regPass\',this)"><i class="fas fa-eye"></i></button></div><div class="form-error" id="regError"></div><div class="form-success" id="regSuccess"></div><button type="submit" class="btn-glow btn-full"><span>' + t('register') + '</span><i class="fas fa-arrow-left"></i></button></form><p class="modal-footer-text">' + t('haveAccount') + ' <a href="/" onclick="openModal(\'loginModal\');return false;">' + t('login') + '</a></p></div></div></section>';
}

// ============ PAGE: Verify ============
function renderVerify(app) {
    var hash = window.location.hash;
    var params = new URLSearchParams(hash.includes('?') ? hash.split('?')[1] : '');
    var token = params.get('token');
    var email = params.get('email');
    var html = '';

    if (token && email) {
        var user = APP.users.find(function(u) { return u.email === email && u.verificationToken === token; });
        if (user) {
            user.verified = true;
            user.verificationToken = null;
            saveUsers();
            html = '<section class="auth-page"><div class="auth-card"><div class="auth-card-header"><div class="auth-logo">✅</div><p>' + t('verifySuccess') + '</p></div><div class="auth-card-body text-center"><p style="font-size:3rem;">✅</p><p>' + t('verifySuccess') + '</p><a href="/" class="btn-glow" style="margin-top:16px;" onclick="openModal(\'loginModal\');return false;">' + t('login') + '</a></div></div></section>';
        } else {
            html = '<section class="auth-page"><div class="auth-card"><div class="auth-card-header"><div class="auth-logo">❌</div></div><div class="auth-card-body text-center"><p>' + t('verifyError') + '</p></div></div></section>';
        }
    } else {
        html = '<section class="auth-page"><div class="auth-card"><div class="auth-card-header"><div class="auth-logo">❌</div></div><div class="auth-card-body text-center"><p>' + t('verifyError') + '</p></div></div></section>';
    }
    app.innerHTML = html;
}

// ============ PAGE: Profile ============
function renderProfile(app) {
    if (!APP.user) { window.location.hash = '#/'; return; }
    var u = getCurrentUserInfo();
    app.innerHTML = '<section class="profile-page"><div class="profile-card"><div class="profile-cover"></div><div class="profile-avatar-lg"><i class="fas fa-user-secret"></i></div><div class="profile-body"><h2>' + u.username + '</h2><div class="role-badge">' + (u.role === 'owner' ? t('role') : t('userRole')) + '</div><div class="profile-details"><div class="pd-row"><div class="pd-icon"><i class="fas fa-envelope"></i></div><div class="pd-info"><strong>' + t('email') + '</strong><span>' + u.email + ' <button class="copy-btn" onclick="copyText(\'' + u.email + '\')"><i class="fas fa-copy"></i></button></span></div></div><div class="pd-row"><div class="pd-icon"><i class="fab fa-discord"></i></div><div class="pd-info"><strong>' + t('discord') + '</strong><span>' + (u.discord || '81a0') + '</span></div></div><div class="pd-row"><div class="pd-icon"><i class="fab fa-telegram"></i></div><div class="pd-info"><strong>' + t('telegram') + '</strong><span>' + (u.telegram || t('notSet')) + '</span></div></div></div></div></div></section>';
}

// ============ PAGE: 404 ============
function render404(app) {
    app.innerHTML = '<section class="error-section"><div><div class="error-code">404</div><p>' + t('error404') + '</p><a href="#/" class="btn-glow" data-link><i class="fas fa-home"></i> ' + t('backHome') + '</a></div></section>';
}

// ============ Auth ============
function handleLogin(e) {
    e.preventDefault();
    var username = document.getElementById('loginUser').value.trim();
    var password = document.getElementById('loginPass').value.trim();
    var errorEl = document.getElementById('loginError');

    var user = APP.users.find(function(u) { return u.username === username || u.email === username; });
    if (!user || atob(user.password) !== password) {
        errorEl.textContent = t('loginError');
        return;
    }

    APP.user = { id: user.id, username: user.username, email: user.email, role: user.role, verified: user.verified, discord: user.discord, telegram: user.telegram };
    localStorage.setItem('dp-user', JSON.stringify(APP.user));
    closeModal('loginModal');
    updateAuthUI();
    window.location.hash = '#/dashboard';
    showToast('👋 ' + t('welcome') + ' ' + user.username + '!', 'success');
}

function handleRegister(e) {
    e.preventDefault();
    var username = document.getElementById('regUser').value.trim();
    var email = document.getElementById('regEmail').value.trim();
    var discord = document.getElementById('regDiscord').value.trim();
    var telegram = document.getElementById('regTelegram').value.trim();
    var password = document.getElementById('regPass').value.trim();
    var errorEl = document.getElementById('regError');
    var successEl = document.getElementById('regSuccess');

    errorEl.textContent = '';
    successEl.style.display = 'none';

    if (!username || !email || !password) { errorEl.textContent = t('fillAll'); return; }
    if (password.length < 6) { errorEl.textContent = t('passLength'); return; }
    if (APP.users.find(function(u) { return u.username === username; })) { errorEl.textContent = t('userTaken'); return; }
    if (APP.users.find(function(u) { return u.email === email; })) { errorEl.textContent = t('emailTaken'); return; }

    var token = 'v_' + Math.random().toString(36).substr(2, 9);
    APP.users.push({ id: APP.users.length + 1, username: username, email: email, password: btoa(password), verified: false, verificationToken: token, role: 'user', discord: discord, telegram: telegram, created: new Date().toISOString() });
    saveUsers();

    successEl.textContent = t('regSuccess');
    successEl.style.display = 'block';
    e.target.reset();

    setTimeout(function() { window.location.hash = '#/verify-email?token=' + token + '&email=' + email; }, 2000);
}

function logout() {
    APP.user = null;
    localStorage.removeItem('dp-user');
    updateAuthUI();
    window.location.hash = '#/';
    showToast(t('logoutMsg'));
}

function updateAuthUI() {
    var lb = document.getElementById('loginBtnHeader');
    var um = document.getElementById('userMenu');
    if (APP.user) {
        if (lb) lb.style.display = 'none';
        if (um) { um.style.display = 'block'; document.getElementById('userMenuName').textContent = APP.user.username; }
    } else {
        if (lb) lb.style.display = 'flex';
        if (um) um.style.display = 'none';
    }
}

// ============ Projects ============
function openProjectModal(id) {
    id = id || null;
    document.getElementById('projectId').value = id || '';
    document.getElementById('projectModalTitle').textContent = id ? t('editProject') : t('addProject');
    document.getElementById('projectSubmitBtn').innerHTML = '<span>' + t('save') + '</span><i class="fas fa-save"></i>';

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

    if (!title || !desc || !type) { errorEl.textContent = t('fillAll'); return; }

    if (id) {
        var p = APP.projects.find(function(x) { return x.id === id; });
        if (p) { p.title = title; p.desc = desc; p.type = type; p.status = status; p.file = file; }
    } else {
        APP.projects.push({ id: Date.now(), title: title, desc: desc, type: type, status: status, file: file, downloads: 0, created: new Date().toISOString() });
    }

    saveProjects();
    closeModal('projectModal');
    router();
    showToast(t('projectSaved'), 'success');
}

function confirmDeleteProject(id) {
    APP.deleteId = id;
    document.getElementById('confirmDeleteBtn').onclick = function() {
        APP.projects = APP.projects.filter(function(x) { return x.id !== APP.deleteId; });
        saveProjects();
        closeModal('deleteModal');
        router();
        showToast(t('projectDeleted'));
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
        showToast(t('copied'), 'success');
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
