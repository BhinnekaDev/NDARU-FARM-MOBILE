import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function useMengarahkanPengguna() {
  const pengarah = useRouter();

  useEffect(() => {
    pengarah.push("/layarSelamatDatang");
  }, [pengarah]);
}
