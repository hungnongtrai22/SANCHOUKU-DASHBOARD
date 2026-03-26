'use client';

import DeletePopover from '@core/components/delete-popover';
import { getRatings } from '@core/components/table-utils/get-ratings';
import { getStatusBadge } from '@core/components/table-utils/get-status-badge';
import { getStockStatus } from '@core/components/table-utils/get-stock-status';
import { routes } from '@/config/routes';
import { FarmerType, ProductType } from '@/data/products-data';
import EyeIcon from '@core/components/icons/eye';
import PencilIcon from '@core/components/icons/pencil';
import AvatarCard from '@core/ui/avatar-card';
import { createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';
import { ActionIcon, Checkbox, Flex, Text, Tooltip } from 'rizzui';

const columnHelper = createColumnHelper<FarmerType>();

export const farmersListColumns = [
  columnHelper.display({
    id: 'select',
    size: 50,
    header: ({ table }) => (
      <Checkbox
        className="ps-3.5"
        aria-label="Select all rows"
        checked={table.getIsAllPageRowsSelected()}
        onChange={() => table.toggleAllPageRowsSelected()}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="ps-3.5"
        aria-label="Select row"
        checked={row.getIsSelected()}
        onChange={() => row.toggleSelected()}
      />
    ),
  }),
  columnHelper.accessor('name', {
    id: 'name',
    size: 300,
    header: 'Nông dân',
    enableSorting: false,
    cell: ({ row }) => {
      console.log('TEST', row);
      return (
        <AvatarCard
          src={row.original?.avatar[0]?.url || ''}
          name={row.original.name}
          description={row.original.nameFarm}
          avatarProps={{
            name: row.original.name,
            size: 'lg',
            className: 'rounded-lg',
          }}
        />
      );
    },
  }),
  columnHelper.display({
    id: 'sku',
    size: 150,
    header: 'Danh Mục',
    cell: ({ row }) => (
      <Text className="text-sm">
        {Array.isArray(row.original.category)
          ? row.original.category
              .map((c: any) => (typeof c === 'object' ? c.name : c))
              .join(', ')
          : row.original.category}
      </Text>
    ),
  }),
  // columnHelper.accessor('stock', {
  //   id: 'stock',
  //   size: 200,
  //   header: 'Stock',
  //   cell: ({ row }) => getStockStatus(row.original.stock),
  // }),
  columnHelper.accessor('state', {
    id: 'price',
    size: 150,
    header: 'Tỉnh',
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700">{row.original.state.label}</Text>
    ),
  }),
  columnHelper.display({
    id: 'rating',
    size: 200,
    header: 'Đánh giá',
    cell: ({ row }) => getRatings(row.original.rating),
  }),
  columnHelper.accessor('status', {
    id: 'status',
    size: 120,
    header: 'Trạng Thái',
    enableSorting: false,
    cell: ({ row }) => getStatusBadge(row.original?.status || ''),
  }),
  columnHelper.display({
    id: 'action',
    size: 120,
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => (
      <Flex align="center" justify="end" gap="3" className="pe-4">
        <Tooltip size="sm" content={'Chỉnh Sửa'} placement="top" color="invert">
          <Link href={routes.farmer.farmerEdit(row.original?._id)}>
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              aria-label={'Chỉnh Sửa'}
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <Tooltip
          size="sm"
          content={'Xem Chi Tiết'}
          placement="top"
          color="invert"
        >
          <Link href={routes.eCommerce.productDetails(row.original.id)}>
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              aria-label={'Xem Chi Tiết'}
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <DeletePopover
          title={`Xóa`}
          description={`Bạn có chắc chắn muốn xóa nông dân #${row.original.id}?`}
          onDelete={() =>
            meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
          }
        />
      </Flex>
    ),
  }),
];
