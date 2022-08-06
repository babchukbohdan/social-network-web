import { FormControl, FormLabel, Input, FormErrorMessage, Button, Box } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import React from 'react'
import { InputField } from '../components/InputField'
import { Wrapper } from '../components/Wrapper'
import { useLoginMutation } from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap'
import { useRouter } from 'next/router'

interface loginProps {

}

const Login: React.FC<loginProps> = () => {
    const router = useRouter()
    const [, login] = useLoginMutation()

    return (
        <Wrapper variant='small'>
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                }}
                onSubmit={async (values, {setErrors}) => {
                    const response = await login({options: values})

                    if (response.data?.login.errors) {
                        setErrors(toErrorMap(response.data.login.errors))
                    } else if (response.data?.login.user) {
                        router.push("/")
                    }

                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField label='Username' name="username" placeholder='username' />
                        <Box mt={4}>

                            <InputField label='Password' type="password" name="password" placeholder='password' />
                        </Box>
                        <Button type='submit' colorScheme="teal" mt={4} isLoading={isSubmitting}> login</Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    )
}
export default Login