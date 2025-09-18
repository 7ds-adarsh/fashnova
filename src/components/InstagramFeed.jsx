'use client';
import { useEffect } from 'react';
export function InstagramFeed() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdn.lightwidget.com/widgets/lightwidget.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return (
        <section className="py-16 px-4">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8 text-white">Instagram</h2>
                <div className="lightwidget-widget">
                    <iframe
                        src="//lightwidget.com/widgets/0f4796a7261e5009a1332c9e05a00a60.html"
                        scrolling="no"
                        allowTransparency="true"
                        className="sm:scale-200 md:scale-100 xl:scale-100 lightwidget-widget rounded-lg w-full h-screen md:h-96 lg:h-96 xl:h-96"
                        style={{
                            border: 0,
                            overflow: 'hidden',
                            maxWidth: '100vw',
                            maxHeight: '100vh',
                            height: 'calc(100vw * 0.5625)',
                        }}
                    ></iframe>
                </div>
                <p className="text-center mt-8 text-muted-foreground">
                    Follow us <a href="https://www.instagram.com/fashnovajewels" target="_blank" rel="noopener noreferrer">@fashnova</a>
                </p>
            </div>
        </section>
    );
}