'use client';

import { Fragment } from 'react';
import { useRouter } from 'next/navigation'
// import moment from 'moment';
// import { toast } from 'react-toastify';
import Link from '@mui/material/Link';
import {
  GridActionsCellItem,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  GridRowParams,
  GridRowsProp,
  GridSortItem,
} from '@mui/x-data-grid';
// import { deletePerson } from 'api/services';
import { DataTable, CenterContainer, ConfirmationDialog } from '@/components';
import { Gender, UserRow } from '@/types';
import { getUserRecordIndex } from '@/utils';
import { GenderIcon, EditIcon, DeleteIcon, RenderCoins } from '.';

type UserRowDetails = UserRow & { sNo: number };

type UserDataGridProps = {
  users: UserRow[];
  nbRecords: number;
  // sortColumn?: GridSortItem;
  // onSortChange: (newSort: GridSortItem) => void;
  // filterModel?: GridFilterModel;
  // onFilterChange: (newFilter: GridFilterModel) => void;
  paginationModel: GridPaginationModel;
  // onPageChange: (newPageModel: GridPaginationModel) => void;
  // isFetchingData: boolean;
  // refetchData: () => void;
};

const UserDataGrid = ({
  users,
  nbRecords,
  // sortColumn,
  // onSortChange,
  // filterModel,
  // onFilterChange,
  paginationModel,
  // onPageChange,
  // isFetchingData,
  // refetchData
}: UserDataGridProps) => {
  const router = useRouter();
  // const [displayDeletePopUp, setDisplayDeletePopUp] = useState<boolean>(false);
  // const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handleCloseDeletePopUp = () => {
    // setDisplayDeletePopUp(false);
  };

  const handlePersonDelete = async () => {
    // const isDeleted = await deletePerson(selectedItemId ?? '');
    // if(isDeleted) {
    //   // toast.success('Person record deleted!');
    //   refetchData();
    // }
    handleCloseDeletePopUp();
  };

  const peopleTableColumns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'S. No.',
      type: 'number',
      sortable: false,
      resizable: false,
      align: 'center',
      disableColumnMenu: true,
      filterable: false,
    },
    {
      field: 'name',
      headerName: 'Name',
      hideable: false,
      type: 'string',
    },
    {
      field: 'gender',
      headerName: 'Gender',
      align: 'center',
      headerAlign: 'center',
      type: 'singleSelect',
      valueOptions: Object.values(Gender),
      renderCell: params => (
        <CenterContainer>
          <GenderIcon gender={params.value} />
        </CenterContainer>
      )
    },
    {
      field: 'coins',
      headerName: 'Wallet',
      renderCell: params => (
        // <CenterContainer>
        <RenderCoins coins={params.value} />
        // </CenterContainer>
      )
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          key="edit"
          icon={<EditIcon />}
          label="Edit"
          onClick={() => {
            router.push(`/users/${params.row.id}`)
            // navigate(`${personRoute.rootPath}/${personRoute.subRoutes.edit}`, {
            //   state: params.row
            // });
          }}
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => {
            // setSelectedItemId(params.row._id);
            // setDisplayDeletePopUp(true);
          }}
        />
      ]
    }
  ];

  const userTableRows: GridRowsProp<UserRowDetails> = users.map(
    (person, idx) => ({
      sNo: getUserRecordIndex(
        paginationModel.page,
        paginationModel.pageSize,
        idx
      ),
      id: person.id,
      name: person.name,
      gender: person.gender,
      coins: person.coins
    })
  );

  const handleRowClick = (params: GridRowParams) => {
    // navigate(`${personRoute.rootPath}/${personRoute.subRoutes.view}`, {
    //   state: params.row
    // });
  };

  return (
    <Fragment>
      <DataTable
        columns={peopleTableColumns.map(col => ({
          ...col,
          flex: 1
        }))}
        rows={userTableRows}
        // isFetchingData={isFetchingData}
        rowCount={nbRecords}
        // sortColumn={sortColumn}
        // onSortChange={onSortChange}
        // filterModel={filterModel}
        // onFilterChange={onFilterChange}
        handleRowClick={handleRowClick}
        paginationModel={paginationModel}
        // onPageChange={onPageChange}
      />
      {/* {displayDeletePopUp && (
        <ConfirmationDialog
          title={`Delete Person with Id ${selectedItemId} ?`}
          contentText="This will soft-delete the record..."
          open={displayDeletePopUp}
          onClose={handleCloseDeletePopUp}
          onConfirm={handlePersonDelete}
          confirmBtnText="Confirm"
        />
      )} */}
    </Fragment>
  );
};

export default UserDataGrid;
