// بيانات الربط التقني بمشروعك على Supabase (روليكس)
const supabaseUrl = 'https://tlfwdjpmkgngigwaslqe.supabase.co';
const supabaseKey = 'EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsZndkanBta2duZ2lnd2FzbHFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0MTYyODUsImV4cCI6MjA5MDk5MjI4NX0.pRnfH1eK-4CF3D7KMCWJaBaqvCesURQXMOt9J0rKcoU';

// تهيئة الاتصال بقاعدة البيانات
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

// وظيفة التبديل بين واجهة الدخول والتسجيل
function showTab(type) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');

    if (type === 'login') {
        loginForm.classList.add('active-form');
        loginForm.classList.remove('hidden-form');
        registerForm.classList.add('hidden-form');
        registerForm.classList.remove('active-form');
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
    } else {
        loginForm.classList.add('hidden-form');
        loginForm.classList.remove('active-form');
        registerForm.classList.add('active-form');
        registerForm.classList.remove('hidden-form');
        loginTab.classList.remove('active');
        registerTab.classList.add('active');
    }
}

// إنشاء حساب جديد مع نظام الإحالة
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const referralBy = document.getElementById('reg-ref').value;

    const { data, error } = await _supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: { 
                referred_by: referralBy,
                display_name: 'Rolex User'
            }
        }
    });

    if (error) {
        alert("حدث خطأ أثناء التسجيل: " + error.message);
    } else {
        alert("تم إنشاء الحساب بنجاح! يرجى التحقق من بريدك الإلكتروني (لتفعيل الحساب) ثم قم بتسجيل الدخول.");
        showTab('login');
    }
});

// تسجيل الدخول والتوجه للصفحة الرئيسية
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const { data, error } = await _supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        alert("خطأ في بيانات الدخول: " + error.message);
    } else {
        // تخزين التوكن في المتصفح والتوجه للرئيسية (Dashboard)
        window.location.href = 'index.html'; 
    }
});
