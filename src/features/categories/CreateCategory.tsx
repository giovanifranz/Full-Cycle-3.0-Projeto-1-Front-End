import { Box, Paper, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import type { ChangeEvent, FormEvent } from 'react'
import { useEffect, useState } from 'react'
import { Category } from '../../types/Category'
import { useCreateCategoryMutation } from './categorySlice'
import { CategoryForm } from './components/CategoryForm'

export function CreateCategory() {
  const { enqueueSnackbar } = useSnackbar()
  const [createCategory, status] = useCreateCategoryMutation()
  const [categoryState, setCategoryState] = useState<Category>({
    id: '',
    name: '',
    is_active: false,
    created_at: '2017-09-08T15:25:53Z',
    updated_at: '2017-09-08T15:25:53Z',
    deleted_at: '2017-09-08T15:25:53Z',
    description: null,
  })

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await createCategory(categoryState)
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
    if (status.isSuccess) {
      enqueueSnackbar('Category created successfully!', { variant: 'success' })
    }
    if (status.isError) {
      enqueueSnackbar('Category not created!', { variant: 'error' })
    }
  }, [enqueueSnackbar, status])

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create Category</Typography>
          </Box>
        </Box>
        <CategoryForm
          category={categoryState}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleToggle={handleToggle}
          isDisabled={status.isLoading}
          isLoading={status.isLoading}
        />
      </Paper>
    </Box>
  )
}
