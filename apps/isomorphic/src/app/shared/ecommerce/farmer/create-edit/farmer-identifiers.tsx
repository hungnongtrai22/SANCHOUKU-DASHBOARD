'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { Input } from 'rizzui';
import cn from '@core/utils/class-names';
import FormGroup from '@/app/shared/form-group';
// import CustomFields from '@/app/shared/ecommerce/product/create-edit/custom-fields';
import QuillEditor from '@core/ui/quill-editor';
import CustomFields from './custom-fields';

interface ProductIdentifiersProps {
  className?: string;
}

export default function FarmerIdentifiers({
  className,
}: ProductIdentifiersProps) {
  const {
    register,
    formState: { errors },
        control,

  } = useFormContext();

  return (
    <FormGroup
      title="Nội dung"
      description="Thông tin hiển thị"
      className={cn(className)}
    >
      <Input
        label="Đánh giá"
        placeholder="Đánh giá của nông trại"
        {...register('rating')}
        // error={errors.tradeNumber?.message as string}
      />
      <Input
        label="Tiêu đề nông trại"
        placeholder="145782"
        {...register('aboutFarmTitle')}
        // error={errors.manufacturerNumber?.message as string}
      />
       <Controller
        control={control}
        name="aboutFarmContent"
        render={({ field: { onChange, value } }) => (
          <QuillEditor
            value={value}
            onChange={onChange}
            label="Nội dung về nông trại"
            className="col-span-full [&_.ql-editor]:min-h-[100px]"
            labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
          />
        )}
      />

      <Input
              label="Tiêu đề tại sao chọn chúng tôi"
              placeholder="Nội dung"
              {...register('whyTitle')}
              className="col-span-full"
              error={errors.sku?.message as string}
            />
      <CustomFields />
    </FormGroup>
  );
}
