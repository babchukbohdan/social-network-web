import { Box, Button, Flex, Link } from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link'
import { useMeQuery } from '../generated/graphql'

type Props = {}

const NavBar: React.FC<Props> = () => {
    const [{data, fetching}] = useMeQuery()


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
                <Button variant="link">logout</Button>
            </Flex>
        )
    }

  return (
    <Flex
        bg="tomato"
        p={4}
    >
        {fetching }
        <Box  ml="auto">
            {body}
        </Box>
    </Flex>
  )
}

export default NavBar
