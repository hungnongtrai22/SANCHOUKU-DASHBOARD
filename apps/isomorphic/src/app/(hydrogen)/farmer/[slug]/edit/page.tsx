import Link from 'next/link';
import { Metadata } from 'next';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
import { PiPlusBold } from 'react-icons/pi';
import { productData } from '@/app/shared/ecommerce/product/create-edit/form-utils';
// import CreateEditProduct from '@/app/shared/ecommerce/product/create-edit';
import PageHeader from '@/app/shared/page-header';
import { metaObject } from '@/config/site.config';
import { Button } from 'rizzui/button';
import { routes } from '@/config/routes';
import CreateEditFarmer from '@/app/shared/ecommerce/farmer/create-edit';

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * for dynamic metadata
 * @link: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const slug = (await params).slug;

  return metaObject(`Edit ${slug}`);
}

const pageHeader = {
  title: 'Chỉnh Sửa Nông Dân',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'E-Commerce',
    },
    {
      href: routes.eCommerce.products,
      name: 'Products',
    },
    {
      name: 'Edit',
    },
  ],
};

export default async function EditFarmerPage({ params }: any) {
  const slug = (await params).slug;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BE_HOST}/api/farmer/${slug}`,
    { cache: 'no-store' }
  );

  const data: any = await res.json();
  console.log('SLUG', data);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.eCommerce.createProduct}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button as="span" className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Farmer
          </Button>
        </Link>
      </PageHeader>

      <CreateEditFarmer
        slug={slug}
        product={data?.farmer}
        // product={productData}
      />
    </>
  );
}
