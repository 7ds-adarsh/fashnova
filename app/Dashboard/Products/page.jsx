"use client";
import { useEffect, useState } from 'react';
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/src/components/ui/dailog";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function DashboardProducts() {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        images: [""],
        category: "",
        inStock: true,
        tags: [""],
    });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/product");
            const json = await res.json();
            if (json.success) setProducts(json.products);
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddProduct = async () => {
        setSubmitting(true);
        try {
            const data = {
                ...formData,
                price: parseFloat(formData.price),
                images: formData.images.filter((i) => i.trim() !== ""),
                tags: formData.tags.filter((t) => t.trim() !== ""),
            };

            const res = await fetch("/api/product", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await res.json();
            if (result.success) {
                await fetchProducts();
                setIsAddOpen(false);
                resetForm();
            } else {
                alert(result.message || "Error adding product.");
            }
        } catch (err) {
            console.error("Add failed:", err);
        } finally {
            setSubmitting(false);
        }
    };

    const resetForm = () =>
        setFormData({
            title: "",
            description: "",
            price: "",
            images: [""],
            category: "",
            inStock: true,
            tags: [""],
        });

    const updateArrayField = (field, index, value) => {
        const updated = [...formData[field]];
        updated[index] = value;
        setFormData((prev) => ({ ...prev, [field]: updated }));
    };

    const addArrayField = (field) =>
        setFormData((prev) => ({
            ...prev,
            [field]: [...prev[field], ""],
        }));

    const removeArrayField = (field, index) =>
        setFormData((prev) => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index),
        }));

    return (
        <div className="p-8">
            <div className="flex justify-between mb-6">
                <h1 className="text-2xl font-bold">Product Management</h1>
                <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                    <DialogTrigger asChild>
                        <Button className="gold-gradient text-background">
                            <Plus className="mr-2 h-4 w-4" /> Add Product
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Add New Product</DialogTitle>
                            <DialogDescription>Fill in product details</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                            <Label>Title</Label>
                            <Input
                                value={formData.title}
                                onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                            />

                            <Label>Description</Label>
                            <Textarea
                                value={formData.description}
                                onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                            />

                            <Label>Price ($)</Label>
                            <Input
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData((p) => ({ ...p, price: e.target.value }))}
                            />

                            <Label>Category</Label>
                            <Input
                                value={formData.category}
                                onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value }))}
                            />

                            <Label>Tags</Label>
                            {formData.tags.map((tag, i) => (
                                <div key={i} className="flex gap-2">
                                    <Input
                                        value={tag}
                                        onChange={(e) => updateArrayField("tags", i, e.target.value)}
                                    />
                                    <Button variant="ghost" onClick={() => removeArrayField("tags", i)}>−</Button>
                                </div>
                            ))}
                            <Button onClick={() => addArrayField("tags")} size="sm">+ Add Tag</Button>

                            <Label>Images</Label>
                            {formData.images.map((img, i) => (
                                <div key={i} className="flex gap-2">
                                    <Input
                                        value={img}
                                        onChange={(e) => updateArrayField("images", i, e.target.value)}
                                    />
                                    <Button variant="ghost" onClick={() => removeArrayField("images", i)}>−</Button>
                                </div>
                            ))}
                            <Button onClick={() => addArrayField("images")} size="sm">+ Add Image</Button>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.inStock}
                                    onChange={(e) => setFormData((p) => ({ ...p, inStock: e.target.checked }))}
                                />
                                <Label>In Stock</Label>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                            <Button onClick={handleAddProduct} disabled={submitting}>
                                {submitting ? "Saving..." : "Add Product"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <Card key={product._id}>
                        <CardContent className="p-4">
                            <h3 className="font-semibold text-lg">{product.title}</h3>
                            <p className="text-muted-foreground text-sm mb-2">{product.description}</p>
                            <div className="flex justify-between items-center">
                                <span className="font-bold">${product.price}</span>
                                <Badge>{product.category}</Badge>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
