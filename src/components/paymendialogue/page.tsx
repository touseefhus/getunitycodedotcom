"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface PaymentDialogProps {
    isOpen: boolean;
    onClose: () => void;
    selectedMethod: string | null;
    onConfirm: () => void;
}

const PaymentDialog: React.FC<PaymentDialogProps> = ({ isOpen, onClose, selectedMethod, onConfirm }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    const sendEmail = async () => {
        try {
            const response = await fetch('/api/sendEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: email,
                    subject: 'Invoice Payment Confirmation',
                    text: `Hello ${name},\n\nThank you for your payment using ${selectedMethod}.\n\nAddress: ${address}\n\nBest Regards, \nYour Company`,
                }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            console.log("Email sent successfully");
            alert("Invoice sent successfully!");
        } catch (error) {
            console.error("Failed to send email", error);
            alert("Failed to send email");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm Payment</DialogTitle>
                </DialogHeader>
                <p>Are you sure you want to proceed with {selectedMethod}?</p>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name">Name</label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="address">Address (Optional)</label>
                            <Input
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                    </div>
                </form>
                <DialogFooter>
                    <Button className="mx-4" variant="outline" onClick={onClose}>Cancel</Button>
                    <Button className="bg-indigo-600 text-white custom-btn" onClick={sendEmail}>
                        Generate Invoice & Send Email
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default PaymentDialog;