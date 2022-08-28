import React from 'react'
import { Button, Box, Link } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import { InputField } from '../components/InputField'
import { Wrapper } from '../components/Wrapper'
import { useLoginMutation } from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap'
import { useRouter } from 'next/router'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'
import NextLink from 'next/link'

interface loginProps {

}

const Login: React.FC<loginProps> = () => {
    const router = useRouter()
    const [, login] = useLoginMutation()

    return (
        <Wrapper variant='small'>
            <Formik
                initialValues={{
                    usernameOrEmail: '',
                    password: '',
                }}
                onSubmit={async (values, {setErrors}) => {
                    const response = await login(values)

                    if (response.data?.login.errors) {
                        setErrors(toErrorMap(response.data.login.errors))
                    } else if (response.data?.login.user) {
                        router.push("/")
                    }

                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField label='Username or email' name="usernameOrEmail" placeholder='username or email' />
                        <Box mt={4}>

                            <InputField label='Password' type="password" name="password" placeholder='password' />
                        </Box>
                        <Button type='submit' colorScheme="teal" mt={4} isLoading={isSubmitting}> login</Button>
                        <NextLink href="/forgot-password">
                            <Link>forgot password?</Link>
                        </NextLink>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    )
}
export default withUrqlClient(createUrqlClient)(Login)
