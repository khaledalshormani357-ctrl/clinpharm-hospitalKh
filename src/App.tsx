import { useState, useEffect } from 'react';
import { Patient, ClinicalIntervention, ReconciliationDiscrepancy, Medication, InterventionStatus } from './types/clinical';
import { INITIAL_PATIENTS, INITIAL_INTERVENTIONS, INITIAL_DISCREPANCIES } from './lib/mockData';
import { DashboardLayout } from './components/DashboardLayout';

const STORAGE_KEYS = {
  PATIENTS: 'clinpharm_patients_v2',
  INTERVENTIONS: 'clinpharm_interventions_v2',
  DISCREPANCIES: 'clinpharm_discrepancies_v2',
};

export default function App() {
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
    } catch (e) {}
  }, [patients]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INTERVENTIONS, JSON.stringify(interventions));
    } catch (e) {}
  }, [interventions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.DISCREPANCIES, JSON.stringify(discrepancies));
    } catch (e) {}
  }, [discrepancies]);

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

  const handleAddIntervention = (newInt: ClinicalIntervention) => {
    setInterventions(prev => [newInt, ...prev]);
  };

  const handleUpdateInterventionStatus = (id: string, status: InterventionStatus, feedback?: string) => {
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
      onAddIntervention={handleAddIntervention}
      onUpdateInterventionStatus={handleUpdateInterventionStatus}
      onAddDiscrepancy={handleAddDiscrepancy}
      onResolveDiscrepancy={handleResolveDiscrepancy}
    />
  );
}
