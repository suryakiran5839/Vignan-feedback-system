/* ===== DATA LAYER – Mock Database with localStorage ===== */
const DataStore = (() => {
    const KEYS = {
        users: 'vfs_users',
        complaints: 'vfs_complaints',
        comments: 'vfs_comments',
        notifications: 'vfs_notifications',
        session: 'vfs_session',
        counter: 'vfs_counter'
    };

    function get(key) { try { return JSON.parse(localStorage.getItem(key)) || null; } catch { return null; } }
    function set(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

    /* --- Users --- */
    function getUsers() { return get(KEYS.users) || []; }
    function saveUsers(u) { set(KEYS.users, u); }
    function findUserByEmail(email) { return getUsers().find(u => u.email === email); }
    function registerUser(data) {
        const users = getUsers();
        if (users.find(u => u.email === data.email)) return { success: false, message: 'Email already registered!' };
        if (users.find(u => u.rollNumber === data.rollNumber)) return { success: false, message: 'Roll number already registered!' };
        const user = { id: 'USR-' + Date.now(), ...data, role: 'student', createdAt: new Date().toISOString() };
        users.push(user);
        saveUsers(users);
        return { success: true, user };
    }
    function loginUser(email, password) {
        const user = findUserByEmail(email);
        if (!user) return { success: false, message: 'User not found!' };
        if (user.password !== password) return { success: false, message: 'Invalid password!' };
        const session = { userId: user.id, email: user.email, name: user.name, role: user.role, department: user.department, rollNumber: user.rollNumber, token: 'JWT-' + btoa(user.id + ':' + Date.now()) };
        set(KEYS.session, session);
        return { success: true, session };
    }
    function loginAdmin(email, password) {
        if (email === 'admin@vignan.ac.in' && password === 'admin123') {
            const session = { userId: 'ADMIN-001', email, name: 'Admin', role: 'admin', token: 'JWT-ADMIN-' + Date.now() };
            set(KEYS.session, session);
            return { success: true, session };
        }
        return { success: false, message: 'Invalid admin credentials!' };
    }
    function getSession() { return get(KEYS.session); }
    function logout() { localStorage.removeItem(KEYS.session); }

    /* --- Complaints --- */
    function getComplaints() { return get(KEYS.complaints) || []; }
    function saveComplaints(c) { set(KEYS.complaints, c); }
    function getNextId() {
        let counter = get(KEYS.counter) || 0;
        counter++;
        set(KEYS.counter, counter);
        return 'CMP-2026-' + String(counter).padStart(4, '0');
    }
    function createComplaint(data) {
        const complaints = getComplaints();
        const id = getNextId();
        const complaint = {
            id, ...data,
            status: 'Pending',
            priority: data.priority || 'Medium',
            category: data.category || 'Other',
            assignedTo: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            statusHistory: [{ status: 'Pending', date: new Date().toISOString(), by: 'System' }]
        };
        complaints.unshift(complaint);
        saveComplaints(complaints);
        addNotification(data.userId, `Complaint ${id} submitted successfully!`, 'success');
        return { success: true, complaint };
    }
    function getComplaintById(id) { return getComplaints().find(c => c.id === id); }
    function getComplaintsByUser(userId) { return getComplaints().filter(c => c.userId === userId); }
    function updateComplaintStatus(id, status, comment, by) {
        const complaints = getComplaints();
        const idx = complaints.findIndex(c => c.id === id);
        if (idx === -1) return { success: false, message: 'Complaint not found!' };
        complaints[idx].status = status;
        complaints[idx].updatedAt = new Date().toISOString();
        complaints[idx].statusHistory.push({ status, date: new Date().toISOString(), by: by || 'Admin', comment });
        if (comment) addComment(id, by || 'Admin', comment);
        saveComplaints(complaints);
        addNotification(complaints[idx].userId, `Complaint ${id} status updated to ${status}`, 'info');
        return { success: true, complaint: complaints[idx] };
    }
    function assignStaff(id, staffName) {
        const complaints = getComplaints();
        const idx = complaints.findIndex(c => c.id === id);
        if (idx === -1) return false;
        complaints[idx].assignedTo = staffName;
        complaints[idx].updatedAt = new Date().toISOString();
        saveComplaints(complaints);
        return true;
    }
    function filterComplaints(filters) {
        let list = getComplaints();
        if (filters.status && filters.status !== 'all') list = list.filter(c => c.status === filters.status);
        if (filters.category && filters.category !== 'all') list = list.filter(c => c.category === filters.category);
        if (filters.department && filters.department !== 'all') list = list.filter(c => c.department === filters.department);
        if (filters.priority && filters.priority !== 'all') list = list.filter(c => c.priority === filters.priority);
        if (filters.search) { const s = filters.search.toLowerCase(); list = list.filter(c => c.id.toLowerCase().includes(s) || c.title.toLowerCase().includes(s) || c.description.toLowerCase().includes(s)); }
        return list;
    }
    function getStats() {
        const all = getComplaints();
        return {
            total: all.length,
            pending: all.filter(c => c.status === 'Pending').length,
            inProgress: all.filter(c => c.status === 'In Progress').length,
            resolved: all.filter(c => c.status === 'Resolved').length,
            rejected: all.filter(c => c.status === 'Rejected').length,
            highPriority: all.filter(c => c.priority === 'High').length,
            byCategory: getCategoryStats(all),
            byDepartment: getDeptStats(all),
            byLocation: getLocationStats(all),
            trend: getTrendData(all)
        };
    }
    function getCategoryStats(all) {
        const cats = {};
        all.forEach(c => { cats[c.category] = (cats[c.category] || 0) + 1; });
        return cats;
    }
    function getDeptStats(all) {
        const depts = {};
        all.forEach(c => { if (c.department) depts[c.department] = (depts[c.department] || 0) + 1; });
        return depts;
    }
    function getLocationStats(all) {
        const locs = {};
        all.forEach(c => { if (c.location) locs[c.location] = (locs[c.location] || 0) + 1; });
        return locs;
    }
    function getTrendData(all) {
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date(); d.setDate(d.getDate() - i);
            const key = d.toISOString().split('T')[0];
            const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short' });
            days.push({ label: dayLabel, count: all.filter(c => c.createdAt.startsWith(key)).length });
        }
        return days;
    }

    /* --- Comments --- */
    function getComments() { return get(KEYS.comments) || []; }
    function addComment(complaintId, author, text) {
        const comments = getComments();
        comments.push({ id: 'CMT-' + Date.now(), complaintId, author, text, createdAt: new Date().toISOString() });
        set(KEYS.comments, comments);
    }
    function getCommentsByComplaint(complaintId) { return getComments().filter(c => c.complaintId === complaintId); }

    /* --- Notifications --- */
    function getNotifications(userId) { return (get(KEYS.notifications) || []).filter(n => n.userId === userId); }
    function addNotification(userId, message, type) {
        const notifs = get(KEYS.notifications) || [];
        notifs.unshift({ id: 'NOT-' + Date.now(), userId, message, type, read: false, createdAt: new Date().toISOString() });
        set(KEYS.notifications, notifs);
    }

    /* --- Seed Data --- */
    function seed() {
        if (get(KEYS.complaints) && get(KEYS.complaints).length > 0) return;
        const sampleUser = { id: 'USR-DEMO', name: 'Ravi Kumar', rollNumber: '21BCE7890', department: 'CSE', email: 'ravi@student.vignan.ac.in', password: 'student123', role: 'student', createdAt: '2026-01-15T10:00:00.000Z' };
        const users = getUsers();
        if (!users.find(u => u.email === sampleUser.email)) { users.push(sampleUser); saveUsers(users); }

        const sampleComplaints = [
            { id: 'CMP-2026-0001', userId: 'USR-DEMO', userName: 'Ravi Kumar', department: 'CSE', title: 'Water Leaking in Hostel Bathroom', description: 'There is continuous water leaking from the tap in hostel Block B, room 204 bathroom. The floor is always wet and slippery, causing safety concerns.', category: 'Water Issue', location: 'Hostel Block B - Room 204', priority: 'High', status: 'In Progress', image: null, assignedTo: 'Maintenance Team A', createdAt: '2026-03-08T09:30:00.000Z', updatedAt: '2026-03-09T14:00:00.000Z', statusHistory: [{status:'Pending',date:'2026-03-08T09:30:00.000Z',by:'System'},{status:'In Progress',date:'2026-03-09T14:00:00.000Z',by:'Admin',comment:'Maintenance team dispatched'}] },
            { id: 'CMP-2026-0002', userId: 'USR-DEMO', userName: 'Ravi Kumar', department: 'CSE', title: 'Electrical Spark in Lab 3 Plug Point', description: 'There is a dangerous electrical spark coming from the plug point near workstation 12 in Computer Lab 3. Immediate attention required before someone gets hurt.', category: 'Electrical', location: 'Lab 3 - Workstation 12', priority: 'High', status: 'Pending', image: null, assignedTo: null, createdAt: '2026-03-09T11:00:00.000Z', updatedAt: '2026-03-09T11:00:00.000Z', statusHistory: [{status:'Pending',date:'2026-03-09T11:00:00.000Z',by:'System'}] },
            { id: 'CMP-2026-0003', userId: 'USR-DEMO', userName: 'Ravi Kumar', department: 'CSE', title: 'Broken Window in Classroom C-201', description: 'The window glass in classroom C-201 is broken. Wind and rain enter the classroom during bad weather, disrupting classes.', category: 'Infrastructure', location: 'Block C - Room 201', priority: 'Medium', status: 'Resolved', image: null, assignedTo: 'Civil Works Team', createdAt: '2026-03-05T08:15:00.000Z', updatedAt: '2026-03-07T16:30:00.000Z', statusHistory: [{status:'Pending',date:'2026-03-05T08:15:00.000Z',by:'System'},{status:'In Progress',date:'2026-03-06T10:00:00.000Z',by:'Admin',comment:'Civil team assigned'},{status:'Resolved',date:'2026-03-07T16:30:00.000Z',by:'Admin',comment:'Window replaced successfully'}] },
            { id: 'CMP-2026-0004', userId: 'USR-DEMO', userName: 'Ravi Kumar', department: 'CSE', title: 'Dirty Washrooms in Block A', description: 'The washrooms on the 2nd floor of Block A are extremely dirty and unhygienic. They haven\'t been cleaned for several days.', category: 'Cleanliness', location: 'Block A - 2nd Floor', priority: 'Medium', status: 'Pending', image: null, assignedTo: null, createdAt: '2026-03-10T06:00:00.000Z', updatedAt: '2026-03-10T06:00:00.000Z', statusHistory: [{status:'Pending',date:'2026-03-10T06:00:00.000Z',by:'System'}] },
            { id: 'CMP-2026-0005', userId: 'USR-DEMO', userName: 'Ravi Kumar', department: 'CSE', title: 'Fan Not Working in Classroom B-105', description: 'Two ceiling fans in classroom B-105 are not working. Students are finding it very uncomfortable especially during afternoon sessions.', category: 'Electrical', location: 'Block B - Room 105', priority: 'Low', status: 'Resolved', image: null, assignedTo: 'Electrician - Suresh', createdAt: '2026-03-01T07:45:00.000Z', updatedAt: '2026-03-03T12:00:00.000Z', statusHistory: [{status:'Pending',date:'2026-03-01T07:45:00.000Z',by:'System'},{status:'In Progress',date:'2026-03-02T09:00:00.000Z',by:'Admin'},{status:'Resolved',date:'2026-03-03T12:00:00.000Z',by:'Admin',comment:'Fans repaired and working'}] },
            { id: 'CMP-2026-0006', userId: 'USR-DEMO', userName: 'Ravi Kumar', department: 'CSE', title: 'Damaged Lab Equipment in Physics Lab', description: 'Several oscilloscopes and multimeters in the Physics Lab are damaged and not giving accurate readings. Students cannot perform experiments properly.', category: 'Equipment', location: 'Physics Lab', priority: 'Medium', status: 'In Progress', image: null, assignedTo: 'Lab Technician', createdAt: '2026-03-07T13:20:00.000Z', updatedAt: '2026-03-09T10:00:00.000Z', statusHistory: [{status:'Pending',date:'2026-03-07T13:20:00.000Z',by:'System'},{status:'In Progress',date:'2026-03-09T10:00:00.000Z',by:'Admin',comment:'Replacement equipment ordered'}] },
            { id: 'CMP-2026-0007', userId: 'USR-DEMO', userName: 'Ravi Kumar', department: 'CSE', title: 'Security Concern Near Back Gate', description: 'The street light near the back gate is not working for the past week. Students feel unsafe walking through that area at night.', category: 'Security', location: 'Back Gate Area', priority: 'High', status: 'Pending', image: null, assignedTo: null, createdAt: '2026-03-10T08:00:00.000Z', updatedAt: '2026-03-10T08:00:00.000Z', statusHistory: [{status:'Pending',date:'2026-03-10T08:00:00.000Z',by:'System'}] }
        ];
        set(KEYS.counter, 7);
        saveComplaints(sampleComplaints);
        addComment('CMP-2026-0001', 'Admin', 'Maintenance team has been dispatched to inspect the issue.');
        addComment('CMP-2026-0003', 'Admin', 'Civil works team has replaced the broken window glass.');
        addComment('CMP-2026-0003', 'Admin', 'Issue verified and resolved. Closing complaint.');
    }

    return { getUsers, registerUser, loginUser, loginAdmin, getSession, logout, getComplaints, createComplaint, getComplaintById, getComplaintsByUser, updateComplaintStatus, assignStaff, filterComplaints, getStats, getCommentsByComplaint, addComment, getNotifications, seed, findUserByEmail };
})();

// Initialize seed data
DataStore.seed();
