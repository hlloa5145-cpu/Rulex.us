const supabaseUrl = 'https://tlfwdjpmkgngigwaslqe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsZndkanBta2duZ2lnd2FzbHFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0MTYyODUsImV4cCI6MjA5MDk5MjI4NX0.pRnfH1eK-4CF3D7KMCWJaBaqvCesURQXMOt9J0rKcoU';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

const addresses = {
    trc: "TA3uvkYmFmWhJ5DePkgWN8y1rVt6sxbpZB",
    bep: "0xd1e87dd1fabb7b64842dc7b00deb9c0db3aa55ac"
};

function showAddress(type) {
    document.getElementById('wallet-address').innerText = addresses[type];
    document.getElementById('network-label').innerText = "الشبكة: " + type.toUpperCase();
    
    // تغيير شكل الأزرار
    document.getElementById('btn-trc').classList.toggle('active', type === 'trc');
    document.getElementById('btn-bep').classList.toggle('active', type === 'bep');
}

function copyAddress() {
    const addr = document.getElementById('wallet-address').innerText;
    navigator.clipboard.writeText(addr);
    alert("تم نسخ العنوان بنجاح");
}

document.getElementById('deposit-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const amount = document.getElementById('dep-amount').value;
    const { data: { user } } = await _supabase.auth.getUser();

    if (!user) return alert("يرجى تسجيل الدخول");

    // إرسال الطلب لجدول transactions
    const { error } = await _supabase.from('transactions').insert({
        user_id: user.id,
        type: 'deposit',
        amount: amount,
        status: 'pending',
        network: document.getElementById('network-label').innerText
    });

    if (error) alert("فشل إرسال الطلب: " + error.message);
    else alert("تم إرسال طلبك بنجاح، سيتم مراجعته خلال دقائق.");
});
