const supabaseUrl = 'https://tlfwdjpmkgngigwaslqe.supabase.co';
const supabaseKey = 'EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsZndkanBta2duZ2lnd2FzbHFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0MTYyODUsImV4cCI6MjA5MDk5MjI4NX0.pRnfH1eK-4CF3D7KMCWJaBaqvCesURQXMOt9J0rKcoU';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

// مواعيد المهام (1 صباحاً، 4 عصراً، 8 مساءً)
const TASK_HOURS = [1, 16, 20];

async function initDashboard() {
    const { data: { user } } = await _supabase.auth.getUser();
    if (!user) {
        window.location.href = 'auth.html';
        return;
    }
    document.getElementById('user-email').innerText = user.email;
    loadBalance(user.id);
    renderPlans();
    checkTaskTime();
}

// جلب الرصيد من جدول wallets
async function loadBalance(userId) {
    const { data, error } = await _supabase.from('wallets').select('balance').eq('user_id', userId).single();
    if (data) {
        document.getElementById('balance-display').innerText = `$${data.balance.toFixed(2)}`;
    }
}

// فحص وقت المهمة
function checkTaskTime() {
    const now = new Date();
    const currentHour = now.getHours();
    const btn = document.getElementById('claim-task-btn');
    const statusText = document.getElementById('task-status');

    if (TASK_HOURS.includes(currentHour)) {
        statusText.innerText = "المهمة متاحة الآن! اضغط لجمع الربح";
        statusText.style.color = "#0ea5e9";
        btn.disabled = false;
        btn.className = "btn-enabled";
    } else {
        statusText.innerText = "انتظر موعد المهمة القادمة (1:00, 16:00, 20:00)";
        btn.disabled = true;
        btn.className = "btn-disabled";
    }
}

// توليد باقات الاستثمار
function renderPlans() {
    const plans = [
        {amount: 100, profit: 70}, {amount: 200, profit: 170},
        {amount: 500, profit: 500}, {amount: 1000, profit: 1200}
    ];
    const container = document.getElementById('plans-container');
    plans.forEach(plan => {
        container.innerHTML += `
            <div class="plan-card">
                <h4>باقة $${plan.amount}</h4>
                <p>الربح: $${plan.profit}</p>
                <span>المدة: 12 يوم</span>
                <button onclick="invest(${plan.amount})">استثمار الآن</button>
            </div>
        `;
    });
}

setInterval(checkTaskTime, 60000); // تحديث الفحص كل دقيقة
initDashboard();
