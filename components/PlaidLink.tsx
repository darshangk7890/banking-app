import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'
import { useRouter } from 'next/navigation';
import { createLinkToken, exchangePublicToken } from '@/lib/actions/actions.user';

const PlaidLink = (
    {user, variant}: PlaidLinkProps
) => {
    const router = useRouter();
    const [token, settoken] = useState('');
    useEffect(() => {
        const getLinkToken = async () => {
            const data = await createLinkToken(user);  
            settoken(data?.linkToken);
        } 

        getLinkToken();
    }, [user])
    const onSuccess = useCallback<PlaidLinkOnSuccess>( async (public_token: string) =>
    {
        await exchangePublicToken({
            publicToken: public_token,
            user,
        })
        router.push('/');
    }, [user] )
    const config: PlaidLinkOptions = {
        token,
        onSuccess
    }

    const { open, ready} = usePlaidLink(config);
  return (
    <>
      {
        variant === "primary" ? (
            <Button className="plaidlink-primary justify-center" onClick={() => open()} disabled={!ready} >
                Connect Bank
            </Button>
        ) : variant === "ghost" ? (
            <Button>
                Connect Bank
            </Button>
        ) : (
            <Button>
                Connect Bank
            </Button>
        )
      }
    </>
  )
}

export default PlaidLink
