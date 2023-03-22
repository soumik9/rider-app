import CardLayout from '@components/CardLayout'
import React, { ChangeEvent, useState } from 'react'
import { InputLabel, MenuItem, Select, FormControl, TextField, SelectChangeEvent, Button } from '@mui/material';
import { AiFillCaretRight } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { inputType } from 'src/constants/types';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';
import { joinStep } from 'src/jotai/states';
import { asLearner, asRider } from 'src/constants';
import { useAtom } from 'jotai'
import { cx } from 'src/hooks/helper';
import { useRouter } from 'next/router';

const JoinAsRider = () => {

  // global
  const router = useRouter();

  // states
  const [step, setStep] = useAtom(joinStep);

  const [vType, setVType] = useState<any>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<inputType>({
    name: '', email: '', age: '', address: '', phone: '', dlImg: '', nid: '', img: '', carName: '', carModel: '', namePlate: '', password: '', confirmPassword: '', vehicleType: ''
  })

  // select function
  const handleTypeChange = (e: SelectChangeEvent) => {
    setVType(e.target.value);
    setInput({ ...input, vehicleType: e.target.value })
  }

  const handleDLFileChange = (e: any) => {
    let target = e.target as HTMLInputElement;
    if (!target.files) return;

    if (!e.target.files[0].name.match(/\.(jpg|jpeg|png|JPG|PNG)$/)) {
      setInput({ ...input, dlImg: '' })
      toast.error('Only jpg, jpeg & png file supported!')
    } else {
      setInput({ ...input, dlImg: e.target.files[0] })
    }
  };

  const handleNidFileChange = (e: any) => {
    let target = e.target as HTMLInputElement;
    if (!target.files) return;

    if (!e.target.files[0].name.match(/\.(jpg|jpeg|png|JPG|PNG)$/)) {
      setInput({ ...input, nid: '' })
      toast.error('Only jpg, jpeg & png file supported!')
    } else {
      setInput({ ...input, nid: e.target.files[0] })
    }
  };

  const handlePPFileChange = (e: any) => {
    let target = e.target as HTMLInputElement;
    if (!target.files) return;

    if (!e.target.files[0].name.match(/\.(jpg|jpeg|png|JPG|PNG)$/)) {
      setInput({ ...input, img: '' })
      toast.error('Only jpg, jpeg & png file supported!')
    } else {
      setInput({ ...input, img: e.target.files[0] })
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if(step === asRider){
      if (input.name === '' || input.email === '' || input.age === '' || input.address === '' || input.phone === '' || input.carName === '' || input.carModel === '' || input.namePlate === '' || input.password === '' || input.confirmPassword === '' || input.vehicleType === '' || !input.img.name || !input.dlImg.name || !input.nid.name) {
        toast.error('All fields are required!');
        return;
      }
    }
    
    if(step ===  asLearner){
      if (input.name === '' || input.email === '' || input.age === '' || input.address === '' || input.phone === '' || input.password === '' || input.confirmPassword === '' || input.vehicleType === '' || !input.img.name || !input.nid.name) {
        toast.error('All fields are required!');
        return;
      }
    }

    if (input.password.length < 6) {
      toast.error('Password length must be greater than five!');
      return;
    }

    if (input.password !== input.confirmPassword) {
      toast.error('Password must be matched!');
      return;
    }

    setLoading(true);

    const formData = new FormData()
    formData.append('name', input.name);
    formData.append('email', input.email);
    formData.append('age', input.age);
    formData.append('address', input.address);
    formData.append('phone', input.phone);
    formData.append('carName', input.carName);
    formData.append('carModel', input.carModel);
    formData.append('namePlate', input.namePlate);
    formData.append('img', input.img);
    formData.append('dlImg', input.dlImg);
    formData.append('nid', input.nid);
    formData.append('password', input.password);
    formData.append('confirmPassword', input.confirmPassword);
    formData.append('vehicleType', input.vehicleType);
    formData.append('role', step === asRider ? 'rider' : 'learner');

    const config = { headers: {} };

    axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}user/signup`, formData, config)
      .then(res => {
        setLoading(false);
        if (res.data.success) {
          localStorage.setItem('accessToken', res.data.data.token);
          localStorage.setItem('userId', res.data.data.userId);

          if(step === asRider){
            router.push('/profile')
          }else{
            router.push('/packages')
          }

          toast.success(res.data.message);
        } else {
          toast.error('Server error!');
        }
      })
  }

  return (
    <CardLayout>

      <form encType='multipart/form-data' onSubmit={handleSubmit} className='lg:w-[80%] w-[90%]'>

        <div className="grid lg:grid-cols-3 grid-cols-1 gap-x-5 gap-y-8 ">

          <TextField
            required
            label="Full Name"
            variant="outlined"
            className=' !text-indigo-500 !w-full'
            onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setInput({ ...input, name: e.target.value })}
          />

          <TextField
            required
            type='email'
            label="Email"
            variant="outlined"
            className=' !text-indigo-500 !w-full'
            onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setInput({ ...input, email: e.target.value })}
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

          {step === asRider ? <>
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
          </> : null}

          <TextField
            required
            type='password'
            label="Password"
            variant="outlined"
            className=' !text-indigo-500'
            onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setInput({ ...input, password: e.target.value })}
          />

          <TextField
            required
            type='password'
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

        <div className='mt-10'>

          <div className={cx(
            step === asRider ? 'lg:grid-cols-3' : 'lg:grid-cols-2',
            'grid grid-cols-1 gap-x-5 w-ful'
          )}>

            {step === asRider ?  <Button
              variant="contained"
              component="label"
              className='!bg-indigo-500 w-full overflow-hidden'
              size="large"

              onChange={handleDLFileChange}
            >
              {input.dlImg ? input.dlImg.name : 'Upload Driving Licence'}
              <input hidden accept="image/*" id="dlImg" name="dlImg" type="file" />
            </Button> : null}
           

            <Button
              variant="contained"
              component="label"
              className='!bg-indigo-500 w-full overflow-hidden'
              size="large"
              onChange={handleNidFileChange}
            >
              {input.nid ? input.nid.name : 'Upload NID'}
              <input hidden accept="image/*" type="file" id="nid" name="nid" />
            </Button>

            <Button
              variant="contained"
              component="label"
              className='!bg-indigo-500 w-full overflow-hidden'
              size="large"
              onChange={handlePPFileChange}
            >
              {input.img ? input.img.name : 'Upload Profile Picture'}
              <input hidden accept="image/*" type="file" name="img" />
            </Button>
          </div>

        </div>

        <div className='absolute bottom-3 right-3'>
          <LoadingButton
            type='submit'
            variant="contained"
            size="large"
            endIcon={<AiFillCaretRight />}
            className='!bg-indigo-500'
            // onClick={handleSubmit}
            loading={loading}
            disabled={loading}
          >
            {step === asRider ? 'Join As Rider' : 'Join As Learner'}
          </LoadingButton>

        </div>

      </form>
    </CardLayout>
  )
}

export default JoinAsRider