"use client";

import React from "react";
import styles from "./DataTable.module.css";

export interface Column<T = Record<string, unknown>> {
  key: string;
  label: string;
  width?: string;
  render?: (value: unknown, row: T) => React.ReactNode;
}

export interface DataTableProps<T = Record<string, unknown>> {
  columns: Column<T>[];
  data: T[];
  rowKey: string;
  loading?: boolean;
  emptyText?: string;
}

export default function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  rowKey,
  loading = false,
  emptyText = "데이터가 없습니다",
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <div className={styles.empty}>{emptyText}</div>;
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                style={{ width: column.width }}
                className={styles.th}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={String(row[rowKey])} className={styles.tr}>
              {columns.map((column) => (
                <td
                  key={`${String(row[rowKey])}-${column.key}`}
                  className={styles.td}
                >
                  {column.render
                    ? column.render(row[column.key], row)
                    : String(row[column.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
