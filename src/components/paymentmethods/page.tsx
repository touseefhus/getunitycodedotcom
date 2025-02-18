"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import PaymentDialog from "../paymendialogue/page";

const PaymentMethods: React.FC<{ onSelect: (method: string) => void }> = ({ onSelect }) => {
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const paymentOptions = ["Credit Card", "PayPal", "Google Pay", "Apple Pay"];

    return (
        <div className="mt-4">
            <h4 className="text-lg font-semibold text-gray-800">Select Payment Method:</h4>
            <div className="space-y-2 mt-2">
                {paymentOptions.map((method) => (
                    <label key={method} className="flex items-center space-x-3 cursor-pointer">
                        <input
                            type="radio"
                            name="payment"
                            value={method}
                            checked={selectedMethod === method}
                            onChange={() => setSelectedMethod(method)}
                            className="form-radio h-5 w-5 text-indigo-600"
                        />
                        <span className="text-gray-700">{method}</span>
                    </label>
                ))}
            </div>
            {selectedMethod && (
                <Button 
                    onClick={() => setIsDialogOpen(true)} 
                    className="mt-4 bg-indigo-600 text-white hover:bg-indigo-700 custom-btn">
                    Proceed
                </Button>
            )}

            <PaymentDialog 
                isOpen={isDialogOpen} 
                onClose={() => setIsDialogOpen(false)} 
                selectedMethod={selectedMethod} 
                onConfirm={() => { 
                    setIsDialogOpen(false); 
                    onSelect(selectedMethod!);
                }}
            />
        </div>
    );
};

export default PaymentMethods;
