import { useState } from "react";
import { Option } from "@/interfaces/animationDropdownProps";

// Custom hook untuk memilih dan menyimpan metode pembayaran
export const useEditPaymentMethod = () => {
  const [selectedMethod, setSelectedMethod] = useState<Option | null>(null);

  const paymentOptions = [
    { label: "Transfer Bank", value: "bank" },
    { label: "E-Wallet (OVO, Dana, Gopay)", value: "ewallet" },
    { label: "Kartu Kredit / Debit", value: "card" },
    { label: "COD", value: "cod" },
  ];

  const handleSave = () => {
    if (selectedMethod) {
      console.log("Metode Pembayaran Dipilih:", selectedMethod);
      alert(`Metode pembayaran berhasil disimpan! ${selectedMethod.label}`);
    } else {
      alert("Pilih metode pembayaran dulu, bro!");
    }
  };

  return {
    selectedMethod, //
    setSelectedMethod,
    paymentOptions,
    handleSave,
  };
};
