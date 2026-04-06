// إعدادات الربط مع Supabase
const supabaseUrl = 'https://tlfwdjpmkgngigwaslqe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsZndkanBta2duZ2lnd2FzbHFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0MTYyODUsImV4cCI6MjA5MDk5MjI4NX0.pRnfH1eK-4CF3D7KMCWJaBaqvCesURQXMOt9J0rKcoU';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

// --- وظيفة تسجيل حساب جديد ---
async function signUp(email, password) {
    // 1. تسجيل المستخدم في نظام Auth الخاص بـ Supabase
    const { data: authData, error: authError } = await _supabase.auth.signUp({
        email: email,
        password: password,
    });

    if (authError) {
        alert("خطأ في التسجيل: " + authError.message);
        return;
    }

    const user = authData.user;

    if (user) {
        // 2. إنشاء محفظة للمستخدم الجديد في جدول wallets
        // تأكد أنك أضفت عمود user_email في قاعدة البيانات
        const { error: walletError } = await _supabase
            .from('wallets')
            .insert([
                { 
                    user_id: user.id, 
                    user_email: user.email, // ربط الإيميل لسهولة البحث بالأدمن
                    balance: 0.00,
                    total_deposit: 0.00,
                    total_withdraw: 0.00
                }
            ]);

        if (walletError) {
            console.error("خطأ في إنشاء المحفظة:", walletError.message);
        } else {
            alert("تم إنشاء الحساب والمحفظة بنجاح! يرجى تأكيد إيميلك إذا لزم الأمر.");
            window.location.href = 'index.html'; // التوجه للصفحة الرئيسية
        }
    }
}

// --- وظيفة تسجيل الدخول ---
async function signIn(email, password) {
    const { data, error } = await _supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        alert("خطأ في الدخول: " + error.message);
    } else {
        window.location.href = 'index.html';
    }
}

// --- وظيفة تسجيل الخروج ---
async function signOut() {
    await _supabase.auth.signOut();
    window.location.href = 'auth.html';
}

// --- التحقق من حالة الدخول عند تحميل الصفحة ---
async function checkUser() {
    const { data: { user } } = await _supabase.auth.getUser();
    if (user) {
        // إذا كان المستخدم في صفحة التسجيل وهو مسجل دخول أصلاً، ابعته للرئيسية
        if (window.location.pathname.includes('auth.html')) {
            window.location.href = 'index.html';
        }
    }
}
