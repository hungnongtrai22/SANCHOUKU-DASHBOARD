'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { Input, Select } from 'rizzui';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import cn from '@core/utils/class-names';
import FormGroup from '@/app/shared/form-group';
import {
  categoryOption,
  typeOption,
} from '@/app/shared/ecommerce/product/create-edit/form-utils';
import dynamic from 'next/dynamic';
import SelectLoader from '@core/components/loader/select-loader';
import QuillLoader from '@core/components/loader/quill-loader';
import UploadZone from '@core/ui/file-upload/upload-zone';

// const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
//   ssr: false,
//   loading: () => <SelectLoader />,
// });
const QuillEditor = dynamic(() => import('@core/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[143px]" />,
});

export default function FarmerSummary({ className }: { className?: string }) {
  const {
    register,
    control,
    formState: { errors },
    getValues,
    setValue,
  } = useFormContext();

  const [states, setStates] = useState([]);
  const [stateSelect, setStateSelect] = useState<any>(null);
  const [wards, setWards] = useState([]);

  const getAllFarmerHandler = useCallback(async () => {
    // console.log("Month",date.getMonth());
    // console.log("Year",date.getFullYear());
    const { data } = await axios.get(`https://provinces.open-api.vn/api/v2/p/`);
    // console.log("TEST", data.farmers);

    const formatted = data.map((item: any) => ({
      label: item.name, // 👈 bắt buộc
      value: item.code, // 👈 nên có
    }));

    setStates(formatted);
  }, []);

  useEffect(() => {
    getAllFarmerHandler();
  }, []);

  return (
    <FormGroup
      title="Tổng quan"
      description="Nhập những thông tin quan trọng về nông dân"
      className={cn(className)}
    >
      <Input
        label="Tên"
        placeholder="Tên của nông dân"
        {...register('name')}
        error={errors.title?.message as string}
      />
      <Input
        label="Tên Nông Trại"
        placeholder="Tên của nông trại"
        {...register('nameFarm')}
        // error={errors.sku?.message as string}
      />

      <Input
        label="Tên Katakana"
        placeholder="Tên Katakana của nông dân"
        {...register('nameJP')}
        error={errors.title?.message as string}
      />
      <Input
        label="Tên Nông Trại Tiếng Nhật"
        placeholder="Tên của nông trại bằng tiếng nhật"
        {...register('nameFarmJP')}
        // error={errors.sku?.message as string}
      />

      <Input
        label="Địa chỉ"
        placeholder="Địa chỉ của nông trại"
        {...register('address')}
        className="col-span-full"
        // error={errors.sku?.message as string}
      />

      <Controller
        name="state"
        control={control}
        defaultValue={null} // hoặc ""
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="h-auto"
            options={states}
            value={value}
            onChange={async (selected: any) => {
              onChange(selected); // 👈 react-hook-form
              setStateSelect(selected); // 👈 lưu local state

              setValue("ward", null); // 👈 reset ward
setWards([]);

              if (selected?.value) {
                const { data } = await axios.get(
                  `https://provinces.open-api.vn/api/v2/w/?province=${selected.value}`
                );

                setWards(
                  data.map((w: any) => ({
                    label: w.name,
                    value: w.code,
                  }))
                );
              }
            }}
            label="Tỉnh Thành"
            error={errors?.state?.message as string}
          />
        )}
      />

      <Controller
        name="ward"
        defaultValue={null} // hoặc ""
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            options={wards}
            value={value}
            onChange={onChange}
            label="Phường / Xã"
            dropdownClassName="h-auto"
          />
        )}
      />

      <Controller
        control={control}
        name="shortIntroduce"
        render={({ field: { onChange, value } }) => (
          <QuillEditor
            value={value}
            onChange={onChange}
            label="Giới thiệu ngắn về nông trại"
            className="col-span-full [&_.ql-editor]:min-h-[100px]"
            labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
          />
        )}
      />

      <Controller
        control={control}
        name="shortIntroduceJP"
        render={({ field: { onChange, value } }) => (
          <QuillEditor
            value={value}
            onChange={onChange}
            label="Giới thiệu ngắn về nông trại tiếng nhật"
            className="col-span-full [&_.ql-editor]:min-h-[100px]"
            labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
          />
        )}
      />

      {/* <Controller
        control={control}
        name="avatar"
        render={({ field: { onChange, value } }) => (
          <UploadZone
            className="col-span-full"
            name="avatar"
            getValues={getValues}
            setValue={setValue}
            label="Hình ảnh nông dân"
             value={value}          // 👈 thêm
      onChange={onChange}    // 👈 thêm
          />
        )}
      /> */}
    </FormGroup>
  );
}
