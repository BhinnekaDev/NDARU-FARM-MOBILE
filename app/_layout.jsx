import "@/global.css";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import useMengarahkanPengguna from "@/hooks/frontend/useMengarahkanPengguna";

export default function TataLetakUtama() {
  useMengarahkanPengguna();

  return (
    <>
      <Slot />
      <StatusBar style="dark" />
    </>
  );
}
