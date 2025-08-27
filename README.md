# Paclitaxel Doz Hesaplayıcı

Akciğer kanseri araştırmaları ve klinik karar desteği için geliştirilmiş profesyonel web tabanlı optimal paclitaxel doz hesaplama aracı. Gelişmiş makine öğrenmesi teknolojileri ile desteklenmektedir.

## 🚀 Canlı Uygulama



## 🔬 Model Geliştirme ve Araştırma

### Gelişmiş Makine Öğrenmesi Pipeline'ı
Bu proje sofistike 5 aşamalı makine öğrenmesi yaklaşımı kullanır:

- **16 mühendislik özelliği** temel doz-canlılık verisinden türetildi
- **6 algoritma karşılaştırması** (Lineer, Random Forest, XGBoost, Gradient Boosting, Neural Network, Ensemble)
- **Hiperparametre optimizasyonu** RandomizedSearchCV kullanarak
- **Çapraz doğrulama** güvenilir performans tahmini için
- **Final Model Performansı: R² = 0.52+** (baseline üzerinde %15+ iyileşme)

### Bilimsel Tekrarlanabilirlik
```bash
# Repository'yi klonlayın
git clone https://github.com/nisa439/paclitaxel-dose-calculator.git
cd paclitaxel-dose-calculator

# Bağımlılıkları yükleyin
pip install -r model-development/requirements.txt

# 5 aşamalı analiz pipeline'ını çalıştırın
jupyter notebook model-development/notebooks/
```

### 5 Aşamalı ML Geliştirme Süreci

| Aşama | Notebook | Açıklama |
|-------|----------|----------|
| 1 | `01_data_loading_eda.ipynb` | Veri yükleme, kalite değerlendirmesi, keşifsel analiz |
| 2 | `02_feature_engineering.ipynb` | Doz/hücre hattı verisinden 16 gelişmiş özellik |
| 3 | `03_model_training.ipynb` | Çapraz doğrulama ile 6 algoritma karşılaştırması |
| 4 | `04_model_improvement.ipynb` | Hiperparametre optimizasyonu ve ensemble yöntemleri |
| 5 | `05_model_export.ipynb` | Web uygulaması için IC50 ve optimal doz hesaplama |

## 📊 Proje Yapısı

```
paclitaxel-dose-calculator/
├── web-app/                    # Canlı web uygulaması
│   ├── index.html
│   ├── assets/
│   │   ├── css/style.css
│   │   ├── js/app.js
│   │   └── data/paclitaxel_web_data.json
│   └── images/
│
├── model-development/          # ML araştırma ve geliştirme
│   ├── notebooks/              # Jupyter notebook'ları (5 aşama)
│   │   ├── 01_data_loading_eda.ipynb
│   │   ├── 02_feature_engineering.ipynb
│   │   ├── 03_model_training.ipynb
│   │   ├── 04_model_improvement.ipynb
│   │   └── 05_model_export.ipynb
│   ├── src/                    # Python modülleri
│   ├── data/                   # Ham ve işlenmiş veri
│   │   ├── raw/                # Orijinal Excel dosyası
│   │   └── processed/          # İşlenmiş CSV ve JSON dosyaları
│   ├── models/                 # Eğitilmiş modeller
│   └── requirements.txt        # Python bağımlılıkları
│
├── docs/                       # Dokümantasyon
└── README.md                   # Bu dosya
```

## ✨ Özellikler

### Web Uygulaması
- **390 Hücre Hattı Veritabanı**: Doğrulanmış akciğer kanseri hücre hatları
- **Optimal Doz Hesaplama**: %50-%90 etkililik seviyeler için optimal dozlar
- **IC50 Belirleme**: İlaç duyarlılık değerlendirmesi için IC50 değerleri
- **İnteraktif Görselleştirme**: Chart.js ile doz-yanıt eğrileri
- **Export Fonksiyonu**: Sonuçları CSV dosyası olarak indirme
- **Responsive Tasarım**: Masaüstü ve mobil cihazlarda sorunsuz çalışma

### Model Performansı
- **Algoritma**: Gelişmiş Ensemble Regressor
- **R² Skoru**: 0.52+ (güçlü tahmin gücü)
- **Eğitim Örnekleri**: 3.291
- **Test Örnekleri**: 823
- **Toplam Veri**: 4.114 doz-yanıt ölçümü
- **Çapraz Doğrulama**: 5-katlı CV (Ortalama: 0.52, Standart Sapma: 0.02)

### Özellik Önemi
- **Log Doz**: %45.2
- **Hücre Hattı Kodlaması**: %28.7
- **Doz-Hücre İnteraksiyon**: %12.3
- **Hücre Duyarlılığı**: %8.1
- **Diğer Özellikler**: %5.7

## 🛠️ Kullanım

### Web Uygulaması
1. **Hücre Hattı Seçin**: 390 mevcut akciğer kanseri hücre hattından birini seçin
2. **Hedef Etkililik Ayarlayın**: Kaydırıcı ile istenen etkililik seviyesini (%50-%90) seçin
3. **Hesapla**: "Optimal Doz Hesapla" butonuna tıklayın
4. **Sonuçları Görüntüleyin**: Optimal doz, IC50 ve güven aralıklarını inceleyin
5. **Görselleştirin**: İnteraktif doz-yanıt eğrisi otomatik olarak oluşur
6. **Export**: Sonuçları CSV olarak indirin

### Model Geliştirme
```bash
# Notebook'ları sırayla çalıştırın:
jupyter notebook model-development/notebooks/01_data_loading_eda.ipynb
jupyter notebook model-development/notebooks/02_feature_engineering.ipynb
jupyter notebook model-development/notebooks/03_model_training.ipynb
jupyter notebook model-development/notebooks/04_model_improvement.ipynb
jupyter notebook model-development/notebooks/05_model_export.ipynb
```

## 📈 Örnek Sonuçlar

| Hücre Hattı | IC50 (µM) | Optimal Doz %80 (µM) | Duyarlılık |
|-------------|-----------|---------------------|------------|
| ACH-000399  | 0.009069  | 0.002974           | Yüksek     |
| ACH-002145  | 0.036613  | 0.012003           | Yüksek     |
| ACH-000081  | 0.075646  | 0.024798           | Orta       |

## 🔍 Metodoloji

### Veri İşleme
- **Log dönüşümü** doz değerleri için
- **Hücre hattı kodlaması** kategorik veriler için
- **Özellik mühendisliği** 16 gelişmiş özellik türetme
- **Çapraz doğrulama** güvenilir performans değerlendirmesi için

### Model Eğitimi
- **Baseline karşılaştırması** basit özelliklerle
- **Çoklu algoritma testi** 6 farklı model
- **Hiperparametre optimizasyonu** en iyi parametreler için
- **Ensemble yöntemleri** model güvenilirliği artırma

## 🎯 Uygulama Alanları

### Kişiselleştirilmiş Tıp
- Hücre hattına özgü doz önerileri
- Güvenlik odaklı dozaj (toksisite azaltma, etkililik korunması)
- Tedavi yanıt tahmini

### Araştırma Desteği
- Preklinik çalışmalar için standartlaştırılmış araç
- Doz-yanıt ilişki modellemesi
- İlaç etkililik karşılaştırması

## ⚠️ Önemli Uyarı

Bu araç yalnızca **araştırma ve eğitim amaçlı** tasarlanmıştır. Profesyonel tıbbi tavsiye, tanı veya tedavinin yerine geçmez. Tıbbi kararlar için mutlaka kalifiye sağlık uzmanlarına danışın.

## 🤝 Katkıda Bulunma

Katkılarınızı memnuniyetle karşılıyoruz! Lütfen issues, özellik istekleri veya pull request'ler göndermekten çekinmeyin.

### Katkı Süreci
1. Repository'yi fork edin
2. Feature branch oluşturun: `git checkout -b yeni-ozellik`
3. Değişikliklerinizi yapın
4. Commit edin: `git commit -m "Yeni özellik eklendi"`
5. Push edin: `git push origin yeni-ozellik`
6. Pull request gönderin

## 📄 Lisans

Bu proje MIT Lisansı altında lisanslanmıştır - detaylar için LICENSE dosyasına bakın.

## 🙏 Teşekkürler

- Akciğer kanseri hücre hattı deneyleri veri seti
- Scikit-learn kullanarak geliştirilen makine öğrenmesi modeli
- Bootstrap 5'ten UI bileşenleri
- Chart.js ile desteklenen grafikler

## 📞 İletişim

- **GitHub**: [@nisa439](https://github.com/nisa439)
- **Proje Issues**: [GitHub Issues](https://github.com/nisa439/paclitaxel-dose-calculator/issues)

## 📝 Sürüm Geçmişi

- **v2.0.0** (2025-01-18): Gelişmiş ML pipeline ve 5-aşamalı model geliştirme süreci
  - 16 özellik mühendisliği
  - 6 algoritma karşılaştırması
  - Hiperparametre optimizasyonu
  - Ensemble yöntemleri
  - %15+ performans artışı

- **v1.0.0** (2025-01-18): İlk sürüm
  - 390 hücre hattı veritabanı
  - Optimal doz hesaplama
  - İnteraktif görselleştirme
  - Export fonksiyonalitesi

---

Akciğer kanseri araştırmalarının ilerlemesi için ❤️ ile yapıldı
