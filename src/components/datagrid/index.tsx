'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  // GridSortModel,
  GridPaginationModel,
  GridFilterModel,
} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { dataTableConfig } from '@/constants';
import { CustomNoRowsOverlay, CustomPagination } from './components';

type DataTableProps = {
  columns: GridColDef[];
  rows: GridRowsProp;
  // isFetchingData: boolean;
  rowCount: number;
  // sortColumn?: GridSortItem;
  // onSortChange: (newSortCol: GridSortItem) => void;
  filterModel?: GridFilterModel,
  // onFilterChange: (newFilter: GridFilterModel) => void;
  paginationModel: GridPaginationModel;
  // onPageChange: (model: GridPaginationModel) => void;
};

export default function DataTable({
  columns,
  rows,
  // isFetchingData,
  rowCount,
  // sortColumn,
  // onSortChange,
  // filterModel,
  // onFilterChange,
  paginationModel,
  // onPageChange
}: DataTableProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // function handleSortChange(newSortModel: GridSortModel) {
  //   // onSortChange(newSortModel[0]);
  // }

  function handleOnPageChange(pagination: GridPaginationModel) {
    const newPage = pagination.page + 1;
    const limit = pagination.pageSize;
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    params.set('limit', limit.toString());
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        overflow: 'auto',
        '& .MuiDataGrid-root': {
          // Prevent squeezing below this width
          minWidth: '500px'
        }
      }}
    >
      <DataGrid
        columns={columns}
        rows={rows}
        slots={{
          // toolbar: GridToolbar,
          noRowsOverlay: CustomNoRowsOverlay,
          pagination: CustomPagination
        }}
        slotProps={{
          loadingOverlay: {
            variant: 'linear-progress',
            noRowsVariant: 'skeleton'
          }
        }}
        sx={{
          flexGrow: 1,
          '& .MuiDataGrid-row:hover': {
            cursor: 'pointer'
          },
        }}
        // loading={isFetchingData}
        rowCount={rowCount}
        // sortModel={sortColumn ? [sortColumn] : undefined}
        // onSortModelChange={handleSortChange}
        filterMode="server"
        // filterModel={filterModel}
        // onFilterModelChange={onFilterChange}
        paginationMode="server"
        paginationModel={paginationModel}
        pageSizeOptions={dataTableConfig.paginationOptions}
        onPaginationModelChange={handleOnPageChange}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
