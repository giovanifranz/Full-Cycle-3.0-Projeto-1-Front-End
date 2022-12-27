import {
  CastMemberParams,
  Results,
  Result,
  CastMember,
} from '../../types/CastMembers'
import { apiSlice } from '../api/apiSlice'

const endpointUrl = '/cast_members'

export const initialState: CastMember = {
  id: '',
  name: '',
  type: 0,
  created_at: '2017-09-08T15:25:53Z',
  updated_at: '2017-09-08T15:25:53Z',
  deleted_at: '2017-09-08T15:25:53Z',
}

function parseQueryParams(params: CastMemberParams): string {
  const query = new URLSearchParams()

  if (params.page) {
    query.append('page', params.page.toString())
  }

  if (params.perPage) {
    query.append('per_page', params.perPage.toString())
  }

  if (params.search) {
    query.append('search', params.search)
  }

  if (params.type) {
    query.append('type', params.type.toString())
  }

  return query.toString()
}

function getCastMembers(params: CastMemberParams) {
  const { page = 1, perPage = 10, search, type } = params
  return `${endpointUrl}?${parseQueryParams({
    page,
    perPage,
    search,
    type,
  })}`
}

function deleteCastMemberMutation({ id }: { id: string }) {
  return {
    url: `${endpointUrl}/${id}`,
    method: 'DELETE',
  }
}

function createCastMemberMutation(castMember: CastMember) {
  return {
    url: endpointUrl,
    method: 'POST',
    body: castMember,
  }
}

function updateCastMemberMutation(castMember: CastMember) {
  return {
    url: `${endpointUrl}/${castMember.id}`,
    method: 'PUT',
    body: castMember,
  }
}

function getCastMember({ id }: { id: string }) {
  return {
    url: `${endpointUrl}/${id}`,
    method: 'GET',
  }
}

export const castMembersApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCastMembers: query<Results, CastMemberParams>({
      query: getCastMembers,
      providesTags: ['CastMembers'],
    }),
    getCastMember: query<Result, { id: string }>({
      query: getCastMember,
      providesTags: ['CastMembers'],
    }),
    deleteCastMember: mutation<Result, { id: string }>({
      query: deleteCastMemberMutation,
      invalidatesTags: ['CastMembers'],
    }),
    createCastMember: mutation<Result, CastMember>({
      query: createCastMemberMutation,
      invalidatesTags: ['CastMembers'],
    }),
    updateCastMember: mutation<Result, CastMember>({
      query: updateCastMemberMutation,
      invalidatesTags: ['CastMembers'],
    }),
  }),
})

export const {
  useGetCastMembersQuery,
  useGetCastMemberQuery,
  useDeleteCastMemberMutation,
  useCreateCastMemberMutation,
  useUpdateCastMemberMutation,
} = castMembersApiSlice
