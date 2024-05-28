import { LucideProps } from "lucide-react";
import Image from "next/image";
import { ThemeProvider } from "./theme-provider";
import { useTheme } from "next-themes"

export const Icons = {
  logo: (props: LucideProps) => (
    
    <Image
  src="/fdblogo.png"
  alt="Logo"
  width={100}
  height={30}
  priority
  style={{ width: 'auto', height: 'auto' }} // Opprettholder aspektforholdet
/>
  ),
};
