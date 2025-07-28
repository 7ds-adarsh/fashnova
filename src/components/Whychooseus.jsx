'use client';
import { Star, Truck, Shield } from 'lucide-react';

export function WhyChooseUs() {
    const features = [
        {
            icon: Star,
            title: "Premium Quality",
            description: "Handcrafted jewelry with finest materials"
        },
        {
            icon: Truck,
            title: "Fast Delivery",
            description: "Quick and secure shipping worldwide"
        },
        {
            icon: Shield,
            title: "Secure Checkout",
            description: "Safe and encrypted payment processing"
        }
    ];

    return (
        <section className="py-16 px-4 bg-card/30">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 text-white">Why Choose Us</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gold-gradient mb-4">
                                <feature.icon className="h-8 w-8 text-accent-foreground" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}