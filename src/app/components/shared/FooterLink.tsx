const FooterLink = ({
  children,
  href,
  onClick,
}: {
  children: React.ReactNode;
  href: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}) => {
  return (
    <a href={href} className="footer-link" onClick={onClick}>
      {children}
    </a>
  );
};

export default FooterLink;
