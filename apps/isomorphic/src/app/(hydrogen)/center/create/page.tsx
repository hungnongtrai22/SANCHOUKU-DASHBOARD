'use client';

// import CreateCategory from '@/app/shared/ecommerce/category/create-category';
import PageHeader from '@/app/shared/page-header';
import { Button } from 'rizzui/button';
import { routes } from '@/config/routes';
import Link from 'next/link';
import { metaObject } from '@/config/site.config';
// import CreateEmployee from '@/app/shared/employee/create-employee';
import CreateCenter from '@/app/shared/center/create-center';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

// export const metadata = {
//   ...metaObject('Thông Tin Trung Tâm'),
// };

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
    const [center, setCenter] = useState<any>(null);

   const getCenterHandler = useCallback(
      async () => {
        // console.log("Month",date.getMonth());
        // console.log("Year",date.getFullYear());
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BE_HOST}/api/center/list`
        );
        // console.log(data.centers[0]);
        setCenter(data.centers[0]);
  
        // setNewFarmers(data.farmers);
      },
      []
      // [date]
    );

    useEffect(() => {
    getCenterHandler();
  }, []);
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
      {center && <CreateCenter id={center._id} category={center}/>}
    </>
  );
}
