import CardLayout from '@components/CardLayout'
import { LoadingButton } from '@mui/lab'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
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
    const [filteredUsers, setFilteredUsers] = useState<any>([]);
    const [searchText, setSearchText] = useState<string>('');
    const [selectAgeF, setSelectAgeF] = useState<string>('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setToken(localStorage.getItem('accessToken'));
        }
    }, [])


    // hooks 
    const { users, usersLoading, usersFetch } = useUsers(token);

    // filted users
    useEffect(() => {
        if (searchText && selectAgeF) {

            if(selectAgeF === 'one'){
                setFilteredUsers(users?.data?.filter((el: any) => ((el.name)?.match(new RegExp(searchText, "i")) || (el.email)?.match(new RegExp(searchText, "i")) || (el.phone)?.match(new RegExp(searchText, "i"))) && (el.age >= 18 && el.age <= 25)
                ));
            }else{
                setFilteredUsers(users?.data?.filter((el: any) => ((el.name)?.match(new RegExp(searchText, "i")) || (el.email)?.match(new RegExp(searchText, "i")) || (el.phone)?.match(new RegExp(searchText, "i"))) && (el.age >= 26 && el.age <= 30)
                ));
            }
        }else if(selectAgeF){
            if(selectAgeF === 'one'){
                setFilteredUsers(users?.data?.filter((el: any) => el.age >= 18 && el.age <= 25))
            }else{
                setFilteredUsers(users?.data?.filter((el: any) => el.age >= 26 && el.age <= 30))
            }
        }else if (searchText) {
            setFilteredUsers(users?.data?.filter((el: any) => (el.name)?.match(new RegExp(searchText, "i")) || (el.email)?.match(new RegExp(searchText, "i")) || (el.phone)?.match(new RegExp(searchText, "i"))
            ));
        } else {
            setFilteredUsers(users?.data);
        }
    }, [searchText, users?.data, selectAgeF]);

    // table
    const columns: TableColumn<any>[] = [
        {
            name: 'Full Name',
            selector: (row: any) => row.name,
        },
        {
            name: 'Age',
            selector: (row: any) => row.age,
        },
        {
            name: 'Email',
            selector: (row: any) => row.email,
        },
        {
            name: 'Phone',
            selector: (row: any) => row.phone,
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

                <div className='flex gap-3 flex-col md:flex-row justify-end mb-5'>

                    <FormControl>
                        <InputLabel id="ageF" className=' !text-indigo-500'>Filter By Age</InputLabel>
                        <Select
                            labelId="ageF"
                            id="ageF"
                            value={selectAgeF}
                            label="Filter By Age"
                            onChange={(e: any) => setSelectAgeF(e.target.value)}
                            className=' !text-indigo-500 w-[200px]'
                        >
                            <MenuItem value=''>None</MenuItem>
                            <MenuItem value='one'>18-25</MenuItem>
                            <MenuItem value='two'>26-30</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        label="Search"
                        variant="outlined"
                        className=' !text-indigo-500'
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setSearchText(e.target.value)}
                    />

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
                    data={filteredUsers}
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