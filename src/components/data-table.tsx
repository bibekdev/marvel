import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  ColumnDef,
  PaginationState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './button'
import { Loading } from './loading'
import { useDebounce } from '../hooks/use-debounce'
import { fetchAllCharacters } from '../services/api'

type Character = {
  id: string
  name: string
  description: string
  thumbnail: {
    path: string
    extension: string
  }
}

export const DataTable = () => {
  const query = useQueryClient()
  const [value, setValue] = useState<string>('')
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageSize: 20,
    pageIndex: 0,
  })
  const debouncedValue = useDebounce(value)

  const columns: ColumnDef<Character>[] = useMemo(
    () => [
      {
        accessorKey: 'thumbnail',
        header: 'Thumbnail',
        cell: ({ row }) => (
          <div className='w-[100px] h-full'>
            <img
              src={`${row.original.thumbnail.path}.${row.original.thumbnail.extension}`}
              alt=''
              className='object-cover'
            />
          </div>
        ),
      },
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => <p className='max-w-[200px]'>{row.original.name}</p>,
      },
      {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) =>
          row.original.description ? (
            <p className='max-w-[400px] line-clamp-2'>{row.original.description}</p>
          ) : (
            <p>No Description for this character</p>
          ),
      },
    ],
    []
  )

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  )

  const { data, isLoading } = useQuery({
    queryKey: ['characters', pageIndex, debouncedValue],
    queryFn: () => fetchAllCharacters({ pageIndex, pageSize }, debouncedValue),
    placeholderData: keepPreviousData,
    enabled: true,
  })

  useEffect(() => {
    query.invalidateQueries({
      queryKey: ['characters', pageIndex, debouncedValue],
    })
  }, [debouncedValue])

  const {
    getHeaderGroups,
    getRowModel,
    nextPage,
    previousPage,
    getCanPreviousPage,
    setPageIndex,
  } = useReactTable({
    data: data?.results || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: { pagination },
    onPaginationChange: setPagination,
    manualPagination: true,
  })

  return isLoading ? (
    <Loading />
  ) : (
    <div className='mx-auto w-full md:w-[90%] lg:w-[70%]'>
      <div className='my-5 flex flex-col-reverse md:flex-row justify-between items-center'>
        <input
          type='text'
          placeholder='Search Characters...'
          className='py-3 px-4 w-full md:w-[400px] placeholder:text-gray-500 text-base outline-none bg-gray-300 rounded-md'
          onChange={e => setValue(e.target.value)}
        />
        <Link to='/chart' className='button mb-2 md:w-[300px] w-full text-center'>
          See Chart For Characters
        </Link>
      </div>
      <table className='w-full text-sm text-left text-gray-300 border-1 border-white'>
        <thead className='uppercase bg-[#434c5e]'>
          {getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className='border-1 border-white'>
              {headerGroup.headers.map(header => (
                <th key={header.id} className='border-1 border-white px-2 py-5'>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {data.results.length === 0 && (
            <div className='w-full text-center mt-10 text-xl'>No results</div>
          )}
          {getRowModel().rows.map(row => (
            <tr
              key={row.id}
              className='hover:bg-black/20 cursor-pointer hover:text-white transition'>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} colSpan={0}>
                  <Link to={`/characters/${cell.getContext().row.original.id}`}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Link>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {data?.total > 20 ? (
        <div className='flex items-center justify-center mt-5 mb-10'>
          <div className='mr-5 flex gap-3'>
            <Button
              onClick={() => setPageIndex(0)}
              disabled={!getCanPreviousPage}
              title='First'
            />
            <Button
              onClick={() => previousPage()}
              disabled={!getCanPreviousPage}
              title='Prev'
            />
          </div>
          <p className='text-white'>
            Page {pageIndex + 1} of {Math.ceil(data?.total / 20)}
          </p>
          <div className='ml-5 flex gap-3'>
            <Button onClick={() => nextPage()} title='Next' disabled={pageIndex === 78} />
            <Button
              onClick={() => setPageIndex(Math.floor(data?.total / 20))}
              disabled={pageIndex === 78}
              title='Last'
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}
