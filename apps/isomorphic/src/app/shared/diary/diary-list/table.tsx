'use client';

import { categories } from '@/data/product-categories';
import Table from '@core/components/table';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import { diaryColumns } from './columns';
import TableFooter from '@core/components/table/footer';
import TablePagination from '@core/components/table/pagination';
import Filters from './filters';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

// export type CategoryDataType = (typeof any)[number];

export default function DiaryTable() {
  const [diaries, setDiaries] = useState<any>([]);
   const getAllDiariesHandler = useCallback(
    async () => {
      // console.log("Month",date.getMonth());
      // console.log("Year",date.getFullYear());
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BE_HOST}/api/diary/list`
      );
            console.log("TEST", data.diaries);

      setDiaries(data.diaries);
    },
    []
    // [date]
  );

  useEffect(() => {
    getAllDiariesHandler();
  }, []);
  const { table, setData } = useTanStackTable<any>({
    tableData: diaries,
    columnConfig: diaryColumns,
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
  if (diaries.length > 0) {
    setData(diaries);
  }
}, [diaries, setData]);


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
