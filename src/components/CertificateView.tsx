import React, { useState } from 'react';
import { Course } from '../types';
import { BrandLogo } from './BrandLogo';
import { 
  Award, 
  Printer, 
  X, 
  ShieldCheck, 
  Download, 
  CheckCircle,
  Share2
} from 'lucide-react';

interface CertificateViewProps {
  course: Course;
  studentName: string;
  onUpdateStudentName: (name: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  course,
  studentName,
  onUpdateStudentName,
  isOpen,
  onClose
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(studentName || 'Moussa Ndiaye');

  if (!isOpen) return null;

  const certificateNumber = `ECG-${course.id.toUpperCase().slice(0, 4)}-${Math.floor(100000 + Math.random() * 900000)}`;
  const issuanceDate = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden my-4 border border-slate-200">
        {/* Modal Controls Bar (Hidden on print) */}
        <div className="no-print bg-[#0A2540] text-white p-4 px-6 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h2 className="text-sm font-bold text-white">
              Attestation Officielle de Fin de Formation
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimer / Télécharger en PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Student Name Editor bar (No print) */}
        <div className="no-print bg-amber-50/80 border-b border-amber-200/80 px-6 py-2.5 flex items-center justify-between text-xs text-amber-900">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Nom figurant sur l'attestation :</span>
            {isEditingName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="px-2 py-1 bg-white border border-amber-300 rounded text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <button
                  onClick={() => {
                    onUpdateStudentName(tempName);
                    setIsEditingName(false);
                  }}
                  className="px-2 py-1 bg-amber-600 text-white rounded font-bold"
                >
                  Valider
                </button>
              </div>
            ) : (
              <span className="font-bold text-slate-900 underline">
                {studentName || 'Moussa Ndiaye'}
              </span>
            )}
          </div>

          {!isEditingName && (
            <button
              onClick={() => setIsEditingName(true)}
              className="text-amber-800 hover:text-amber-950 font-semibold underline"
            >
              Modifier le nom
            </button>
          )}
        </div>

        {/* THE PRINTABLE CERTIFICATE CANVAS */}
        <div 
          id="printable-certificate"
          className="p-8 sm:p-14 bg-[#FCFBF8] text-slate-900 border-[12px] border-[#0A2540] relative overflow-hidden select-none"
        >
          {/* Inner Golden Border */}
          <div className="border-2 border-amber-500/60 p-6 sm:p-10 relative">
            {/* Watermark Logo in background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-4 pointer-events-none">
              <Award className="w-96 h-96 text-[#0A2540]" />
            </div>

            {/* Corner Ornamental Accents */}
            <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-amber-500" />
            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-amber-500" />
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-amber-500" />
            <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-amber-500" />

            {/* Top Brand Header */}
            <div className="text-center space-y-3 pb-6 border-b border-slate-200">
              <div className="flex justify-center">
                <BrandLogo size="lg" />
              </div>
              <p className="text-xs font-semibold tracking-widest uppercase text-slate-500">
                Organisme International de Conseil, Formation & Accompagnement
              </p>
            </div>

            {/* Certificate Title */}
            <div className="text-center py-8 space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-amber-600">
                Certificat de Réussite & Attestation Officielle
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-[#0A2540] tracking-tight">
                ATTESTATION DE FORMATION
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 italic max-w-lg mx-auto">
                Le Cabinet Ephata Consulting Group certifie par la présente que :
              </p>
            </div>

            {/* Recipient Name */}
            <div className="text-center py-2">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0A2540] tracking-wide border-b-2 border-amber-400 inline-block px-8 pb-1">
                {studentName || 'Moussa Ndiaye'}
              </div>
            </div>

            {/* Program Name */}
            <div className="text-center py-6 space-y-2 max-w-2xl mx-auto">
              <p className="text-xs sm:text-sm text-slate-600">
                a suivi avec assiduité et validé avec succès l'ensemble des modules du programme :
              </p>
              <h3 className="text-xl sm:text-2xl font-black text-amber-600 leading-snug">
                {course.title}
              </h3>
              <p className="text-xs text-slate-500">
                Volume horaire équivalent : <span className="font-bold text-slate-700">{course.totalHours}</span> · Modalité : En ligne avec évaluations continues
              </p>
            </div>

            {/* Bottom Signatures & Seal */}
            <div className="pt-8 mt-6 border-t border-slate-200 grid grid-cols-3 items-end text-center">
              {/* Left: Issuance date & serial number */}
              <div className="text-left space-y-1">
                <p className="text-[11px] text-slate-500">
                  Délivré le : <span className="font-semibold text-slate-800">{issuanceDate}</span>
                </p>
                <p className="text-[10px] text-slate-400 font-mono">
                  Identifiant : {certificateNumber}
                </p>
                <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Certificat Authentifié & Vérifiable</span>
                </div>
              </div>

              {/* Center: Gold Seal */}
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full border-4 border-amber-500 bg-amber-50 flex flex-col items-center justify-center p-1 shadow-inner text-[#0A2540]">
                  <Award className="w-7 h-7 text-amber-600" />
                  <span className="text-[8px] font-black uppercase tracking-tighter text-amber-800">
                    Sceau Officiel
                  </span>
                  <span className="text-[7px] text-slate-600">Ephata Group</span>
                </div>
              </div>

              {/* Right: Direction Signature */}
              <div className="text-right space-y-1">
                <div className="italic font-serif text-slate-800 text-lg font-bold">
                  Alouise Emmanuel Diouf
                </div>
                <div className="h-0.5 w-36 bg-amber-500 ml-auto" />
                <p className="text-[11px] font-bold text-[#0A2540]">
                  Alouise Emmanuel Diouf
                </p>
                <p className="text-[10px] text-amber-700 font-semibold">
                  Directeur de la Formation
                </p>
                <p className="text-[9px] text-slate-500">
                  Ephata Consulting Group
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
