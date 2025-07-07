"use client";

import { useState, useEffect } from 'react';
import { Download, Check, Smartphone } from 'lucide-react';

const InstallAppButton = () => {
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  useEffect(() => {
    // Sjekk om appen allerede er installert
    const checkIfStandalone = () => {
      const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches;
      const isIosStandalone = (window.navigator as any).standalone === true;
      setIsStandalone(isStandaloneMode || isIosStandalone);
    };

    checkIfStandalone();

    // Lytt etter install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    // Lytt etter appen blir installert
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    
    setInstallPrompt(null);
  };

  // Vis ikke knappen hvis appen allerede kjører som standalone
  if (isStandalone) return null;

  // Vis suksess-melding hvis nettopp installert
  if (isInstalled) {
    return (
      <button className="flex items-center gap-2 px-3 py-2 text-sm bg-green-100 text-green-800 rounded-lg cursor-default">
        <Check className="h-4 w-4" />
        <span className="hidden sm:inline">App installert!</span>
      </button>
    );
  }

  // Vis installasjon-knapp hvis tilgjengelig
  if (installPrompt) {
    return (
      <button
        onClick={handleInstallClick}
        className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        title="Installer appen på enheten din"
      >
        <Download className="h-4 w-4" />
        <span className="hidden sm:inline">Installer app</span>
      </button>
    );
  }

  // Fallback for iOS Safari (som ikke støtter installPrompt)
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowIOSInstructions(!showIOSInstructions)}
          className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          title="Se hvordan du installerer på iOS"
        >
          <Smartphone className="h-4 w-4" />
          <span className="hidden sm:inline">Installer</span>
        </button>
        
        {showIOSInstructions && (
          <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg p-4 shadow-lg z-50 w-64 text-sm text-gray-700">
            <div className="font-semibold mb-2">Installer på iOS:</div>
            <ol className="list-decimal list-inside space-y-1">
              <li>Trykk Del-knappen (⬆️) nederst</li>
              <li>Scroll ned og velg &quot;Legg til på hjemmeskjermen&quot;</li>
              <li>Trykk &quot;Legg til&quot; øverst til høyre</li>
            </ol>
            <button 
              onClick={() => setShowIOSInstructions(false)}
              className="mt-3 text-blue-600 hover:text-blue-800 text-xs"
            >
              Lukk
            </button>
          </div>
        )}
      </div>
    );
  }

  // Vis alltid en knapp for testing (i utviklingsmodus)
  if (process.env.NODE_ENV === 'development') {
    return (
      <button
        className="flex items-center gap-2 px-3 py-2 text-sm bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
        title="PWA ikke tilgjengelig i dev-mode"
      >
        <Download className="h-4 w-4" />
        <span className="hidden sm:inline">Installer (dev)</span>
      </button>
    );
  }

  // Ingen knapp hvis ikke støttet
  return null;
};

export default InstallAppButton;
