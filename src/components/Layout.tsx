import { Box, Container } from '@mui/material'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export function Layout({ children }: Props) {
  return (
    <Box>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, color: 'white' }}>
        {children}
      </Container>
    </Box>
  )
}
