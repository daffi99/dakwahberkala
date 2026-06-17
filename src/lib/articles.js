// src/lib/articles.js
// Static article data — frontend-only phase
// Replace with API/DB calls in backend phase

export const articles = [
  {
    "slug": "hukum-maulid-nabi",
    "title": "Hukum Maulid Nabi ﷺ",
    "category": "Fiqih",
    "badge": "Khilafiyah",
    "badgeStyle": "badge--gold",
    "tldr": "Poin pentingnya ada di pengkhususan nya, bukan didalam maulid ada ibadahnya.",
    "coverGradient": "linear-gradient(135deg, #0B4F49 0%, #0F766E 50%, #1a8a81 100%)",
    "coverEmoji": "🌙",
    "cardBg": "#DFF0ED",
    "sources": 5,
    "updatedAt": "Jan 2025",
    "kesimpulan": [
      "Menurut rujukan Rumaysho dan Konsultasi Syariah, perayaan Maulid Nabi ﷺ sebagai ritual ibadah tahunan tidak dibolehkan.",
      "Alasannya: Nabi ﷺ, para sahabat, tabi'in, tabi'ut tabi'in, dan imam empat mazhab tidak dikenal merayakannya.",
      "Mereka menilai Maulid sebagai amalan yang diada-adakan dalam agama, karena mengkhususkan waktu dan bentuk ibadah yang tidak dicontohkan.",
      "Yang disyariatkan adalah mencintai Nabi ﷺ setiap waktu dengan ittiba', shalawat, belajar sirah, dan mengamalkan sunnah beliau."
    ],
    "pendapat": [
      {
        "bar": "haram",
        "school": "Pendapat 1 — Tidak Membolehkan Maulid",
        "view": "Menilai sebagai bid'ah dalam agama",
        "detail": "Rumaysho dan Konsultasi Syariah berpandangan bahwa perayaan Maulid Nabi ﷺ tidak memiliki dasar dari Nabi ﷺ dan para sahabat. Karena itu, menjadikannya sebagai ritual ibadah tahunan dinilai sebagai amalan yang tidak disyariatkan."
      },
      {
        "bar": "khilaf",
        "school": "Pendapat 2 — Ibadahnya Baik, Pengkhususannya Bermasalah",
        "view": "Shalawat, sirah, dan sedekah tetap dianjurkan",
        "detail": "Shalawat kepada Nabi ﷺ, belajar sirah, dan sedekah adalah amalan yang baik. Namun masalahnya ada pada pengkhususan tanggal tertentu, seperti 12 Rabiul Awal, sebagai perayaan ibadah tahunan."
      },
      {
        "bar": "halal",
        "school": "Pendapat 3 — Cinta Nabi Harus dengan Ittiba'",
        "view": "Mencintai Nabi ﷺ bukan hanya dengan acara tahunan",
        "detail": "Cinta kepada Nabi ﷺ ditunjukkan dengan mengikuti sunnah beliau, menaati ajarannya, memperbanyak shalawat, mempelajari sirah, dan menghidupkan sunnah dalam kehidupan sehari-hari."
      }
    ],
    "dalil": [
      {
        "label": "Hadits — Bukhari & Muslim",
        "arabic": "مَنْ أَحْدَثَ فِي أَمْرِنَا هَذَا مَا لَيْسَ مِنْهُ فَهُوَ رَدٌّ",
        "source": "HR. Bukhari dan Muslim · Status: Shahih",
        "terjemahan": "\"Barangsiapa mengada-adakan dalam urusan agama kami ini sesuatu yang bukan darinya, maka amalan itu tertolak.\""
      },
      {
        "label": "Al-Qur'an — QS. Al-Ahzab: 56",
        "arabic": "إِنَّ اللَّهَ وَمَلَائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ ۚ يَا أَيُّهَا الَّذِينَ آمَنُوا صَلُّوا عَلَيْهِ وَسَلِّمُوا تَسْلِيمًا",
        "source": "QS. Al-Ahzab [33]: 56",
        "terjemahan": "\"Sesungguhnya Allah dan para malaikat-Nya bershalawat untuk Nabi. Wahai orang-orang yang beriman, bershalawatlah kalian untuk Nabi dan ucapkanlah salam dengan penuh penghormatan kepadanya.\""
      }
    ],
    "sikapPraktis": [
      "Tidak menjadikan Maulid Nabi ﷺ sebagai ritual ibadah tahunan, jika mengikuti pendapat Rumaysho dan Konsultasi Syariah.",
      "Tetap memperbanyak shalawat kepada Nabi ﷺ kapan saja, tanpa harus menunggu bulan atau tanggal tertentu.",
      "Mempelajari sirah Nabi ﷺ secara rutin agar cinta kepada beliau semakin kuat dan benar.",
      "Menghidupkan sunnah Nabi ﷺ dalam akidah, ibadah, akhlak, keluarga, dan muamalah sehari-hari.",
      "Tidak mencela orang secara berlebihan, tetapi tetap menjelaskan pendapat dengan ilmu dan adab."
    ],
    "sumber": [
      {
        "title": "Sejarah Kelam Maulid Nabi — Bagian 2",
        "author": "Rumaysho · Tidak membolehkan Maulid sebagai perayaan ibadah tahunan"
      },
      {
        "title": "Meskipun Kelam, Maulid Nabi Tetap Ada Pembelaan",
        "author": "Rumaysho · Membahas asal-usul dan pembelaan terhadap Maulid"
      },
      {
        "title": "Pembahasan Maulid Nabi",
        "author": "Konsultasi Syariah · Menilai pengkhususan Maulid sebagai amalan yang tidak dicontohkan"
      },
      {
        "title": "Hadits \"Barangsiapa mengada-adakan dalam urusan agama kami…\"",
        "author": "HR. Bukhari dan Muslim · Dalil umum tentang larangan bid'ah dalam agama"
      },
      {
        "title": "QS. Al-Ahzab [33]: 56",
        "author": "Dalil tentang perintah bershalawat kepada Nabi ﷺ"
      }
    ]
  },
  {
    "slug": "riba-cicilan-kpr",
    "title": "Riba dalam Cicilan KPR/KTA",
    "category": "Fiqih",
    "badge": "Kontroversial",
    "badgeStyle": "badge--red",
    "tldr": "Ulama sepakat riba haram, namun berbeda mendefinisikan apakah bunga bank konvensional termasuk riba. Ada yang melarang mutlak, ada yang membolehkan dalam kondisi darurat tidak ada alternatif syariah.",
    "coverGradient": "linear-gradient(135deg, #7f1d1d 0%, #dc2626 60%, #f87171 100%)",
    "coverEmoji": "💳",
    "cardBg": "#FFE4E4",
    "sources": 11,
    "updatedAt": "Feb 2025",
    "kesimpulan": [
      "Bunga bank konvensional = haram menurut mayoritas ulama kontemporer.",
      "Darurat membolehkan jika benar-benar tidak ada alternatif syariah yang tersedia.",
      "KPR syariah (akad murabahah/musyarakah) adalah alternatif yang diakui.",
      "Keputusan akhir bergantung pada kondisi personal dan ada/tidaknya alternatif."
    ],
    "pendapat": [
      {
        "bar": "haram",
        "school": "Mayoritas Ulama Kontemporer",
        "view": "Bunga bank = riba, haram mutlak",
        "detail": "MUI, Syaikh Yusuf al-Qaradawi (awal), dan mayoritas ulama menyatakan bunga bank adalah riba yang diharamkan Al-Quran tanpa pengecualian."
      },
      {
        "bar": "khilaf",
        "school": "Sebagian Ulama — Darurat",
        "view": "Boleh jika darurat dan tidak ada alternatif",
        "detail": "Jika di suatu daerah tidak ada bank syariah sama sekali dan kebutuhan sangat mendesak (tempat tinggal layak), sebagian ulama membolehkan dengan prinsip darurat."
      },
      {
        "bar": "khilaf",
        "school": "Ulama Mesir Klasik",
        "view": "Bunga bank bukan riba jika untuk produktif",
        "detail": "Pendapat minoritas dari beberapa ulama Azhar lama yang membedakan riba konsumtif dan produktif — namun pendapat ini banyak dikritik."
      }
    ],
    "dalil": [
      {
        "label": "Al-Qur'an — QS. Al-Baqarah: 275",
        "arabic": "وَأَحَلَّ اللَّهُ الْبَيْعَ وَحَرَّمَ الرِّبَا",
        "source": "QS. Al-Baqarah [2]: 275",
        "terjemahan": "\"Allah menghalalkan jual-beli dan mengharamkan riba.\""
      }
    ],
    "sikapPraktis": [
      "Usahakan KPR/pembiayaan melalui bank syariah (akad murabahah atau musyarakah mutanaqisah).",
      "Jika terpaksa konvensional karena tidak ada alternatif: niatkan darurat, cicil sesegera mungkin.",
      "Jangan jadikan \"darurat\" sebagai pembenaran permanen — terus berusaha berpindah ke syariah.",
      "Konsultasikan dengan ulama setempat yang mengetahui kondisi keuanganmu secara spesifik."
    ],
    "sumber": [
      {
        "title": "Fatwa MUI No. 1 Tahun 2004 tentang Bunga",
        "author": "Majelis Ulama Indonesia"
      },
      {
        "title": "Fawa'id al-Bunuk Hiya al-Riba al-Haram",
        "author": "Syaikh Yusuf al-Qaradawi"
      },
      {
        "title": "Al-Mu'amalat al-Maliyyah al-Mu'asirah",
        "author": "Dr. Wahbah az-Zuhaili"
      }
    ]
  },
  {
    "slug": "zakat-penghasilan",
    "title": "Zakat Penghasilan (Zakat Profesi)",
    "category": "Fiqih",
    "badge": "Wajib",
    "badgeStyle": "badge--green",
    "tldr": "Zakat penghasilan adalah zakat atas gaji dan honorarium. Nisabnya setara 85 gram emas, kadar 2,5%, dan ada perbedaan ulama apakah dihitung per bulan atau per tahun setelah mencapai haul.",
    "coverGradient": "linear-gradient(135deg, #064e3b 0%, #059669 60%, #34d399 100%)",
    "coverEmoji": "💰",
    "cardBg": "#DCFCE7",
    "sources": 7,
    "updatedAt": "Apr 2025",
    "kesimpulan": [
      "Zakat profesi wajib jika penghasilan mencapai nisab (setara 85g emas/tahun).",
      "Kadar zakat: 2,5% dari penghasilan bersih.",
      "Ada khilaf soal haul — dihitung per bulan atau akumulasi setahun.",
      "Penghasilan di bawah nisab setelah dikurangi kebutuhan pokok: tidak wajib."
    ],
    "pendapat": [
      {
        "bar": "halal",
        "school": "Pendapat Modern — Wajib per Bulan",
        "view": "Zakat langsung tiap terima gaji (2,5%)",
        "detail": "Syaikh Yusuf al-Qaradawi dan mayoritas lembaga zakat kontemporer menganalogikan zakat profesi dengan zakat pertanian — wajib setiap panen (terima gaji)."
      },
      {
        "bar": "khilaf",
        "school": "Pendapat Klasik — Tunggu Haul",
        "view": "Baru wajib setelah haul (1 tahun) dan mencapai nisab",
        "detail": "Ulama klasik mensyaratkan haul (berlalu 1 tahun) seperti zakat emas dan perak. Gaji yang digunakan untuk kebutuhan tidak dihitung."
      }
    ],
    "dalil": [
      {
        "label": "Al-Qur'an — QS. Al-Baqarah: 267",
        "arabic": "يَا أَيُّهَا الَّذِينَ آمَنُوا أَنفِقُوا مِن طَيِّبَاتِ مَا كَسَبْتُمْ",
        "source": "QS. Al-Baqarah [2]: 267",
        "terjemahan": "\"Hai orang-orang yang beriman, nafkahkanlah (di jalan Allah) sebagian dari hasil usahamu yang baik-baik.\""
      }
    ],
    "sikapPraktis": [
      "Hitung penghasilan bersih per tahun — jika >= nisab, wajib zakat 2,5%.",
      "Cara mudah: potong 2,5% setiap gaji masuk — lebih aman dan konsisten.",
      "Bayar ke lembaga amil zakat resmi (BAZNAS, LAZ) atau langsung ke mustahiq.",
      "Nisab 2025 sekitar Rp 9.5 juta/bulan (cek harga emas terkini untuk update)."
    ],
    "sumber": [
      {
        "title": "Fiqh al-Zakat",
        "author": "Syaikh Yusuf al-Qaradawi · Referensi Utama"
      },
      {
        "title": "Fatwa BAZNAS tentang Zakat Profesi",
        "author": "Badan Amil Zakat Nasional Indonesia"
      },
      {
        "title": "Al-Fiqh al-Islami wa Adillatuh — Bab Zakat",
        "author": "Dr. Wahbah az-Zuhaili"
      }
    ]
  },
  {
    "slug": "adab-makan-minum",
    "title": "Adab Makan dan Minum dalam Islam",
    "category": "Adab",
    "badge": "Sunnah",
    "badgeStyle": "badge--blue",
    "tldr": "Adab makan minum mencakup: baca bismillah, makan dengan tangan kanan, tidak berdiri saat minum, tidak meniup makanan panas, dan baca alhamdulillah setelahnya. Semua ada dalil shahih dari hadits.",
    "coverGradient": "linear-gradient(135deg, #1e3a5f 0%, #2563eb 60%, #60a5fa 100%)",
    "coverEmoji": "🍽️",
    "cardBg": "#DBEAFE",
    "sources": 5,
    "updatedAt": "May 2025",
    "kesimpulan": [
      "Mulai makan dengan bismillah — jika lupa, baca di tengah.",
      "Makan dan minum dengan tangan kanan — larangan tangan kiri ada dalilnya.",
      "Tidak berdiri saat minum — ada khilaf ringan tapi hadits larangan lebih kuat.",
      "Baca alhamdulillah setelah selesai makan."
    ],
    "pendapat": [
      {
        "bar": "halal",
        "school": "Mayoritas Ulama",
        "view": "Adab ini sunnah muakkadah",
        "detail": "Semua adab ini memiliki dalil hadits yang shahih dan disepakati mayoritas ulama sebagai sunnah yang sangat dianjurkan."
      }
    ],
    "dalil": [
      {
        "label": "Hadits — Bukhari & Muslim",
        "arabic": "إِذَا أَكَلَ أَحَدُكُمْ فَلْيَأْكُلْ بِيَمِينِهِ وَإِذَا شَرِبَ فَلْيَشْرَبْ بِيَمِينِهِ",
        "source": "HR. Muslim no. 2020",
        "terjemahan": "\"Jika salah seorang dari kalian makan, hendaklah makan dengan tangan kanannya. Dan jika minum, hendaklah minum dengan tangan kanannya.\""
      }
    ],
    "sikapPraktis": [
      "Biasakan baca bismillah sebelum makan — latih anak-anak sejak dini.",
      "Tidak perlu kaku soal minum sambil duduk vs berdiri dalam kondisi darurat.",
      "Yang terpenting: ingat Allah saat makan, tidak berlebihan (israf)."
    ],
    "sumber": [
      {
        "title": "Riyadhus Shalihin — Bab Adab Makan",
        "author": "Imam Nawawi"
      },
      {
        "title": "Shahih Bukhari — Kitab Al-Ath'imah",
        "author": "Imam Bukhari"
      }
    ]
  },
  {
    "slug": "hukum-musik-dalam-islam",
    "title": "Hukum Mendengarkan Musik",
    "category": "Fiqih",
    "badge": "Khilafiyah",
    "badgeStyle": "badge--gold",
    "tldr": "Hukum musik adalah salah satu topik paling banyak diperselisihkan. Ulama terbagi: ada yang mengharamkan semua musik, ada yang membolehkan musik tanpa konten maksiat, ada yang hanya membolehkan rebana.",
    "coverGradient": "linear-gradient(135deg, #4c1d95 0%, #7c3aed 60%, #a78bfa 100%)",
    "coverEmoji": "🎵",
    "cardBg": "#EDE9FE",
    "sources": 9,
    "updatedAt": "Jun 2025",
    "kesimpulan": [
      "Ini adalah khilafiyah klasik — semua pendapat punya dalil yang mu'tabar.",
      "Yang disepakati haram: musik yang mengiringi konten maksiat (pornografi, dll).",
      "Yang diperselisihkan: musik instrumental tanpa lirik atau lirik Islami.",
      "Rebana (duff) disepakati boleh untuk acara pernikahan dan kegembiraan."
    ],
    "pendapat": [
      {
        "bar": "haram",
        "school": "Ibnu Taimiyyah, Ibnu Qayyim, Ulama Salafi",
        "view": "Semua alat musik haram kecuali rebana",
        "detail": "Berdasarkan hadits Bukhari tentang kaum yang menghalalkan musik, mereka mengharamkan semua alat musik dawai dan tiup."
      },
      {
        "bar": "khilaf",
        "school": "Sebagian Ulama Syafi'i dan Maliki",
        "view": "Musik tanpa konten maksiat boleh",
        "detail": "Al-Ghazali dalam Ihya Ulumuddin membolehkan nyanyian dan musik yang membangkitkan semangat kebaikan, bukan dorongan maksiat."
      },
      {
        "bar": "halal",
        "school": "Yusuf al-Qaradawi dan Ulama Kontemporer",
        "view": "Hukum tergantung konten dan dampak",
        "detail": "Musik dihukumi berdasarkan konten lirik, dampak pada pendengar, dan konteks. Musik yang baik kontennya dan tidak menimbulkan fitnah dibolehkan."
      }
    ],
    "dalil": [
      {
        "label": "Hadits — Bukhari",
        "arabic": "لَيَكُونَنَّ مِنْ أُمَّتِي أَقْوَامٌ يَسْتَحِلُّونَ الْحِرَ وَالْحَرِيرَ وَالْخَمْرَ وَالْمَعَازِفَ",
        "source": "HR. Bukhari no. 5590",
        "terjemahan": "\"Sungguh akan ada dari umatku kaum-kaum yang menghalalkan zina, sutera (bagi lelaki), khamr, dan alat-alat musik.\""
      }
    ],
    "sikapPraktis": [
      "Pilih pendapat yang paling sesuai dengan kondisi dan pemahaman agamamu.",
      "Hindari musik yang liriknya mengandung unsur maksiat, kekerasan, atau kesyirikan.",
      "Jika memilih menghindari musik: fokus pada tilawah Al-Quran dan nasyid sebagai alternatif.",
      "Jangan jadikan perbedaan ini alasan untuk menghakimi sesama Muslim."
    ],
    "sumber": [
      {
        "title": "Ihya' Ulumuddin — Bab Sama'",
        "author": "Imam Al-Ghazali · Pendapat Membolehkan"
      },
      {
        "title": "Ighatsat al-Lahfan min Mashayid al-Syaithan",
        "author": "Ibnu Qayyim al-Jauziyyah · Pendapat Melarang"
      },
      {
        "title": "Al-Halal wal Haram fil Islam",
        "author": "Syaikh Yusuf al-Qaradawi · Pendapat Kontemporer"
      }
    ]
  }
]

export function getArticleBySlug(slug) {
  return articles.find((a) => a.slug === slug) ?? null
}

export function getAllSlugs() {
  return articles.map((a) => ({ slug: a.slug }))
}
