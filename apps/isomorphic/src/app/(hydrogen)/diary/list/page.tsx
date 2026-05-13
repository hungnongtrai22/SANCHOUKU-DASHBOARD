import { routes } from '@/config/routes';
// import CategoryTable from '@/app/shared/ecommerce/category/category-list/table';
import DiaryPageHeader from './diary-page-header';
import { metaObject } from '@/config/site.config';
// import EmployeeTable from '@/app/shared/employee/employee-list/table';
import DiaryTable from '@/app/shared/diary/diary-list/table';

export const metadata = {
  ...metaObject('Categories'),
};

const pageHeader = {
  title: 'SANCHOUKU',
  breadcrumb: [
    {
      href: routes.sanchouku.employeeList,
      name: 'SANCHOUKU',
    },
    {
      href: routes.sanchouku.diaryList,
      name: 'Danh Sách Nhật Ký Canh Tác',
    },
    {
      name: 'Danh Sách',
    },
  ],
};

export default function EmployeesPage() {
  return (
    <>
      <DiaryPageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      />
      <DiaryTable />
    </>
  );
}
