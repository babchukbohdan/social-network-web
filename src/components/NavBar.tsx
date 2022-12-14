import { Box, Button, Flex, Link } from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link'
import { useLogoutMutation, useMeQuery } from '../generated/graphql'
import { isServer } from '../utils/isServer'

type Props = {}

const NavBar: React.FC<Props> = () => {
    const [{fetching: logoutFetching}, logout] = useLogoutMutation()
    const [{data, fetching}] = useMeQuery({
        pause: isServer()
    })

    let body = null;
    if (fetching) {
    } else if (!data?.me) {
        body = (
            <>
                <NextLink href="/login" passHref>
                    <Link color="white" mr={2}>Login</Link>
                </NextLink>
                <NextLink href="/register" passHref>
                    <Link color="white">Register</Link>
                </NextLink>
            </>
        )
    } else {
        body = (
            <Flex>
                <Box mr={2}>{data.me.username}</Box>
                <Button
                    onClick={() => logout()}
                    isLoading={logoutFetching}
                    variant="link">logout</Button>
            </Flex>
        )
    }

  return (
    <Flex
        bg="tomato"
        p={4}
    >
        <Box  ml="auto">
            {body}
        </Box>
    </Flex>
  )
}

export default NavBar
