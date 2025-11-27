import { Report, ReportDetail, ReportObservation, FullReport, ChecklistItem, ChecklistItemDefinition } from '../types';

// URL base de la API
const API_BASE_URL = 'https://scooptram-backend-v1.rj.r.appspot.com/api/reports';

const checklistLabels: ChecklistItemDefinition[] = [
  // 1. Antes de Arrancar (Pre-start)
  { id: 'p1', label: 'Verificar niveles de aceite' },
  { id: 'p2', label: 'Llenar tanque de combustible' },
  { id: 'p3', label: 'Limpieza de enfriadores' },
  { id: 'p4', label: 'Limpieza de filtros de aire' },
  { id: 'p5', label: 'Chequear presión y desgaste de llantas' },
  { id: 'p6', label: 'Estado de articulación central' },
  { id: 'p7', label: 'Estado de lampón y cantoneras' },
  { id: 'p8', label: 'Lubricar puntos de articulación' },
  { id: 'p9', label: 'Verificar alternador, fajas y poleas' },
  { id: 'p10', label: 'Bornes y electrolito de baterías' },
  { id: 'p11', label: 'Barra de seguridad articulación central' },
  { id: 'p12', label: 'Condiciones del extintor' },

  // 2. Después de Arrancar (Running)
  { id: 'r1', label: 'Presión de transmisión (240-280 PSI)' },
  { id: 'r2', label: 'Temperatura de convertidor (180-250 °F)' },
  { id: 'r3', label: 'Presión de sistema de Frenos (1200-1500 PSI)' },
  { id: 'r4', label: 'Presión de aceite de motor' },
  { id: 'r5', label: 'Nivel y presión aceite transmisión' },
  { id: 'r6', label: 'Operatividad freno de servicio' },
  { id: 'r7', label: 'Selector de marcha, levante y volteo' },
  { id: 'r8', label: 'Verificar freno de emergencia' },
  { id: 'r9', label: 'Luces, claxon y alarma retroceso' },
  { id: 'r10', label: 'Estado de catalizador (PTX)' },

  // 3. Al Final del Turno (End-shift)
  { id: 'e1', label: 'Tacos de madera para llantas' },
  { id: 'e2', label: 'Reportar fugas de aceite' },
  { id: 'e3', label: 'Estacionar en lugar seguro' },
  { id: 'e4', label: 'Aplicar freno parqueo y apagar' },
  { id: 'e5', label: 'Señalizar con conos de seguridad' },
];

// Interfaz para la respuesta de la lista de reportes
interface ApiReportListItem {
  id: number;
  operator_name: string;
  shift: string | null;
  created_at: string;
}

// Interfaz para la respuesta del detalle del reporte
interface ApiReportDetail {
  id: number;
  operator_name: string;
  shift: string | null;
  hour_meter_start: number | null;
  hour_meter_end: number | null;
  created_at: string;
  inspection: Array<{ item_id: string; status: 'ok' | 'fail' }>;
  observations: Array<{ category_id: string; comment: string | null }>;
}

// Obtener todos los reportes desde la API
export const getAllReports = async (): Promise<Report[]> => {
  const response = await fetch(API_BASE_URL);
  
  if (!response.ok) {
    throw new Error('Error al obtener los reportes');
  }
  
  const data: ApiReportListItem[] = await response.json();
  
  // Mapear la respuesta al tipo Report
  return data.map(item => ({
    id: item.id,
    operator_name: item.operator_name,
    shift: item.shift,
    hour_meter_start: null, // No viene en el listado
    hour_meter_end: null,   // No viene en el listado
    created_at: item.created_at
  }));
};

// Obtener reporte completo con todos sus datos desde la API
export const getFullReport = async (reportId: number): Promise<FullReport | null> => {
  const response = await fetch(`${API_BASE_URL}/${reportId}`);
  
  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error('Error al obtener el reporte');
  }
  
  const data: ApiReportDetail = await response.json();
  
  // Mapear la respuesta a los tipos internos
  const report: Report = {
    id: data.id,
    operator_name: data.operator_name,
    shift: data.shift,
    hour_meter_start: data.hour_meter_start,
    hour_meter_end: data.hour_meter_end,
    created_at: data.created_at
  };
  
  const details: ReportDetail[] = data.inspection.map((item, index) => ({
    id: index + 1,
    report_id: data.id,
    item_id: item.item_id,
    status: item.status
  }));
  
  const observations: ReportObservation[] = data.observations.map((obs, index) => ({
    id: index + 1,
    report_id: data.id,
    category_id: obs.category_id,
    comment: obs.comment
  }));
  
  return {
    report,
    details,
    observations
  };
};

// Mapear detalles de la API a items del checklist con label y status
export const mapDetailsToChecklistItems = (details: ReportDetail[]): ChecklistItem[] => {
  return details.map(detail => {
    const labelDef = checklistLabels.find(l => l.id === detail.item_id);
    return {
      id: detail.item_id,
      label: labelDef?.label || detail.item_id,
      status: detail.status
    };
  });
};

// Helper para obtener el label de estado de observación
export const getObservationStatusLabel = (categoryId: string): string => {
  const labels: Record<string, string> = {
    'pre-start': '1. Antes de Arrancar',
    'running': '2. Después de Arrancar',
    'end-shift': '3. Al Final del Turno'
  };
  return labels[categoryId] || categoryId;
};
