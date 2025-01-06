'use client';

import {
  DataGrid,
  GridToolbar,
  GridColDef,
  GridRowsProp,
  GridSortItem,
  GridSortModel,
  GridPaginationModel,
  GridFilterModel,
  GridRowParams
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
  handleRowClick: (params: GridRowParams) => void;
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
  handleRowClick,
  paginationModel,
  // onPageChange
}: DataTableProps) {
  const handleSortChange = (newSortModel: GridSortModel) => {
    // onSortChange(newSortModel[0]);
  };
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
          toolbar: GridToolbar,
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
        onSortModelChange={handleSortChange}
        filterMode="server"
        // filterModel={filterModel}
        // onFilterModelChange={onFilterChange}
        onRowClick={handleRowClick}
        paginationMode="server"
        paginationModel={paginationModel}
        pageSizeOptions={dataTableConfig.paginationOptions}
        // onPaginationModelChange={onPageChange}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
