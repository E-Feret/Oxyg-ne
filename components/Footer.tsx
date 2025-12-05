import Link from "next/link";
import Image from "next/image";
import { Anton } from 'next/font/google';

const anton = Anton({ weight: '400', subsets: ['latin'], display: 'swap' });

export default function Footer() {
    return (
        // AJOUT DE 'pb-32' : On augmente le padding-bottom (pb-8 -> pb-32)
        // Cela crée un espace vide en bas du footer pour que le Player Audio (fixed) ne cache rien.
        <footer className="bg-oxy-blue border-t-4 border-oxy-orange pt-16 pb-32 text-white">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* COL 1: BRAND & STANDARD */}
                <div className="space-y-6">
                    <div className="space-y-4">
                        <div className="relative w-32 h-12">
                            <Image src="/assets/logo/logo.webp" alt="Radio Oxygène" fill className="object-contain object-left" />
                        </div>
                        <p className="text-white/90 text-sm leading-relaxed">
                            Contact Oxygène la radio de la Seine-et-Marne
                        </p>
                    </div>

                    <div className="space-y-2 text-sm text-white/80">
                        <p><span className="text-oxy-orange font-bold">Standard Jeux :</span> 01 60 96 23 16</p>
                        <p><span className="text-oxy-orange font-bold">Email :</span> info@radiooxygene.fr</p>
                    </div>
                </div>

                {/* COL 2: AGENCES (ADRESSES) */}
                <div>
                    <h3 className={`${anton.className} text-xl !text-oxy-orange uppercase mb-4`}>Nos Agences</h3>
                    <div className="space-y-6 text-sm text-white/80">
                        <div>
                            <p className="font-bold text-white mb-1">Agence de Melun</p>
                            <p>16C Boulevard Chamblain</p>
                            <p>77000 MELUN</p>
                        </div>
                        <div>
                            <p className="font-bold text-white mb-1">Agence de Meaux</p>
                            <p>32 Av. Jean Bureau</p>
                            <p>77100 MEAUX</p>
                        </div>
                    </div>
                </div>

                {/* COL 3: CONTACTS COMMERCIAUX */}
                <div>
                    <h3 className={`${anton.className} text-xl !text-oxy-orange uppercase mb-4`}>Contacts Pub</h3>
                    <div className="space-y-4 text-sm text-white/80">
                        <div>
                            <p className="font-bold text-white text-xs uppercase mb-1">Meaux & Nord 77</p>
                            <p>Charlène BOSSAERT</p>
                            <a href="mailto:charlene@radiooxygene.fr" className="text-oxy-orange hover:underline block">charlene@radiooxygene.fr</a>
                        </div>
                        <div>
                            <p className="font-bold text-white text-xs uppercase mb-1">Coulommiers & Provins</p>
                            <p>Sébastien LATTANZIO</p>
                            <a href="mailto:sebastien@radiooxygene.fr" className="text-oxy-orange hover:underline block">sebastien@radiooxygene.fr</a>
                        </div>
                        <div>
                            <p className="font-bold text-white text-xs uppercase mb-1">Melun & Sud 77</p>
                            <p>Alexandra BEAULIEU</p>
                            <a href="mailto:alexandra@radiooxygene.fr" className="text-oxy-orange hover:underline block">alexandra@radiooxygene.fr</a>
                        </div>
                    </div>
                </div>

                {/* COL 4: NAVIGATION & LEGAL */}
                <div>
                    <h3 className={`${anton.className} text-xl !text-oxy-orange uppercase mb-4`}>Navigation</h3>
                    <ul className="space-y-2 mb-6 text-sm">
                        <li><Link href="/" className="text-white/80 hover:text-oxy-orange transition-colors">Accueil</Link></li>
                        <li><Link href="/equipe" className="text-white/80 hover:text-oxy-orange transition-colors">Équipe</Link></li>
                        <li><Link href="/podcasts" className="text-white/80 hover:text-oxy-orange transition-colors">Podcasts</Link></li>
                        <li><Link href="/contact" className="text-white/80 hover:text-oxy-orange transition-colors">Contact</Link></li>
                    </ul>

                    <h3 className={`${anton.className} text-xl !text-oxy-orange uppercase mb-4`}>Infos</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/mentions-legales" className="text-white/80 hover:text-white transition-colors">Mentions Légales</Link></li>
                        <li><Link href="/confidentialite" className="text-white/80 hover:text-white transition-colors">Confidentialité</Link></li>
                    </ul>
                </div>
            </div>

            {/* COPYRIGHT */}
            <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-white/10 text-center">
                <p className="text-white/60 text-sm">
                    &copy; {new Date().getFullYear()} Radio Oxygène. Tous droits réservés.
                </p>
            </div>
        </footer>
    );
}