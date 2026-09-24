import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import Navbar from '@/Components/landing/Navbar';
import Hero from '@/Components/landing/Hero';
import FeatureShowcase from '@/Components/landing/FeatureShowcase';
import GestureCheatsheet from '@/Components/landing/GestureCheatsheet';
import LatencyBenchmark from '@/Components/landing/LatencyBenchmark';
import PricingCard from '@/Components/landing/PricingCard';
import FAQ from '@/Components/landing/FAQ';
import Footer from '@/Components/landing/Footer';

interface Release {
    id: number;
    version: string;
    platform: string;
    download_url: string;
    is_latest: boolean;
}

interface LandingProps {
    latestReleases: Release[];
}

export default function Landing({ latestReleases }: LandingProps) {
    return (
        <PublicLayout>
            <Navbar />
            <Hero />
            <FeatureShowcase />
            <GestureCheatsheet />
            <LatencyBenchmark />
            <PricingCard />
            <FAQ />
            <Footer />
        </PublicLayout>
    );
}
