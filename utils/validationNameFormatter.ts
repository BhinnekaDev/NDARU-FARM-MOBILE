export const nameFormatter = (nama: string): string => {
  // Hapus semua karakter selain huruf dan spasi
  return nama.replace(/[^A-Za-z\s]/g, "").slice(0, 50);
};
