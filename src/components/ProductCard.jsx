import { Button } from '@/src/components/ui/button.jsx';
import { Card, CardContent } from '@/src/components/ui/card.jsx';
import { ImageWithFallback } from '@/public/Fallback.jsx';

export function ProductCard({ name, price, image }) {
    return (
        <Card className="bg-card border-border hover:border-secondary transition-colors group">
            <CardContent className="p-4">
                <div className="aspect-square bg-muted/20 rounded-lg border border-border mb-4 flex items-center justify-center overflow-hidden">
                    {image ? (
                        <ImageWithFallback
                            src={image}
                            alt={name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="text-4xl text-muted-foreground">💍</div>
                    )}
                </div>
                <h3 className="font-medium text-white mb-2">{name}</h3>
                <p className="text-secondary mb-3">{price}</p>
                <Button
                    size="sm"
                    className="w-full bg-muted text-white hover:bg-secondary hover:text-secondary-foreground transition-colors"
                >
                    Add to Cart
                </Button>
            </CardContent>
        </Card>
    );
}