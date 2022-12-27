import { Delete as DeleteIcon } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import type {
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
} from '@mui/x-data-grid'
import { DataGrid, GridFilterModel, GridToolbar } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'
import { Results } from '../../../types/CastMembers'

type Props = {
  data?: Results
  perPage: number
  isFetching: boolean
  rowsPerPage?: number[]

  handleOnPageChange: (page: number) => void
  handleFilterChange: (filterModel: GridFilterModel) => void
  handleOnPageSizeChange: (perPage: number) => void
  handleDelete: (id: string) => void
}

function CastMembersTable({
  isFetching,
  perPage,
  data,
  rowsPerPage,
  handleDelete,
  handleFilterChange,
  handleOnPageChange,
  handleOnPageSizeChange,
}: Props) {
  const componentProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: { debounceMs: 500 },
    },
  }

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      renderCell: rendererNameCell,
    },
    {
      field: 'type',
      headerName: 'Type',
      flex: 1,
      renderCell: renderTypeCell,
    },
    {
      field: 'id',
      headerName: 'Actions',
      flex: 1,
      renderCell: renderActionsCell,
    },
  ]

  function renderTypeCell(rowData: GridRenderCellParams) {
    return (
      <Typography color="primary">
        {rowData.value === 1 ? 'Director' : 'Actor'}
      </Typography>
    )
  }

  function renderActionsCell(rowData: GridRenderCellParams) {
    return (
      <IconButton
        color="secondary"
        aria-label="delete"
        onClick={() => handleDelete(rowData.value)}
      >
        <DeleteIcon />
      </IconButton>
    )
  }

  function rendererNameCell(rowData: GridRenderCellParams) {
    return (
      <Link
        style={{ textDecoration: 'none' }}
        to={`/cast-members/edit/${rowData.id}`}
      >
        <Typography color="primary">{rowData.value}</Typography>
      </Link>
    )
  }

  function mapDataToGridRows(data: Results) {
    const { data: castMembers } = data
    return castMembers.map((castMember) => ({
      id: castMember.id,
      name: castMember.name,
      type: castMember.type,
    }))
  }

  const rows: GridRowsProp = data ? mapDataToGridRows(data) : []
  const rowCount = data?.meta.total || 0

  return (
    <Box sx={{ display: 'flex', height: 600 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={perPage}
        rowCount={rowCount}
        rowsPerPageOptions={rowsPerPage}
        loading={isFetching}
        filterMode="server"
        paginationMode="server"
        disableColumnSelector
        disableColumnFilter
        disableDensitySelector
        disableSelectionOnClick
        componentsProps={componentProps}
        components={{ Toolbar: GridToolbar }}
        onPageChange={handleOnPageChange}
        onFilterModelChange={handleFilterChange}
        onPageSizeChange={handleOnPageSizeChange}
        checkboxSelection={false}
      />
    </Box>
  )
}

export { CastMembersTable }
export type { Props as CastMembersTableProps }
