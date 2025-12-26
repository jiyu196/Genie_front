import { Noto_Sans_KR } from "next/font/google";

export const notoSans = Noto_Sans_KR ({
  subsets : ["latin"],
  weight : ["400", "500", "600", "700"],
  display : "swap",
  variable : "--font-noto",
});