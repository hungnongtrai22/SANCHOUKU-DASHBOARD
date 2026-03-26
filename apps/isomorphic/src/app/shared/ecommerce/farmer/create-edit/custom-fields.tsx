'use client';

import { useCallback } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Input, Button, ActionIcon } from 'rizzui';
import TrashIcon from '@core/components/icons/trash';
import { customFields } from '@/app/shared/ecommerce/product/create-edit/form-utils';
import { PiPlusBold } from 'react-icons/pi';

export default function CustomFields() {
  const { control, register } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'whyContent',
  });

  const addCustomField = useCallback(() => append([...customFields]), [append]);

  return (
    <>
      {fields.map((item, index) => (
        <div key={item.id} className="col-span-full flex gap-4 xl:gap-7">
          <Input
            label="Lý do"
            placeholder="lý do"
            className="flex-grow"
            {...register(`whyContent.${index}.label`)}
          />
          <Input
            label="Nội dung"
            placeholder="nội dung"
            className="flex-grow"
            {...register(`whyContent.${index}.value`)}
          />
          {fields.length > 1 && (
            <ActionIcon
              onClick={() => remove(index)}
              variant="flat"
              className="mt-7 shrink-0"
            >
              <TrashIcon className="h-4 w-4" />
            </ActionIcon>
          )}
        </div>
      ))}

       {fields.map((item, index) => (
        <div key={item.id} className="col-span-full flex gap-4 xl:gap-7">
          <Input
            label="Lý do tiếng nhật"
            placeholder="lý do"
            className="flex-grow"
            {...register(`whyContentJP.${index}.label`)}
          />
          <Input
            label="Nội dung tiếng nhật"
            placeholder="nội dung"
            className="flex-grow"
            {...register(`whyContentJP.${index}.value`)}
          />
          {fields.length > 1 && (
            <ActionIcon
              onClick={() => remove(index)}
              variant="flat"
              className="mt-7 shrink-0"
            >
              <TrashIcon className="h-4 w-4" />
            </ActionIcon>
          )}
        </div>
      ))}
      <Button
        onClick={addCustomField}
        variant="outline"
        className="col-span-full ml-auto w-auto"
      >
        <PiPlusBold className="me-2 h-4 w-4" strokeWidth={2} /> Thêm lý do
      </Button>
    </>
  );
}
