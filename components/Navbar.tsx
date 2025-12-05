"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Play, ChevronDown } from "lucide-react";
import NavNewItem from "./NavNewItem";
import MegaMenuOverlay from "./MegaMenuOverlay";
import { useAudio } from "@/context/AudioContext";
import Image from "next/image";
import { Anton } from 'next/font/google';

const anton = Anton({ weight: '400', subsets: ['latin'], display: 'swap' });

const NAVI_LINKS = [
    { label: "Accueil", href: "/" },
    {
        label: "Actualités",
        href: "/actus",
        submenu: [
            { label: "Melun", href: "/actus/melun" },
            { label: "Meaux", href: "/actus/meaux" },
            { label: "Provins", href: "/actus/provins" },
            { label: "Sud 77", href: "/actus/sud-77" },
        ]
    },
    { label: "Émissions", href: "/emissions" },
    { label: "Podcasts", href: "/podcasts" },
    { label: "Vidéos", href: "/videos" },
    { label: "Équipe", href: "/equipe" },
    { label: "Jeux", href: "/jeux" },
    { label: "Agenda", href: "/agenda" },
    { label: "Contact", href: "/contact" },
    { label: "Fréquences", href: "/frequences" },
];

export default function Navbar() {
    const { isPlaying, togglePlay } = useAudio();
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const isActive = (href: string) => pathname === href;

    return (
        <nav
            className={`sticky top-0 z-40 w-full transition-all duration-300 shadow-md bg-gradient-oxy-blue h-16`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex items-center justify-between h-full">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center z-50">
                        <Link href="/" className="flex items-center gap-2 group" onClick={() => setIsOpen(false)}>
                            <div className="relative w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                                <Image
                                    src="/assets/logo/logo.webp"
                                    alt="Oxygène Logo"
                                    width={32}
                                    height={32}
                                    className="object-contain"
                                    priority
                                />
                            </div>
                            <span className="text-xl font-black text-white tracking-tighter italic group-hover:text-oxy-orange transition-colors">
                                OXYGÈNE
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-4">
                        {NAVI_LINKS.map((link) => (
                            <div key={link.label} className="relative group">
                                <Link
                                    href={link.href}
                                    className={`px-3 py-1.5 rounded-full text-sm font-bold transition-all flex items-center gap-1 ${isActive(link.href)
                                        ? "text-oxy-orange bg-white/10"
                                        : "text-white/90 hover:text-oxy-orange hover:bg-white/10"
                                        }`}
                                    onMouseEnter={() => setHoveredItem(link.label)}
                                >
                                    {link.label}
                                    {link.submenu && (
                                        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${hoveredItem === link.label ? "rotate-180" : ""}`} />
                                    )}
                                </Link>

                                {/* Mega Menu Overlay */}
                                {link.submenu && hoveredItem === link.label && (
                                    <div
                                        className="absolute top-full left-0 w-[600px] pt-4"
                                        onMouseLeave={() => setHoveredItem(null)}
                                    >
                                        <MegaMenuOverlay
                                            isOpen={true}
                                            items={link.submenu}
                                            category={link.label}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden lg:flex items-center">
                        <button
                            onClick={togglePlay}
                            className="flex items-center gap-2 px-4 py-1.5 bg-oxy-orange text-white rounded-full text-xs font-bold hover:bg-oxy-orange/90 transition-all transform hover:scale-105 shadow-lg shadow-oxy-orange/20 group"
                        >
                            {isPlaying ? (
                                <div className="w-3 h-3 flex items-center justify-center">
                                    <span className="block w-0.5 h-2 bg-white rounded-full animate-bounce mr-0.5" style={{ animationDelay: '0s' }}></span>
                                    <span className="block w-0.5 h-3 bg-white rounded-full animate-bounce mr-0.5" style={{ animationDelay: '0.1s' }}></span>
                                    <span className="block w-0.5 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                </div>
                            ) : (
                                <Play className="w-3 h-3 fill-current group-hover:text-white transition-colors" />
                            )}
                            {isPlaying ? "En direct" : "Écouter"}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex lg:hidden z-50">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? (
                                <X className="h-8 w-8 text-white" />
                            ) : (
                                <Menu className="h-8 w-8 text-white" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* FULL SCREEN MOBILE MENU OVERLAY */}
            <div
                className={`fixed inset-0 z-40 bg-oxy-blue/98 backdrop-blur-xl transition-all duration-500 flex flex-col items-center justify-center ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
                    }`}
            >
                {/* Background Decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-oxy-orange/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                </div>

                {/* Links Container */}
                <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-md px-6">
                    {NAVI_LINKS.map((link, index) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={`${anton.className} text-3xl md:text-4xl text-white hover:text-oxy-orange transition-all duration-300 transform hover:scale-110 uppercase tracking-wide opacity-0 animate-in slide-in-from-bottom-4 fade-in fill-mode-forwards`}
                            style={{
                                animationDelay: `${isOpen ? index * 50 + 100 : 0}ms`,
                                animationDuration: '500ms'
                            }}
                        >
                            {link.label}
                        </Link>
                    ))}

                    {/* Mobile Play Button */}
                    <button
                        onClick={() => {
                            togglePlay();
                            setIsOpen(false);
                        }}
                        className="mt-8 flex items-center gap-3 px-8 py-4 bg-oxy-orange text-white rounded-full text-xl font-bold shadow-xl shadow-oxy-orange/30 active:scale-95 transition-transform animate-in slide-in-from-bottom-8 fade-in fill-mode-forwards"
                        style={{ animationDelay: `${isOpen ? NAVI_LINKS.length * 50 + 200 : 0}ms` }}
                    >
                        {isPlaying ? (
                            <div className="flex gap-1 h-6 items-end">
                                <span className="w-1.5 bg-white rounded-full animate-bounce h-3" />
                                <span className="w-1.5 bg-white rounded-full animate-bounce h-5" style={{ animationDelay: '0.1s' }} />
                                <span className="w-1.5 bg-white rounded-full animate-bounce h-4" style={{ animationDelay: '0.2s' }} />
                            </div>
                        ) : (
                            <Play className="w-6 h-6 fill-current" />
                        )}
                        {isPlaying ? "En Direct" : "Écouter le Direct"}
                    </button>
                </div>
            </div>
        </nav>
    );
}
