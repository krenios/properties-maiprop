import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import brandLogo from "@/assets/brand-1.png";
import brandLight from "@/assets/brand-light.png";

const navLinks = [
{ label: "Benefits", href: "#overview" },
{ label: "Portfolio", href: "#opportunities" },
{ label: "Track Record", href: "#delivered" },
{ label: "mAI Prop OS", href: "#platform" },
{ label: "Process", href: "#journey" }];


const whatsappMessage = [
  "Hello! I would like to explore investment opportunities under the Greek Golden Visa program.",
  "",
  "Please share the following details:",
  "",
  "1. Full Name:",
  "2. Phone (International format):",
  "3. Email:",
  "4. Nationality (Country of citizenship):",
  "5. Investment Budget (in EUR - minimum 250000):",
  "6. Preferred Property Location:",
  "7. Property Type (Apartment or Villa):",
  "8. When are you planning to invest (0-6 months or 6-12 months):",
].join("\n");
const WHATSAPP_URL = `https://wa.me/306971853470?text=${encodeURIComponent(whatsappMessage)}`;

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
      scrolled ? "border-b border-border bg-background/95 backdrop-blur-xl shadow-lg" : "bg-background/0 backdrop-blur-none"}`
      }>

      <div className="container mx-auto flex items-center justify-between px-6 py-4 text-sidebar-primary bg-transparent">
        <a href="/" className="flex items-center gap-2">
          <img 
            alt="MaiProp" 
            width={178}
            height={84}
            className={`h-12 w-auto object-fill transition-all duration-300 ${scrolled ? "brightness-150" : ""}`} 
            src={scrolled ? brandLight : "/lovable-uploads/3c02ed5d-5638-402e-b7c8-0daa01b502d0.png"} 
            loading="eager"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) =>
          <button
            key={l.href}
            onClick={() => handleClick(l.href)}
            className="text-sm font-medium transition-colors text-secondary-foreground">

              {l.label}
            </button>
          )}
          <Button size="sm" className="rounded-full px-6" onClick={() => { const el = document.querySelector("#contact"); el?.scrollIntoView({ behavior: "smooth" }); }}>
            Get Started
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen &&
      <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
          <nav className="container mx-auto flex flex-col gap-1 px-6 py-4">
            {navLinks.map((l) =>
          <button
            key={l.href}
            onClick={() => handleClick(l.href)}
            className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">

                {l.label}
              </button>
          )}
            <Button size="sm" className="mt-2 rounded-full" onClick={() => { setMobileOpen(false); const el = document.querySelector("#contact"); el?.scrollIntoView({ behavior: "smooth" }); }}>
              Get Started
            </Button>
          </nav>
        </div>
      }
    </header>);

};

export default Navbar;