import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  TextField,
} from '@mui/material'
import type { ChangeEvent, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import type { Category } from '../../../types/Category'

type Props = {
  category: Category
  isDisabled?: boolean
  isLoading?: boolean
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleToggle: (event: ChangeEvent<HTMLInputElement>) => void
}

function CategoryForm({
  category,
  isDisabled = false,
  isLoading = false,
  handleSubmit,
  handleToggle,
  handleChange,
}: Props) {
  return (
    <Box p={2}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                required
                name="name"
                label="Name"
                value={category.name}
                disabled={isDisabled}
                onChange={handleChange}
                inputProps={{ 'data-testid': 'name' }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                required
                name="description"
                label="Description"
                value={category.description}
                disabled={isDisabled}
                onChange={handleChange}
                inputProps={{ 'data-testid': 'description' }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    name="is_active"
                    color="secondary"
                    onChange={handleToggle}
                    checked={category.is_active}
                    inputProps={{ 'aria-label': 'controlled' }}
                    data-testid="is_active"
                    disabled={isDisabled}
                  />
                }
                label="Active"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" gap={2}>
              <Button variant="contained" component={Link} to="/categories">
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={isDisabled || isLoading}
              >
                {isLoading ? 'Loading...' : 'Save'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export { CategoryForm }
export type { Props as CategoryFormProps }
