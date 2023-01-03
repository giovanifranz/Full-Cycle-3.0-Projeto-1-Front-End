import type { PreloadedState } from '@reduxjs/toolkit'
import type { RenderOptions } from '@testing-library/react'
import { render } from '@testing-library/react'
import { SnackbarProvider } from 'notistack'
import type { ReactElement, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { AppStore, RootState, setupStore } from '../app/store'
import { ThemeProvider } from '@mui/material'
import { appTheme } from '../config/theme'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

export function renderWithProviders(
  ui: ReactElement,
  { store = setupStore(), ...renderOptions }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <ThemeProvider theme={appTheme}>
        <BrowserRouter>
          <SnackbarProvider>
            <Provider store={store}>{children}</Provider>
          </SnackbarProvider>
        </BrowserRouter>
      </ThemeProvider>
    )
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export * from '@testing-library/react'
