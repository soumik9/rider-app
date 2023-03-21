import CardLayout from '@components/CardLayout'
import React, { ChangeEvent, useState } from 'react'
import { InputLabel, MenuItem, Select, FormControl, TextField, SelectChangeEvent, Button } from '@mui/material';
import { AiFillCaretRight } from 'react-icons/ai';

const JoinAsRider = () => {

  const [vType, setVType] = useState<any>('');
  const [dlFile, setFDlFile] = useState<any>('');
  const [nidFile, setNidFile] = useState<any>('');
  const [ppFile, setPPFile] = useState<any>('');

  const [input, setInput] = useState({
    name: '', age: '', address: '', phone: '', dlImg: '', nid: '', img: '', carName: '', carModel: '', namePlate: '', password: '', confirmPassword: '', vehicleType: ''
  })

  // select function
  const handleTypeChange = (e: SelectChangeEvent) => {
    setVType(e.target.value);
    setInput({ ...input, vehicleType: e.target.value })
  }

  const handleDLFileChange = (e: any) => {
    const files = e.target.files;
    if (files.length > 0) {
      setFDlFile(files[0]);
    }
  };

  const handleNidFileChange = (e: any) => {
    const files = e.target.files;
    if (files.length > 0) {
      setNidFile(files[0]);
    }
  };

  const handlePPFileChange = (e: any) => {
    const files = e.target.files;
    if (files.length > 0) {
      setPPFile(files[0]);
    }
  };

  return (
    <CardLayout>

      <div className="grid lg:grid-cols-3 grid-cols-1 gap-x-5 gap-y-8 lg:w-[80%] w-[90%]">

        <TextField
          required
          label="Full Name"
          variant="outlined"
          className=' !text-indigo-500 !w-full'
          onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setInput({ ...input, name: e.target.value })}
        />

        <TextField
          required
          label="Age"
          type='number'
          variant="outlined"
          className=' !text-indigo-500'
          onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setInput({ ...input, age: e.target.value })}
        />

        <TextField
          required
          label="Address"
          variant="outlined"
          className=' !text-indigo-500'
          onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setInput({ ...input, address: e.target.value })}
        />

        <TextField
          required
          label="Phone"
          type='number'
          variant="outlined"
          className=' !text-indigo-500'
          onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setInput({ ...input, phone: e.target.value })}
        />

        <TextField
          required
          label="Car Name"
          variant="outlined"
          className=' !text-indigo-500'
          onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setInput({ ...input, carName: e.target.value })}
        />

        <TextField
          required
          label="Car Model"
          variant="outlined"
          className=' !text-indigo-500'
          onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setInput({ ...input, carModel: e.target.value })}
        />

        <TextField
          required
          label="Car Name Plate"
          variant="outlined"
          className=' !text-indigo-500'
          onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setInput({ ...input, namePlate: e.target.value })}
        />

        <TextField
          required
          label="Password"
          variant="outlined"
          className=' !text-indigo-500'
          onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setInput({ ...input, password: e.target.value })}
        />

        <TextField
          required
          label="Confirm Password"
          variant="outlined"
          className=' !text-indigo-500'
          onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setInput({ ...input, confirmPassword: e.target.value })}
        />

        <FormControl>
          <InputLabel id="vType" className=' !text-indigo-500'>Vehicle Type</InputLabel>
          <Select
            labelId="vType"
            id="vType"
            value={vType}
            label="Vehicle Type"
            onChange={handleTypeChange}
            className=' !text-indigo-500'
          >
            <MenuItem value='car'>Car</MenuItem>
            <MenuItem value='bike'>Bike</MenuItem>
          </Select>
        </FormControl>

      </div>

      <div className='mt-10 lg:w-[80%] w-[90%]'>

        <div className='grid lg:grid-cols-3 grid-cols-1 gap-x-5 w-ful'>
          <Button
            variant="contained"
            component="label"
            className='!bg-indigo-500 w-full overflow-hidden'
            size="large"
            onChange={handleDLFileChange}
          >
            {dlFile ? dlFile.name : 'Upload Driving Licence'}
            <input hidden accept="image/*" multiple type="file" />
          </Button>

          <Button
            variant="contained"
            component="label"
            className='!bg-indigo-500 w-full overflow-hidden'
            size="large"
            onChange={handleNidFileChange}
          >
            {nidFile ? nidFile.name : 'Upload NID'}
            <input hidden accept="image/*" multiple type="file" />
          </Button>

          <Button
            variant="contained"
            component="label"
            className='!bg-indigo-500 w-full overflow-hidden'
            size="large"
            onChange={handlePPFileChange}
          >
            {ppFile ? ppFile.name : 'Upload Profile Picture'}
            <input hidden accept="image/*" multiple type="file" />
          </Button>
        </div>

      </div>

      <div className='absolute bottom-3 right-3'>
        <Button
          variant="contained"
          size="large"
          endIcon={<AiFillCaretRight />}
          className='!bg-indigo-500'
          // onClick={() => router.push('/join')}
        >
          Submit
        </Button>
      </div>


    </CardLayout>
  )
}

export default JoinAsRider