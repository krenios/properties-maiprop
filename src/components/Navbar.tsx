import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import brandLogo from "@/assets/brand-1.png";

const navLinks = [
  { label: "Portfolio", href: "#opportunities" },
  { label: "Benefits", href: "#overview" },
  { label: "Process", href: "#journey" },
  { label: "Platform", href: "#platform" },
];

const WHATSAPP_URL = "https://wa.me/306900000000?text=Hi%2C%20I'm%20interested%20in%20Golden%20Visa%20investment%20opportunities";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-border bg-background/80 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2">
          <img src={brandLogo} alt="MaiProp" className="h-8 w-auto brightness-0 invert" />
          <div className="hidden sm:block">
            <span className="text-sm font-bold">mAI prop</span>
            <span className="block text-[10px] text-muted-foreground">Golden Visa</span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => handleClick(l.href)}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {l.label}
            </button>
          ))}
          <Button asChild size="sm" className="rounded-full px-6">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Get Started</a>
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
          <nav className="container mx-auto flex flex-col gap-1 px-6 py-4">
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => handleClick(l.href)}
                className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {l.label}
              </button>
            ))}
            <Button asChild size="sm" className="mt-2 rounded-full">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Get Started</a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
