const supabaseUrl = 'https://tlfwdjpmkgngigwaslqe.supabase.co';
const supabaseKey = 'YOUR_ANON_KEY'; // حط المفتاح اللي بعتلي اياه هون
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// تبديل الواجهات
function showTab(type) {
    document.getElementById('login-form').classList.toggle('hidden', type !== 'login');
    document.getElementById('register-form').classList.toggle('hidden', type !== 'register');
    document.getElementById('login-tab').classList.toggle('active', type === 'login');
    document.getElementById('register-tab').classList.toggle('active', type === 'register');
}

// إنشاء حساب جديد
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const refBy = document.getElementById('reg-ref').value;

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { referred_by: refBy } }
    });

    if (error) alert("خطأ: " + error.message);
    else alert("تم التسجيل! يرجى تأكيد الحساب أو تسجيل الدخول.");
});

// تسجيل الدخول
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) alert("فشل الدخول: " + error.message);
    else window.location.href = 'index.html'; // الانتقال للصفحة الرئيسية
});
