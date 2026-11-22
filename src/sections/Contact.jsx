
import { useState } from "react";
import { Instagram, Mail, ArrowUpRight } from "lucide-react";
import siteConfig from "../siteConfig";

export default function Contact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        brand: "",
        message: ""
    });

    const update = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    function submit(e) {
        e.preventDefault();

        const subject = encodeURIComponent(
            `UGC collaboration enquiry from ${form.name}`
        );

        const body = encodeURIComponent(
            `Name: ${form.name}
Email: ${form.email}
Brand: ${form.brand || "Not specified"}

Project details:
${form.message}`
        );

        window.location.href =
            `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    }

    return (
        <section className="section contact" id="contact">
            <div className="container contact-grid">

                <div>
                    <p className="eyebrow">LET'S WORK TOGETHER</p>

                    <h2>
                        Have a story to <em>tell?</em>
                    </h2>

                    <p className="contact-intro">
                        I'd love to hear about your brand, your ideas and what we could create together.
                    </p>

                    {/* Gmail link */}
                    <a
                        className="contact-link"
                        href={`mailto:${siteConfig.email}`}
                    >
                        <Mail />
                        <span>
                            <small>EMAIL ME</small>
                            {siteConfig.email}
                        </span>
                        <ArrowUpRight />
                    </a>

                    {/* Instagram link */}
                    <a
                        className="contact-link"
                        href={siteConfig.instagramUrl}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Instagram />
                        <span>
                            <small>FOLLOW ALONG</small>
                            @{siteConfig.instagramUsername}
                        </span>
                        <ArrowUpRight />
                    </a>

                    <p className="contact-note">
                        For collaborations, gifted campaigns and creative projects.
                    </p>
                </div>

                {/* Collaboration enquiry form */}
                <form className="contact-form" onSubmit={submit}>
                    <h3>Tell me a little about your project.</h3>

                    <label>
                        Your name
                        <input
                            name="name"
                            value={form.name}
                            onChange={update}
                            placeholder="Your name"
                            required
                        />
                    </label>

                    <label>
                        Email address
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={update}
                            placeholder="you@brand.com"
                            required
                        />
                    </label>

                    <label>
                        Brand / company <small>(optional)</small>
                        <input
                            name="brand"
                            value={form.brand}
                            onChange={update}
                            placeholder="Your brand name"
                        />
                    </label>

                    <label>
                        Project details
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={update}
                            placeholder="Tell me what you have in mind..."
                            rows="4"
                            required
                        />
                    </label>

                    <button className="button dark" type="submit">
                        Send collaboration enquiry <ArrowUpRight size={17} />
                    </button>

                    <small className="form-note">
                        This opens your email app with your message ready to send.
                    </small>
                </form>

            </div>
        </section>
    );
}
