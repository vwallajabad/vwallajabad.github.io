    const terminalBody = document.getElementById('terminal-body');
    const cmdInput = document.getElementById('cmd-input');
    const ghost = document.getElementById('autocomplete-ghost');

    const COMMANDS = ['about', 'projects', 'skills', 'experience', 'awards', 'contact', 'clear', 'help', 'ls', 'whoami'];

    const DATA = {
        about: `
            <div style="color: var(--accent-blue); font-weight: bold; margin-bottom: 8px;">[ USER_PROFILE ]</div>
            <b>Varun Wallajabad</b><br>
            Computer Science @ University of Illinois Urbana-Champaign (2028)<br><br>
            I am a software engineer and cybersecurity researcher specializing in memory safety, 
            vulnerability analysis, and full-stack development. Currently auditing security-critical 
            C vulnerabilities to bridge the gap between legacy code and memory-safe Rust systems.
        `,
        whoami: `varun@vwallajabad.dev`,
        skills: `
            <div class="card-grid">
                <div class="card"><div class="card-title">Languages</div>C++, Python, Java, Rust, Bash, JavaScript, Kotlin</div>
                <div class="card"><div class="card-title">Security</div>Vulnerability Analysis, Nmap, Metasploit, GDB, Wireshark</div>
                <div class="card"><div class="card-title">Frameworks</div>Spring Boot, React, TensorFlow, Unity, Keras</div>
                <div class="card"><div class="card-title">DevOps</div>Docker, Linux (Ubuntu), GCP, Firebase, GitHub Actions</div>
            </div>
        `,
        experience: `
            <div class="output-line"><b>Cybersecurity Research Assistant @ UIUC</b> (Jan 2026 - Present)</div>
            <div style="margin-left: 20px; color: var(--text-dim); margin-bottom: 10px;">
                - Audited 500+ security-critical C vulnerabilities (CWE-119, CWE-416).<br>
                - Authored exploit PoCs to validate memory-safe mitigation strategies.
            </div>
            <div class="output-line"><b>Assistant Tutor (CS 124) @ UIUC</b> (Jan 2026 - Present)</div>
            <div style="margin-left: 20px; color: var(--text-dim); margin-bottom: 10px;">
                - Guiding 100+ students weekly in Java/Kotlin OOP and data structures.
            </div>
            <div class="output-line"><b>Junior Software Developer @ UCode Inc.</b> (Oct 2021 - July 2022)</div>
            <div style="margin-left: 20px; color: var(--text-dim);">
                - Architected VR learning modules using Unity and C#.<br>
                - Increased mobile VR stability by 20% through mesh optimization.
            </div>
        `,
        projects: `
            <div class="card-grid">
                <div class="card">
                    <div class="card-title">FinSight Analytics</div>
                    <p>Full-stack financial engine simulating equity clearing using Spring Boot, PostgreSQL, and React.</p>
                </div>
                <div class="card">
                    <div class="card-title">VR Education App</div>
                    <p>Unity-based 3D environment teaching recursive logic and memory management fundamentals.</p>
                </div>
            </div>
        `,
        awards: `
            <div class="output-line"><span style="color: var(--accent-blue)">🏆 3rd Place</span> - MORENET State Cybersecurity Competition (2025)</div>
            <div class="output-line"><span style="color: var(--accent-blue)">🏆 1st Place</span> - Bay Area Hacks 2.0 (2024)</div>
            <div class="output-line"><span style="color: var(--accent-blue)">🏆 2nd Place</span> - FBLA Website Coding & Development State (2024)</div>
        `,
        contact: `
            Email: <a href="mailto:varun@vwallajabad.dev">varun@vwallajabad.dev</a><br>
            GitHub: <a href="https://github.com/vwallajabad" target="_blank">vwallajabad</a><br>
            LinkedIn: <a href="https://linkedin.com/in/vwallajabad" target="_blank">vwallajabad</a><br>
            Location: O'fallon, MO
        `,
        help: `Available commands: <span style="color: var(--primary-orange)">${COMMANDS.join(', ')}</span><br><br><i>Tip: Use Tab or Right Arrow to autocomplete.</i>`
    };

    function print(html, type = 'default') {
        const div = document.createElement('div');
        div.className = 'output-line';
        if (type === 'command') {
            div.classList.add('command-entered');
            div.innerHTML = `❯ ${html}`;
        } else if (type === 'system') {
            div.classList.add('system-msg');
            div.innerHTML = html;
        } else {
            div.innerHTML = html;
        }
        terminalBody.appendChild(div);
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    function handleAutocomplete() {
        const val = cmdInput.value.toLowerCase();
        if (!val) {
            ghost.innerText = "";
            return;
        }

        const match = COMMANDS.find(c => c.startsWith(val));
        if (match) {
            ghost.innerText = val + match.slice(val.length);
        } else {
            ghost.innerText = "";
        }
    }

    function runCommand(cmd) {
        cmd = cmd.toLowerCase().trim();
        ghost.innerText = "";
        if (!cmd) return;
        
        print(cmd, 'command');

        setTimeout(() => {
            if (DATA[cmd]) {
                print(DATA[cmd]);
            } else if (cmd === 'ls') {
                print(COMMANDS.join('  '));
            } else if (cmd === 'clear') {
                terminalBody.innerHTML = '';
                print(">> Buffer cleared.", "system");
            } else {
                print(`ERR: '${cmd}' command not recognized. Type 'help' for options.`, 'system');
            }
        }, 50);
        
        cmdInput.value = '';
    }

    cmdInput.addEventListener('input', handleAutocomplete);

    cmdInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            runCommand(cmdInput.value);
        } else if (e.key === 'Tab' || e.key === 'ArrowRight') {
            if (ghost.innerText) {
                e.preventDefault();
                cmdInput.value = ghost.innerText;
                ghost.innerText = "";
            }
        }
    });

    document.addEventListener('click', () => cmdInput.focus());

    window.onload = () => {
        setTimeout(() => {
            document.getElementById('welcome-msg').innerHTML = "<b>Varun Wallajabad</b><br>CS @ UIUC. Researching Cybersecurity & Systems.<br>Type <span style='color: var(--primary-orange)'>'help'</span> to explore.";
        }, 500);
    };
