"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import LoginPage from "@/components/auth/login";
import RegisterPage from "@/components/auth/register";

interface AuthDialogProps {
    isDialogOpen: boolean;
    setIsDialogOpen: (open: boolean) => void;
}

const AuthDialog: React.FC<AuthDialogProps> = ({ isDialogOpen, setIsDialogOpen }) => {
    const [isLogin, setIsLogin] = useState<boolean>(true); // Toggle between Login and Register

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isLogin ? "Login" : "Register"}</DialogTitle>
                </DialogHeader>
                {isLogin ? (
                    <LoginPage onSwitch={() => setIsLogin(false)} onClose={() => setIsDialogOpen(false)} />
                ) : (
                    <RegisterPage onSwitch={() => setIsLogin(true)} onClose={() => setIsDialogOpen(false)} />
                )}
            </DialogContent>
        </Dialog>
    );
};

export default AuthDialog;
