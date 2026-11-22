
export default function About() {
    return (
        <section className="section" id="about">
            <div className="container about-grid">
                <div className="about-art">
                    <img
                        src="/images/kusuma-profile.jpg"
                        alt="Portrait of Kusuma"
                    />

                    <span className="photo-tag">
                        ✧ CREATIVE MIND, CURIOUS HEART
                    </span>
                </div>

                <div>
                    <p className="eyebrow">A LITTLE ABOUT ME</p>
                    <h2>Hello, I'm <em>Kusuma.</em></h2>

                    <p className="lead">
                        I'm a UGC creator with a love for beautiful details,
                        honest storytelling and content that feels natural.
                    </p>

                    <p>
                        I create beauty, fashion and lifestyle visuals designed
                        to help brands show their products in a relatable and
                        memorable way. My approach is simple: understand the
                        story, keep the visuals intentional and make every
                        frame feel considered.
                    </p>

                    <p>
                        Whether it's a product demonstration, an unboxing or
                        an everyday lifestyle moment, I love turning simple
                        ideas into content people want to watch.
                    </p>

                    <a className="simple-link underline" href="#contact">
                        Let's create something lovely ↗
                    </a>

                    <div className="values">
                        <div><b>01</b><span>Authentic storytelling</span></div>
                        <div><b>02</b><span>Thoughtful visuals</span></div>
                        <div><b>03</b><span>Brand-first creativity</span></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
