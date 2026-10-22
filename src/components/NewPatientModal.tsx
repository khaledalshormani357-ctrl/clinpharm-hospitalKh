import { useState } from 'react';
import { Patient, Language, Ward } from '../types/clinical';
import { X, UserPlus } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAddPatient: (p: Patient) => void;
  lang: Language;
}

export function NewPatientModal({ isOpen, onClose, onAddPatient, lang }: Props) {
  const [name, setName] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [mrn, setMrn] = useState(`CPH-${Math.floor(10000 + Math.random() * 90000)}`);
  const [age, setAge] = useState<number>(55);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [ward, setWard] = useState<Ward>('ICU');
  const [room, setRoom] = useState('Room-101');
  const [bed, setBed] = useState('Bed 1');
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(170);
  const [scr, setScr] = useState<number>(1.0);
  const [potassium, setPotassium] = useState<number>(4.2);
  const [sodium, setSodium] = useState<number>(138);
  const [allergiesText, setAllergiesText] = useState('No Known Drug Allergies (NKDA)');
  const [diagnosesText, setDiagnosesText] = useState('Community-Acquired Pneumonia (CAP)');
  const [physician, setPhysician] = useState('Dr. أحمد باحارث');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const allergies = allergiesText.split(',').map(s => s.trim()).filter(Boolean);
    const diagnoses = diagnosesText.split(',').map(s => s.trim()).filter(Boolean);

    // Calculate initial CrCl
    let crcl = ((140 - age) * weight) / (72 * scr);
    if (gender === 'female') crcl *= 0.85;

    const newPatient: Patient = {
      id: `pt-${Date.now()}`,
      mrn,
      name,
      nameEn: nameEn || name,
      age,
      gender,
      ward,
      room,
      bed,
      weight,
      height,
      allergies,
      diagnoses,
      admissionDate: new Date().toISOString().split('T')[0],
      attendingPhysician: physician,
      clinicalPharmacist: 'Dr. خالد الشورماني',
      status: 'stable',
      labs: {
        date: new Date().toISOString().split('T')[0],
        serumCreatinine: scr,
        potassium,
        sodium,
        crcl: Math.round(crcl * 10) / 10
      },
      activeMedications: [
        {
          id: `med-${Date.now()}-1`,
          name: 'Ceftriaxone IV',
          genericName: 'Ceftriaxone IV',
          dose: '2000 mg',
          route: 'IV Infusion',
          frequency: 'Once daily (q24h)',
          startDate: new Date().toISOString().split('T')[0],
          indication: 'Empiric CAP Coverage'
        }
      ],
      homeMedications: []
    };

    onAddPatient(newPatient);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl max-w-xl w-full p-5 sm:p-6 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[92dvh] overflow-y-auto pb-safe">
        <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mb-3 sm:hidden" />
        <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-teal-500/20 text-teal-600 rounded-xl">
              <UserPlus className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100">
              {lang === 'ar'
                ? 'إدخال مريض جديد للجولة (Inpatient Admission)'
                : 'Admit Patient for Clinical Pharmacy Rounds'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                {lang === 'ar' ? 'اسم المريض (Patient Name AR)' : 'Patient Name (Arabic)'}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="محمد عبدالله الشهري"
                className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                Patient Name (EN)
              </label>
              <input
                type="text"
                value={nameEn}
                onChange={e => setNameEn(e.target.value)}
                placeholder="Mohammed A. Al-Shehri"
                className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">MRN</label>
              <input
                type="text"
                value={mrn}
                onChange={e => setMrn(e.target.value)}
                className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Age (Years)</label>
              <input
                type="number"
                value={age}
                onChange={e => setAge(Number(e.target.value))}
                className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Sex</label>
              <select
                value={gender}
                onChange={e => setGender(e.target.value as any)}
                className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium"
              >
                <option value="male">{lang === 'ar' ? 'Male (ذكر)' : 'Male'}</option>
                <option value="female">{lang === 'ar' ? 'Female (أنثى)' : 'Female'}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Inpatient Ward</label>
              <select
                value={ward}
                onChange={e => setWard(e.target.value as any)}
                className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold"
              >
                <option value="ICU">ICU (العناية المركزة)</option>
                <option value="CCU">CCU (عناية القلب)</option>
                <option value="InternalMedicine">Internal Medicine</option>
                <option value="Surgery">General Surgery</option>
                <option value="Oncology">Oncology & Hematology</option>
                <option value="Pediatrics">Pediatrics / PICU</option>
                <option value="Nephrology">Nephrology & Dialysis</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Room</label>
              <input
                type="text"
                value={room}
                onChange={e => setRoom(e.target.value)}
                className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Bed</label>
              <input
                type="text"
                value={bed}
                onChange={e => setBed(e.target.value)}
                className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={e => setWeight(Number(e.target.value))}
                className="w-full min-h-[42px] p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={e => setHeight(Number(e.target.value))}
                className="w-full min-h-[42px] p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">SCr (mg/dL)</label>
              <input
                type="number"
                step="0.1"
                value={scr}
                onChange={e => setScr(Number(e.target.value))}
                className="w-full min-h-[42px] p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">K+ (mEq/L)</label>
              <input
                type="number"
                step="0.1"
                value={potassium}
                onChange={e => setPotassium(Number(e.target.value))}
                className="w-full min-h-[42px] p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
              Documented Drug Allergies (Comma-separated)
            </label>
            <input
              type="text"
              value={allergiesText}
              onChange={e => setAllergiesText(e.target.value)}
              className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
              Primary & Secondary Diagnoses
            </label>
            <input
              type="text"
              value={diagnosesText}
              onChange={e => setDiagnosesText(e.target.value)}
              className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
              Attending Physician
            </label>
            <input
              type="text"
              value={physician}
              onChange={e => setPhysician(e.target.value)}
              className="w-full min-h-[42px] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold"
            >
              {lang === 'ar' ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="min-h-[44px] px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold"
            >
              {lang === 'ar' ? 'إضافة المريض لـ Inpatient Rounds' : 'Admit Patient'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
