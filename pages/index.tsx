import Container from '../components/_Layout/Container';
import Head from 'next/head';
import NFTInfo from '../components/NFTInfo';
import React, { createRef, useEffect, useState } from 'react';
import Screenshotable from '../components/Screenshotable';
import { NFT } from '../types';
import { useEditor } from '../hooks/useEditor';
import type { NextPage } from "next";
import Select from 'react-select';
import Hat from '../public/assets/img/hat_fp.png';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader



const Home: NextPage = () => {
  const { backgroundColor, setBackgroundColor, primaryColor, setPrimaryColor, secondaryColor, setSecondaryColor } = useEditor()

  const [selectedApezId, setSelectedApezId] = useState<string>("337");
  const [selectedApez, setSelectedApez] = useState<NFT | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const ref = createRef();

  const fetchDaApez = () => {
    fetch(
      `https://api.elrond.com/collections/DAPEZ-c88658/nfts?name=${selectedApezId}&withOwner=true`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        response.json().then((json) => {
          if (json && Array.isArray(json) && Array.from(json).length > 0) {
            setSelectedApez(json[0]);
          } else {
            setSelectedApez(null);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDaApez();
  }, []);

  const handleSubmitApez = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    fetchDaApez();
  };

  const options = [
    { value: 'king', label: 'King' },
    { value: 'goldrobocop', label: 'Gold RobotCop' },
    { value: 'fishbowl', label: 'FishBowl' }
  ]
  return (
    <>
      <Head>
        <title>DaApez - DaApezator</title>
        <meta name="description" content="DaApez Badge Generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        {selectedApez ? (
          <div className='my-8'>
            <p className='block text-3xl sm:text-4xl leading-none font-extrabold tracking-tight mb-10 text-white'>Generate your <span className='text-yellow-500'>DaApez</span> Badge !</p>
            <div className="grid grid-cols-1">
              <div className="col-span-1">
                <div className="my-2">
                  <div className="flex flex-col items-start gap-4">
                    <form onSubmit={handleSubmitApez}>
                      <label className="block text-white">Search by Id</label>
                      <input
                        className="px-2 py-1 rounded-l outline-none"
                        type={"text"}
                        value={selectedApezId}
                        onChange={(e) => setSelectedApezId(e.target.value)}
                      ></input>
                      <button
                        className="px-2 py-1 rounded-r bg-yellow-500 text-white"
                        type="submit"
                      >
                        {loading ? "Loading..." : "OK"}
                      </button>
                    </form>
                    <div className="flex gap-2">
                      <div>
                        <label className="block text-white">Background color</label>
                        <input type={"color"} className="rounded" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-white">Primary color</label>
                        <input type={"color"} className="rounded" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-white">Secondary color</label>
                        <input type={"color"} className="rounded" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <Screenshotable>
                    <NFTInfo nft={selectedApez} />
                  </Screenshotable>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-white py-4">Loading...</p>
        )}
      </Container>
      <Container>
        <div id="hot-items" className='my-8'>
          <p className='block text-3xl mt-20 sm:text-4xl leading-none font-extrabold tracking-tight mb-10 text-white'> 🔥Hot Items🔥</p>
          <div className="grid grid-cols-1">
            <div className="col-span-1">
              <div className="my-2">
                <div className="flex flex-col items-start gap-4">
                  <Carousel>
                    <div>
                      <img
                        className="block w-auto"
                        src="/assets/img/hat_fp.png"
                        alt="hat FP"
                      />
                    </div>
                    <div>
                      <img
                        className="block w-auto"
                        src="/assets/img/skin_fp.png"
                        alt="clothes FP"
                      />
                    </div>   
                    <div>
                      <img
                        className="block w-auto"
                        src="/assets/img/clothes_fp.png"
                        alt="clothes FP"
                      />                      
                    </div>                            
                  </Carousel>
                 
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
