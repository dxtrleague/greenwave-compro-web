
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const siteContentPath = path.join(__dirname, '../src/data/site-content.json');
const tmpImpactPath = path.join(__dirname, '../tmp_impact.json');
const tmpProgramPath = path.join(__dirname, '../tmp_program.json');
const tmpProductPath = path.join(__dirname, '../tmp_product.json');
const tmpCollaborationPath = path.join(__dirname, '../tmp_collaboration.json');

const siteContent = JSON.parse(fs.readFileSync(siteContentPath, 'utf8'));

function readJsonFile(p) {
    if (!fs.existsSync(p)) return [];
    const content = fs.readFileSync(p, 'utf8').trim();
    if (!content) return [];
    try {
        return JSON.parse(content);
    } catch (e) {
        return [];
    }
}

const dbImpact = readJsonFile(tmpImpactPath);
const dbProgram = readJsonFile(tmpProgramPath);
const dbProduct = readJsonFile(tmpProductPath);
const dbCollaboration = readJsonFile(tmpCollaborationPath);

function generateId() {
    return crypto.randomUUID();
}

// 1. Audit & Reconciliation: Impact Metrics
// Prioritize DB. If something in site-content is clearly the same as DB, discard site-content version.
const finalImpact = [...dbImpact];
siteContent.impactMetrics.forEach(m => {
    const isDuplicate = dbImpact.some(dbm =>
        (dbm.title.toLowerCase().includes("pohon") && m.title.toLowerCase().includes("pohon")) ||
        dbm.title.trim().toLowerCase() === m.title.trim().toLowerCase()
    );
    if (!isDuplicate) {
        finalImpact.push({
            id: generateId(),
            title: m.title,
            value: m.value,
            iconName: m.iconName,
            isActive: 1,
            createdAt: Date.now(),
            updatedAt: Date.now()
        });
    }
});

// 2. Reconciliation: Programs (DB is empty, take all from site-content)
const finalPrograms = [...dbProgram];
siteContent.programs.forEach(p => {
    const exists = dbProgram.find(dbp => dbp.title === p.title);
    if (!exists) {
        finalPrograms.push({
            id: generateId(),
            title: p.title,
            description: p.description,
            iconName: p.iconName,
            isActive: 1,
            createdAt: Date.now(),
            updatedAt: Date.now()
        });
    }
});

// 3. Reconciliation: Products (DB is empty, take all from site-content)
const finalProducts = [...dbProduct];
siteContent.products.forEach(p => {
    const exists = dbProduct.find(dbp => dbp.name === p.name);
    if (!exists) {
        finalProducts.push({
            id: generateId(),
            name: p.name,
            category: p.category,
            description: p.description,
            price: p.price,
            imageUrl: p.imageUrl,
            inStock: 1,
            createdAt: Date.now(),
            updatedAt: Date.now()
        });
    }
});

// 4. Reconciliation: Collaborations (DB is only source)
const finalCollaborations = [...dbCollaboration];

const result = {
    exportedAt: new Date().toISOString(),
    impactMetrics: finalImpact,
    programs: finalPrograms,
    products: finalProducts,
    collaborations: finalCollaborations
};

const outputPath = path.join(__dirname, '../src/data/production-data.json');
fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));

console.log('--- DATA AUDIT & RECONCILIATION REPORT ---');
console.log(`- Impact Metrics: ${finalImpact.length} total (${dbImpact.length} from DB, ${finalImpact.length - dbImpact.length} from site-content)`);
console.log(`- Programs: ${finalPrograms.length} total (${dbProgram.length} from DB, ${finalPrograms.length - dbProgram.length} from site-content)`);
console.log(`- Products: ${finalProducts.length} total (${dbProduct.length} from DB, ${finalProducts.length - dbProduct.length} from site-content)`);
console.log(`- Collaborations: ${finalCollaborations.length} total (${dbCollaboration.length} from DB)`);
console.log(`\nResult saved to: ${outputPath}`);
