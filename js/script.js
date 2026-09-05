const VALID_USER = "GOLDI";
const VALID_PASS = "GOLDI786";

// ===== LOGIN =====
function handleLogin() {
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();
    const error = document.getElementById('loginError');

    if (user === VALID_USER && pass === VALID_PASS) {
        error.textContent = '';
        showLoading();
    } else {
        error.textContent = '❌ Invalid credentials!';
    }
}

// ===== LOADING =====
function showLoading() {
    const overlay = document.getElementById('loadingOverlay');
    overlay.classList.add('active');
    document.getElementById('loginPage').classList.add('hidden');

    let progress = 0;
    const bar = document.getElementById('loadBar');
    const interval = setInterval(() => {
        progress += Math.random() * 8 + 2;
        if (progress > 100) progress = 100;
        bar.style.width = progress + '%';

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                overlay.classList.remove('active');
                document.getElementById('mainPage').classList.add('active');
                startMainPage();
            }, 400);
        }
    }, 120);
}

// ===== BINARY RAIN (Login Page) =====
function startBinaryRain() {
    const canvas = document.getElementById('binaryCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = [];
    for (let i = 0; i < columns; i++) drops[i] = Math.random() * -100;

    function drawBinary() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            const colors = ['#00ff88', '#00ffff', '#ffffff'];
            ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#00ff88';
            ctx.fillText(char, x, y);
            if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i] += 0.5;
        }
    }
    setInterval(drawBinary, 60);
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ===== MATRIX RAIN (Main Page) =====
function startMatrix() {
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = [];
    for (let i = 0; i < columns; i++) drops[i] = Math.random() * -100;

    function drawMatrix() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            const gradient = ctx.createLinearGradient(x, y, x, y + fontSize);
            gradient.addColorStop(0, '#00ff88');
            gradient.addColorStop(0.5, '#00ffff');
            gradient.addColorStop(1, '#ff00ff');
            ctx.fillStyle = gradient;
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#00ffff';
            ctx.fillText(char, x, y);
            if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i] += 0.5;
        }
    }
    setInterval(drawMatrix, 50);
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ===== MAIN PAGE =====
function startMainPage() {
    startClock();
    startMatrix();
    updateConsole('# Program Console\n&nbsp;&nbsp;System ready...');
    updateCompile('a._definePropertyBroken = 10,\nb[i] = e\na.migrateVersion = "1.4.1";');
    updateNN('// Initializing neural network...\n&nbsp;&nbsp;Loading weights...\n&nbsp;&nbsp;Training model...');
    updateFirewall('🔒 SECURE', 0);
}

// ===== CLOCK =====
function startClock() {
    setInterval(() => {
        const now = new Date();
        document.getElementById('clockDisplay').textContent = '⏱ ' + now.toTimeString().slice(0, 8);
    }, 1000);
}

// ===== UPDATE FUNCTIONS =====
function updateConsole(msg) {
    document.getElementById('consoleOutput').innerHTML = msg;
}

function updateCompile(msg) {
    document.getElementById('compileOutput').innerHTML = msg;
}

function updateNN(msg) {
    document.getElementById('nnOutput').innerHTML = msg;
}

function updateFirewall(status, progress) {
    document.getElementById('firewallStatus').textContent = status;
    document.getElementById('firewallFill').style.width = progress + '%';
}

// ===== PASSWORD CRACKER =====
let crackInterval = null;

function crackPassword() {
    const display = document.getElementById('pwdDisplay');
    const status = document.getElementById('crackerStatus');
    const statusText = document.getElementById('crackerStatusText');

    if (!statusText) return;
    status.className = 'status-dot yellow';
    statusText.textContent = 'Cracking...';
    display.textContent = '⏳ Brute forcing...';

    let chars = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%';
    let found = '';
    let index = 0;

    if (crackInterval) clearInterval(crackInterval);

    crackInterval = setInterval(() => {
        if (index < 12) {
            found += chars[Math.floor(Math.random() * chars.length)];
            display.textContent = '🔓 ' + found + '█';
            index++;
        } else {
            clearInterval(crackInterval);
            const passwords = ['admin123', 'root_pass', 'GOLDI786', 'h4ck3r!', 'p@ssw0rd'];
            const finalPwd = passwords[Math.floor(Math.random() * passwords.length)];
            display.textContent = '✅ Password: ' + finalPwd;
            status.className = 'status-dot green';
            statusText.textContent = 'Cracked!';
        }
    }, 150);
}

function resetPassword() {
    if (crackInterval) clearInterval(crackInterval);
    const display = document.getElementById('pwdDisplay');
    display.textContent = '🔄 Resetting...';

    setTimeout(() => {
        const newPwd = 'new_pass_' + Math.floor(Math.random() * 9999);
        display.textContent = '✅ New: ' + newPwd;
    }, 2000);
}

function pwnTarget() {
    const display = document.getElementById('pwdDisplay');
    display.textContent = '💀 Pwnatrating...';

    setTimeout(() => {
        display.textContent = '💀 Pwned! Admin access!';
    }, 2500);
}

// ===== NEURAL NETWORK =====
let nnInterval = null;
let nnRunning = false;

function startNN() {
    if (nnRunning) return;
    nnRunning = true;
    updateNN('▶️ Neural trace started...\n&nbsp;&nbsp;Analyzing patterns...');

    let step = 0;
    nnInterval = setInterval(() => {
        step++;
        const nodes = ['Input', 'Hidden1', 'Hidden2', 'Output'];
        const weights = (Math.random() * 2 - 1).toFixed(4);
        updateNN(`🧠 Layer ${nodes[step % nodes.length]}\n&nbsp;&nbsp;Weight: ${weights}\n&nbsp;&nbsp;Processing...`);
        if (step > 10) {
            stopNN();
            updateNN('✅ Neural trace complete!\n&nbsp;&nbsp;Pattern detected: BACKDOOR');
        }
    }, 800);
}

function stopNN() {
    if (nnInterval) clearInterval(nnInterval);
    nnRunning = false;
    updateNN('⏹ Neural trace stopped');
}

function analyzeNN() {
    updateNN('📊 Analyzing neural patterns...');
    setTimeout(() => {
        const patterns = ['Backdoor detected', 'Anomaly found', 'Normal traffic', 'Suspicious activity'];
        const result = patterns[Math.floor(Math.random() * patterns.length)];
        updateNN('📊 Result: ' + result);
    }, 1500);
}

// ===== COMPILING =====
function compileCode() {
    updateCompile('🔨 Compiling...\n&nbsp;&nbsp;Checking syntax...');
    setTimeout(() => {
        const errors = Math.random() > 0.7 ? '⚠️ 2 warnings' : '✅ No errors';
        updateCompile('✅ Compiled successfully!\n&nbsp;&nbsp;' + errors);
    }, 2000);
}

function runCode() {
    updateCompile('▶️ Running executable...');
    setTimeout(() => {
        const outputs = ['Hello World', 'System ready', 'Access granted', 'Segmentation fault'];
        const result = outputs[Math.floor(Math.random() * outputs.length)];
        updateCompile('📤 Output: ' + result);
    }, 1500);
}

function debugCode() {
    updateCompile('🐛 Debugging...');
    setTimeout(() => {
        const bugs = ['Null pointer at line 42', 'Buffer overflow risk', 'Memory leak', 'All clean!'];
        const result = bugs[Math.floor(Math.random() * bugs.length)];
        updateCompile('🐛 ' + result);
    }, 1800);
}

// ===== SYSTEM CONSOLE =====
function scanNetwork() {
    updateConsole('📡 Scanning network...');
    setTimeout(() => {
        const ips = ['192.168.1.1', '10.0.0.1', '172.16.0.1', '23.86.111.9'];
        const ports = [22, 80, 443, 8080, 3306];
        const ip = ips[Math.floor(Math.random() * ips.length)];
        const port = ports[Math.floor(Math.random() * ports.length)];
        updateConsole(`📡 Found: ${ip}:${port} (open)`);
    }, 2000);
}

function exploitVuln() {
    updateConsole('💥 Exploiting vulnerability...');
    setTimeout(() => {
        const vulns = ['CVE-2024-1234', 'CVE-2023-5678', 'CVE-2025-9012'];
        const vuln = vulns[Math.floor(Math.random() * vulns.length)];
        const result = Math.random() > 0.4 ? '✅ Success!' : '❌ Failed';
        updateConsole(`💥 ${vuln}: ${result}`);
    }, 2500);
}

function getShell() {
    updateConsole('🐚 Spawning shell...');
    setTimeout(() => {
        updateConsole('🐚 Shell opened!\n$ whoami ➜ root\n$ pwd ➜ /root');
    }, 1500);
}

// ===== FIREWALL =====
let firewallInterval = null;

function bypassFirewall() {
    const status = document.getElementById('firewallStatus');
    const fill = document.getElementById('firewallFill');
    let progress = 0;

    if (firewallInterval) clearInterval(firewallInterval);
    status.textContent = '🚀 BYPASSING...';
    status.style.color = '#ffaa00';

    firewallInterval = setInterval(() => {
        progress += Math.random() * 5 + 2;
        if (progress > 100) progress = 100;
        fill.style.width = progress + '%';

        if (progress >= 100) {
            clearInterval(firewallInterval);
            status.textContent = '✅ BYPASSED! 🔓';
            status.style.color = '#00ff88';
        }
    }, 150);
}

function attackFirewall() {
    const status = document.getElementById('firewallStatus');
    const fill = document.getElementById('firewallFill');
    let progress = 0;

    if (firewallInterval) clearInterval(firewallInterval);
    status.textContent = '⚡ ATTACKING...';
    status.style.color = '#ff4444';

    let attackInterval = setInterval(() => {
        progress += Math.random() * 10 + 5;
        if (progress > 100) progress = 100;
        fill.style.width = progress + '%';

        if (progress >= 100) {
            clearInterval(attackInterval);
            status.textContent = '💥 DESTROYED!';
            status.style.color = '#ff4444';
        }
    }, 100);
}

// ===== START HACK =====
function startHack() {
    const status = document.querySelector('.start-card .status-dot');
    const statusText = document.querySelector('.start-card .status-dot')?.parentElement;
    
    if (status) {
        status.className = 'status-dot yellow';
        if (statusText) statusText.innerHTML = '⏳ Initializing...';
    }
    
    setTimeout(() => {
        if (status) {
            status.className = 'status-dot green';
            if (statusText) statusText.innerHTML = '🚀 HACK INITIATED! All systems go!';
        }
        updateConsole('🚀 HACK INITIATED!\n&nbsp;&nbsp;All systems operational\n&nbsp;&nbsp;Target acquired');
    }, 2000);
}

// ===== LOGOUT =====
function logout() {
    document.getElementById('mainPage').classList.remove('active');
    document.getElementById('loginPage').classList.remove('hidden');
    document.getElementById('username').value = 'GOLDI';
    document.getElementById('password').value = 'GOLDI786';

    if (crackInterval) clearInterval(crackInterval);
    if (nnInterval) clearInterval(nnInterval);
    if (firewallInterval) clearInterval(firewallInterval);
    nnRunning = false;

    document.getElementById('consoleOutput').innerHTML = '# Program Console\n&nbsp;&nbsp;Ready...';
    document.getElementById('compileOutput').innerHTML = 'a._definePropertyBroken = 10,\nb[i] = e\na.migrateVersion = "1.4.1";';
    document.getElementById('nnOutput').innerHTML = '// Initializing neural network...\n&nbsp;&nbsp;Loading weights...\n&nbsp;&nbsp;Training model...';
    document.getElementById('pwdDisplay').textContent = '⏳ Waiting...';
    document.getElementById('firewallFill').style.width = '0%';
    document.getElementById('firewallStatus').textContent = '🔒 SECURE';
    document.getElementById('firewallStatus').style.color = '#00ff88';
}

// ===== ENTER KEY =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const loginPage = document.getElementById('loginPage');
        if (!loginPage.classList.contains('hidden')) {
            handleLogin();
        }
    }
});

// ===== START BINARY RAIN ON LOAD =====
window.onload = startBinaryRain;
