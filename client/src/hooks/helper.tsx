import toast from 'react-hot-toast';

export const checkArray = (arr: any) => {
    for(let i=0; i<arr.length; i++){
      let obj = arr[i];
      for(let prop in obj){
        if(obj[prop] === undefined || obj[prop] === null || obj[prop] === ''){
          toast.error('All fields are required!')
        }
      }
    }
  }