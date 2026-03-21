import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import CreateEditProduct from '@/app/shared/ecommerce/product/create-edit';
import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/page-header';
import { Button } from 'rizzui/button';
import { routes } from '@/config/routes';
import CreateEditFarmer from '@/app/shared/ecommerce/farmer/create-edit';

export const metadata = {
  ...metaObject('Tạo Nông Dân'),
};

const pageHeader = {
  title: 'Tạo Nông Dân',
  breadcrumb: [
    {
      href: routes.farmer.farmerList,
      name: 'Sản Xuất',
    },
    {
      href: routes.farmer.farmerCreate,
      name: 'Nông Dân',
    },
    {
      name: 'Tạo',
    },
  ],
};

export default function CreateFarmerPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.eCommerce.createProduct}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button as="span" className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Thêm Nông Dân
          </Button>
        </Link>
      </PageHeader>

      <CreateEditFarmer />
    </>
  );
}
