import { useState } from "react";
import { Option } from "@/interfaces/animationDropdownProps";

// Custom hook untuk memilih dan menyimpan metode pembayaran
export const useEditSalesMethod = () => {
  const [selectedMethod, setSelectedMethod] = useState<Option | null>(null);

  const salesOptions = [
    { label: "JNE", value: "jne" },
    { label: "JBT", value: "jbt" },
    { label: "JNT", value: "jnt" },
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
    salesOptions,
    handleSave,
  };
};
