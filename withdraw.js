const supabaseUrl = 'https://tlfwdjpmkgngigwaslqe.supabase.co';
const supabaseKey = 'EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsZndkanBta2duZ2lnd2FzbHFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0MTYyODUsImV4cCI6MjA5MDk5MjI4NX0.pRnfH1eK-4CF3D7KMCWJaBaqvCesURQXMOt9J0rKcoU';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function initWithdraw() {
    const { data: { user } } = await _supabase.auth.getUser();
    if (!user) return window.location.href = 'auth.html';

    // 1. جلب الرصيد وحالة التوثيق
    const { data: profile } = await _supabase.from('profiles').select('is_verified').eq('id', user.id).single();
    const { data: wallet } = await _supabase.from('wallets').select('balance').eq('user_id', user.id).single();

    if (wallet) {
        document.getElementById('withdrawable-balance').innerText = `$${wallet.balance.toFixed(2)}`;
    }

    // 2. فحص الـ KYC
    if (profile && !profile.is_verified) {
        document.getElementById('kyc-alert').classList.remove('hidden');
        document.getElementById('submit-withdraw').disabled = true;
        document.getElementById('submit-withdraw').innerText = "التوثيق مطلوب للسحب";
        document.getElementById('submit-withdraw').style.background = "#94a3b8";
    }
}

// 3. إرسال طلب السحب
document.getElementById('withdraw-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('withdraw-amount').value);
    const walletAddr = document.getElementById('user-wallet-addr').value;
    const network = document.getElementById('withdraw-network').value;

    const { data: { user } } = await _supabase.auth.getUser();

    // فحص الرصيد مرة أخرى للأمان
    const { data: wallet } = await _supabase.from('wallets').select('balance').eq('user_id', user.id).single();

    if (amount > wallet.balance) {
        return alert("رصيدك غير كافٍ لهذا المبلغ!");
    }

    // إرسال الطلب
    const { error } = await _supabase.from('transactions').insert({
        user_id: user.id,
        type: 'withdrawal',
        amount: amount,
        network: network,
        status: 'pending',
        proof_image_url: walletAddr // هنا نخزن عنوان محفظة المستخدم
    });

    if (error) alert("فشل الطلب: " + error.message);
    else {
        alert("تم إرسال طلب السحب بنجاح، سيتم الخصم عند الموافقة.");
        location.reload();
    }
});

initWithdraw();
