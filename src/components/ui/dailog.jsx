import { forwardRef, useState } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/src/components/ui/utils.js';
import { Button } from '@/src/components/ui/button.jsx';
import { Input } from '@/src/components/ui/input.jsx';
import { Textarea } from '@/src/components/ui/textarea.jsx';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = forwardRef(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
        ref={ref}
        className={cn(
            "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            className
        )}
        {...props}
    />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = forwardRef(({ className, children, ...props }, ref) => (
    <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
            ref={ref}
            className={cn(
                "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
                className
            )}
            {...props}
        >
            {children}
            <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
        </DialogPrimitive.Content>
    </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }) => (
    <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }) => (
    <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = forwardRef(({ className, ...props }, ref) => (
    <DialogPrimitive.Title
        ref={ref}
        className={cn("text-lg font-semibold leading-none tracking-tight", className)}
        {...props}
    />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = forwardRef(({ className, ...props }, ref) => (
    <DialogPrimitive.Description
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

function ProductFormDialog({ open, onOpenChange, onSubmit }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        originalPrice: '',
        images: [''],
        features: [''],
        category: ''
    });
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price),
                    originalPrice: parseFloat(formData.originalPrice || 0),
                    images: formData.images.filter(img => img.trim() !== ''),
                    features: formData.features.filter(f => f.trim() !== '')
                })
            });
            if (!res.ok) throw new Error('Failed to create product');
            onSubmit();
            onOpenChange(false);
        } catch (err) {
            alert('Error adding product');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Product</DialogTitle>
                    <DialogDescription>Fill out the details below to add a new product</DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <Input placeholder="Product Name" value={formData.name} onChange={e => handleChange('name', e.target.value)} />
                    <Textarea placeholder="Description" value={formData.description} onChange={e => handleChange('description', e.target.value)} />
                    <Input placeholder="Price" type="number" value={formData.price} onChange={e => handleChange('price', e.target.value)} />
                    <Input placeholder="Original Price" type="number" value={formData.originalPrice} onChange={e => handleChange('originalPrice', e.target.value)} />
                    <Input placeholder="Category" value={formData.category} onChange={e => handleChange('category', e.target.value)} />
                </div>

                <DialogFooter>
                    <Button onClick={handleSubmit} disabled={submitting} className="gold-gradient text-background">
                        {submitting ? 'Adding...' : 'Add Product'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogClose,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
    ProductFormDialog
};
