import React from 'react';
import { Monitor, Smartphone, QrCode, Download } from 'lucide-react';
import AppButton from '@/Components/shared/AppButton';

interface DownloadCTAsProps {
    onQrClick: () => void;
}

export default function DownloadCTAs({ onQrClick }: DownloadCTAsProps) {
    const trackDownload = async (platform: string) => {
        try {
            await fetch('/track', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content ?? '',
                },
                body: JSON.stringify({ platform }),
            });
        } catch {
            // Tracking failure is non-critical; never block the download
        }
    };

    return (
        <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Windows Server */}
            <AppButton
                variant="primary"
                size="lg"
                as="a"
                href="#"
                leftIcon={<Monitor size={18} />}
                onClick={() => trackDownload('windows')}
            >
                Download for Windows
            </AppButton>

            {/* App Store */}
            <AppButton
                variant="outline"
                size="lg"
                as="a"
                href="#"
                leftIcon={
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                }
                onClick={() => trackDownload('ios')}
            >
                App Store
            </AppButton>

            {/* Google Play */}
            <AppButton
                variant="outline"
                size="lg"
                as="a"
                href="#"
                leftIcon={
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                        <path d="M3,20.5v-17c0-0.83,0.94-1.3,1.6-0.8l14,8.5c0.6,0.36,0.6,1.24,0,1.6l-14,8.5C3.94,21.8,3,21.33,3,20.5z" />
                    </svg>
                }
                onClick={() => trackDownload('android')}
            >
                Google Play
            </AppButton>

            {/* APK direct */}
            <AppButton
                variant="ghost"
                size="lg"
                as="a"
                href="#"
                leftIcon={<Download size={16} />}
                onClick={() => trackDownload('apk')}
            >
                Direct APK
            </AppButton>

            {/* QR Code */}
            <AppButton
                variant="ghost"
                size="lg"
                leftIcon={<QrCode size={16} />}
                onClick={onQrClick}
            >
                QR Connect
            </AppButton>
        </div>
    );
}
