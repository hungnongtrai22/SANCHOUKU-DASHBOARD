'use client';

import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { Element } from 'react-scroll';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { Text } from 'rizzui';
import cn from '@core/utils/class-names';
// import  {
//   formParts,
// } from '@/app/shared/ecommerce/product/create-edit/form-nav';
import ProductSummary from '@/app/shared/ecommerce/product/create-edit/product-summary';
import { defaultValues } from '@/app/shared/ecommerce/product/create-edit/form-utils';
import ProductMedia from '@/app/shared/ecommerce/product/create-edit/product-media';
import PricingInventory from '@/app/shared/ecommerce/product/create-edit/pricing-inventory';
import ProductIdentifiers from '@/app/shared/ecommerce/product/create-edit/product-identifiers';
import ShippingInfo from '@/app/shared/ecommerce/product/create-edit/shipping-info';
import ProductSeo from '@/app/shared/ecommerce/product/create-edit/product-seo';
import DeliveryEvent from '@/app/shared/ecommerce/product/create-edit/delivery-event';
import ProductVariants from '@/app/shared/ecommerce/product/create-edit/product-variants';
import ProductTaxonomies from '@/app/shared/ecommerce/product/create-edit/product-tags';
import FormFooter from '@core/components/form-footer';
import {
  CreateProductInput,
  productFormSchema,
} from '@/validators/create-product.schema';
import { useLayout } from '@/layouts/use-layout';
import { LAYOUT_OPTIONS } from '@/config/enums';
import FarmerSummary from './farmer-summary';
import FormNav, { formParts } from './form-nav';
import FarmerMedia from './farmer-media';
import FarmerTags from './farmer-tags';
import FarmerIdentifiers from './farmer-identifiers';
import axios from 'axios';

const MAP_STEP_TO_COMPONENT = {
  [formParts.summary]: FarmerSummary,
  [formParts.media]: FarmerMedia,
  // [formParts.pricingInventory]: PricingInventory,
  [formParts.productIdentifiers]: FarmerIdentifiers,
  // [formParts.shipping]: ShippingInfo,
  // [formParts.seo]: ProductSeo,
  // [formParts.deliveryEvent]: DeliveryEvent,
  // [formParts.variantOptions]: ProductVariants,
  [formParts.tagsAndCategory]: FarmerTags,
};

interface IndexProps {
  slug?: string;
  className?: string;
  product?: any;
}

export default function CreateEditFarmer({
  slug,
  product,
  className,
}: IndexProps) {
  const { layout } = useLayout();
  const [isLoading, setLoading] = useState(false);
  const methods = useForm<any>({
    resolver: zodResolver(productFormSchema),
    defaultValues: defaultValues(product),
  });

  const createFarmerHandler = useCallback(
    async (farmer?: any) => {
      // console.log("Month",date.getMonth());
      // console.log("Year",date.getFullYear());
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BE_HOST}/api/farmer/create`,
        { ...farmer, popularProduct: [] }
      );

      // setNewFarmers(data.farmers);
    },
    []
    // [date]
  );

  const editFarmerHandler = useCallback(
    async (farmer?: any) => {
      // console.log("Month",date.getMonth());
      // console.log("Year",date.getFullYear());
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_BE_HOST}/api/farmer/edit`,
        { ...farmer, _id: slug }
      );

      // setNewFarmers(data.farmers);
    },
    []
    // [date]
  );

  const onSubmit: SubmitHandler<CreateProductInput> = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('product_data', data);
      if (slug) {
        editFarmerHandler(data);
      } else {
        createFarmerHandler(data);
      }
      toast.success(
        <Text as="b">{slug ? 'Cập nhập' : 'Thêm'} nông dân thành công</Text>
      );
      methods.reset();
    }, 600);
  };

  return (
    <div className="@container">
      <FormNav
        className={cn(
          layout === LAYOUT_OPTIONS.BERYLLIUM && 'z-[999] 2xl:top-[72px]'
        )}
      />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className={cn(
            'relative z-[19] [&_label.block>span]:font-medium',
            className
          )}
        >
          <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
            {Object.entries(MAP_STEP_TO_COMPONENT).map(([key, Component]) => (
              <Element
                key={key}
                name={formParts[key as keyof typeof formParts]}
              >
                {<Component className="pt-7 @2xl:pt-9 @3xl:pt-11" />}
              </Element>
            ))}
          </div>

          <FormFooter
            isLoading={isLoading}
            submitBtnText={slug ? 'Cập nhập nông dân' : 'Thêm nông dân'}
          />
        </form>
      </FormProvider>
    </div>
  );
}
