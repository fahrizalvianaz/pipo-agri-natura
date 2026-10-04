// Company contact details — replace the placeholder values before going live.
export const site = {
  name: "PT Pipo Agri Natura",
  shortName: "PIPO",
  email: "trade@pipoagrinatura.com", // TODO: confirm
  // International format, digits only (used for wa.me links)
  whatsapp: "6281234567890", // TODO: confirm
  whatsappDisplay: "+62 812-3456-7890", // TODO: confirm
  origin: "Temanggung, Central Java, Indonesia",
  headquarters: "Central Java, Indonesia", // TODO: confirm full address
  exportPort: "Tanjung Emas, Semarang", // TODO: confirm
  established: 2026,
} as const;

const u = (id: string) => `https://images.unsplash.com/photo-${id}`;

// Unsplash placeholders — swap for real company photos in /public/images.
export const images = {
  hero: u("1633437805600-2c58bf56663c"),
  greenBeans: u("1789419773211-075a4c400b4b"),
  cherries: u("1750967613671-297f1b63038d"),
  cherriesBranch: u("1515694590185-73647ba02c10"),
  farmer: u("1746623691157-c4c7a3bad0c4"),
  drying: u("1670758566316-13ea9d10580d"),
  tobacco: u("1758414083946-df1b3b44ce84"),
  sack: u("1524350876685-274059332603"),
  port: u("1578575437130-527eed3abbec"),
  forest: u("1441974231531-c6227db76b6e"),
  hills: u("1758390286386-87c9d78cf9be"),
  hands: u("1500912708295-4cf8b060f381"),
} as const;
