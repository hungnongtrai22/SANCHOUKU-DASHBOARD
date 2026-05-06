'use client';

import { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { SubmitHandler, Controller } from 'react-hook-form';
import SelectLoader from '@core/components/loader/select-loader';
import QuillLoader from '@core/components/loader/quill-loader';
import { Button, Input, Select, Text, Title } from 'rizzui';
import cn from '@core/utils/class-names';
import { Form } from '@core/ui/form';

import UploadZone from '@core/ui/file-upload/upload-zone';
import {
  EmployeeFormInput,
  employeeFormSchema,
} from '@/validators/create-employee.schema';
import axios from 'axios';
import {
  DiaryFormInput,
  diaryFormSchema,
} from '@/validators/create-diary.schema';
import { DatePicker } from '@core/ui/datepicker';

// const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
//   ssr: false,
//   loading: () => <SelectLoader />,
// });

const QuillEditor = dynamic(() => import('@core/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[168px]" />,
});

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
export default function CreateDiary({
  id,
  category,
  isModalView = true,
}: {
  id?: string;
  isModalView?: boolean;
  category?: DiaryFormInput;
}) {
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);

  const createDiaryHandler = useCallback(
    async (diary?: any) => {
      // console.log("Month",date.getMonth());
      // console.log("Year",date.getFullYear());
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BE_HOST}/api/diary/create`,
        { ...diary }
      );

      // setNewFarmers(data.farmers);
    },
    []
    // [date]
  );

  const editDiaryHandler = useCallback(
    async (diary?: any) => {
      // console.log("Month",date.getMonth());
      // console.log("Year",date.getFullYear());
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_BE_HOST}/api/diary/edit`,
        { ...diary, _id: id }
      );

      // setNewFarmers(data.farmers);
    },
    []
    // [date]
  );

  const onSubmit: SubmitHandler<DiaryFormInput> = (data) => {
    // set timeout ony required to display loading state of the create category button
    setLoading(true);
    console.log('createEm data2 ->', data);

    setTimeout(() => {
      setLoading(false);
      console.log('createEm data ->', data);
      if (id) {
        editDiaryHandler(data);
      } else {
        createDiaryHandler(data);
      }
      setReset({
        title: '',
        titleJP: '',
        topic: '',
        topicJP: '',
        date: null,
        detail: '',
        detailJP: '',
        avatar: null
        // image: ''
      });
    }, 600);
  };

  return (
    <Form<DiaryFormInput>
      validationSchema={diaryFormSchema}
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
        reset,
        setValue,
        watch,
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
                <HorizontalFormBlockWrapper
                  title={'Thêm Nhật Ký Canh Tác:'}
                  description={'Nhập những thông tin cơ bản của thành viên'}
                  isModalView={isModalView}
                >
                  <Input
                    label="Tiêu Đề"
                    placeholder="Tiêu Đề Của Nhật Ký Canh Tác"
                    {...register('title')}
                    error={errors.title?.message}
                  />

                  <Input
                    label="Tiêu Đề Tiếng Nhật"
                    placeholder="Tiêu Đề Tiếng Nhật Của Nhật Ký Canh Tác"
                    {...register('titleJP')}
                    // error={errors.name?.message}
                  />
                  <Input
                    label="Chủ Đề"
                    placeholder="Chủ Đề Của Nhật Ký Canh Tác"
                    {...register('topic')}
                    // error={errors.name?.message}
                  />
                  <Input
                    label="Chủ Đề Tiếng Nhật"
                    placeholder="Chủ Đề Tiếng Nhật Của Nhật Ký Canh Tác"
                    {...register('topicJP')}
                    // error={errors.name?.message}
                  />

                  <Controller
                    name="date"
                    control={control}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <DatePicker
                        inputProps={{ label: 'Ngày Canh Tác' }}
                        placeholderText="Lựa Chọn Ngày"
                        dateFormat="dd/MM/yyyy"
                        onChange={onChange}
                        onBlur={onBlur}
                        selected={value}
                        popperPlacement="bottom-start" // 👈 luôn hiện phía dưới
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="detail"
                    render={({ field: { onChange, value } }) => (
                      <QuillEditor
                        value={value}
                        onChange={onChange}
                        label="Nội Dung Canh Tác"
                        className="col-span-full [&_.ql-editor]:min-h-[100px]"
                        labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="detailJP"
                    render={({ field: { onChange, value } }) => (
                      <QuillEditor
                        value={value}
                        onChange={onChange}
                        label="Nội Dung Canh Tác Tiếng Nhật"
                        className="col-span-full [&_.ql-editor]:min-h-[100px]"
                        labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                      />
                    )}
                  />

                  <div className="col-span-2"></div>
                </HorizontalFormBlockWrapper>
                <HorizontalFormBlockWrapper
                  title="Tải lên hình ảnh"
                  description="Tải lên hình ảnh thành viên"
                  isModalView={isModalView}
                >
                  <UploadZone
                    name="avatar"
                    getValues={getValues}
                    setValue={setValue}
                    className="col-span-full"
                    watch={watch}
                  />
                </HorizontalFormBlockWrapper>
              </div>
            </div>

            <div
              className={cn(
                'sticky bottom-0 z-40 flex items-center justify-end gap-3 bg-gray-0/10 backdrop-blur @lg:gap-4 @xl:grid @xl:auto-cols-max @xl:grid-flow-col',
                isModalView ? '-mx-10 -mb-7 px-10 py-5' : 'py-1'
              )}
            >
              {/* <Button variant="outline" className="w-full @xl:w-auto">
              Save as Draft
            </Button> */}
              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full @xl:w-auto"
              >
                {id ? 'Cập nhập' : 'Thêm'} Nhật Ký
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
