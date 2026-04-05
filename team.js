const supabaseUrl = 'https://tlfwdjpmkgngigwaslqe.supabase.co';
const supabaseKey = 'EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsZndkanBta2duZ2lnd2FzbHFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0MTYyODUsImV4cCI6MjA5MDk5MjI4NX0.pRnfH1eK-4CF3D7KMCWJaBaqvCesURQXMOt9J0rKcoU';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function initTeam() {
    const { data: { user } } = await _supabase.auth.getUser();
    if (!user) return window.location.href = 'auth.html';

    // 1. جلب كود الإحالة الخاص بالمستخدم
    const { data: profile } = await _supabase.from('profiles').select('referral_code').eq('id', user.id).single();
    if (profile) {
        document.getElementById('my-ref-code').innerText = profile.referral_code;
        loadTeamMembers(profile.referral_code);
    }
}

// 2. جلب الأعضاء الذين استخدموا الكود
async function loadTeamMembers(myCode) {
    const { data: members, error } = await _supabase.from('profiles').select('email, created_at').eq('referred_by', myCode);

    if (members && members.length > 0) {
        const list = document.getElementById('team-list');
        list.innerHTML = ""; // مسح الرسالة الفارغة
        document.getElementById('team-count').innerText = members.length;
        
        members.forEach(member => {
            const date = new Date(member.created_at).toLocaleDateString('ar-EG');
            list.innerHTML += `
                <div class="member-card">
                    <p><i class="fa-solid fa-user-check"></i> ${member.email}</p>
                    <span>تاريخ الانضمام: ${date}</span>
                </div>
            `;
        });
    }
}

// وظيفة النسخ
function copyRef() {
    const code = document.getElementById('my-ref-code').innerText;
    navigator.clipboard.writeText(code);
    alert("تم نسخ كود الإحالة: " + code);
}

initTeam();
