import '../../styles/layout.scss'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="copyright">
        © {new Date().getFullYear()} Pixema. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;