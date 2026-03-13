/* ===== PAGE RENDERERS – All 11 Pages ===== */
const Pages = (() => {
    const main = () => document.getElementById('mainContent');
    const session = () => DataStore.getSession();

    /* ===== 1. HOME PAGE ===== */
    function home() {
        const stats = DataStore.getStats();
        main().innerHTML = `
        <section class="hero">
            <div class="orb orb-1"></div><div class="orb orb-2"></div>
            <div class="hero-container">
                <div class="hero-content" data-aos="fade-right">
                    <div class="hero-badge"><i class="fas fa-bolt"></i> AI-Powered Campus Management</div>
                    <h1>Smart Campus<br><span class="gradient-text">Complaint System</span></h1>
                    <p class="hero-desc">Report campus issues instantly, track resolution in real-time, and leverage AI-driven insights for a better campus experience at Vignan.</p>
                    <div class="hero-actions">
                        <a href="#submit-complaint" class="btn btn-primary btn-lg"><i class="fas fa-plus-circle"></i> Submit Complaint</a>
                        <a href="#track-complaint" class="btn btn-secondary btn-lg"><i class="fas fa-search"></i> Track Complaint</a>
                    </div>
                    <div class="hero-stats">
                        <div class="hero-stat"><div class="stat-number" data-count="${stats.total}">${stats.total}</div><div class="stat-label">Total Complaints</div></div>
                        <div class="hero-stat"><div class="stat-number" data-count="${stats.resolved}">${stats.resolved}</div><div class="stat-label">Resolved</div></div>
                        <div class="hero-stat"><div class="stat-number" data-count="${stats.highPriority}">${stats.highPriority}</div><div class="stat-label">High Priority</div></div>
                    </div>
                </div>
                <div class="hero-visual" data-aos="fade-left">
                    <div class="hero-graphic">
                        <div class="hero-graphic-content">
                            <div class="mock-card">
                                <div class="mock-card-header"><div class="mock-avatar"><i class="fas fa-user"></i></div><div><div class="mock-title">Water Leaking Issue</div><div class="mock-subtitle">CMP-2026-0001 • High Priority</div></div></div>
                                <div class="mock-bar"><div class="mock-bar-fill" style="width:65%;background:var(--status-progress)"></div></div>
                            </div>
                            <div class="mock-card">
                                <div class="mock-card-header"><div class="mock-avatar" style="background:linear-gradient(135deg,#22c55e,#06b6d4)"><i class="fas fa-bolt"></i></div><div><div class="mock-title">AI Auto-Categorization</div><div class="mock-subtitle">Category: Electrical • 94% confidence</div></div></div>
                                <div class="mock-bar"><div class="mock-bar-fill" style="width:94%;background:var(--accent-green)"></div></div>
                            </div>
                            <div class="mock-card">
                                <div class="mock-card-header"><div class="mock-avatar" style="background:linear-gradient(135deg,#f59e0b,#ef4444)"><i class="fas fa-chart-line"></i></div><div><div class="mock-title">Analytics Dashboard</div><div class="mock-subtitle">7 complaints this week</div></div></div>
                                <div class="mock-bar"><div class="mock-bar-fill" style="width:45%;background:var(--accent-amber)"></div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section-bg">
            <div class="section" data-aos="fade-up">
                <div class="section-header"><h2>Powerful <span class="gradient-text">AI Features</span></h2><p>Leveraging artificial intelligence to make campus maintenance smarter and faster.</p></div>
                <div class="features-grid">
                    <div class="card" data-aos="fade-up" data-aos-delay="100"><div class="card-icon purple"><i class="fas fa-brain"></i></div><h3>AI Auto-Categorization</h3><p>Our NLP engine automatically analyzes complaint descriptions and assigns the correct category – Water, Electrical, Infrastructure, and more.</p></div>
                    <div class="card" data-aos="fade-up" data-aos-delay="200"><div class="card-icon red"><i class="fas fa-exclamation-triangle"></i></div><h3>AI Priority Detection</h3><p>Complaints are automatically classified as High, Medium, or Low priority based on keyword analysis, category, and urgency detection.</p></div>
                    <div class="card" data-aos="fade-up" data-aos-delay="300"><div class="card-icon cyan"><i class="fas fa-map-marked-alt"></i></div><h3>Complaint Heatmap</h3><p>Visual campus heatmap showing complaint density zones, helping administrators identify and address problem areas proactively.</p></div>
                    <div class="card" data-aos="fade-up" data-aos-delay="100"><div class="card-icon blue"><i class="fas fa-chart-pie"></i></div><h3>Smart Analytics</h3><p>Interactive dashboards with charts showing trends, category distribution, department-wise stats, and resolution metrics.</p></div>
                    <div class="card" data-aos="fade-up" data-aos-delay="200"><div class="card-icon green"><i class="fas fa-bell"></i></div><h3>Real-time Tracking</h3><p>Track your complaint status in real-time with a visual timeline showing every update from submission to resolution.</p></div>
                    <div class="card" data-aos="fade-up" data-aos-delay="300"><div class="card-icon amber"><i class="fas fa-camera"></i></div><h3>Image Evidence</h3><p>Upload photos of campus issues as evidence. Images are stored securely and visible to administrators for faster assessment.</p></div>
                </div>
            </div>
        </section>

        <section class="section" data-aos="fade-up">
            <div class="section-header"><h2>How It <span class="gradient-text">Works</span></h2><p>Simple 4-step process to report and resolve campus issues.</p></div>
            <div class="steps-grid">
                <div class="step-card" data-aos="fade-up" data-aos-delay="100"><h3>Register & Login</h3><p>Create your student account with roll number and department. Secure JWT authentication keeps your data safe.</p></div>
                <div class="step-card" data-aos="fade-up" data-aos-delay="200"><h3>Submit Complaint</h3><p>Describe the issue, select location, upload a photo. AI automatically categorizes and prioritizes your complaint.</p></div>
                <div class="step-card" data-aos="fade-up" data-aos-delay="300"><h3>Track Progress</h3><p>Use your unique complaint ID to track real-time status updates, admin comments, and resolution timeline.</p></div>
                <div class="step-card" data-aos="fade-up" data-aos-delay="400"><h3>Issue Resolved</h3><p>Administrators assign staff, update status, and resolve issues. You get notified at every step of the process.</p></div>
            </div>
        </section>`;
        if (typeof AOS !== 'undefined') AOS.refresh();
    }

    /* ===== 2. ABOUT PAGE ===== */
    function about() {
        main().innerHTML = `
        <div class="section about-page">
            <div class="section-header" data-aos="fade-up"><h2>About <span class="gradient-text">Vignan Feedback System</span></h2><p>AI-powered smart campus complaint management platform designed to improve campus life.</p></div>
            <div class="features-grid" data-aos="fade-up">
                <div class="card"><div class="card-icon blue"><i class="fas fa-bullseye"></i></div><h3>Our Mission</h3><p>To provide a transparent, efficient, and AI-driven complaint management system that ensures every campus issue is addressed promptly and effectively.</p></div>
                <div class="card"><div class="card-icon green"><i class="fas fa-users"></i></div><h3>Target Users</h3><p>Students report issues, Campus Administrators manage and track complaints, and Maintenance Staff receive assignments for resolution.</p></div>
                <div class="card"><div class="card-icon purple"><i class="fas fa-shield-alt"></i></div><h3>Security First</h3><p>JWT authentication, role-based access control, input validation, and secure image storage ensure your data is always protected.</p></div>
            </div>
            <div class="section-header" style="margin-top:3rem" data-aos="fade-up"><h2>Technology <span class="gradient-text">Stack</span></h2></div>
            <div class="tech-stack" data-aos="fade-up">
                <div class="tech-item"><i class="fab fa-js-square" style="color:#f7df1e"></i><span>JavaScript</span></div>
                <div class="tech-item"><i class="fab fa-html5" style="color:#e34f26"></i><span>HTML5</span></div>
                <div class="tech-item"><i class="fab fa-css3-alt" style="color:#264de4"></i><span>CSS3</span></div>
                <div class="tech-item"><i class="fas fa-brain" style="color:#a855f7"></i><span>AI/NLP Engine</span></div>
                <div class="tech-item"><i class="fas fa-chart-bar" style="color:#6366f1"></i><span>Chart.js</span></div>
                <div class="tech-item"><i class="fas fa-map" style="color:#22c55e"></i><span>Leaflet.js</span></div>
                <div class="tech-item"><i class="fas fa-database" style="color:#06b6d4"></i><span>localStorage</span></div>
                <div class="tech-item"><i class="fas fa-lock" style="color:#f59e0b"></i><span>JWT Auth</span></div>
            </div>
        </div>`;
        if (typeof AOS !== 'undefined') AOS.refresh();
    }

    /* ===== 3. STUDENT REGISTER ===== */
    function studentRegister() {
        main().innerHTML = `
        <div class="auth-page">
            <div class="auth-card" data-aos="fade-up">
                <div style="text-align:center;margin-bottom:1.5rem"><div class="brand-icon" style="margin:0 auto;width:56px;height:56px;font-size:1.5rem"><i class="fas fa-user-plus"></i></div></div>
                <h2>Create Account</h2>
                <p class="auth-subtitle">Join Vignan Feedback System</p>
                <form id="registerForm" onsubmit="Pages.handleRegister(event)">
                    <div class="form-group"><label>Full Name</label><div class="form-icon-input"><i class="fas fa-user"></i><input type="text" id="regName" placeholder="Enter your full name" required></div></div>
                    <div class="form-row">
                        <div class="form-group"><label>Roll Number</label><div class="form-icon-input"><i class="fas fa-id-card"></i><input type="text" id="regRoll" placeholder="e.g. 21BCE7890" required></div></div>
                        <div class="form-group"><label>Department</label><div class="form-icon-input"><i class="fas fa-building"></i><select id="regDept" required><option value="">Select</option><option>CSE</option><option>ECE</option><option>EEE</option><option>MECH</option><option>CIVIL</option><option>IT</option><option>AIDS</option><option>AIML</option></select></div></div>
                    </div>
                    <div class="form-group"><label>Email</label><div class="form-icon-input"><i class="fas fa-envelope"></i><input type="email" id="regEmail" placeholder="your.email@student.vignan.ac.in" required></div></div>
                    <div class="form-group"><label>Password</label><div class="form-icon-input"><i class="fas fa-lock"></i><input type="password" id="regPassword" placeholder="Minimum 6 characters" minlength="6" required></div></div>
                    <button type="submit" class="btn btn-primary btn-lg"><i class="fas fa-user-plus"></i> Create Account</button>
                </form>
                <div class="auth-footer">Already have an account? <a href="#student-login">Login here</a></div>
            </div>
        </div>`;
    }

    function handleRegister(e) {
        e.preventDefault();
        const data = { name: document.getElementById('regName').value.trim(), rollNumber: document.getElementById('regRoll').value.trim().toUpperCase(), department: document.getElementById('regDept').value, email: document.getElementById('regEmail').value.trim().toLowerCase(), password: document.getElementById('regPassword').value };
        if (!data.name || !data.rollNumber || !data.department || !data.email || !data.password) { Components.showToast('Please fill all fields!', 'error'); return; }
        const result = DataStore.registerUser(data);
        if (result.success) { Components.showToast('Registration successful! Please login.', 'success'); window.location.hash = '#student-login'; }
        else { Components.showToast(result.message, 'error'); }
    }

    /* ===== 4. STUDENT LOGIN ===== */
    function studentLogin() {
        main().innerHTML = `
        <div class="auth-page">
            <div class="auth-card" data-aos="fade-up">
                <div style="text-align:center;margin-bottom:1.5rem"><div class="brand-icon" style="margin:0 auto;width:56px;height:56px;font-size:1.5rem"><i class="fas fa-sign-in-alt"></i></div></div>
                <h2>Student Login</h2>
                <p class="auth-subtitle">Access your complaint dashboard</p>
                <form onsubmit="Pages.handleStudentLogin(event)">
                    <div class="form-group"><label>Email</label><div class="form-icon-input"><i class="fas fa-envelope"></i><input type="email" id="loginEmail" placeholder="your.email@student.vignan.ac.in" required></div></div>
                    <div class="form-group"><label>Password</label><div class="form-icon-input"><i class="fas fa-lock"></i><input type="password" id="loginPassword" placeholder="Enter your password" required></div></div>
                    <button type="submit" class="btn btn-primary btn-lg"><i class="fas fa-sign-in-alt"></i> Login</button>
                </form>
                <div class="auth-footer">Don't have an account? <a href="#student-register">Register here</a><br><br><span style="font-size:0.78rem">Demo: ravi@student.vignan.ac.in / student123</span></div>
            </div>
        </div>`;
    }

    function handleStudentLogin(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim().toLowerCase();
        const password = document.getElementById('loginPassword').value;
        const result = DataStore.loginUser(email, password);
        if (result.success) { Components.showToast(`Welcome back, ${result.session.name}!`, 'success'); Components.renderNavbar(); window.location.hash = '#student-dashboard'; }
        else { Components.showToast(result.message, 'error'); }
    }

    /* ===== 5. SUBMIT COMPLAINT ===== */
    function submitComplaint() {
        if (!session() || session().role !== 'student') { window.location.hash = '#student-login'; return; }
        main().innerHTML = `
        <div class="complaint-form-page" data-aos="fade-up">
            <h2><i class="fas fa-plus-circle" style="color:var(--accent-primary)"></i> Submit Complaint</h2>
            <p class="subtitle">Describe the issue and our AI will auto-categorize and prioritize it.</p>
            <form id="complaintForm" onsubmit="Pages.handleSubmitComplaint(event)" style="margin-top:2rem">
                <div class="card" style="padding:2rem;margin-bottom:1.5rem">
                    <div class="form-group"><label>Complaint Title *</label><input type="text" id="cmpTitle" placeholder="Brief title describing the issue" required oninput="Pages.liveAIPreview()"></div>
                    <div class="form-group"><label>Description *</label><textarea id="cmpDesc" placeholder="Describe the problem in detail..." required oninput="Pages.liveAIPreview()"></textarea></div>
                    <div class="form-row">
                        <div class="form-group"><label>Category <span style="font-size:0.75rem;color:var(--accent-primary)">(AI Suggested)</span></label><select id="cmpCategory"><option value="">Auto-detect by AI</option><option>Water Issue</option><option>Electrical</option><option>Infrastructure</option><option>Cleanliness</option><option>Equipment</option><option>Security</option><option>Internet/WiFi</option><option>Furniture</option><option>Other</option></select></div>
                        <div class="form-group"><label>Location *</label><select id="cmpLocation" required><option value="">Select location</option><option>Hostel Block A</option><option>Hostel Block B</option><option>Block A - 1st Floor</option><option>Block A - 2nd Floor</option><option>Block B - Room 105</option><option>Block C - Room 201</option><option>Lab 3 - Workstation 12</option><option>Physics Lab</option><option>Computer Lab</option><option>Library</option><option>Canteen</option><option>Sports Ground</option><option>Main Gate</option><option>Back Gate Area</option><option>Parking Area</option><option>Admin Building</option></select></div>
                    </div>
                    <div class="form-group">
                        <label>Upload Image Evidence</label>
                        <div class="dropzone" id="dropzone" onclick="document.getElementById('cmpImage').click()" ondragover="event.preventDefault();this.classList.add('dragover')" ondragleave="this.classList.remove('dragover')" ondrop="Pages.handleDrop(event)">
                            <i class="fas fa-cloud-upload-alt"></i>
                            <p>Click or drag & drop image here</p>
                            <p class="formats">Supported: JPG, PNG, JPEG (Max 5MB)</p>
                        </div>
                        <input type="file" id="cmpImage" accept=".jpg,.jpeg,.png" style="display:none" onchange="Pages.handleImageSelect(event)">
                        <div id="imagePreview"></div>
                    </div>
                </div>
                <div id="aiPreviewBox"></div>
                <button type="submit" class="btn btn-primary btn-lg" style="width:100%"><i class="fas fa-paper-plane"></i> Submit Complaint</button>
            </form>
        </div>`;
    }

    let selectedImage = null;
    function handleImageSelect(e) {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) { Components.showToast('Image must be under 5MB!', 'error'); return; }
        const reader = new FileReader();
        reader.onload = (ev) => { selectedImage = ev.target.result; document.getElementById('imagePreview').innerHTML = `<div class="image-preview"><img src="${selectedImage}" alt="Preview"><button type="button" class="remove-image" onclick="Pages.removeImage()"><i class="fas fa-times"></i></button></div>`; };
        reader.readAsDataURL(file);
    }
    function handleDrop(e) { e.preventDefault(); e.currentTarget.classList.remove('dragover'); const file = e.dataTransfer.files[0]; if (file && file.type.startsWith('image/')) { document.getElementById('cmpImage').files = e.dataTransfer.files; handleImageSelect({ target: { files: [file] } }); } }
    function removeImage() { selectedImage = null; document.getElementById('imagePreview').innerHTML = ''; document.getElementById('cmpImage').value = ''; }

    function liveAIPreview() {
        const title = document.getElementById('cmpTitle')?.value || '';
        const desc = document.getElementById('cmpDesc')?.value || '';
        if ((title + desc).length < 10) { document.getElementById('aiPreviewBox').innerHTML = ''; return; }
        const analysis = AIEngine.fullAnalysis(title, desc);
        document.getElementById('aiPreviewBox').innerHTML = `
        <div class="ai-preview">
            <h4><i class="fas fa-robot"></i> AI Analysis (Live Preview)</h4>
            <div style="display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center">
                <span class="ai-tag category"><i class="fas fa-tag"></i> ${analysis.category.category} <span style="opacity:0.7;font-size:0.7rem">(${analysis.category.confidence}%)</span></span>
                <span class="ai-tag priority-${analysis.priority.priority.toLowerCase()}"><i class="fas fa-flag"></i> ${analysis.priority.priority} Priority <span style="opacity:0.7;font-size:0.7rem">(${analysis.priority.confidence}%)</span></span>
                <span class="ai-tag category"><i class="fas fa-heart-pulse"></i> ${analysis.sentiment.severity} • ${analysis.sentiment.urgency}</span>
            </div>
        </div>`;
    }

    function handleSubmitComplaint(e) {
        e.preventDefault();
        const s = session();
        const title = document.getElementById('cmpTitle').value.trim();
        const desc = document.getElementById('cmpDesc').value.trim();
        let category = document.getElementById('cmpCategory').value;
        const location = document.getElementById('cmpLocation').value;
        if (!title || !desc || !location) { Components.showToast('Please fill all required fields!', 'error'); return; }
        const analysis = AIEngine.fullAnalysis(title, desc);
        if (!category) category = analysis.category.category;
        const result = DataStore.createComplaint({ userId: s.userId, userName: s.name, department: s.department, title, description: desc, category, location, priority: analysis.priority.priority, image: selectedImage });
        if (result.success) {
            Components.showModal('✅ Complaint Submitted!', `<div style="text-align:center"><p style="font-size:1.1rem;margin-bottom:1rem">Your complaint has been registered successfully.</p><div style="background:var(--bg-input);padding:1.25rem;border-radius:var(--radius-lg);margin-bottom:1rem"><p style="font-size:0.8rem;color:var(--text-muted)">Complaint ID</p><p style="font-size:1.5rem;font-weight:800;font-family:var(--font-display);color:var(--accent-primary-hover)">${result.complaint.id}</p></div><div style="display:flex;gap:0.5rem;flex-wrap:wrap;justify-content:center;margin-bottom:1rem">${Components.statusBadge('Pending')} ${Components.priorityBadge(result.complaint.priority)} <span class="ai-tag category"><i class="fas fa-tag"></i> ${result.complaint.category}</span></div><p style="font-size:0.85rem;color:var(--text-muted)">Save this ID to track your complaint status.</p><br><a href="#student-dashboard" class="btn btn-primary" onclick="Components.closeModal()"><i class="fas fa-tachometer-alt"></i> Go to Dashboard</a></div>`);
            selectedImage = null;
        } else { Components.showToast('Failed to submit complaint!', 'error'); }
    }

    /* ===== 6. TRACK COMPLAINT ===== */
    function trackComplaint() {
        const params = new URLSearchParams(window.location.hash.split('?')[1] || '');
        const prefillId = params.get('id') || '';
        main().innerHTML = `
        <div class="track-page" data-aos="fade-up">
            <div class="section-header" style="text-align:left"><h2><i class="fas fa-search" style="color:var(--accent-primary)"></i> Track Complaint</h2><p>Enter your complaint ID to view real-time status.</p></div>
            <div class="track-search"><input type="text" id="trackId" placeholder="Enter Complaint ID (e.g. CMP-2026-0001)" value="${prefillId}"><button class="btn btn-primary" onclick="Pages.searchComplaint()"><i class="fas fa-search"></i> Track</button></div>
            <div id="trackResult"></div>
        </div>`;
        if (prefillId) searchComplaint();
    }

    function searchComplaint() {
        const id = document.getElementById('trackId').value.trim().toUpperCase();
        if (!id) { Components.showToast('Please enter a complaint ID!', 'warning'); return; }
        const c = DataStore.getComplaintById(id);
        const box = document.getElementById('trackResult');
        if (!c) { box.innerHTML = Components.emptyState('fa-search', 'Complaint Not Found', `No complaint found with ID "${id}". Please check and try again.`); return; }
        const comments = DataStore.getCommentsByComplaint(id);
        box.innerHTML = `
        <div class="track-result card" style="padding:2rem">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.75rem;margin-bottom:1.5rem">
                <div><span class="complaint-card-id" style="font-size:1rem">${c.id}</span><h3 style="margin-top:0.35rem;font-size:1.25rem">${Components.escapeHTML(c.title)}</h3></div>
                <div style="display:flex;gap:0.5rem;flex-wrap:wrap">${Components.statusBadge(c.status)} ${Components.priorityBadge(c.priority)}</div>
            </div>
            <p style="color:var(--text-secondary);margin-bottom:1.5rem;line-height:1.8">${Components.escapeHTML(c.description)}</p>
            <div class="detail-grid">
                <div class="detail-item"><label>Category</label><span><i class="fas fa-tag" style="color:var(--accent-secondary)"></i> ${c.category}</span></div>
                <div class="detail-item"><label>Location</label><span><i class="fas fa-map-marker-alt" style="color:var(--accent-red)"></i> ${Components.escapeHTML(c.location || 'N/A')}</span></div>
                <div class="detail-item"><label>Submitted By</label><span>${Components.escapeHTML(c.userName || 'Student')}</span></div>
                <div class="detail-item"><label>Department</label><span>${c.department || 'N/A'}</span></div>
                <div class="detail-item"><label>Submitted On</label><span>${Components.formatDate(c.createdAt)}</span></div>
                <div class="detail-item"><label>Last Updated</label><span>${Components.formatDate(c.updatedAt)}</span></div>
                ${c.assignedTo ? `<div class="detail-item"><label>Assigned To</label><span><i class="fas fa-user-cog" style="color:var(--accent-amber)"></i> ${Components.escapeHTML(c.assignedTo)}</span></div>` : ''}
            </div>
            ${c.image ? `<div class="detail-image"><label style="display:block;font-size:0.78rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:0.5rem">Evidence Image</label><img src="${c.image}" alt="Evidence" onclick="Components.showLightbox('${c.image}')"></div>` : ''}
            <h3 style="margin-top:2rem;margin-bottom:1rem;font-size:1rem"><i class="fas fa-timeline" style="color:var(--accent-primary)"></i> Status Timeline</h3>
            <div class="timeline">
                ${c.statusHistory.map((h, i) => `<div class="timeline-item"><div class="timeline-dot ${i === c.statusHistory.length - 1 ? 'active' : ''}"></div><h4>${h.status}</h4><p>${Components.formatDate(h.date)}${h.by ? ' • by ' + h.by : ''}${h.comment ? '<br><em style="color:var(--text-secondary)">"' + Components.escapeHTML(h.comment) + '"</em>' : ''}</p></div>`).join('')}
            </div>
            ${comments.length > 0 ? `<div class="comments-section"><h3 style="margin-bottom:1rem;font-size:1rem"><i class="fas fa-comments" style="color:var(--accent-primary)"></i> Admin Comments</h3>${comments.map(cm => `<div class="comment-item"><div style="display:flex;justify-content:space-between"><span class="comment-author">${Components.escapeHTML(cm.author)}</span><span class="comment-date">${Components.formatDate(cm.createdAt)}</span></div><p class="comment-text">${Components.escapeHTML(cm.text)}</p></div>`).join('')}</div>` : ''}
        </div>`;
    }

    /* ===== 7. STUDENT DASHBOARD ===== */
    function studentDashboard() {
        if (!session() || session().role !== 'student') { window.location.hash = '#student-login'; return; }
        const s = session();
        const complaints = DataStore.getComplaintsByUser(s.userId);
        const pending = complaints.filter(c => c.status === 'Pending').length;
        const inProg = complaints.filter(c => c.status === 'In Progress').length;
        const resolved = complaints.filter(c => c.status === 'Resolved').length;
        main().innerHTML = `
        <div class="dashboard-page">
            <div class="dashboard-header" data-aos="fade-down">
                <div><h2>Welcome, ${Components.escapeHTML(s.name)} 👋</h2><p style="color:var(--text-muted)">${s.department} • ${s.rollNumber}</p></div>
                <a href="#submit-complaint" class="btn btn-primary"><i class="fas fa-plus-circle"></i> New Complaint</a>
            </div>
            <div class="stats-grid">
                <div class="stat-card" data-aos="fade-up"><div class="stat-card-icon" style="background:rgba(99,102,241,0.1);color:#6366f1"><i class="fas fa-clipboard-list"></i></div><div class="stat-card-info"><h3>${complaints.length}</h3><p>Total Complaints</p></div></div>
                <div class="stat-card" data-aos="fade-up" data-aos-delay="100"><div class="stat-card-icon" style="background:rgba(245,158,11,0.1);color:#f59e0b"><i class="fas fa-clock"></i></div><div class="stat-card-info"><h3>${pending}</h3><p>Pending</p></div></div>
                <div class="stat-card" data-aos="fade-up" data-aos-delay="200"><div class="stat-card-icon" style="background:rgba(59,130,246,0.1);color:#3b82f6"><i class="fas fa-spinner"></i></div><div class="stat-card-info"><h3>${inProg}</h3><p>In Progress</p></div></div>
                <div class="stat-card" data-aos="fade-up" data-aos-delay="300"><div class="stat-card-icon" style="background:rgba(34,197,94,0.1);color:#22c55e"><i class="fas fa-check-circle"></i></div><div class="stat-card-info"><h3>${resolved}</h3><p>Resolved</p></div></div>
            </div>
            <h3 style="margin-bottom:1.25rem;font-size:1.15rem">My Complaints</h3>
            ${complaints.length > 0 ? `<div class="complaint-cards-grid">${complaints.map(c => Components.complaintCard(c)).join('')}</div>` : Components.emptyState('fa-inbox', 'No Complaints Yet', 'Submit your first complaint to get started!')}
        </div>`;
        if (typeof AOS !== 'undefined') AOS.refresh();
    }

    /* ===== 8. ADMIN LOGIN ===== */
    function adminLogin() {
        main().innerHTML = `
        <div class="auth-page">
            <div class="auth-card" data-aos="fade-up">
                <div style="text-align:center;margin-bottom:1.5rem"><div class="brand-icon" style="margin:0 auto;width:56px;height:56px;font-size:1.5rem;background:linear-gradient(135deg, #ef4444, #f59e0b)"><i class="fas fa-user-shield"></i></div></div>
                <h2>Admin Login</h2>
                <p class="auth-subtitle">Access the administration panel</p>
                <form onsubmit="Pages.handleAdminLogin(event)">
                    <div class="form-group"><label>Admin Email</label><div class="form-icon-input"><i class="fas fa-envelope"></i><input type="email" id="adminEmail" placeholder="admin@vignan.ac.in" required></div></div>
                    <div class="form-group"><label>Password</label><div class="form-icon-input"><i class="fas fa-lock"></i><input type="password" id="adminPassword" placeholder="Enter admin password" required></div></div>
                    <button type="submit" class="btn btn-primary btn-lg" style="background:linear-gradient(135deg, #ef4444, #f59e0b)"><i class="fas fa-sign-in-alt"></i> Admin Login</button>
                </form>
                <div class="auth-footer"><span style="font-size:0.78rem">Credentials: admin@vignan.ac.in / admin123</span></div>
            </div>
        </div>`;
    }

    function handleAdminLogin(e) {
        e.preventDefault();
        const result = DataStore.loginAdmin(document.getElementById('adminEmail').value.trim(), document.getElementById('adminPassword').value);
        if (result.success) { Components.showToast('Welcome, Admin!', 'success'); Components.renderNavbar(); window.location.hash = '#admin-dashboard'; }
        else { Components.showToast(result.message, 'error'); }
    }

    /* ===== 9. ADMIN DASHBOARD ===== */
    function adminDashboard() {
        if (!session() || session().role !== 'admin') { window.location.hash = '#admin-login'; return; }
        const stats = DataStore.getStats();
        const recent = DataStore.getComplaints().slice(0, 5);
        main().innerHTML = `
        <div class="dashboard-page">
            <div class="dashboard-header" data-aos="fade-down"><div><h2>Admin Dashboard</h2><p style="color:var(--text-muted)">Campus complaint overview & analytics</p></div><a href="#complaint-management" class="btn btn-primary"><i class="fas fa-tasks"></i> Manage Complaints</a></div>
            <div class="stats-grid">
                <div class="stat-card" data-aos="fade-up"><div class="stat-card-icon" style="background:rgba(99,102,241,0.1);color:#6366f1"><i class="fas fa-clipboard-list"></i></div><div class="stat-card-info"><h3 class="counter" data-target="${stats.total}">0</h3><p>Total Complaints</p></div></div>
                <div class="stat-card" data-aos="fade-up" data-aos-delay="100"><div class="stat-card-icon" style="background:rgba(245,158,11,0.1);color:#f59e0b"><i class="fas fa-clock"></i></div><div class="stat-card-info"><h3 class="counter" data-target="${stats.pending}">0</h3><p>Pending</p></div></div>
                <div class="stat-card" data-aos="fade-up" data-aos-delay="200"><div class="stat-card-icon" style="background:rgba(59,130,246,0.1);color:#3b82f6"><i class="fas fa-spinner"></i></div><div class="stat-card-info"><h3 class="counter" data-target="${stats.inProgress}">0</h3><p>In Progress</p></div></div>
                <div class="stat-card" data-aos="fade-up" data-aos-delay="300"><div class="stat-card-icon" style="background:rgba(34,197,94,0.1);color:#22c55e"><i class="fas fa-check-circle"></i></div><div class="stat-card-info"><h3 class="counter" data-target="${stats.resolved}">0</h3><p>Resolved</p></div></div>
            </div>
            <div class="charts-grid">
                <div class="chart-card" data-aos="fade-up"><h3><i class="fas fa-chart-line" style="color:var(--accent-primary)"></i> Complaint Trend (7 Days)</h3><div style="height:250px"><canvas id="trendChart"></canvas></div></div>
                <div class="chart-card" data-aos="fade-up"><h3><i class="fas fa-chart-pie" style="color:var(--accent-secondary)"></i> Status Distribution</h3><div style="height:250px"><canvas id="statusChart"></canvas></div></div>
            </div>
            <h3 style="margin:1.5rem 0 1rem;font-size:1.1rem"><i class="fas fa-clock" style="color:var(--accent-amber)"></i> Recent Complaints</h3>
            <div class="complaint-table-wrapper" data-aos="fade-up">
                <table class="complaint-table"><thead><tr><th>ID</th><th>Title</th><th>Category</th><th>Priority</th><th>Status</th><th>Date</th></tr></thead>
                <tbody>${recent.map(c => `<tr onclick="window.location.hash='track-complaint?id=${c.id}'" style="cursor:pointer"><td class="complaint-id">${c.id}</td><td class="complaint-title">${Components.escapeHTML(c.title)}</td><td><span class="ai-tag category" style="font-size:0.72rem">${c.category}</span></td><td>${Components.priorityBadge(c.priority)}</td><td>${Components.statusBadge(c.status)}</td><td style="font-size:0.82rem;color:var(--text-muted)">${new Date(c.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'short'})}</td></tr>`).join('')}</tbody></table>
            </div>
        </div>`;
        setTimeout(() => {
            DashboardCharts.renderTrendChart('trendChart', stats.trend);
            DashboardCharts.renderStatusDoughnut('statusChart', stats);
            document.querySelectorAll('.counter').forEach(el => DashboardCharts.animateCounter(el, parseInt(el.dataset.target)));
        }, 300);
        if (typeof AOS !== 'undefined') AOS.refresh();
    }

    /* ===== 10. COMPLAINT MANAGEMENT ===== */
    function complaintManagement() {
        if (!session() || session().role !== 'admin') { window.location.hash = '#admin-login'; return; }
        renderManagementPage();
    }

    function renderManagementPage(filters = {}) {
        const complaints = DataStore.filterComplaints(filters);
        main().innerHTML = `
        <div class="dashboard-page">
            <div class="dashboard-header"><h2><i class="fas fa-tasks" style="color:var(--accent-primary)"></i> Complaint Management</h2><span class="btn btn-secondary btn-sm">${complaints.length} complaints</span></div>
            <div class="filters-bar" data-aos="fade-up">
                <select id="fStatus" onchange="Pages.applyFilters()"><option value="all">All Status</option><option value="Pending" ${filters.status==='Pending'?'selected':''}>Pending</option><option value="In Progress" ${filters.status==='In Progress'?'selected':''}>In Progress</option><option value="Resolved" ${filters.status==='Resolved'?'selected':''}>Resolved</option><option value="Rejected" ${filters.status==='Rejected'?'selected':''}>Rejected</option></select>
                <select id="fCategory" onchange="Pages.applyFilters()"><option value="all">All Categories</option><option ${filters.category==='Water Issue'?'selected':''}>Water Issue</option><option ${filters.category==='Electrical'?'selected':''}>Electrical</option><option ${filters.category==='Infrastructure'?'selected':''}>Infrastructure</option><option ${filters.category==='Cleanliness'?'selected':''}>Cleanliness</option><option ${filters.category==='Equipment'?'selected':''}>Equipment</option><option ${filters.category==='Security'?'selected':''}>Security</option></select>
                <select id="fPriority" onchange="Pages.applyFilters()"><option value="all">All Priority</option><option ${filters.priority==='High'?'selected':''}>High</option><option ${filters.priority==='Medium'?'selected':''}>Medium</option><option ${filters.priority==='Low'?'selected':''}>Low</option></select>
                <input id="fSearch" placeholder="Search ID or keyword..." value="${filters.search||''}" oninput="Pages.applyFilters()">
            </div>
            <div class="complaint-table-wrapper" data-aos="fade-up">
                <table class="complaint-table"><thead><tr><th>ID</th><th>Title</th><th>Category</th><th>Location</th><th>Priority</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
                <tbody>${complaints.length > 0 ? complaints.map(c => `<tr>
                    <td class="complaint-id">${c.id}</td>
                    <td class="complaint-title">${Components.escapeHTML(c.title)}</td>
                    <td><span class="ai-tag category" style="font-size:0.7rem">${c.category}</span></td>
                    <td style="font-size:0.82rem">${Components.escapeHTML(c.location||'N/A')}</td>
                    <td>${Components.priorityBadge(c.priority)}</td>
                    <td>${Components.statusBadge(c.status)}</td>
                    <td style="font-size:0.82rem;color:var(--text-muted)">${new Date(c.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'short'})}</td>
                    <td><button class="btn btn-sm btn-secondary" onclick="Pages.openManageModal('${c.id}')"><i class="fas fa-cog"></i> Manage</button></td>
                </tr>`).join('') : `<tr><td colspan="8" style="text-align:center;padding:2rem;color:var(--text-muted)">No complaints match your filters.</td></tr>`}</tbody></table>
            </div>
        </div>`;
    }

    function applyFilters() {
        renderManagementPage({ status: document.getElementById('fStatus').value, category: document.getElementById('fCategory').value, priority: document.getElementById('fPriority').value, search: document.getElementById('fSearch').value });
    }

    function openManageModal(id) {
        const c = DataStore.getComplaintById(id);
        if (!c) return;
        Components.showModal(`Manage: ${c.id}`, `
            <p style="margin-bottom:1rem"><b>${Components.escapeHTML(c.title)}</b></p>
            <p style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:1rem">${Components.escapeHTML(c.description)}</p>
            ${c.image ? `<img src="${c.image}" style="max-height:150px;border-radius:8px;margin-bottom:1rem;cursor:pointer" onclick="Components.showLightbox('${c.image}')">` : ''}
            <div class="detail-grid" style="margin-bottom:1.5rem">
                <div class="detail-item"><label>Category</label><span>${c.category}</span></div>
                <div class="detail-item"><label>Priority</label><span>${c.priority}</span></div>
                <div class="detail-item"><label>Location</label><span>${Components.escapeHTML(c.location||'N/A')}</span></div>
                <div class="detail-item"><label>Submitted By</label><span>${Components.escapeHTML(c.userName||'Student')}</span></div>
            </div>
            <hr style="border-color:var(--border-color);margin:1rem 0">
            <h4 style="margin-bottom:0.75rem"><i class="fas fa-tools" style="color:var(--accent-primary)"></i> Update Complaint</h4>
            <div class="action-row">
                <div class="form-group"><label>Status</label><select id="manageStatus"><option ${c.status==='Pending'?'selected':''}>Pending</option><option ${c.status==='In Progress'?'selected':''}>In Progress</option><option ${c.status==='Resolved'?'selected':''}>Resolved</option><option ${c.status==='Rejected'?'selected':''}>Rejected</option></select></div>
                <div class="form-group"><label>Assign Staff</label><input id="manageStaff" placeholder="Staff name" value="${c.assignedTo||''}"></div>
            </div>
            <div class="form-group" style="margin-top:0.75rem"><label>Add Comment</label><textarea id="manageComment" placeholder="Add a comment about this complaint..."></textarea></div>
            <button class="btn btn-primary" onclick="Pages.saveManageChanges('${c.id}')" style="width:100%;margin-top:0.5rem"><i class="fas fa-save"></i> Save Changes</button>
        `);
    }

    function saveManageChanges(id) {
        const status = document.getElementById('manageStatus').value;
        const staff = document.getElementById('manageStaff').value.trim();
        const comment = document.getElementById('manageComment').value.trim();
        DataStore.updateComplaintStatus(id, status, comment, 'Admin');
        if (staff) DataStore.assignStaff(id, staff);
        Components.closeModal();
        Components.showToast(`Complaint ${id} updated!`, 'success');
        complaintManagement();
    }

    /* ===== 11. ANALYTICS DASHBOARD ===== */
    function analytics() {
        if (!session() || session().role !== 'admin') { window.location.hash = '#admin-login'; return; }
        const stats = DataStore.getStats();
        const complaints = DataStore.getComplaints();
        main().innerHTML = `
        <div class="dashboard-page">
            <div class="dashboard-header" data-aos="fade-down"><h2><i class="fas fa-chart-bar" style="color:var(--accent-primary)"></i> Analytics Dashboard</h2></div>
            <div class="stats-grid">
                <div class="stat-card" data-aos="fade-up"><div class="stat-card-icon" style="background:rgba(239,68,68,0.1);color:#ef4444"><i class="fas fa-exclamation-circle"></i></div><div class="stat-card-info"><h3>${stats.highPriority}</h3><p>High Priority</p></div></div>
                <div class="stat-card" data-aos="fade-up" data-aos-delay="100"><div class="stat-card-icon" style="background:rgba(34,197,94,0.1);color:#22c55e"><i class="fas fa-percentage"></i></div><div class="stat-card-info"><h3>${stats.total > 0 ? Math.round(stats.resolved / stats.total * 100) : 0}%</h3><p>Resolution Rate</p></div></div>
                <div class="stat-card" data-aos="fade-up" data-aos-delay="200"><div class="stat-card-icon" style="background:rgba(168,85,247,0.1);color:#a855f7"><i class="fas fa-layer-group"></i></div><div class="stat-card-info"><h3>${Object.keys(stats.byCategory).length}</h3><p>Categories</p></div></div>
                <div class="stat-card" data-aos="fade-up" data-aos-delay="300"><div class="stat-card-icon" style="background:rgba(6,182,212,0.1);color:#06b6d4"><i class="fas fa-map-pin"></i></div><div class="stat-card-info"><h3>${Object.keys(stats.byLocation).length}</h3><p>Locations</p></div></div>
            </div>
            <div class="charts-grid">
                <div class="chart-card" data-aos="fade-up"><h3><i class="fas fa-chart-pie" style="color:var(--accent-secondary)"></i> Category Distribution</h3><div style="height:280px"><canvas id="catPieChart"></canvas></div></div>
                <div class="chart-card" data-aos="fade-up"><h3><i class="fas fa-chart-bar" style="color:var(--accent-purple)"></i> Department-wise Complaints</h3><div style="height:280px"><canvas id="deptBarChart"></canvas></div></div>
                <div class="chart-card" data-aos="fade-up"><h3><i class="fas fa-flag" style="color:var(--accent-red)"></i> Priority Breakdown</h3><div style="height:280px"><canvas id="priorityChart"></canvas></div></div>
                <div class="chart-card" data-aos="fade-up"><h3><i class="fas fa-chart-line" style="color:var(--accent-primary)"></i> Weekly Trend</h3><div style="height:280px"><canvas id="analyticsTrendChart"></canvas></div></div>
            </div>
            <h3 style="margin:2rem 0 1rem"><i class="fas fa-map-marked-alt" style="color:var(--accent-green)"></i> Campus Complaint Heatmap</h3>
            <div class="card" style="padding:1.5rem" data-aos="fade-up">
                <div class="heatmap-container" id="analyticsHeatmap"></div>
                <div class="heatmap-legend">
                    <div class="legend-item"><div class="legend-dot high"></div> High Complaints</div>
                    <div class="legend-item"><div class="legend-dot medium"></div> Moderate Complaints</div>
                    <div class="legend-item"><div class="legend-dot low"></div> Low Complaints</div>
                </div>
            </div>
        </div>`;
        setTimeout(() => {
            DashboardCharts.destroyAll();
            DashboardCharts.renderCategoryPie('catPieChart', stats.byCategory);
            DashboardCharts.renderDeptBar('deptBarChart', stats.byDepartment);
            DashboardCharts.renderPriorityBar('priorityChart', complaints);
            DashboardCharts.renderTrendChart('analyticsTrendChart', stats.trend);
            Heatmap.init('analyticsHeatmap');
        }, 400);
        if (typeof AOS !== 'undefined') AOS.refresh();
    }

    return { home, about, studentRegister, studentLogin, submitComplaint, trackComplaint, studentDashboard, adminLogin, adminDashboard, complaintManagement, analytics, handleRegister, handleStudentLogin, handleAdminLogin, handleSubmitComplaint, handleImageSelect, handleDrop, removeImage, liveAIPreview, searchComplaint, applyFilters, openManageModal, saveManageChanges };
})();
