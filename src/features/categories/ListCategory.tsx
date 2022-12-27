import { Box, Button, Typography } from '@mui/material'
import { GridFilterModel } from '@mui/x-data-grid'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from './categorySlice'
import { CategoriesTable } from './components/CategoryTable'

export function ListCategory() {
  const [options, setOptions] = useState({
    page: 1,
    search: '',
    perPage: 10,
    rowsPerPage: [10, 25, 50, 100],
  })

  const { data, isFetching, error } = useGetCategoriesQuery(options)

  const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation()
  const { enqueueSnackbar } = useSnackbar()

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

  async function handleDeleteCategory(id: string) {
    await deleteCategory({ id })
  }

  useEffect(() => {
    if (deleteCategoryStatus.isSuccess) {
      enqueueSnackbar('Category deleted successfully', { variant: 'success' })
    }

    if (deleteCategoryStatus.error) {
      enqueueSnackbar('Category not deleted', { variant: 'error' })
    }
  }, [deleteCategoryStatus, enqueueSnackbar])

  if (error) {
    return <Typography variant="h2">Error fetching categories</Typography>
  }

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/categories/create"
          style={{ marginBottom: '1rem' }}
        >
          New Category
        </Button>
      </Box>
      <CategoriesTable
        data={data}
        isFetching={isFetching}
        perPage={options.perPage}
        rowsPerPage={options.rowsPerPage}
        handleDelete={handleDeleteCategory}
        handleOnPageChange={handleOnPageChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleFilterChange={handleFilterChange}
      />
    </Box>
  )
}
