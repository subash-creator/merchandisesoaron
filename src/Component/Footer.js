import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import "./Footer.css"; // optional styling

export default function Footer() {
  return (
    <footer className="footer">
      {/* Row 1 */}
      <div className="footer-top">
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/story">Story</a>
          <a href="/career">Career</a>
          <a href="/partner">Partner With Us</a>
          <a href="/contact">Contact Us</a>
          <a href="/patent-trademark">Patent & Trademark</a>
        </div>

        <div className="footer-social">
          <div className="social-icons">
            <a
              href="https://x.com/SoaronOfficial?t=fy9JVK27CGZbAdIPk-Koew&s=08"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (formerly Twitter)"
              className="icon x-icon"
            >
              <FaXTwitter />
            </a>

            <a
              href="https://www.instagram.com/soaronofficial?igsh=ZDQ0aWZ1YzgyYWU="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="icon instagram-icon"
            >
              <FaInstagram />
            </a>

            <a
              href="https://youtube.com/@soaron2019?si=-0r-LkJFp7Z3oYcv"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="icon youtube-icon"
            >
              <FaYoutube />
            </a>

            <a
              href="https://www.linkedin.com/company/soaron/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="icon linkedin-icon"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="footer-bottom">
        <div className="footer-small-links">
          <div className="small-links">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms">Terms & Conditions</a>
            <a href="/refund-policy">Refund Policy</a>
            <a href="/press">Press or Media</a>
            <a href="/help">Help & Support</a>
          </div>
        </div>

        <div className="footer-copy">
          <p className="copyright">© 2025 Soaron. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
