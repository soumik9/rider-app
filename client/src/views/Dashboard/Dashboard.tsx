import CardLayout from '@components/CardLayout'
import { LoadingButton } from '@mui/lab'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import DataTable, { TableColumn } from 'react-data-table-component'
import { toast } from 'react-hot-toast'
import { AiFillCaretRight } from 'react-icons/ai'
import { cx } from 'src/hooks/helper'
import useUsers from 'src/hooks/useUsers'

const Dashboard = () => {

    const selectedUser: any = [];
    const [token, setToken] = useState<any>('');
    const [blockLoading, setBlockLoading] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setToken(localStorage.getItem('accessToken'));
        }
    }, [])


    // hooks 
    const { users, usersLoading, usersFetch } = useUsers(token);

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

        if (!selectedUser.length) {
            toast.error('No user selected!')
        }

        setBlockLoading(true);

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}block-users`, { selectedUser }, config)
            .then(res => {
                setBlockLoading(false);
                usersFetch();
                if (res.data.success) {
                    toast.success(res.data.message);
                } else {
                    toast.error('Server error!');
                }
            })
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
                        onClick={handleBlockAll}
                        loading={blockLoading}
                        disabled={blockLoading}
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