// إعدادات الاتصال بـ Supabase
const supabaseUrl = 'https://tlfwdjpmkgngigwaslqe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsZndkanBta2duZ2lnd2FzbHFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0MTYyODUsImV4cCI6MjA5MDk5MjI4NX0.pRnfH1eK-4CF3D7KMCWJaBaqvCesURQXMOt9J0rKcoU';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

// 1. وظيفة إنشاء حساب جديد (SignUp)
async function signUp(email, password) {
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
        // إنشاء محفظة تلقائية للمستخدم الجديد بجدول wallets
        const { error: walletError } = await _supabase
            .from('wallets')
            .insert([
                { 
                    user_id: user.id, 
                    user_email: user.email, 
                    balance: 0.00,
                    total_deposit: 0.00,
                    total_withdraw: 0.00
                }
            ]);

        if (walletError) {
            console.error("فشل إنشاء المحفظة:", walletError.message);
        } else {
            alert("تم إنشاء الحساب والمحفظة بنجاح!");
            window.location.href = 'index.html';
        }
    }
}

// 2. وظيفة تسجيل الدخول (SignIn)
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

// 3. وظيفة تسجيل الخروج (Logout) - المصلحة
async function logoutUser() {
    const { error } = await _supabase.auth.signOut();
    if (error) {
        console.error("خطأ:", error.message);
    }
    // تنظيف كل البيانات وتوجيه المستخدم لصفحة الدخول
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = 'auth.html';
}

// 4. فحص حالة المستخدم (هل هو مسجل دخول أم لا)
async function checkUser() {
    const { data: { user } } = await _supabase.auth.getUser();
    
    // إذا كان المستخدم بصفحة auth.html وهو مسجل دخول أصلاً، ابعته للرئيسية
    if (user && window.location.pathname.includes('auth.html')) {
        window.location.href = 'index.html';
    }
    
    // إذا كان بصفحة رئيسية وهو مو مسجل دخول، ارجعه لصفحة auth
    if (!user && (window.location.pathname.includes('index.html') || window.location.pathname.includes('profile.html'))) {
        window.location.href = 'auth.html';
    }
}

// تشغيل الفحص عند تحميل الصفحة
checkUser();
