/*
 * All site copy (single-page landing). Rule: only state what PIPO has confirmed.
 * Anything unconfirmed — specs, ports, certifications — is left out, not guessed.
 * Sustainability (ESG pillars, Code of Conduct) confirmed by PIPO.
 */
const en = {
  nav: {
    about: "About",
    origin: "Origin",
    product: "Product",
    sustainability: "Sustainability",
    contact: "Contact",
    cta: "Request a Sample",
    menu: "Open menu",
    close: "Close menu",
    skip: "Skip to main content",
    language: "Language",
    backToTop: "Back to top",
  },
  hero: {
    title: "We Export Indonesian Java Green Coffee Beans Worldwide.",
    subtitle:
      "PIPO connects Indonesia’s agricultural origins with global markets, bringing locally sourced commodities closer to international buyers through reliable trade and professional service.",
    imageAlt: "Close-up of raw green coffee beans",
    ctaPrimary: "Request a Sample",
    ctaSecondary: "View product and trade terms",
    facts: [
      { k: "Origin", v: "Temanggung, Central Java" },
      { k: "Product", v: "Java Arabica & Robusta green coffee" },
      { k: "Trade terms", v: "FOB · CIF" },
    ],
  },
  about: {
    label: "About us",
    title: "About PIPO Agri Natura",
    body: "Established in 2026, PIPO AGRI NATURA connects Indonesia's agricultural origins with global markets through reliable sourcing, transparent trade, consistent quality, and professional export execution. We specialize in Robusta and Arabica green coffee, supplying international buyers with clearly specified and carefully selected products from Indonesia.",
    visionLabel: "Our vision",
    vision:
      "Present in everyday life by responsibly meeting the needs for agricultural commodities across global supply chains.",
    principlesTitle: "How we work",
    pillars: [
      {
        title: "Transparency",
        lead: "What You See Is What You Get.",
        body: "Every product has a story. From the farmers and producers we work with to the buyers we serve, we believe in making every detail visible.",
      },
      {
        title: "Quality",
        lead: "",
        body: "We focus on consistent standards and product quality, from one product to the next.",
      },
      {
        title: "Accountability",
        lead: "We Stand Behind What We Deliver.",
        body: "From the commitments we make to the products we provide, we take responsibility for every step along the way.",
      },
    ],
  },
  origin: {
    label: "Origin",
    title: "Temanggung, Central Java",
    facts: [
      { k: "Island", v: "Java, Indonesia" },
      { k: "Province", v: "Central Java" },
      { k: "Regency", v: "Temanggung" },
      { k: "Coffee", v: "Arabica & Robusta, green (unroasted)" },
    ],
    mapTitle: "Map: Indonesia, Java, Central Java and Temanggung regency",
    mapIndonesia: "Indonesia",
    mapLabel: "Temanggung",
    mapSub: "Central Java",
    mapCentral: "Central Java",
    mapPath: ["Indonesia", "Java", "Central Java", "Temanggung"],
    mapNote:
      "We source Arabica and Robusta green coffee beans from farmers and suppliers in Temanggung, Central Java.",
    mapSource: "",
  },
  product: {
    label: "Product",
    title: "Our Products",
    enquireCta: "Enquire about our products",
    items: [
      {
        brand: "PIPO Green Coffee",
        name: "Java Robusta & Arabica Green Coffee Beans",
        body: "Sourced from Temanggung, Central Java, our green coffee beans connect the rich origins of Java with coffee buyers worldwide.",
        caption: "",
        alt: "Raw green coffee beans in a woven basket",
      },
      {
        brand: "PIPO Leaf",
        name: "Java Leaf",
        body: "Sourced from Temanggung, Central Java, PIPO Leaf brings Indonesian tobacco leaves to international markets.",
        caption: "",
        alt: "Tobacco plants growing in a field",
      },
    ],
    shippingTitle: "Commercial shipping terms",
    shippingCols: ["Incoterm", "Meaning", "Seller (PIPO) covers", "Buyer covers"],
    shippingRows: [
      {
        term: "FOB",
        meaning: "Free On Board",
        seller: "Goods loaded on the vessel at the Indonesian port of loading, including export clearance",
        buyer: "Ocean freight, insurance, unloading and import clearance",
      },
      {
        term: "CIF",
        meaning: "Cost, Insurance & Freight",
        seller: "FOB scope, plus ocean freight and marine insurance to the destination port",
        buyer: "Unloading, import duties and import clearance",
      },
    ],
    shippingNote: "",
  },
  sustain: {
    label: "Sustainability",
    title: "Environmental, Social and Governance",
    intro:
      "We are a young company, and we want to grow the right way. These are the principles we commit to as we build our sourcing network in Temanggung.",
    pillars: [
      {
        area: "Environmental",
        title: "Building Nature Sustainability",
        body: "We encourage responsible farming practices, careful use of land and water, and post-harvest handling that reduces waste.",
      },
      {
        area: "Social",
        title: "Growing Human Quality",
        body: "We value fair, long-term relationships with farmers and suppliers, safe working conditions, and sharing quality knowledge so that better coffee benefits the people who grow it.",
      },
      {
        area: "Governance",
        title: "Adopting Good Corporate Governance",
        body: "We operate with transparency, accountability and compliance with applicable laws and export regulations, keeping our commitments clear and traceable.",
      },
    ],
    codeTitle: "Code of Conduct",
    codes: [
      {
        title: "Ethical Sourcing and Sustainability",
        body: "We aim to source responsibly from farmers and suppliers who respect people and the environment.",
      },
      {
        title: "Customer-Centric Excellence",
        body: "We listen to buyer requirements, communicate clearly, and keep our promises on specification and timing.",
      },
      {
        title: "Commitment to Integrity and Innovation",
        body: "We act honestly in every transaction and keep improving how we source, select and deliver.",
      },
    ],
  },
  sample: {
    title: "Evaluating Java green coffee?",
    body: "Tell us which coffee you are interested in and where it should be delivered.",
    cta: "Request a Sample",
    imageAlt: "Green and ripe coffee cherries on the branch",
  },
  form: {
    label: "Contact",
    title: "Start a Sourcing Conversation",
    intro:
      "For importers, roasters, traders and distributors. Fill in the details and send them by email or WhatsApp",
    emailBtn: "Email us",
    waBtn: "WhatsApp",
    name: "Full name",
    company: "Company / Institution",
    email: "Email",
    destination: "Destination",
    destinationHelp: "Country and port or city of delivery",
    interest: "Product interest",
    interests: ["Java Arabica", "Java Robusta", "Arabica & Robusta", "Java Leaf"],
    inquiryType: "Inquiry type",
    inquiryTypes: { sample: "Sample request", quotation: "Quotation", general: "General inquiry" },
    selectPlaceholder: "Select an option",
    message: "Message / Inquiry",
    messagePlaceholder: "Volume, packaging, preferred Incoterm, timeline…",
    required: "required",
    optional: "optional",
    errName: "Please enter your full name.",
    errCompany: "Please enter your company or institution.",
    errDestination: "Please enter the destination.",
    errInterest: "Please choose a product.",
    errInquiry: "Please choose an inquiry type.",
    errEmail: "Please enter a valid email address.",
    errMessage: "Please write a short message.",
    errSummary: "Please fix the following before sending:",
    sendEmail: "Send via Email",
    sendWhatsApp: "Send via WhatsApp",
    sent: "Your email or WhatsApp app should now be open with your message ready to send.",
    sendHint: "Both options open your own app with the message pre-filled.",
    infoEmail: "Email",
    infoWhatsApp: "WhatsApp",
    infoOrigin: "Origin",
    msgIntro: "Hello PIPO Agri Natura, I would like to start a sourcing conversation.",
    msgSubject: "Sourcing inquiry",
  },
  footer: {
    tagline: "Indonesian agricultural commodities from Temanggung, Central Java, for international buyers.",
    rights: "All rights reserved.",
    imageNote: "",
  },
};

export type Dictionary = typeof en;

const id: Dictionary = {
  nav: {
    about: "Tentang",
    origin: "Asal",
    product: "Produk",
    sustainability: "Keberlanjutan",
    contact: "Kontak",
    cta: "Minta Sampel",
    menu: "Buka menu",
    close: "Tutup menu",
    skip: "Langsung ke konten utama",
    language: "Bahasa",
    backToTop: "Kembali ke atas",
  },
  hero: {
    title: "Kami Mengekspor Biji Kopi Hijau Jawa Indonesia ke Seluruh Dunia.",
    subtitle:
      "PIPO menghubungkan sumber komoditas agrikultur Indonesia dengan pasar global, membawa komoditas yang bersumber dari produsen lokal lebih dekat kepada pembeli internasional melalui perdagangan yang andal dan layanan profesional.",
    imageAlt: "Biji kopi hijau mentah dari dekat",
    ctaPrimary: "Minta Sampel",
    ctaSecondary: "Lihat produk dan ketentuan dagang",
    facts: [
      { k: "Asal", v: "Temanggung, Jawa Tengah" },
      { k: "Produk", v: "Kopi hijau Arabica & Robusta Jawa" },
      { k: "Ketentuan dagang", v: "FOB · CIF" },
    ],
  },
  about: {
    label: "Tentang kami",
    title: "Tentang PIPO Agri Natura",
    body: "Didirikan pada 2026, PIPO AGRI NATURA menghubungkan sumber agrikultur Indonesia dengan pasar global melalui pengadaan yang andal, perdagangan yang transparan, kualitas yang konsisten, dan eksekusi ekspor yang profesional. Kami berfokus pada kopi hijau Robusta dan Arabica, memasok pembeli internasional dengan produk Indonesia yang terspesifikasi jelas dan dipilih dengan cermat.",
    visionLabel: "Visi kami",
    vision:
      "Hadir dalam kehidupan sehari-hari dengan memenuhi kebutuhan komoditas agrikultur secara bertanggung jawab di seluruh rantai pasok global.",
    principlesTitle: "Cara kami bekerja",
    pillars: [
      {
        title: "Transparansi",
        lead: "Apa yang Anda Lihat, Itulah yang Anda Dapat.",
        body: "Setiap produk punya cerita. Dari petani dan produsen yang bekerja sama dengan kami hingga pembeli yang kami layani, kami percaya setiap detail harus terlihat jelas.",
      },
      {
        title: "Kualitas",
        lead: "",
        body: "Kami fokus pada standar dan kualitas produk yang konsisten, dari satu produk ke produk berikutnya.",
      },
      {
        title: "Akuntabilitas",
        lead: "Kami Bertanggung Jawab atas Apa yang Kami Kirim.",
        body: "Dari komitmen yang kami buat hingga produk yang kami sediakan, kami bertanggung jawab atas setiap langkahnya.",
      },
    ],
  },
  origin: {
    label: "Asal",
    title: "Temanggung, Jawa Tengah",
    facts: [
      { k: "Pulau", v: "Jawa, Indonesia" },
      { k: "Provinsi", v: "Jawa Tengah" },
      { k: "Kabupaten", v: "Temanggung" },
      { k: "Kopi", v: "Arabica & Robusta, hijau (belum disangrai)" },
    ],
    mapTitle: "Peta: Indonesia, Jawa, Jawa Tengah, dan Kabupaten Temanggung",
    mapIndonesia: "Indonesia",
    mapLabel: "Temanggung",
    mapSub: "Jawa Tengah",
    mapCentral: "Jawa Tengah",
    mapPath: ["Indonesia", "Jawa", "Jawa Tengah", "Temanggung"],
    mapNote:
      "Kami mendapatkan biji kopi hijau Arabica dan Robusta dari petani dan pemasok di Temanggung, Jawa Tengah.",
    mapSource: "Batas wilayah: BPS, WFP, OCHA melalui geoBoundaries (CC BY 3.0 IGO).",
  },
  product: {
    label: "Produk",
    title: "Produk Kami",
    enquireCta: "Tanyakan tentang produk kami",
    items: [
      {
        brand: "PIPO Green Coffee",
        name: "Biji Kopi Hijau Robusta & Arabica Jawa",
        body: "Bersumber dari Temanggung, Jawa Tengah, biji kopi hijau kami menghubungkan kekayaan asal Jawa dengan pembeli kopi di seluruh dunia.",
        caption: "Biji kopi hijau, belum disangrai (foto ilustrasi)",
        alt: "Biji kopi hijau mentah dalam keranjang anyaman",
      },
      {
        brand: "PIPO Leaf",
        name: "Java Leaf",
        body: "Bersumber dari Temanggung, Jawa Tengah, PIPO Leaf membawa daun tembakau Indonesia ke pasar internasional.",
        caption: "Daun tembakau (foto ilustrasi)",
        alt: "Tanaman tembakau di ladang",
      },
    ],
    shippingTitle: "Ketentuan pengiriman komersial",
    shippingCols: ["Incoterm", "Arti", "Tanggungan penjual (PIPO)", "Tanggungan pembeli"],
    shippingRows: [
      {
        term: "FOB",
        meaning: "Free On Board",
        seller: "Barang dimuat ke kapal di pelabuhan muat Indonesia, termasuk izin ekspor",
        buyer: "Ongkos kapal, asuransi, bongkar muat, dan izin impor",
      },
      {
        term: "CIF",
        meaning: "Cost, Insurance & Freight",
        seller: "Cakupan FOB, ditambah ongkos kapal dan asuransi laut hingga pelabuhan tujuan",
        buyer: "Bongkar muat, bea masuk, dan izin impor",
      },
    ],
    shippingNote: "Pelabuhan muat, ongkos kapal, dan asuransi dikonfirmasi per permintaan.",
  },
  sustain: {
    label: "Keberlanjutan",
    title: "Lingkungan, Sosial, dan Tata Kelola",
    intro:
      "Kami perusahaan yang masih muda, dan kami ingin tumbuh dengan cara yang benar. Inilah prinsip yang kami pegang saat membangun jaringan pengadaan di Temanggung.",
    pillars: [
      {
        area: "Lingkungan",
        title: "Membangun Keberlanjutan Alam",
        body: "Kami mendorong praktik budidaya yang bertanggung jawab, penggunaan lahan dan air yang bijak, serta penanganan pascapanen yang mengurangi limbah — bersama petani dan pemasok yang memiliki nilai yang sama.",
      },
      {
        area: "Sosial",
        title: "Menumbuhkan Kualitas Manusia",
        body: "Kami menghargai hubungan jangka panjang yang adil dengan petani dan pemasok, kondisi kerja yang aman, serta berbagi pengetahuan mutu agar kopi yang lebih baik turut menyejahterakan penanamnya.",
      },
      {
        area: "Tata Kelola",
        title: "Menerapkan Tata Kelola Perusahaan yang Baik",
        body: "Kami beroperasi dengan transparansi, akuntabilitas, dan kepatuhan terhadap hukum serta regulasi ekspor yang berlaku, menjaga komitmen kami tetap jelas dan dapat ditelusuri.",
      },
    ],
    codeTitle: "Kode Etik",
    codes: [
      {
        title: "Pengadaan Etis dan Berkelanjutan",
        body: "Kami berupaya mengambil produk secara bertanggung jawab dari petani dan pemasok yang menghormati manusia dan lingkungan.",
      },
      {
        title: "Keunggulan Berorientasi Pelanggan",
        body: "Kami mendengarkan kebutuhan pembeli, berkomunikasi dengan jelas, dan menepati janji soal spesifikasi dan waktu.",
      },
      {
        title: "Komitmen pada Integritas dan Inovasi",
        body: "Kami jujur dalam setiap transaksi dan terus memperbaiki cara kami mencari, memilih, dan mengirim.",
      },
    ],
  },
  sample: {
    title: "Sedang menilai kopi hijau Jawa?",
    body: "Beri tahu kami kopi yang Anda minati dan tujuan pengirimannya.",
    cta: "Minta Sampel",
    imageAlt: "Buah kopi hijau dan matang di dahan",
  },
  form: {
    label: "Kontak",
    title: "Mulai Percakapan Pengadaan",
    intro:
      "Untuk importir, roaster, trader, dan distributor. Isi detailnya lalu kirim melalui email atau WhatsApp — keduanya membuka aplikasi Anda dengan pesan yang siap dikirim.",
    emailBtn: "Kirim email",
    waBtn: "WhatsApp",
    name: "Nama lengkap",
    company: "Perusahaan / Institusi",
    email: "Email",
    destination: "Tujuan",
    destinationHelp: "Negara dan pelabuhan atau kota pengiriman",
    interest: "Minat produk",
    interests: ["Java Arabica", "Java Robusta", "Arabica & Robusta", "Java Leaf"],
    inquiryType: "Jenis permintaan",
    inquiryTypes: { sample: "Permintaan sampel", quotation: "Penawaran harga", general: "Pertanyaan umum" },
    selectPlaceholder: "Pilih salah satu",
    message: "Pesan / Pertanyaan",
    messagePlaceholder: "Volume, kemasan, preferensi Incoterm, jadwal…",
    required: "wajib",
    optional: "opsional",
    errName: "Mohon isi nama lengkap Anda.",
    errCompany: "Mohon isi nama perusahaan atau institusi.",
    errDestination: "Mohon isi tujuan pengiriman.",
    errInterest: "Mohon pilih produk.",
    errInquiry: "Mohon pilih jenis permintaan.",
    errEmail: "Mohon isi alamat email yang valid.",
    errMessage: "Mohon tulis pesan singkat.",
    errSummary: "Mohon perbaiki hal berikut sebelum mengirim:",
    sendEmail: "Kirim via Email",
    sendWhatsApp: "Kirim via WhatsApp",
    sent: "Aplikasi email atau WhatsApp Anda kini terbuka dengan pesan yang siap dikirim.",
    sendHint: "Kedua pilihan membuka aplikasi Anda dengan pesan yang sudah terisi.",
    infoEmail: "Email",
    infoWhatsApp: "WhatsApp",
    infoOrigin: "Asal",
    msgIntro: "Halo PIPO Agri Natura, saya ingin memulai percakapan pengadaan.",
    msgSubject: "Permintaan pengadaan",
  },
  footer: {
    tagline: "Komoditas agrikultur Indonesia dari Temanggung, Jawa Tengah, untuk pembeli internasional.",
    rights: "Hak cipta dilindungi.",
    imageNote: "Foto bersifat ilustrasi dan tidak menampilkan kebun atau fasilitas milik PIPO.",
  },
};

export const dictionaries = { en, id } as const;
export type Locale = keyof typeof dictionaries;
