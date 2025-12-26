// src/seed/sorular.seed.ts

import { INestApplicationContext } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Soru } from 'src/sorular/entities/sorular.entity';

const SORULAR: string[] = [
  'Genel iletişim becerisi: Fikirlerini açık ve etkili şekilde ifade eder, dinleme becerisi yüksektir ve yapıcı geri bildirim verir.',
  'Sorumluluk sahibi: Üzerine düşen görevleri zamanında ve eksiksiz yerine getirir, güven verir.',
  'Esneklik ve değişime açıklık: Değişen koşullara hızlı uyum sağlar ve çözüm üretir.',
  'Kurum kültürüne uyum: Kurumun değerlerine, prosedürlerine ve etik ilkelerine uygun davranır.',
  'Muhakeme kabiliyeti: Mantıklı ve doğru kararlar alır, olağan dışı durumlarda sağduyulu davranır.',
  'Bilgi ve deneyim: Görev alanına ilişkin bilgi ve deneyimi yeterlidir.',
  'Problem çözme: Karşılaşılan sorunları analiz eder ve etkili çözümler üretir.',
  'Planlama: İşlerini planlı ve organize bir şekilde yürütür.',
  'Detaycılık: Detaylara dikkat eder, hatasız çalışmaya özen gösterir.',
  'Sonuç odaklılık: Belirlenen hedeflere ulaşmak için kararlı ve sonuç odaklı çalışır.',
  'İnisiyatif alma: Gerekli durumlarda yönlendirme beklemeden sorumluluk alır.',
  'Girişkenlik: Yeni fikirler üretir ve bunları hayata geçirmek için çaba gösterir.',
  'Müzakere becerisi: Farklı görüşleri dikkate alır ve uzlaşmacı çözümler sunar.',
  'Sunum kabiliyeti: Bilgi ve fikirlerini açık, anlaşılır ve etkileyici biçimde sunar.',
  'Analitik beceri: Verileri analiz eder, neden–sonuç ilişkisi kurar.',
  'Yenilikçilik: Süreçleri geliştirecek yenilikçi fikirler ortaya koyar.',
  'Kendini geliştirme: Kişisel ve mesleki gelişimine önem verir.',
  'Hizmet odaklılık: İç ve dış paydaşların ihtiyaçlarını gözetir.',
  'İşi delege etme: Görev dağılımını dengeli yapar ve ekibini destekler.',
  'Diğer: Değerlendiricinin eklemek istediği diğer gözlem ve değerlendirmeler.',
];

export async function seedSorular(app: INestApplicationContext) {
  const dataSource = app.get(DataSource);
  const soruRepo = dataSource.getRepository(Soru);

  console.log('Sorular seed başlıyor...');

  for (const soruMetni of SORULAR) {
    const exists = await soruRepo.findOne({
      where: { soru_metni: soruMetni },
    });

    if (exists) {
      console.log('!-> Soru zaten var');
    } else {
      const soru = soruRepo.create({ soru_metni: soruMetni });
      await soruRepo.save(soru);
      console.log('-> Soru eklendi');
    }
  }

  console.log('Sorular seed tamamlandı...');
}
