import React, { useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'



const RegisterScreen = ({history, location}) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [message, setMessage] = useState('')

	const dispatch = useDispatch()
	const { loading, error, userInfo } = useSelector((state) => state.userRegister)

	const redirect = location.search ? location.search.split('=')[1] : '/'

	useEffect(()=>{
		if(userInfo){
			history.push(redirect)
		}
	}, [history, userInfo, redirect])

	const submitHandler = (e) => {
		e.preventDefault()
        if(confirmPassword !== password){
            setMessage("Passwords do not match")
        }else{
            dispatch(register(name, email, password))

        }
	}

	return (
		<Container>
			<Row className='justify-content-md-center'>
				<Col xs={12} md={6}>
					<h1>Sign up.</h1>
					{error && <Message variant = 'danger'>{error}</Message>}
					{message && <Message variant = 'danger'>{message}</Message>}
					{loading && <Loader />}
					<Form onSubmit={submitHandler}>
	                    <Form.Group controlId='name'>
							<Form.Label>Name</Form.Label>
							<Form.Control type='name' placeholder='Enter name' value={name} onChange={(e)=>(setName(e.target.value))}></Form.Control>
						</Form.Group>
						<Form.Group controlId='email'>
							<Form.Label>Email Address</Form.Label>
							<Form.Control type='email' placeholder='Enter email' value={email} onChange={(e)=>(setEmail(e.target.value))}></Form.Control>
						</Form.Group>
						<Form.Group controlId='password'>
							<Form.Label>Password</Form.Label>
							<Form.Control type='password' placeholder='Enter password' value={password} onChange={(e)=>(setPassword(e.target.value))}></Form.Control>
						</Form.Group>
						<Form.Group controlId='confirmPassword'>
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control type='password' placeholder='Enter password again' value={confirmPassword} onChange={(e)=>(setConfirmPassword(e.target.value))}></Form.Control>
						</Form.Group>
						<Button type='Submit' variant='primary'>Sign up</Button>
					</Form>
					<Row className='py-3'>
						<Col>
						Already a user?{' '}
						<Link to={redirect ? `/login?redirect=${redirect}`:`/login`}>Login</Link>
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	)
}

export default RegisterScreen