import React, { useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions/userActions'



const LoginScreen = ({history, location}) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const dispatch = useDispatch()
	const { loading, error, userInfo } = useSelector((state) => state.userLogin)

	const redirect = location.search ? location.search.split('=')[1] : '/'

	useEffect(()=>{
		if(userInfo){
			history.push(redirect)
		}
	}, [history, userInfo, redirect])

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(login(email, password))
	}

	return (
		<Container>
			<Row className='justify-content-md-center'>
				<Col xs={12} md={6}>
					<h1>Sign in.</h1>
					{error && <Message variant = 'danger'>{error}</Message>}
					{loading && <Loader />}
					<Form onSubmit={submitHandler}>
						<Form.Group controlId='email'>
							<Form.Label>Email Address</Form.Label>
							<Form.Control type='email' placeholder='Enter email' value={email} onChange={(e)=>(setEmail(e.target.value))}></Form.Control>
						</Form.Group>
						<Form.Group controlId='password'>
							<Form.Label>Password</Form.Label>
							<Form.Control type='password' placeholder='Enter password' value={password} onChange={(e)=>(setPassword(e.target.value))}></Form.Control>
						</Form.Group>
						<Button type='Submit' variant='primary'>Sign in</Button>
					</Form>
					<Row className='py-3'>
						<Col>
						New costomer?{' '}
						<Link to={redirect ? `/register?redirect=${redirect}`:`/register`}>Register</Link>
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	)
}

export default LoginScreen