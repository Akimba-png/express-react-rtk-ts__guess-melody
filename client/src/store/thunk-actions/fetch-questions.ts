import type { AxiosError } from 'axios';
import type { Questions } from '../../models/data';
import { createAppAsyncThunk } from './../create-app-async-thunk';
import { ApiRoute } from '../../constants/const';

export const fetchQuestions = createAppAsyncThunk<Questions>(
  'data/questions',
  async (_, {extra, rejectWithValue}) => {
    try {
      const questions = await extra.get<Questions>(ApiRoute.Questions);
      return questions.data;
    } catch (error) {
      const e = error as AxiosError<{message: string}>;
      if (e.response) {
        return rejectWithValue(e.response.data.message);
      } else {
        return rejectWithValue(e.message);
      }
    }
  }
);
