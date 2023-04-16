import Head from 'next/head'
import Link from 'next/link';
import Footer from '@/components/Footer'
import { useState } from 'react';
import { doLogin } from '@/services/Web3Service'

export default function Home() {

  // states
  const [wallet, setWallet] = useState("");
  const [error, setError] = useState("");

  function onConnectClick(){
    doLogin()
      .then(wallet => setWallet(wallet))
      .catch(error => setError(error))
  }

  return (
    <>
      <Head>
        <title>CheapIn - Home</title>
        <meta charSet='utf-8' />
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className='container px-4 py-5'>
        <div className='row flex-lg-row-reverse align-items-center py-5 g-5'>
            {
              !wallet ? (
                <div className='col-10 col-sm-8 col-lg-6'>
                  <img className='d-block mx-lg-auto img-fluid' width='700' height='500' src='/beggarBear.jpg' />
                </div>
              ) : (
                <div className='col-10 col-sm-8 col-lg-6'>
                  <p className='mb-3'>Welcome: {wallet}</p>
                  <p className='mb-3'>What do you want?</p>
                  <div className='col-12'>
                    <p><Link className='btn btn-primary col6 p-3' href='/donate'>Make a Donation</Link></p>
                    <p><Link className='btn btn-secondary col6 p-3' href='/create'>Create a Campaign</Link></p>
                  </div>
                </div>
              )
            }
          <div className='col-lg-6'>
            <h1 className='display-5 fw-bold text-body-emphasis lh-1 mb-3'>CheapIn !</h1>
            <p className='lead'>Your decentralized donation platform.</p>
            <p className='lead mb-3'>Authenticate with your wallet, create your campaign or donate to existing campaigns.</p>
            {
              !wallet ? (
                <div className='d-grid gap-2 d-md-flex justify-content-md-start'>
                  <button className='btn btn-primary btn-lg px-4 me-md-2' 
                          type='button'
                          onClick={onConnectClick}>
                    <img className='me-3' width='64' src='/metamask.svg' />
                    Connect with your wallet
                  </button>
                  { error }
                </div>
              ) : (
                <></>
              )
            }
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
