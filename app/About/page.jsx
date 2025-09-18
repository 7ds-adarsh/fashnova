'use client';
import { ImageWithFallback } from '@/public/Fallback.jsx';
import { Button } from '@/src/components/ui/button.jsx';

export default function About() {
    return (
        <main className="py-20">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary/20 to-transparent py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="mb-6">About Fashnova</h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            Where luxury meets innovation. We curate the finest fashion pieces for the modern connoisseur.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="mb-6">Our Story</h2>
                            <p className="text-muted-foreground mb-6">
                                Founded in 2020, Fashnova emerged from a passion for luxury fashion and a vision to make high-end style accessible to fashion enthusiasts worldwide. Our journey began with a simple belief: everyone deserves to feel extraordinary.
                            </p>
                            <p className="text-muted-foreground mb-6">
                                We carefully curate each piece in our collection, working directly with renowned designers and emerging talents to bring you exclusive, premium fashion that speaks to your individual style.
                            </p>
                            <Button onClick={() => window.location.href = '/Shop'} className="gold-gradient text-background">Explore Our Collection</Button>
                        </div>
                        <div className="relative">
                            <ImageWithFallback
                                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
                                alt="Luxury fashion store interior"
                                className="rounded-lg shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 bg-card/50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="mb-6">Our Values</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            These core principles guide everything we do at Fashnova.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Quality Excellence",
                                description: "We source only the finest materials and work with skilled artisans to ensure every piece meets our exacting standards."
                            },
                            {
                                title: "Sustainable Luxury",
                                description: "We're committed to responsible fashion, supporting sustainable practices and ethical manufacturing processes."
                            },
                            {
                                title: "Customer Experience",
                                description: "Your satisfaction is our priority. We provide personalized service and support throughout your fashion journey."
                            }
                        ].map((value, index) => (
                            <div key={index} className="text-center p-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-full mx-auto mb-6 flex items-center justify-center">
                                    <span className="text-2xl">✨</span>
                                </div>
                                <h3 className="mb-4">{value.title}</h3>
                                <p className="text-muted-foreground">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="mb-6">Meet Our Team</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            The passionate individuals behind Fashnova's success.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: "Sofia Chen", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1494790108755-2616b612b9c5?w=300&h=300&fit=crop&crop=face" },
                            { name: "Marcus Rodriguez", role: "Head of Design", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face" },
                            { name: "Emma Thompson", role: "Style Director", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face" }
                        ].map((member, index) => (
                            <div key={index} className="text-center">
                                <ImageWithFallback
                                    src={member.image}
                                    alt={member.name}
                                    className="w-48 h-48 rounded-full mx-auto mb-6 object-cover"
                                />
                                <h3 className="mb-2">{member.name}</h3>
                                <p className="text-muted-foreground">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}