import CardLayout from '@components/CardLayout'
import { LoadingButton } from '@mui/lab'
import React, { useState, useEffect } from 'react'
import DataTable, { TableColumn } from 'react-data-table-component'
import { toast } from 'react-hot-toast'
import { AiFillCaretRight } from 'react-icons/ai'
import { cx } from 'src/hooks/helper'
import useUsers from 'src/hooks/useUsers'

const Dashboard = () => {

    const selectedUser = [];
    const [token, setToken] = useState<any>('');
    const [blockLoading, setBlockLoading] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setToken(localStorage.getItem('accessToken'));
        }
    }, [])


    // hooks 
    const { users, usersLoading } = useUsers(token);

    // table
    const columns: TableColumn<any>[] = [
        {
            name: 'Full Name',
            selector: (row: any) => row.name,
        },
        {
            name: 'Email',
            selector: (row: any) => row.email,
        },
        {
            name: 'Role',
            selector: (row: any) => <span className='capitalize bg-indigo-400 text-gray-100 px-2 rounded-md font-semibold'>{row.role}</span>,
        },
        {
            name: 'Status',
            selector: (row: any) => <span className={cx(
                'capitalize text-gray-100 px-2 rounded-md font-semibold',
                row.status === 'active' ? 'bg-success' : 'bg-error'
            )}>{row.status}</span>,
        },
    ];

    // get selected users
    const handleChange = ({ selectedRows }: any) => {
        selectedRows.map((item: any) => {
            selectedUser.push(item._id)
        })
    };

    const handleBlockAll = () => {

        if(!selectedUser.length){
            toast.error('No user selected!')
        }

        setBlockLoading(true);
    }

    return (
        <CardLayout>
            <div className='px-5 w-full'>

                <div className='flex justify-end mb-5'>
                    <LoadingButton
                        type='submit'
                        variant="contained"
                        size="medium"
                        endIcon={<AiFillCaretRight />}
                        className='!bg-indigo-500'
                        // onClick={handleLogin}
                        // loading={loading}
                        // disabled={loading}
                    >
                        Block
                    </LoadingButton>
                </div>

                <DataTable
                    columns={columns}
                    data={users?.data}
                    progressPending={usersLoading}
                    persistTableHead={true}
                    selectableRows
                    pagination
                    onSelectedRowsChange={handleChange}
                />
            </div>
        </CardLayout>
    )
}

export default Dashboard