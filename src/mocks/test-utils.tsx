import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import React, { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import type { PreloadedState } from '@reduxjs/toolkit'
import { RootState, setupStore } from 'store/store'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: any
}

function renderWithProviders(
    ui: React.ReactElement,
    {
      preloadedState = {} as any,
      store = setupStore(preloadedState),
      ...renderOptions
    }: ExtendedRenderOptions = {}
) {
  function Wrapper({children}: PropsWithChildren<{}>) {
    return <Provider store={store}>{children}</Provider>
  }

  return {store, ...render(ui, {wrapper: Wrapper, ...renderOptions})}
}

export { renderWithProviders }
