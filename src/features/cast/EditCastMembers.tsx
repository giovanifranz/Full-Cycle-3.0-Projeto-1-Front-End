import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { CastMember } from '../../types/CastMembers'
import {
  initialState,
  useGetCastMemberQuery,
  useUpdateCastMemberMutation,
} from './castMembersSlice'
import type { ChangeEvent, FormEvent } from 'react'
import { CastMembersForm } from './components/CastMembersForm'
import { Box, Paper, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

export function EditCastMembers() {
  const id = useParams().id || ''
  const { enqueueSnackbar } = useSnackbar()
  const { data: castMember, isFetching } = useGetCastMemberQuery({ id })
  const [castMemberState, setCastMemberState] =
    useState<CastMember>(initialState)

  const [updateCastMember, status] = useUpdateCastMemberMutation()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await updateCastMember(castMemberState)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setCastMemberState({ ...castMemberState, [name]: value })
  }

  useEffect(() => {
    if (castMember) {
      setCastMemberState(castMember.data)
    }
  }, [castMember])

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar('Cast member updated successfully!', {
        variant: 'success',
      })
    }
    if (status.isError) {
      enqueueSnackbar('Cast member not updated!', { variant: 'error' })
    }
  }, [enqueueSnackbar, status])

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Cast Member</Typography>
          </Box>
        </Box>
        <CastMembersForm
          castMember={castMemberState}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isDisabled={status.isLoading}
          isLoading={isFetching || status.isLoading}
        />
      </Paper>
    </Box>
  )
}
