import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding ResQHub...');

  // Localities
  const localities = [
    { name: 'Rana Town', lat: 31.56, lng: 74.31 },
    { name: 'Parkview', lat: 31.49, lng: 74.34 },
    { name: 'Manga Mandi', lat: 31.45, lng: 74.43 },
    { name: 'Shahdara', lat: 31.62, lng: 74.29 },
    { name: 'Ravi Bridge Area', lat: 31.58, lng: 74.33 }
  ];
  for (const l of localities) {
    await prisma.locality.upsert({
      where: { name: l.name },
      update: {},
      create: l
    });
  }

  // Users
  const users = [
    { email: 'admin@resqhub.pk', name: 'Admin User', role: 'ADMIN', password: 'admin123' },
    { email: 'citizen@resqhub.pk', name: 'Ali Raza', role: 'CITIZEN', password: 'citizen123', locality: 'Rana Town' },
    { email: 'volunteer@resqhub.pk', name: 'Sara Khan', role: 'VOLUNTEER', password: 'volunteer123', locality: 'Parkview' },
    { email: 'ngo@resqhub.pk', name: 'Red Crescent Coordinator', role: 'NGO', password: 'ngo123', organization: 'Pakistan Red Crescent' }
  ];
  for (const u of users) {
    const hash = await bcrypt.hash(u.password, 10);
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: { ...u, password: hash }
    });
  }

  // Organizations
  const orgs = [
    { name: 'Pakistan Red Crescent', focus: 'Food & Medical', areas: 'Rana Town, Parkview', verified: true },
    { name: 'Edhi Foundation', focus: 'Shelter & Medical', areas: 'Manga Mandi, Shahdara', verified: true },
    { name: 'Al-Khidmat Foundation', focus: 'Food & Shelter', areas: 'Rana Town, Ravi Bridge', verified: false }
  ];
  for (const o of orgs) {
    await prisma.organization.upsert({ where: { name: o.name }, update: {}, create: o });
  }

  // Alerts
  const alerts = [
    { title: 'Flood Alert — Ravi Belt, Lahore', description: 'Water level rising in Ravi belt. Residents of low-lying areas advised to relocate.', disasterType: 'Flood', severity: 'HIGH', locality: 'Rana Town', source: 'DEMO — PDMA Punjab', status: 'ACTIVE' },
    { title: 'Heavy Rainfall Warning', description: 'Heavy rainfall expected in next 24 hours. Avoid unnecessary travel.', disasterType: 'Heavy Rainfall', severity: 'MEDIUM', locality: 'Parkview', source: 'DEMO — PMD', status: 'ACTIVE' },
    { title: 'Evacuation Advisory — Manga Mandi', description: 'Evacuation advisory issued for households within 500m of the river bank.', disasterType: 'Flood', severity: 'HIGH', locality: 'Manga Mandi', source: 'DEMO — District Administration Lahore', status: 'ACTIVE' }
  ];
  for (const a of alerts) {
    await prisma.alert.create({ data: a }).catch(() => {});
  }

  // Community Reports
  const citizen = await prisma.user.findUnique({ where: { email: 'citizen@resqhub.pk' } });
  const reports = [
    { userId: citizen?.id, locality: 'Rana Town', incidentType: 'Flood', description: 'Water entered homes. 15 families need shelter.', affectedPeople: 90, affectedHouseholds: 15, needs: 'Food,Clean Water,Shelter', lat: 31.56, lng: 74.31, status: 'VERIFIED', source: 'CITIZEN', verifiedBy: 'Admin' },
    { locality: 'Parkview', incidentType: 'Flood', description: 'Rising water levels near the river bridge.', affectedPeople: 45, affectedHouseholds: 8, needs: 'Food,Medical Aid', lat: 31.49, lng: 74.34, status: 'VERIFIED', source: 'VOLUNTEER', verifiedBy: 'Admin' },
    { locality: 'Manga Mandi', incidentType: 'Flood', description: 'Heavy flooding reported. Rescue needed for elderly.', affectedPeople: 120, affectedHouseholds: 22, needs: 'Shelter,Medical Aid,Rescue', lat: 31.45, lng: 74.43, status: 'PENDING', source: 'CITIZEN' }
  ];
  for (const r of reports) {
    await prisma.communityReport.create({ data: r }).catch(() => {});
  }

  // Aid Commitments
  const ngo = await prisma.user.findUnique({ where: { email: 'ngo@resqhub.pk' } });
  await prisma.aidCommitment.create({ data: {
    organization: 'Pakistan Red Crescent', userId: ngo?.id, locality: 'Rana Town',
    category: 'Food', quantity: '500 meals', status: 'COMMITTED'
  }}).catch(() => {});

  console.log('✅ Seed complete');
}

main().finally(() => prisma.$disconnect());
