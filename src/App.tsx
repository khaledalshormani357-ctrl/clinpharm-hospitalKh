import { useState, useEffect } from 'react';
import {
  Patient,
  ClinicalIntervention,
  ReconciliationDiscrepancy,
  Medication,
  InterventionStatus,
  LabResult
} from './types/clinical';
import { INITIAL_PATIENTS, INITIAL_INTERVENTIONS, INITIAL_DISCREPANCIES } from './lib/mockData';
import { DashboardLayout } from './components/DashboardLayout';
import { googleSignIn } from './lib/googleDrive/googleDriveAuth';

const STORAGE_KEYS = {
  PATIENTS: 'clinpharm_patients_v2',
  INTERVENTIONS: 'clinpharm_interventions_v2',
  DISCREPANCIES: 'clinpharm_discrepancies_v2'
};

function DriveOAuthBridgeView() {
  const [status, setStatus] = useState<'ready' | 'signing_in' | 'done' | 'error'>('ready');
  const [errorText, setErrorText] = useState<string>('');

  const startAuth = async () => {
    setStatus('signing_in');
    setErrorText('');
    try {
      const res = await googleSignIn();
      if (res?.accessToken) {
        setStatus('done');
        if (window.opener) {
          window.opener.postMessage(
            {
              type: 'CLINPHARM_DRIVE_OAUTH_SUCCESS',
              accessToken: res.accessToken
            },
            '*'
          );
        }
        setTimeout(() => {
          window.close();
        }, 500);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Google Sign-In failed';
      setStatus('error');
      setErrorText(msg);
      if (window.opener) {
        window.opener.postMessage(
          {
            type: 'CLINPHARM_DRIVE_OAUTH_ERROR',
            error: msg
          },
          '*'
        );
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4 text-center">
        <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center mx-auto text-teal-300 font-bold text-lg">
          G
        </div>
        <h1 className="text-base font-bold">
          ربط حساب Google Drive | ClinPharm Hospital
        </h1>
        <p className="text-xs text-slate-300 leading-relaxed">
          اضغط على الزر أدناه لتأكيد ربط حساب Google Drive عبر النطاق الموثق وإرسال التصريح تلقائياً إلى نافذة التطبيق.
        </p>

        {status === 'error' && (
          <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-200 text-xs">
            {errorText}
          </div>
        )}

        {status === 'done' ? (
          <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-bold">
            ✓ تم الاتصال بنجاح! جاري إغلاق النافذة...
          </div>
        ) : (
          <button
            type="button"
            onClick={() => void startAuth()}
            disabled={status === 'signing_in'}
            className="w-full py-3 px-4 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-slate-950 font-black text-xs sm:text-sm transition cursor-pointer"
          >
            {status === 'signing_in'
              ? 'جاري فتح نافذة Google...'
              : 'متابعة تسجيل الدخول بحساب Google'}
          </button>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const isOAuthBridge =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('drive_oauth_bridge') === '1';

  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .getRegistrations()
        .then(regs => {
          for (const reg of regs) {
            void reg.update();
          }
        })
        .catch(() => {});
    }
  }, []);

  const [patients, setPatients] = useState<Patient[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PATIENTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse saved patients from localStorage', e);
    }
    return INITIAL_PATIENTS;
  });

  const [interventions, setInterventions] = useState<ClinicalIntervention[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INTERVENTIONS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse saved interventions from localStorage', e);
    }
    return INITIAL_INTERVENTIONS;
  });

  const [discrepancies, setDiscrepancies] = useState<ReconciliationDiscrepancy[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DISCREPANCIES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse saved discrepancies from localStorage', e);
    }
    return INITIAL_DISCREPANCIES;
  });

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(patients));
    } catch {}
  }, [patients]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INTERVENTIONS, JSON.stringify(interventions));
    } catch {}
  }, [interventions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.DISCREPANCIES, JSON.stringify(discrepancies));
    } catch {}
  }, [discrepancies]);

  if (isOAuthBridge) {
    return <DriveOAuthBridgeView />;
  }

  // Handlers
  const handleAddPatient = (newPatient: Patient) => {
    setPatients(prev => [newPatient, ...prev]);
  };

  const handleAddMedication = (patientId: string, med: Medication) => {
    setPatients(prev =>
      prev.map(p => {
        if (p.id === patientId) {
          return {
            ...p,
            activeMedications: [...p.activeMedications, med]
          };
        }
        return p;
      })
    );
  };

  const handleUpdatePatientLabs = (patientId: string, updatedLabs: LabResult) => {
    setPatients(prev =>
      prev.map(p => {
        if (p.id === patientId) {
          return {
            ...p,
            labs: updatedLabs
          };
        }
        return p;
      })
    );
  };

  const handleAddIntervention = (newInt: ClinicalIntervention) => {
    setInterventions(prev => [newInt, ...prev]);
  };

  const handleUpdateInterventionStatus = (
    id: string,
    status: InterventionStatus,
    feedback?: string
  ) => {
    setInterventions(prev =>
      prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            status,
            physicianFeedback: feedback || item.physicianFeedback,
            resolvedAt: new Date().toLocaleString()
          };
        }
        return item;
      })
    );
  };

  const handleAddDiscrepancy = (disc: ReconciliationDiscrepancy) => {
    setDiscrepancies(prev => [disc, ...prev]);
  };

  const handleResolveDiscrepancy = (id: string, action: string) => {
    setDiscrepancies(prev =>
      prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            clarificationStatus: 'resolved',
            pharmacistAction: action
          };
        }
        return item;
      })
    );
  };

  return (
    <DashboardLayout
      patients={patients}
      interventions={interventions}
      discrepancies={discrepancies}
      onAddPatient={handleAddPatient}
      onAddMedication={handleAddMedication}
      onUpdatePatientLabs={handleUpdatePatientLabs}
      onAddIntervention={handleAddIntervention}
      onUpdateInterventionStatus={handleUpdateInterventionStatus}
      onAddDiscrepancy={handleAddDiscrepancy}
      onResolveDiscrepancy={handleResolveDiscrepancy}
    />
  );
}
