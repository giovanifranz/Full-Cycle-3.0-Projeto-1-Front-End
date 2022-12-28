import { Box, Button, Typography } from '@mui/material'
import { GridFilterModel } from '@mui/x-data-grid'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  useDeleteCastMemberMutation,
  useGetCastMembersQuery,
} from './castMembersSlice'
import { CastMembersTable } from './components/CastMembersTable'

export function ListCastMembers() {
  const [options, setOptions] = useState({
    page: 1,
    search: '',
    perPage: 10,
    rowsPerPage: [10, 25, 50, 100],
  })

  const { enqueueSnackbar } = useSnackbar()
  const { data, isFetching, error } = useGetCastMembersQuery(options)
  const [deleteCastMember, deleteCastMemberStatus] =
    useDeleteCastMemberMutation()

  async function handleDeleteCastMember(id: string) {
    await deleteCastMember({ id })
  }

  function handleOnPageChange(page: number) {
    setOptions({ ...options, page: page + 1 })
  }

  function handleOnPageSizeChange(perPage: number) {
    setOptions({ ...options, perPage })
  }

  function handleFilterChange(filterModel: GridFilterModel) {
    if (filterModel.quickFilterValues?.length) {
      const search = filterModel.quickFilterValues.join('')
      setOptions({ ...options, search })
    } else setOptions({ ...options, search: '' })
  }

  useEffect(() => {
    if (deleteCastMemberStatus.isSuccess) {
      enqueueSnackbar('Cast Member deleted successfully', {
        variant: 'success',
      })
    }

    if (deleteCastMemberStatus.error) {
      enqueueSnackbar('Cast Member not deleted', { variant: 'error' })
    }
  }, [deleteCastMemberStatus, enqueueSnackbar])

  if (error) {
    return <Typography variant="h2">Error fetching cast members</Typography>
  }

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/cast-members/create"
          style={{ marginBottom: '1rem' }}
        >
          New Cast Member
        </Button>
      </Box>
      <CastMembersTable
        data={data}
        isFetching={isFetching}
        perPage={options.perPage}
        rowsPerPage={options.rowsPerPage}
        handleDelete={handleDeleteCastMember}
        handleOnPageChange={handleOnPageChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleFilterChange={handleFilterChange}
      />
    </Box>
  )
}
