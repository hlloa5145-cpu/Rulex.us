const supabaseUrl = 'https://tlfwdjpmkgngigwaslqe.supabase.co';
const supabaseKey = 'EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsZndkanBta2duZ2lnd2FzbHFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0MTYyODUsImV4cCI6MjA5MDk5MjI4NX0.pRnfH1eK-4CF3D7KMCWJaBaqvCesURQXMOt9J0rKcoU';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function initProfile() {
    const { data: { user } } = await _supabase.auth.getUser();
    if (!user) return window.location.href = 'auth.html';

    document.getElementById('display-email').innerText = user.email;

    // جلب حالة التوثيق من جدول profiles
    const { data: profile } = await _supabase.from('profiles').select('is_verified').eq('id', user.id).single();

    const kycText = document.getElementById('kyc-text');
    const uploadArea = document.getElementById('kyc-upload-area');

    if (profile && profile.is_verified) {
        kycText.innerText = "الحالة: تم التوثيق ✅";
        kycText.style.color = "#10b981";
        uploadArea.classList.add('hidden');
    } else {
        kycText.innerText = "الحالة: غير موثق ❌";
        kycText.style.color = "#ef4444";
        uploadArea.classList.remove('hidden');
    }
}

// وظيفة رفع صورة الهوية (KYC)
async function uploadKYC() {
    const file = document.getElementById('id-image').files[0];
    if (!file) return alert("يرجى اختيار صورة أولاً");

    alert("تم رفع الطلب! سيقوم الإدمن بمراجعة هويتك وتفعيل السحب قريباً.");
    // هنا برمجياً يتم رفع الصورة لـ Supabase Storage وتحديث الحالة لـ "Pending"
}

// تسجيل الخروج
async function logout() {
    await _supabase.auth.signOut();
    window.location.href = 'auth.html';
}

// إعادة تعيين كلمة المرور
async function resetPassword() {
    const { data: { user } } = await _supabase.auth.getUser();
    const { error } = await _supabase.auth.resetPasswordForEmail(user.email);
    if (error) alert(error.message);
    else alert("تم إرسال رابط تغيير كلمة المرور إلى إيميلك.");
}

initProfile();
