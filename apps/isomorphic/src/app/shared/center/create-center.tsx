'use client';

import { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { SubmitHandler, Controller } from 'react-hook-form';
import SelectLoader from '@core/components/loader/select-loader';
import QuillLoader from '@core/components/loader/quill-loader';
import { Button, Input, Select, Text, Title } from 'rizzui';
import cn from '@core/utils/class-names';
import { Form } from '@core/ui/form';
import {
  CategoryFormInput,
  categoryFormSchema,
} from '@/validators/create-category.schema';
import UploadZone from '@core/ui/file-upload/upload-zone';
import axios from 'axios';

// const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
//   ssr: false,
//   loading: () => <SelectLoader />,
// });

const QuillEditor = dynamic(() => import('@core/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[168px]" />,
});

// Parent category option
const parentCategoryOption = [
  {
    value: 'fruits',
    label: 'Fruits',
  },
  {
    value: 'grocery',
    label: 'Grocery',
  },
  {
    value: 'meat',
    label: 'Meat',
  },
  {
    value: 'cat food',
    label: 'Cat Food',
  },
];

// Type option
const typeOption = [
  {
    value: 'fresh vegetables',
    label: 'Fresh Vegetables',
  },
  {
    value: 'diet foods',
    label: 'Diet Foods',
  },
  {
    value: 'green vegetables',
    label: 'Green Vegetables',
  },
];

// a reusable form wrapper component
function HorizontalFormBlockWrapper({
  title,
  description,
  children,
  className,
  isModalView = true,
}: React.PropsWithChildren<{
  title: string;
  description?: string;
  className?: string;
  isModalView?: boolean;
}>) {
  return (
    <div
      className={cn(
        className,
        isModalView ? '@5xl:grid @5xl:grid-cols-6' : ' '
      )}
    >
      {isModalView && (
        <div className="col-span-2 mb-6 pe-4 @5xl:mb-0">
          <Title as="h6" className="font-semibold">
            {title}
          </Title>
          <Text className="mt-1 text-sm text-gray-500">{description}</Text>
        </div>
      )}

      <div
        className={cn(
          'grid grid-cols-2 gap-3 @lg:gap-4 @2xl:gap-5',
          isModalView ? 'col-span-4' : ' '
        )}
      >
        {children}
      </div>
    </div>
  );
}

// main category form component for create and update category
export default function CreateCenter({
  id,
  category,
  isModalView = true,
}: {
  id?: string;
  isModalView?: boolean;
  category?: CategoryFormInput;
}) {
  console.log(id, category);
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);

  const createCenterHandler = useCallback(
    async (center?: any) => {
      // console.log("Month",date.getMonth());
      // console.log("Year",date.getFullYear());
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BE_HOST}/api/center/create`,
        { ...center }
      );

      // setNewFarmers(data.farmers);
    },
    []
    // [date]
  );

  const onSubmit: SubmitHandler<CategoryFormInput> = (data) => {
    // set timeout ony required to display loading state of the create category button
    setLoading(true);
    createCenterHandler(data);
    setTimeout(() => {
      setLoading(false);
      console.log('createCategory data ->', data);
      setReset({
        regulation: '',
        pgs: '',
        cgap: '',
      });
    }, 600);
  };

  // console.log(center);

  // if (!center) return null;

  return (
    <Form<CategoryFormInput>
      key={id} // 👈 thêm dòng này
      validationSchema={categoryFormSchema}
      resetValues={reset}
      onSubmit={onSubmit}
      useFormProps={{
        mode: 'onChange',
        defaultValues: category,
      }}
      className="isomorphic-form flex flex-grow flex-col @container"
    >
      {({
        register,
        control,
        getValues,
        setValue,
        watch,
        reset,
        formState: { errors },
      }) => {
        useEffect(() => {
          if (category) {
            reset(category);
          }
        }, [category, reset]);
        return (
          <>
            <div className="flex-grow pb-10">
              <div
                className={cn(
                  'grid grid-cols-1',
                  isModalView
                    ? 'grid grid-cols-1 gap-8 divide-y divide-dashed divide-gray-200 @2xl:gap-10 @3xl:gap-12 [&>div]:pt-7 first:[&>div]:pt-0 @2xl:[&>div]:pt-9 @3xl:[&>div]:pt-11'
                    : 'gap-5'
                )}
              >
                {/* <HorizontalFormBlockWrapper
                title={'Add new category:'}
                description={'Edit your category information from here'}
                isModalView={isModalView}
              >
                <Input
                  label="Category Name"
                  placeholder="category name"
                  {...register('name')}
                  error={errors.name?.message}
                />
                <Input
                  label="Slug"
                  placeholder="slug"
                  {...register('slug')}
                  error={errors.slug?.message}
                />
                <Controller
                  name="parentCategory"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      dropdownClassName="!z-0"
                      options={parentCategoryOption}
                      value={value}
                      onChange={onChange}
                      label="Parent Category"
                      error={errors?.parentCategory?.message as string}
                      getOptionValue={(option) => option.label}
                    />
                  )}
                />
                <Controller
                  name="type"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      dropdownClassName="!z-0"
                      options={typeOption}
                      value={value}
                      onChange={onChange}
                      label="Display Type"
                      error={errors?.type?.message as string}
                      getOptionValue={(option) => option.label}
                    />
                  )}
                />

                <div className="col-span-2">
                  <Controller
                    control={control}
                    name="description"
                    render={({ field: { onChange, value } }) => (
                      <QuillEditor
                        value={value}
                        onChange={onChange}
                        label="Description"
                        className="[&>.ql-container_.ql-editor]:min-h-[100px]"
                        labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                      />
                    )}
                  />
                </div>
              </HorizontalFormBlockWrapper> */}
                <HorizontalFormBlockWrapper
                  title="Quy Định Của Trung Tâm"
                  description="Tải lên file pdf quy định của trung tâm"
                  isModalView={isModalView}
                >
                  <UploadZone
                    name="regulation"
                    getValues={getValues}
                    setValue={setValue}
                    className="col-span-full"
                    watch={watch}
                  />
                </HorizontalFormBlockWrapper>
                <HorizontalFormBlockWrapper
                  title="PGS Của Trung Tâm"
                  description="Tải lên file pdf PGS của trung tâm"
                  isModalView={isModalView}
                >
                  <UploadZone
                    name="pgs"
                    getValues={getValues}
                    setValue={setValue}
                    className="col-span-full"
                    watch={watch}
                  />
                </HorizontalFormBlockWrapper>
                 {/* <HorizontalFormBlockWrapper
                  title="Tiêu chuẩn C-Gap Của Trung Tâm"
                  description="Tải lên file pdf C-Gap của trung tâm"
                  isModalView={isModalView}
                >
                  <UploadZone
                    name="cgap"
                    getValues={getValues}
                    setValue={setValue}
                    className="col-span-full"
                    watch={watch}
                  />
                </HorizontalFormBlockWrapper> */}
              </div>
            </div>

            <div
              className={cn(
                'sticky bottom-0 z-40 flex items-center justify-end gap-3 bg-gray-0/10 backdrop-blur @lg:gap-4 @xl:grid @xl:auto-cols-max @xl:grid-flow-col',
                isModalView ? '-mx-10 -mb-7 px-10 py-5' : 'py-1'
              )}
            >
              <Button variant="outline" className="w-full @xl:w-auto">
                Save as Draft
              </Button>
              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full @xl:w-auto"
              >
                {id ? 'Update' : 'Create'} Category
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
