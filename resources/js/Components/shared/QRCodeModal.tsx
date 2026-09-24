import React from 'react';
import { X, Smartphone, Wifi } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AppButton from './AppButton';

interface QRCodeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function QRCodeModal({ isOpen, onClose }: QRCodeModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2"
                    >
                        <div className="glass-card glow-border rounded-2xl p-8">
                            {/* Close button */}
                            <button
                                onClick={onClose}
                                className="absolute right-4 top-4 text-kyro-muted hover:text-kyro-primary transition-colors"
                            >
                                <X size={20} />
                            </button>

                            {/* Header */}
                            <div className="mb-6 text-center">
                                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-kyro-cyan/10">
                                    <Smartphone className="text-kyro-cyan" size={24} />
                                </div>
                                <h3 className="font-heading text-xl font-bold text-kyro-primary">
                                    Quick Connect
                                </h3>
                                <p className="mt-1 text-sm text-kyro-muted">
                                    Scan to download KyroPad on your phone
                                </p>
                            </div>

                            {/* QR Code placeholder */}
                            <div className="mx-auto mb-6 flex h-48 w-48 items-center justify-center rounded-xl bg-white p-3">
                                <div className="flex h-full w-full items-center justify-center rounded-lg bg-kyro-surface text-center">
                                    <p className="text-xs text-kyro-muted px-4">
                                        QR code will appear here once app store links are live
                                    </p>
                                </div>
                            </div>

                            {/* Steps */}
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-3 text-kyro-muted">
                                    <Wifi size={16} className="text-kyro-cyan shrink-0" />
                                    <span>Make sure your phone is on the same Wi-Fi as your PC</span>
                                </div>
                            </div>

                            <AppButton
                                variant="outline"
                                size="sm"
                                className="mt-6 w-full justify-center"
                                onClick={onClose}
                            >
                                Got it
                            </AppButton>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
