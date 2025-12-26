import { INestApplicationContext } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { join } from 'node:path';

import { PersonelRepository } from '../personel/repository/personel.repository';
import { DepartmanRepository } from '../departman/repository/departman.repository';
import { RoleRepository } from '../role/repository/role.repository';

function get(row: any, key: string) {
  const found = Object.keys(row).find(
    (k) => k.trim().toLowerCase() === key.toLowerCase(),
  );
  return found ? String(row[found]).trim() : '';
}


export async function seedPersoneller(app: INestApplicationContext) {
    console.log('Personel seed başlıyor...');

    const personelRepo = app.get(PersonelRepository);
    const departmanRepo = app.get(DepartmanRepository);
    const roleRepo = app.get(RoleRepository);

    const filePath = join(process.cwd(), 'src/seed/personel.xlsx');
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows: any[] = XLSX.utils.sheet_to_json(sheet);

    let inserted = 0;
    let skipped = 0;

    for (const row of rows) {
        const sicilNo = get(row, 'sicil no');
        const name = get(row, 'adı soyadı');
        const departmanAdi = get(row, 'bölümü');
        const rolAdi = get(row, 'görev');


        if (!sicilNo || !name) {
            skipped++;
            continue;
        }

        const existing = await personelRepo.findBySicilNo(sicilNo);
        if (existing) {
            skipped++;
            continue;
        }

        const departman = await departmanRepo.findByName(departmanAdi);
        if (!departman) {
            console.warn(`!-> Departman bulunamadı: ${departmanAdi}`);
            skipped++;
            continue;
        }

        const role = await roleRepo.findByName(rolAdi);
        if (!role) {
            console.warn(`!-> Rol bulunamadı: ${rolAdi}`);
            skipped++;
            continue;
        }

        await personelRepo.create({
            sicil_no: sicilNo,
            name,
            dept_id: departman.dept_id,
            role_id: role.role_id,
        });

        inserted++;
    }

    console.log(`Personel seed tamamlandı...`);
    console.log(`-> Eklenen: ${inserted}`);
    console.log(`-> Atlanan: ${skipped}`);
}
