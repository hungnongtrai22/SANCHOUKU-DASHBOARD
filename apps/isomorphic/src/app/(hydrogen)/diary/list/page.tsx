import { routes } from '@/config/routes';
// import CategoryTable from '@/app/shared/ecommerce/category/category-list/table';
import EmployeePageHeader from './diary-page-header';
import { metaObject } from '@/config/site.config';
import EmployeeTable from '@/app/shared/employee/employee-list/table';

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
      href: routes.sanchouku.employeeList,
      name: 'Danh Sách Thành Viên',
    },
    {
      name: 'Danh Sách',
    },
  ],
};

export default function EmployeesPage() {
  return (
    <>
      <EmployeePageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      />
      <EmployeeTable />
    </>
  );
}
