export interface Report {
  id: number;
  operator_name: string;
  shift: string | null;
  hour_meter_start: number | null;
  hour_meter_end: number | null;
  created_at: string;
}

export interface ReportDetail {
  id: number;
  report_id: number;
  item_id: string;
  status: 'ok' | 'fail';
}

export interface ReportObservation {
  id: number;
  report_id: number;
  category_id: string;
  comment: string | null;
}

// Definición base del item (para mapear label)
export interface ChecklistItemDefinition {
  id: string;
  label: string;
}

// Item del checklist con estado (lo que se muestra en la tabla)
export interface ChecklistItem {
  id: string;
  label: string;
  status: 'ok' | 'fail' | null;
}

// Tipo para el reporte completo con todos sus detalles
export interface FullReport {
  report: Report;
  details: ReportDetail[];
  observations: ReportObservation[];
}
