'use client';

import DeletePopover from '@core/components/delete-popover';
import { routes } from '@/config/routes';
import PencilIcon from '@core/components/icons/pencil';
import { createColumnHelper } from '@tanstack/react-table';
import Image from 'next/image';
import Link from 'next/link';
import { ActionIcon, Checkbox, Text, Title, Tooltip } from 'rizzui';
import { CategoryDataType } from './table';

const columnHelper = createColumnHelper<CategoryDataType>();

export const employeeColumns = [
  columnHelper.display({
    id: 'checked',
    size: 50,
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        className="ps-3.5"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
  }),
  columnHelper.display({
    id: 'image',
    size: 100,
    header: 'Hình Ảnh',
    cell: ({ row }) => (
      <figure className="relative aspect-square w-12 overflow-hidden rounded-lg bg-gray-100">
        <Image
          alt={row.original.image[0]?.name}
          src={row.original.image[0]?.url}
          fill
          sizes="(max-width: 768px) 100vw"
          className="object-cover"
        />
      </figure>
    ),
  }),
  columnHelper.accessor('name', {
    id: 'name',
    size: 200,
    header: 'Tên',
    cell: ({ getValue }) => (
      <Title as="h6" className="!text-sm font-medium">
        {getValue()}
      </Title>
    ),
  }),
  columnHelper.display({
    id: 'nameJP',
    size: 250,
    header: 'Tên Katakana',
    cell: ({ row }) => (
      <Text className="truncate !text-sm">{row.original.nameJP}</Text>
    ),
  }),
  columnHelper.accessor('position', {
    id: 'position',
    size: 200,
    header: 'Chức Vụ',
    cell: ({ getValue }) => <Text>{getValue()}</Text>,
  }),
  columnHelper.display({
    id: 'positionJP',
    size: 120,
    header: 'Chức Vụ Tiếng Nhật',
    cell: ({ row }) => <div className="ps-6">{row.original.positionJP}</div>,
  }),
  columnHelper.display({
    id: 'action',
    size: 100,
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip content={'Sửa Thành Viên'} placement="top" color="invert">
          <Link href={routes.sanchouku.employeeEdit(row.original._id)}>
            <ActionIcon size="sm" variant="outline">
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <DeletePopover
          title={`Xóa Thành Viên`}
          description={`Are you sure you want to delete this #${row.original.id} category?`}
          onDelete={() => meta?.handleDeleteRow?.(row.original)}
        />
      </div>
    ),
  }),
];
