/* ===== AI ENGINE – Auto Categorization, Priority Detection, Sentiment ===== */
const AIEngine = (() => {
    const categoryKeywords = {
        'Water Issue': ['water', 'leak', 'leaking', 'pipe', 'plumbing', 'tap', 'drainage', 'drain', 'flood', 'seepage', 'waterlogging', 'shower', 'toilet flush', 'overflow', 'wet floor', 'dripping'],
        'Electrical': ['electric', 'electrical', 'spark', 'wire', 'wiring', 'fan', 'light', 'bulb', 'switch', 'socket', 'plug', 'power', 'outage', 'short circuit', 'voltage', 'fuse', 'ac', 'air conditioner', 'heater', 'generator', 'inverter', 'mcb', 'flickering'],
        'Infrastructure': ['wall', 'window', 'door', 'floor', 'ceiling', 'roof', 'crack', 'broken', 'damage', 'paint', 'tile', 'staircase', 'railing', 'gate', 'bench', 'desk', 'chair', 'construction', 'collapse', 'plaster', 'pillar'],
        'Cleanliness': ['dirty', 'clean', 'garbage', 'waste', 'trash', 'dustbin', 'hygiene', 'unhygienic', 'smell', 'stink', 'sweeping', 'mopping', 'washroom', 'toilet', 'bathroom', 'urinal', 'pest', 'cockroach', 'rat', 'mosquito', 'insect'],
        'Equipment': ['equipment', 'projector', 'computer', 'pc', 'printer', 'lab', 'machine', 'instrument', 'oscilloscope', 'multimeter', 'apparatus', 'microscope', 'broken equipment', 'not working', 'malfunction', 'monitor', 'keyboard', 'mouse', 'speaker', 'mic'],
        'Security': ['security', 'theft', 'steal', 'stolen', 'cctv', 'camera', 'guard', 'unsafe', 'intruder', 'lock', 'key', 'break-in', 'stranger', 'harassment', 'fight', 'ragging', 'bully', 'dark area', 'street light', 'night safety'],
        'Internet/WiFi': ['wifi', 'internet', 'network', 'connectivity', 'slow internet', 'no signal', 'router', 'lan', 'broadband', 'server down', 'website', 'portal'],
        'Furniture': ['furniture', 'chair', 'table', 'desk', 'bench', 'cupboard', 'locker', 'shelf', 'whiteboard', 'blackboard', 'podium', 'seating']
    };

    const highPriorityKeywords = ['emergency', 'urgent', 'danger', 'dangerous', 'fire', 'spark', 'electric shock', 'short circuit', 'collapse', 'falling', 'injury', 'accident', 'flood', 'gas leak', 'smoke', 'critical', 'immediate', 'life threatening', 'hazard', 'toxic', 'electrocution', 'explosion'];
    const mediumPriorityKeywords = ['broken', 'damage', 'not working', 'malfunction', 'leaking', 'dirty', 'unhygienic', 'crack', 'faulty', 'noisy', 'defective', 'stuck', 'jammed', 'blocked', 'overflow', 'stink', 'smell'];
    const lowPriorityKeywords = ['minor', 'small', 'cosmetic', 'paint', 'scratch', 'old', 'worn', 'faded', 'slow', 'inconvenient', 'suggestion', 'improvement', 'request', 'polish'];

    const highPriorityCategories = ['Electrical', 'Security'];
    const mediumPriorityCategories = ['Water Issue', 'Infrastructure', 'Equipment'];

    function analyzeCategory(text) {
        const lower = text.toLowerCase();
        const scores = {};
        let maxScore = 0;
        let bestCategory = 'Other';

        for (const [category, keywords] of Object.entries(categoryKeywords)) {
            let score = 0;
            keywords.forEach(kw => {
                if (lower.includes(kw)) {
                    score += kw.split(' ').length > 1 ? 3 : 1; // Multi-word matches score higher
                }
            });
            scores[category] = score;
            if (score > maxScore) {
                maxScore = score;
                bestCategory = category;
            }
        }

        const total = Object.values(scores).reduce((a, b) => a + b, 0);
        const confidence = total > 0 ? Math.min(Math.round((maxScore / total) * 100), 98) : 0;

        return {
            category: maxScore > 0 ? bestCategory : 'Other',
            confidence: maxScore > 0 ? Math.max(confidence, 45) : 0,
            scores
        };
    }

    function analyzePriority(text, category) {
        const lower = text.toLowerCase();
        let score = 0;

        // Keyword scoring
        highPriorityKeywords.forEach(kw => { if (lower.includes(kw)) score += 3; });
        mediumPriorityKeywords.forEach(kw => { if (lower.includes(kw)) score += 1; });
        lowPriorityKeywords.forEach(kw => { if (lower.includes(kw)) score -= 1; });

        // Category boost
        if (highPriorityCategories.includes(category)) score += 2;
        else if (mediumPriorityCategories.includes(category)) score += 1;

        // Exclamation/caps urgency
        if (text.includes('!!') || text.includes('URGENT') || text.includes('EMERGENCY')) score += 3;
        const capsRatio = (text.match(/[A-Z]/g) || []).length / text.length;
        if (capsRatio > 0.4 && text.length > 20) score += 1;

        let priority, confidence;
        if (score >= 5) { priority = 'High'; confidence = Math.min(85 + score, 98); }
        else if (score >= 2) { priority = 'Medium'; confidence = 65 + score * 3; }
        else { priority = 'Low'; confidence = 55 + Math.abs(score) * 2; }

        return { priority, confidence: Math.min(confidence, 98), score };
    }

    function analyzeSentiment(text) {
        const lower = text.toLowerCase();
        const negative = ['problem', 'issue', 'broken', 'damage', 'fail', 'bad', 'worst', 'terrible', 'horrible', 'disgusting', 'pathetic', 'useless', 'waste', 'frustrat', 'annoy', 'disappoint'];
        const urgent = ['please', 'help', 'asap', 'immediately', 'soon', 'quickly', 'fast', 'hurry'];
        let negScore = 0, urgScore = 0;
        negative.forEach(w => { if (lower.includes(w)) negScore++; });
        urgent.forEach(w => { if (lower.includes(w)) urgScore++; });
        const severity = negScore >= 3 ? 'Critical' : negScore >= 1 ? 'Moderate' : 'Mild';
        const urgency = urgScore >= 2 ? 'Urgent' : urgScore >= 1 ? 'Normal' : 'Low';
        return { severity, urgency, negScore, urgScore };
    }

    function fullAnalysis(title, description) {
        const combinedText = title + ' ' + description;
        const categoryResult = analyzeCategory(combinedText);
        const priorityResult = analyzePriority(combinedText, categoryResult.category);
        const sentimentResult = analyzeSentiment(combinedText);
        return { category: categoryResult, priority: priorityResult, sentiment: sentimentResult };
    }

    return { analyzeCategory, analyzePriority, analyzeSentiment, fullAnalysis };
})();
