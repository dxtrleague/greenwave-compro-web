
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Fetching data from SQLite...');

        const impactMetrics = await prisma.impactMetric.findMany();
        const programs = await prisma.program.findMany();
        const products = await prisma.product.findMany();
        const collaborations = await prisma.collaboration.findMany();

        const data = {
            impactMetrics,
            programs,
            products,
            collaborations,
            exportedAt: new Date().toISOString()
        };

        const outputPath = path.join(process.cwd(), 'src/data/database_export.json');

        // Ensure directory exists
        const dir = path.dirname(outputPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

        console.log(`Success! Data exported to ${outputPath}`);
        console.log(`- ImpactMetrics: ${impactMetrics.length}`);
        console.log(`- Programs: ${programs.length}`);
        console.log(`- Products: ${products.length}`);
        console.log(`- Collaborations: ${collaborations.length}`);

    } catch (error) {
        console.error('Error extracting data:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
