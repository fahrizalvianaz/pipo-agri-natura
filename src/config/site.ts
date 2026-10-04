// Company contact details. Values marked TODO still need confirmation from PIPO before launch.
export const site = {
  name: "PT Pipo Agri Natura",
  shortName: "PIPO",
  email: "trade@pipoagrinatura.com", // TODO: confirm — placeholder address
  // International format, digits only (used for wa.me links)
  whatsapp: "6281221507771",
  whatsappDisplay: "+62 812-2150-7771",
  origin: "Temanggung, Central Java, Indonesia",
  established: 2026,
  // Export port intentionally omitted until confirmed by PIPO.
} as const;

const u = (id: string) => `https://images.unsplash.com/photo-${id}`;

// Illustrative Unsplash photos — they do not depict PIPO's own farms, people or facilities.
// Replace with real company photography in /public/images when available.
export const images = {
  greenBeansPile: u("1703646619157-eb553d16d402"), // raw green coffee beans
  greenBeansBasket: u("1789419773211-075a4c400b4b"), // raw green coffee beans in a woven basket
  cherries: u("1750967613671-297f1b63038d"), // ripe coffee cherries on the branch
  tobacco: u("1758414083946-df1b3b44ce84"), // tobacco plants in a field
} as const;
