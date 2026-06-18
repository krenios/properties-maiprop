import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslation } from "@/contexts/TranslationContext";
import maipropLogo from "@/assets/maiprop-logo-dark.png";

const navLinks = [
  { label: "Benefits", href: "#overview" },
  { label: "Opportunities", href: "#opportunities" },
  { label: "Track Record", href: "/trackrecord", isPage: true },
  { label: "Properties", href: "/properties", isPage: true },
  { label: "Platform", href: "#platform" },
  { label: "Process", href: "/process", isPage: true },
  { label: "FAQ", href: "#faq" },
  { label: "Resources", href: "/guides", isPage: true },
];

const Navbar = ({ forceScrolled = false }: { forceScrolled?: boolean }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const [scrolled, setScrolled] = useState(forceScrolled);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (forceScrolled) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [forceScrolled]);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    const header = headerRef.current;
    const appShell = header?.parentElement;
    const siblings = appShell
      ? Array.from(appShell.children).filter((child) => child !== header)
      : [];
    const overlays = Array.from(document.querySelectorAll("[data-mobile-nav-hidden='true']"));
    const hiddenTargets = [...siblings, ...overlays] as HTMLElement[];
    const previousStates = hiddenTargets.map((element) => ({
      element,
      ariaHidden: element.getAttribute("aria-hidden"),
      inert: element.inert,
    }));

    previousStates.forEach(({ element }) => {
      element.setAttribute("aria-hidden", "true");
      element.inert = true;
    });

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previousStates.forEach(({ element, ariaHidden, inert }) => {
        if (ariaHidden === null) {
          element.removeAttribute("aria-hidden");
        } else {
          element.setAttribute("aria-hidden", ariaHidden);
        }
        element.inert = inert;
      });
    };
  }, [mobileOpen]);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    if (isHome) {
      const el = document.querySelector(href);
      if (!el) return;
      const header = document.querySelector("header");
      const offset = (header?.getBoundingClientRect().height ?? 72) + 8;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    // if not home, the <a href> handles navigation natively
  };

  return (
    <header
      ref={headerRef}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/30 bg-background/40 backdrop-blur-xl shadow-lg"
          : "bg-transparent backdrop-blur-none"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-2 text-sidebar-primary bg-transparent sm:px-6 sm:py-3">
        <a href="/" className="flex items-center gap-2">
          <img
            alt="mAI properties"
            width={340}
            height={160}
            className="h-12 w-auto object-contain transition-all duration-300 sm:h-16 md:h-20"
            src={maipropLogo}
            loading="eager"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) =>
            (l as any).isPage ? (
              <NavLink
                key={l.href}
                to={l.href}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${isActive ? "text-foreground" : "text-secondary-foreground hover:text-foreground"}`
                }
              >
                {t(l.label)}
              </NavLink>
            ) : (l as any).isExternal ? (
              <a key={l.href} href={l.href} className="text-sm font-medium transition-colors text-secondary-foreground">
                {t(l.label)}
              </a>
            ) : isHome ? (
              <button
                key={l.href}
                onClick={() => handleClick(l.href)}
                className="text-sm font-medium transition-colors text-secondary-foreground"
              >
                {t(l.label)}
              </button>
            ) : (
              <a
                key={l.href}
                href={`/${l.href}`}
                className="text-sm font-medium transition-colors text-secondary-foreground"
              >
                {t(l.label)}
              </a>
            ),
          )}
          <LanguageSwitcher />
          <Button
            size="sm"
            className="rounded-full px-6"
            onClick={() => {
              if (isHome) {
                const el = document.querySelector("#contact");
                el?.scrollIntoView({ behavior: "smooth" });
              } else {
                navigate("/#contact");
              }
            }}
          >
            {t("Get Started")}
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex h-11 w-11 items-center justify-center"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="fixed inset-x-0 bottom-0 top-16 z-[60] border-t border-border bg-background/95 backdrop-blur-xl md:hidden sm:top-20"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <nav id="mobile-navigation" className="container mx-auto flex h-full flex-col gap-1 overflow-y-auto px-6 py-5">
            {navLinks.map((l) =>
              (l as any).isPage ? (
                <NavLink
                  key={l.href}
                  to={l.href}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-3 text-left text-sm font-medium transition-colors hover:bg-muted hover:text-foreground ${isActive ? "text-foreground bg-muted" : "text-muted-foreground"}`
                  }
                >
                  {t(l.label)}
                </NavLink>
              ) : (l as any).isExternal ? (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-3 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {t(l.label)}
                </a>
              ) : isHome ? (
                <button
                  key={l.href}
                  onClick={() => handleClick(l.href)}
                  className="rounded-lg px-3 py-3 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {t(l.label)}
                </button>
              ) : (
                <a
                  key={l.href}
                  href={`/${l.href}`}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-3 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {t(l.label)}
                </a>
              ),
            )}
            <LanguageSwitcher />
            <Button
              size="sm"
              className="mt-2 rounded-full"
              onClick={() => {
                setMobileOpen(false);
                if (isHome) {
                  const el = document.querySelector("#contact");
                  el?.scrollIntoView({ behavior: "smooth" });
                } else {
                  navigate("/#contact");
                }
              }}
            >
              {t("Get Started")}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
