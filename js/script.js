// ===== CREDENTIALS =====
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

    const video = document.getElementById('bgVideo');
    if (video) video.pause();

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

// ===== HACKING LINES (Medium Size) =====
function startHackingLines() {
    const canvas = document.getElementById('hackingLines');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = [];
    for (let i = 0; i < columns; i++) drops[i] = Math.random() * -100;

    function drawLines() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            const colors = ['#00ff88', '#00ffff', '#ffffff', '#33ff99'];
            ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#00ff88';
            ctx.fillText(char, x, y);
            if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i] += 0.5;
        }
    }
    setInterval(drawLines, 60);
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ===== MAIN PAGE =====
function startMainPage() {
    startClock();
    startHackingLines();
    updateConsole('🟢 System initialized', 'green');
    updateCompile('⏳ Compiler ready');
    updateNN('🧠 Neural network idle');
    updateFirewall('🔒 Firewall active', 0);
}

// ===== CLOCK =====
function startClock() {
    setInterval(() => {
        const now = new Date();
        document.getElementById('clockDisplay').textContent = '⏱ ' + now.toTimeString().slice(0, 8);
    }, 1000);
}

// ===== CONSOLE FUNCTIONS =====
function updateConsole(msg, type = '') {
    const el = document.getElementById('consoleOutput');
    const colors = { green: '#00ff88', red: '#ff4444', yellow: '#ffaa00' };
    const color = colors[type] || '#aaa';
    const line = document.createElement('div');
    line.innerHTML = `<span style="color:${color};">${msg}</span>`;
    el.appendChild(line);
    el.scrollTop = el.scrollHeight;
    if (el.children.length > 20) el.removeChild(el.firstChild);
}

function updateCompile(msg, type = '') {
    const el = document.getElementById('compileOutput');
    const colors = { green: '#00ff88', red: '#ff4444', yellow: '#ffaa00' };
    const color = colors[type] || '#aaa';
    const line = document.createElement('div');
    line.innerHTML = `<span style="color:${color};">${msg}</span>`;
    el.appendChild(line);
    el.scrollTop = el.scrollHeight;
    if (el.children.length > 20) el.removeChild(el.firstChild);
}

function updateNN(msg, type = '') {
    const el = document.getElementById('nnOutput');
    const colors = { green: '#00ff88', red: '#ff4444', yellow: '#ffaa00' };
    const color = colors[type] || '#aaa';
    const line = document.createElement('div');
    line.innerHTML = `<span style="color:${color};">${msg}</span>`;
    el.appendChild(line);
    el.scrollTop = el.scrollHeight;
    if (el.children.length > 20) el.removeChild(el.firstChild);
}

function updateFirewall(msg, progress) {
    document.getElementById('firewallStatus').textContent = msg;
    document.getElementById('firewallFill').style.width = progress + '%';
}

// ===== MAP FUNCTIONS =====
let mapScale = 1;
let mapX = 0;
let mapY = 0;
let isDragging = false;
let startX, startY;

document.addEventListener('DOMContentLoaded', function() {
    const map = document.querySelector('.world-map');
    const container = document.querySelector('.map-container');

    if (map && container) {
        // Drag functionality
        container.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX - mapX;
            startY = e.clientY - mapY;
            container.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            mapX = e.clientX - startX;
            mapY = e.clientY - startY;
            map.style.transform = `translate(${mapX}px, ${mapY}px) scale(${mapScale})`;
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            container.style.cursor = 'grab';
        });

        // Touch support
        let touchStartX, touchStartY;
        container.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            touchStartX = touch.clientX - mapX;
            touchStartY = touch.clientY - mapY;
        }, { passive: true });

        container.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            mapX = touch.clientX - touchStartX;
            mapY = touch.clientY - touchStartY;
            map.style.transform = `translate(${mapX}px, ${mapY}px) scale(${mapScale})`;
        }, { passive: false });

        // Target click info
        document.querySelectorAll('.target-dot').forEach(dot => {
            dot.addEventListener('click', function(e) {
                const title = this.querySelector('title')?.textContent || 'Unknown';
                updateConsole(`🎯 Target selected: ${title}`, 'yellow');
            });
        });
    }
});

function zoomMap(direction) {
    if (direction === 'in' && mapScale < 2) mapScale += 0.2;
    if (direction === 'out' && mapScale > 0.5) mapScale -= 0.2;
    const map = document.querySelector('.world-map');
    map.style.transform = `translate(${mapX}px, ${mapY}px) scale(${mapScale})`;
    updateConsole(`🔍 Map zoom: ${Math.round(mapScale * 100)}%`, 'yellow');
}

function resetMap() {
    mapScale = 1;
    mapX = 0;
    mapY = 0;
    const map = document.querySelector('.world-map');
    map.style.transform = `translate(0, 0) scale(1)`;
    updateConsole('🗺️ Map reset', 'green');
}

// ===== PASSWORD CRACKER =====
let crackInterval = null;

function crackPassword() {
    const display = document.getElementById('pwdDisplay');
    const status = document.getElementById('crackerStatus');
    const statusText = document.getElementById('crackerStatusText');

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
            updateConsole('✅ Password cracked: ' + finalPwd, 'green');
        }
    }, 150);
}

function resetPassword() {
    if (crackInterval) clearInterval(crackInterval);
    const display = document.getElementById('pwdDisplay');
    const status = document.getElementById('crackerStatus');
    const statusText = document.getElementById('crackerStatusText');

    display.textContent = '🔄 Resetting...';
    status.className = 'status-dot yellow';
    statusText.textContent = 'Resetting...';

    setTimeout(() => {
        const newPwd = 'new_pass_' + Math.floor(Math.random() * 9999);
        display.textContent = '✅ New: ' + newPwd;
        status.className = 'status-dot green';
        statusText.textContent = 'Reset!';
        updateConsole('🔑 Password reset: ' + newPwd, 'yellow');
    }, 2000);
}

function pwnTarget() {
    const status = document.getElementById('crackerStatus');
    const statusText = document.getElementById('crackerStatusText');
    const display = document.getElementById('pwdDisplay');

    status.className = 'status-dot red';
    statusText.textContent = 'Pwning...';
    display.textContent = '💀 Pwnatrating...';

    setTimeout(() => {
        display.textContent = '💀 Pwned! Admin access!';
        status.className = 'status-dot red';
        statusText.textContent = 'Pwned!';
        updateConsole('💀 Target pwned! Admin access granted!', 'red');
    }, 2500);
}

// ===== NEURAL NETWORK =====
let nnInterval = null;
let nnRunning = false;

function startNN() {
    if (nnRunning) return;
    nnRunning = true;
    updateNN('▶️ Neural trace started...', 'green');

    let step = 0;
    nnInterval = setInterval(() => {
        step++;
        const nodes = ['Input', 'Hidden1', 'Hidden2', 'Output'];
        const weights = (Math.random() * 2 - 1).toFixed(4);
        const activation = ['ReLU', 'Sigmoid', 'Tanh', 'Softmax'][Math.floor(Math.random() * 4)];
        updateNN(`🧠 Layer ${nodes[step % nodes.length]} | Weight: ${weights} | ${activation}`,
            step % 2 === 0 ? 'green' : 'yellow');
        if (step > 15) {
            stopNN();
            updateNN('✅ Neural trace complete! Pattern detected.', 'green');
        }
    }, 600);
}

function stopNN() {
    if (nnInterval) clearInterval(nnInterval);
    nnRunning = false;
    updateNN('⏹ Neural trace stopped', 'yellow');
}

function analyzeNN() {
    updateNN('📊 Analyzing patterns...', 'yellow');
    setTimeout(() => {
        const patterns = ['Backdoor detected', 'Anomaly found', 'Normal traffic', 'Suspicious activity'];
        const result = patterns[Math.floor(Math.random() * patterns.length)];
        updateNN('📊 Result: ' + result, result.includes('detected') ? 'red' : 'green');
    }, 1500);
}

// ===== COMPILING =====
function compileCode() {
    updateCompile('🔨 Compiling...', 'yellow');
    setTimeout(() => {
        const errors = Math.random() > 0.7 ? '⚠️ 2 warnings' : '✅ No errors';
        updateCompile('✅ Compiled! ' + errors, errors.includes('warnings') ? 'yellow' : 'green');
    }, 2000);
}

function runCode() {
    updateCompile('▶️ Running...', 'green');
    setTimeout(() => {
        const outputs = ['Hello World', 'System ready', 'Access granted', 'Segmentation fault'];
        const result = outputs[Math.floor(Math.random() * outputs.length)];
        updateCompile('📤 ' + result, result.includes('fault') ? 'red' : 'green');
    }, 1500);
}

function debugCode() {
    updateCompile('🐛 Debugging...', 'yellow');
    setTimeout(() => {
        const bugs = ['Null pointer at line 42', 'Buffer overflow risk', 'Memory leak', 'All clean!'];
        const result = bugs[Math.floor(Math.random() * bugs.length)];
        updateCompile('🐛 ' + result, result.includes('clean') ? 'green' : 'red');
    }, 1800);
}

// ===== SYSTEM CONSOLE =====
function scanNetwork() {
    updateConsole('📡 Scanning network...', 'yellow');
    setTimeout(() => {
        const ips = ['192.168.1.1', '10.0.0.1', '172.16.0.1', '23.86.111.9'];
        const ports = [22, 80, 443, 8080, 3306];
        const ip = ips[Math.floor(Math.random() * ips.length)];
        const port = ports[Math.floor(Math.random() * ports.length)];
        updateConsole(`📡 Found: ${ip}:${port} (open)`, 'green');
    }, 2000);
}

function exploitVuln() {
    updateConsole('💥 Exploiting vulnerability...', 'red');
    setTimeout(() => {
        const vulns = ['CVE-2024-1234', 'CVE-2023-5678', 'CVE-2025-9012'];
        const vuln = vulns[Math.floor(Math.random() * vulns.length)];
        const result = Math.random() > 0.4 ? '✅ Success!' : '❌ Failed';
        updateConsole(`💥 ${vuln}: ${result}`, result.includes('Success') ? 'green' : 'red');
    }, 2500);
}

function getShell() {
    updateConsole('🐚 Spawning shell...', 'yellow');
    setTimeout(() => {
        updateConsole('🐚 Shell opened!', 'green');
        setTimeout(() => {
            updateConsole('🐚 $ whoami ➜ root', 'green');
            setTimeout(() => {
                updateConsole('🐚 $ pwd ➜ /root', 'green');
            }, 800);
        }, 800);
    }, 1000);
}

// ===== FIREWALL BYPASS =====
let firewallProgress = 0;
let firewallInterval = null;

function bypassFirewall() {
    const status = document.getElementById('firewallStatus');
    const fill = document.getElementById('firewallFill');

    if (firewallInterval) clearInterval(firewallInterval);
    firewallProgress = 0;
    status.textContent = '🚀 Bypassing...';
    status.style.color = '#ffaa00';

    firewallInterval = setInterval(() => {
        firewallProgress += Math.random() * 5 + 2;
        if (firewallProgress > 100) firewallProgress = 100;
        fill.style.width = firewallProgress + '%';

        if (firewallProgress >= 100) {
            clearInterval(firewallInterval);
            status.textContent = '✅ BYPASSED! 🔓';
            status.style.color = '#00ff88';
            updateConsole('🚀 Firewall bypassed! Access granted!', 'green');
        }
    }, 150);
}

function attackFirewall() {
    const status = document.getElementById('firewallStatus');
    const fill = document.getElementById('firewallFill');

    if (firewallInterval) clearInterval(firewallInterval);
    firewallProgress = 0;
    status.textContent = '⚡ ATTACKING...';
    status.style.color = '#ff4444';

    let attackInterval = setInterval(() => {
        firewallProgress += Math.random() * 10 + 5;
        if (firewallProgress > 100) firewallProgress = 100;
        fill.style.width = firewallProgress + '%';

        if (firewallProgress >= 100) {
            clearInterval(attackInterval);
            status.textContent = '💥 FIREWALL DESTROYED!';
            status.style.color = '#ff4444';
            updateConsole('💥 Firewall destroyed! System compromised!', 'red');
        }
    }, 100);
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

    const video = document.getElementById('bgVideo');
    if (video) video.play();

    document.getElementById('consoleOutput').innerHTML = '<div style="color:#666;">⏳ Ready...</div>';
    document.getElementById('compileOutput').innerHTML = '<div style="color:#666;">⏳ Ready...</div>';
    document.getElementById('nnOutput').innerHTML = '<div style="color:#666;">⏳ Initializing...</div>';
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
