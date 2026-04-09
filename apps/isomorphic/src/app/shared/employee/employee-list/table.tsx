'use client';

import { categories } from '@/data/product-categories';
import Table from '@core/components/table';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import { employeeColumns } from './columns';
import TableFooter from '@core/components/table/footer';
import TablePagination from '@core/components/table/pagination';
import Filters from './filters';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

export type CategoryDataType = (typeof categories)[number];

export default function EmployeeTable() {
  const [employees, setEmployees] = useState<any>([]);
   const getAllEmployeeHandler = useCallback(
    async () => {
      // console.log("Month",date.getMonth());
      // console.log("Year",date.getFullYear());
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BE_HOST}/api/employee/list`
      );
            console.log("TEST", data.employees);

      setEmployees(data.employees);
    },
    []
    // [date]
  );

  useEffect(() => {
    getAllEmployeeHandler();
  }, []);
  const { table, setData } = useTanStackTable<any>({
    tableData: employees,
    columnConfig: employeeColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 10,
        },
      },
      meta: {
        handleDeleteRow: (row) => {
          setData((prev) => prev.filter((r) => r.id !== row.id));
        },
        handleMultipleDelete: (rows) => {
          setData((prev) => prev.filter((r) => !rows.includes(r)));
        },
      },
      enableColumnResizing: false,
    },
  });

    useEffect(() => {
  if (employees.length > 0) {
    setData(employees);
  }
}, [employees, setData]);


  return (
    <>
      <Filters table={table} />
      <Table
        table={table}
        variant="modern"
        classNames={{
          container: 'border border-muted rounded-md',
          rowClassName: 'last:border-0',
        }}
      />
      <TableFooter table={table} />
      <TablePagination table={table} className="py-4" />
    </>
  );
}
