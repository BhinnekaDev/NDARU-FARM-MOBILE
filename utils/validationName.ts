export const validasiNamaLengkap = (nama: string) => {
  const rules = /^[A-Za-z\s]+$/;

  return rules.test(nama);
};
