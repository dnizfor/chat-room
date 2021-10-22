import { configureStore } from '@reduxjs/toolkit'

import usernameReducer from './usernameSlice'

export default configureStore({
  reducer: {
      createUsername : usernameReducer
  },
})