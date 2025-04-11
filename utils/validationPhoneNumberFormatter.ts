export const phoneNumberFormatter = (input: string): string => {
  if (!input) return "";

  // Step 1: Bersihkan input, hanya izinkan angka dan '+'
  let sanitizedInput = input.replace(/[^\d+]/g, "");

  // Step 2: Jika dimulai dengan '0', ubah jadi awalan '+62'
  if (sanitizedInput.startsWith("0")) {
    sanitizedInput = "+62" + sanitizedInput.slice(1);
  }

  // Step 3: Normalisasi jika dimulai dengan '+'
  let internationalFormat = sanitizedInput;
  if (internationalFormat.startsWith("+")) {
    // Hapus semua karakter non-digit setelah '+'
    internationalFormat = "+" + internationalFormat.slice(1).replace(/\D/g, "");

    // Validasi hanya terima awalan '+62'
    if (!internationalFormat.startsWith("+62")) {
      internationalFormat = "+62";
    }

    // Perbaiki input yang salah seperti '+620812...' → '+62812...'
    if (internationalFormat.startsWith("+620")) {
      internationalFormat = "+62" + internationalFormat.slice(4);
    }
  } else {
    // Jika tidak dimulai dengan '0' atau '+', anggap tidak valid
    return "";
  }

  // Step 4: Batasi panjang ke maksimal 15 karakter (standar internasional)
  const limitedPhoneNumber = internationalFormat.slice(0, 15);

  // Step 5: Format dengan spasi agar mudah dibaca, contoh: +62 812 3456 7890
  const formattedPhoneNumber = limitedPhoneNumber.replace(/(\+62)(\d{1,3})?(\d{1,4})?(\d{1,4})?/, (_match, p1, p2, p3, p4) => {
    return [p1, p2, p3, p4].filter(Boolean).join(" ");
  });

  return formattedPhoneNumber;
};
