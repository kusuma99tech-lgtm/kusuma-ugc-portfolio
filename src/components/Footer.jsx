
import { Instagram, Mail, ArrowUp } from 'lucide-react';
import siteConfig from '../siteConfig';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container footer-row">
                <a className="brand foot-brand" href="#home">
                    <span className="brand-mark">K</span>
                    <span>
                        KUSUMA
                        <small>UGC CREATOR</small>
                    </span>
                </a>

                <p>Creating thoughtful content, one story at a time.</p>

                <div className="social">
                    <a href={`mailto:${siteConfig.email}`} aria-label="Email">
                        <Mail />
                    </a>

                    <a
                        href={siteConfig.instagramUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Instagram"
                    >
                        <Instagram />
                    </a>

                    <a href="#home" aria-label="Back to top">
                        <ArrowUp />
                    </a>
                </div>
            </div>

            <p className="copyright">
                © {new Date().getFullYear()} Kusuma. All rights reserved.
            </p>
        </footer>
    );
}
