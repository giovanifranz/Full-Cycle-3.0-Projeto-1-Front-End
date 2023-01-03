import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { CastMember } from '../../types/CastMembers'
import { initialState, useCreateCastMemberMutation } from './castMembersSlice'
import type { ChangeEvent, FormEvent } from 'react'
import { CastMembersForm } from './components/CastMembersForm'
import { Box, Paper, Typography } from '@mui/material'

export function CreateCastMembers() {
  const { enqueueSnackbar } = useSnackbar()
  const [castMemberState, setCastMemberState] =
    useState<CastMember>(initialState)

  const [createCastMember, status] = useCreateCastMemberMutation()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await createCastMember(castMemberState)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setCastMemberState({ ...castMemberState, [name]: value })
  }

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar('Cast member created successfully!', {
        variant: 'success',
      })
    }
    if (status.isError) {
      enqueueSnackbar('Cast member not created!', { variant: 'error' })
    }
  }, [enqueueSnackbar, status])

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create Cast Member</Typography>
          </Box>
        </Box>
        <CastMembersForm
          castMember={castMemberState}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isDisabled={status.isLoading}
          isLoading={status.isLoading}
        />
      </Paper>
    </Box>
  )
}
