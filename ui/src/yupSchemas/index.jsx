import * as Yup from 'yup'

export const signUpSchema = Yup.object({
  name: Yup.string().min(4).max(25).required('Please enter your name'),
  email: Yup.string().email().required('Please enter your email'),
  password: Yup.string().min(8).required('Please enter your password'),
})

export const loginSchema = Yup.object({
  email: Yup.string().email('Email must be a valid email').required('Please enter your email'),
  password: Yup.string().min(8).required('Please enter your password'),
})

export const welcomeSchema = Yup.object({
    username: Yup.string().min(4).max(25).required('Please enter your name'),
 
  })
  
