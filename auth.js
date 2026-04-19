// بيانات مشروعك الحقيقية
const supabaseUrl = 'https://tlfwdjpmkgngigwaslqe.supabase.co';
const supabaseKey = 'EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsZndkanBta2duZ2lnd2FzbHFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0MTYyODUsImV4cCI6MjA5MDk5MjI4NX0.pRnfH1eK-4CF3D7KMCWJaBaqvCesURQXMOt9J0rKcoU';

const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

// دالة تسجيل الدخول
async function signIn(email, password) {
    const { data, error } = await _supabase.auth.signInWithPassword({ email, password });
    if (error) {
        alert("خطأ في الدخول: " + error.message);
    } else {
        window.location.href = 'index.html';
    }
}

// دالة إنشاء حساب جديد
async function signUp(email, password) {
    const { data, error } = await _supabase.auth.signUp({ email, password });
    if (error) {
        alert("خطأ في التسجيل: " + error.message);
    } else {
        const user = data.user;
        // إنشاء السجلات الأساسية للمستخدم الجديد في الجداول
        await _supabase.from('profiles').insert([{ id: user.id, is_banned: false }]);
        await _supabase.from('wallets').insert([{ user_id: user.id, balance: 0 }]);
        
        alert("تم إنشاء الحساب بنجاح! يمكنك الدخول الآن ✅");
        location.reload(); 
    }
}

// دالة حماية الصفحات
async function checkUser() {
    const { data: { user } } = await _supabase.auth.getUser();
    if (!user && !window.location.pathname.includes('login.html')) {
        window.location.href = 'login.html';
    }
    if (user && window.location.pathname.includes('login.html')) {
        window.location.href = 'index.html';
    }
}
