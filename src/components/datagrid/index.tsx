'use client';

import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridPaginationModel,
  GridFilterModel,
  GridSortItem,
  GridSortModel,
} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { dataTableConfig } from '@/constants';
import { CustomNoRowsOverlay, CustomPagination } from './components';

type DataTableProps = {
  columns: GridColDef[];
  rows: GridRowsProp;
  rowCount: number;
  sortColumn?: GridSortItem;
  onSortChange?: (newSortCol: GridSortModel) => void;
  filterModel?: GridFilterModel,
  paginationModel: GridPaginationModel;
  onPageChange: (model: GridPaginationModel) => void;
  loading?: boolean;
};

export default function DataTable({
  columns,
  rows,
  rowCount,
  sortColumn,
  onSortChange,
  paginationModel,
  onPageChange,
  loading
}: DataTableProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        overflow: 'auto',
        '& .MuiDataGrid-root': {
          minWidth: '500px'
        }
      }}
    >
      <DataGrid
        columns={columns}
        rows={rows}
        slots={{
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
        rowCount={rowCount}
        sortModel={sortColumn ? [sortColumn] : undefined}
        onSortModelChange={onSortChange}
        filterMode="server"
        paginationMode="server"
        paginationModel={paginationModel}
        pageSizeOptions={dataTableConfig.paginationOptions}
        onPaginationModelChange={onPageChange}
        disableRowSelectionOnClick
        loading={loading}
      />
    </Box>
  );
}
