import { DashboardCardItemColumn } from "./DashboardCardItemColumn";

export interface DashboardCardItem {
  key: string;

  columns: DashboardCardItemColumn[];
}
