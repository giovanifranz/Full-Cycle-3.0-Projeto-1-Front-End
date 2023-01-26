import { Box, Paper, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Category } from '../../types/Category'
import { useGetCategoryQuery, useUpdateCategoryMutation } from './categorySlice'
import { CategoryForm } from './components/CategoryForm'

export function EditCategory() {
  const id = useParams().id || ''
  const { data: category, isFetching } = useGetCategoryQuery({ id })

  const [updateCategory, status] = useUpdateCategoryMutation()
  const [categoryState, setCategoryState] = useState<Category>({
    id: '',
    name: '',
    is_active: false,
    created_at: '2017-09-08T15:25:53Z',
    updated_at: '2017-09-08T15:25:53Z',
    deleted_at: '2017-09-08T15:25:53Z',
    description: null,
  })

  const { enqueueSnackbar } = useSnackbar()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    await updateCategory(categoryState)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setCategoryState({ ...categoryState, [name]: value })
  }
  const handleToggle = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target
    setCategoryState({ ...categoryState, [name]: checked })
  }

  useEffect(() => {
    if (category) {
      setCategoryState(category.data)
    }
  }, [category])

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar('Category updated successfully', { variant: 'success' })
    }

    if (status.isError) {
      enqueueSnackbar('Category not updated', { variant: 'error' })
    }
  }, [status, enqueueSnackbar])

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Category</Typography>
          </Box>
        </Box>
        <CategoryForm
          category={categoryState}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleToggle={handleToggle}
          isDisabled={status.isLoading}
          isLoading={isFetching || status.isLoading}
        />
      </Paper>
    </Box>
  )
}
