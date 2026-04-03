// import CreateCategory from '@/app/shared/ecommerce/category/create-category';
import PageHeader from '@/app/shared/page-header';
import { Button } from 'rizzui/button';
import { routes } from '@/config/routes';
import Link from 'next/link';
import { metaObject } from '@/config/site.config';
// import CreateEmployee from '@/app/shared/employee/create-employee';
import CreateCenter from '@/app/shared/center/create-center';

export const metadata = {
  ...metaObject('Thông Tin Trung Tâm'),
};

const pageHeader = {
  title: 'Thông Tin Trung Tâm',
  breadcrumb: [
    {
      href: routes.sanchouku.center,
      name: 'SANCHOUKU',
    },
    {
      href: routes.sanchouku.center,
      name: 'Trung Tâm',
    },
    {
      name: 'Thông Tin Trung Tâm',
    },
  ],
};

export default function CreateCenterPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.eCommerce.categories}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button as="span" className="w-full @lg:w-auto" variant="outline">
            Hủy
          </Button>
        </Link>
      </PageHeader>
      <CreateCenter />
    </>
  );
}
