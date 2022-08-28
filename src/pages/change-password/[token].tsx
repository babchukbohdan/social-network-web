import { Box, Button, Flex, Link } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { InputField } from '../../components/InputField'
import { Wrapper } from '../../components/Wrapper'
import { useChangePasswordMutation } from '../../generated/graphql'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { toErrorMap } from '../../utils/toErrorMap'
import NextLink from 'next/link'

const ChangePassword: NextPage<{token: string}> = ({token}) => {
    const [, changePassword] = useChangePasswordMutation()
    const [tokenError, setTokenError] = useState()
    const router = useRouter()
    return (
    <Wrapper variant='small'>
            <Formik
                initialValues={{
                    newPassword: '',
                }}
                onSubmit={async (values, {setErrors}) => {
                    const response = await changePassword({newPassword: values.newPassword, token})
                    if (response.data?.changePassword.errors) {
                        const errorMap = toErrorMap(response.data.changePassword.errors)
                        if('token' in errorMap) {
                            setTokenError(errorMap.token)
                        }
                        setErrors(errorMap)
                    } else if (response.data?.changePassword.user) {
                        router.push("/")
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField label='New Password' type="password" name="newPassword" placeholder='New password' />
                        {tokenError && (
                            <Flex>
                                <Box mr={2} style={{color: "red"}} >{tokenError} </Box>
                                <NextLink href="/forgot-password">
                                    <Link>go forget it again</Link>
                                </NextLink>
                            </Flex>
                        )}
                        <Button type='submit' colorScheme="teal" mt={4} isLoading={isSubmitting}> reset</Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
  )
}

ChangePassword.getInitialProps = ({query}) => {
    return {
        token: query.token as string
    }
}

export default withUrqlClient(createUrqlClient)(ChangePassword);
