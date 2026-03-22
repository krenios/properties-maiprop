const Footer = () => {
  return (
    <footer className="border-t border-border bg-background" role="contentinfo">
      <div className="container mx-auto px-6 py-6">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} mAI Prop. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
