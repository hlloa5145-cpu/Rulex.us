<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ROLEX - فريقي</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        :root { --silver-light: #f8fafc; --white: #ffffff; --sky-blue: #0ea5e9; --dark-text: #1e293b; --silver-metallic: #e2e8f0; }
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: sans-serif; }
        body { background-color: var(--silver-light); color: var(--dark-text); direction: rtl; padding-bottom: 100px; }
        .dashboard-header { background: var(--white); padding: 25px 20px; border-bottom-left-radius: 30px; border-bottom-right-radius: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); text-align: center; }
        .logo-small { font-size: 1.6rem; font-weight: 900; color: var(--sky-blue); letter-spacing: 2px; }
        .ref-box { background: var(--white); margin: 20px; padding: 20px; border-radius: 20px; border: 1px solid var(--silver-metallic); text-align: center; }
        .copy-area { background: #f1f5f9; padding: 12px; border-radius: 12px; margin: 15px 0; display: flex; justify-content: space-between; align-items: center; border: 1px dashed var(--sky-blue); }
        .copy-area span { font-weight: bold; color: var(--sky-blue); font-size: 1.2rem; }
        .copy-area button { background: var(--sky-blue); color: white; border: none; padding: 8px 15px; border-radius: 8px; cursor: pointer; }
        .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; padding: 0 20px; }
        .stat-card { background: var(--white); padding: 20px; border-radius: 15px; text-align: center; border: 1px solid var(--silver-metallic); }
        .stat-card i { font-size: 1.5rem; color: var(--sky-blue); margin-bottom: 10px; }
        .stat-card h4 { font-size: 1.4rem; color: var(--dark-text); }
        .bottom-nav { position: fixed; bottom: 0; left: 0; right: 0; background: var(--white); display: flex; justify-content: space-around; padding: 12px; border-top: 1px solid var(--silver-metallic); z-index: 1000; }
        .nav-item { text-decoration: none; color: #94a3b8; display: flex; flex-direction: column; align-items: center; font-size: 0.75rem; }
        .nav-item i { font-size: 1.3rem; margin-bottom: 4px; }
        .nav-item.active { color: var(--sky-blue); }
    </style>
</head>
<body>
    <header class="dashboard-header">
        <div class="logo-small">ROLEX TEAM</div>
    </header>
    <main>
        <div class="ref-box">
            <p>رمز الإحالة الخاص بك</p>
            <div class="copy-area">
                <span id="ref-code">RLX777</span>
                <button onclick="copyRef()">نسخ</button>
            </div>
            <p style="font-size: 0.8rem; color: #64748b;">شارك الكود لزيادة أرباحك من العمولات</p>
        </div>
        <div class="stats-grid">
            <div class="stat-card">
                <i class="fa-solid fa-users"></i>
                <p>حجم الفريق</p>
                <h4 id="team-size">0</h4>
            </div>
            <div class="stat-card">
                <i class="fa-solid fa-hand-holding-dollar"></i>
                <p>إجمالي العمولات</p>
                <h4>0.00$</h4>
            </div>
        </div>
    </main>
    <nav class="bottom-nav">
        <a href="index.html" class="nav-item"><i class="fa-solid fa-house"></i><span>الرئيسية</span></a>
        <a href="team.html" class="nav-item active"><i class="fa-solid fa-users"></i><span>الفريق</span></a>
        <a href="tasks.html" class="nav-item"><i class="fa-solid fa-list-check"></i><span>المهام</span></a>
        <a href="profile.html" class="nav-item"><i class="fa-solid fa-user"></i><span>الملف</span></a>
    </nav>
    <script>
        function copyRef() { alert("تم نسخ كود الإحالة!"); }
    </script>
</body>
</html>
