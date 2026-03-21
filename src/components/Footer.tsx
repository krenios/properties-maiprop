import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background" role="contentinfo">
      <div className="container mx-auto px-6 py-10">
        <div className="grid gap-8 sm:grid-cols-2 max-w-2xl">
          {/* Golden Visa column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-foreground">
              Golden Visa
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/greek-golden-visa" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Greek Golden Visa
                </Link>
              </li>
              <li>
                <Link to="/greek-golden-visa-requirements" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Requirements
                </Link>
              </li>
              <li>
                <Link to="/golden-visa-journey" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Golden Visa Journey
                </Link>
              </li>
              <li>
                <Link to="/process" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Process
                </Link>
              </li>
              <li>
                <Link to="/250k-golden-visa-properties" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  €250K Properties
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-foreground">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/guides" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Guides
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/golden-visa-tax-benefits" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Tax Benefits
                </Link>
              </li>
              <li>
                <Link to="/golden-visa-rental-income-properties" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Rental Income Properties
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} mAI Prop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
