import Link from "next/link";
import { Files } from "lucide-react";

export function AppBrand() {
  return (
    <Link href="/" className="brand">
      <span className="brand-mark"><Files size={18} /></span>
      <span>
        <strong>SriDoc Studio</strong>
        <span>Synthetic form dataset builder</span>
      </span>
    </Link>
  );
}
