const supabaseUrl = 'https://tlfwdjpmkgngigwaslqe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsZndkanBta2duZ2lnd2FzbHFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0MTYyODUsImV4cCI6MjA5MDk5MjI4NX0.pRnfH1eK-4CF3D7KMCWJaBaqvCesURQXMOt9J0rKcoU';

const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

function showTab(type) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');

    if (type === 'login') {
        loginForm.classList.add('active-form'); registerForm.classList.add('hidden-form');
        loginForm.classList.remove('hidden-form'); registerForm.classList.remove('active-form');
        loginTab.classList.add('active'); registerTab.classList.remove('active');
    } else {
        loginForm.classList.add('hidden-form'); registerForm.classList.add('active-form');
        loginForm.classList.remove('active-form'); registerForm.classList.remove('hidden-form');
        loginTab.classList.remove('active'); registerTab.classList.add('active');
    }
}

// إنشاء حساب والدخول المباشر
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;
    const referralBy = document.getElementById('reg-ref').value.trim();

    // 1. إنشاء الحساب
    const { data, error } = await _supabase.auth.signUp({
        email: email,
        password: password,
        options: { data: { referred_by: referralBy } }
    });

    if (error) {
        alert("خطأ في الإنشاء: " + error.message);
    } else {
        // 2. تسجيل الدخول التلقائي فوراً بعد الإنشاء
        const { error: loginErr } = await _supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (loginErr) {
            alert("تم الإنشاء، يرجى الانتقال لتسجيل الدخول يدوياً.");
            showTab('login');
        } else {
            alert("أهلاً بك في روليكس! جاري الدخول...");
            window.location.href = 'index.html'; 
        }
    }
});

// تسجيل الدخول العادي
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    const { data, error } = await _supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        alert("خطأ في البيانات: " + error.message);
    } else {
        window.location.href = 'index.html'; 
    }
});
