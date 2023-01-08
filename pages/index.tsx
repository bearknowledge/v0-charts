import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Chart from "../components/chart";




const Home: NextPage = () => {
  const [selected, isSelected] = useState("xci");
  const [timeline, setTimeline] = useState("daily")
  const [data, setData] = useState({} as any)

  const fetchData = async (index:string) => {
    let res = await fetch("/api/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name:index, duration:timeline})
    });
    let xci = await res.json();
    setData(xci)
  }

  useEffect(() => {
    fetchData(selected)
  }, [selected, timeline]);

  return (
    <div className="min-h-universal w-screen h-[100%] flex flex-col bg-[#0E0F0D] overflow-hidden font-sans mobile:text-xs">
      <Head>
        <title>Xchange Xata</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
					rel="stylesheet"
				/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-row justify-between items-center rounded-lg  m-4">
        <div className="flex flex-1 flex-row items-center">
          <img src="/Logo.svg" className="text-5xl"></img>
          <label className="ml-7 text-white font-light mobile:ml-3" htmlFor="index">
            Choose an Index:
          </label>
          <select
            id="index"
            onChange={(e) => isSelected(e.target.value)}
            className="w-[75px] text-ellipsis focus:outline-none font-medium bg-transparent text-white rounded-lg"
          >
            <option value="xci">Xsauce Culture Index</option>

            <option value="sp50">S&P50(Sneaker Benchmark)</option>

            <option value="hype6">HYPE6</option>
          </select>
        </div>

        <div className=" hidden laptop:flex flex-row font-SG">
        <a
            
            href="https://docs.xsauce.io/getting-started/introduction"
            target="_blank"
            className="text-lg  text-white"
          >
            <p className="p-2">About</p>
          </a>
        
          <a
            href="https://docs.xsauce.io/getting-started/introduction"
            target="_blank"
            className="ml-7 pr-7 text-lg text-white border-r border-gray-200"
          >
            <p className="p-2">Contact Us</p>
          </a>
          <a
            href="https://t.me/+mS9DMZ0e_FxhMzBh"
            target="_blank"
            className="border-gradient ml-7 text-lg text-white transition hover:duration-[1000ms] hover:shadow-md hover:shadow-[#2FFD76]"
          >
            <p className="p-2 ">Start Trading</p>
          </a>
        </div>
      </div>


      <div className="flex w-full  flex-col justify-center items-center font-Inter mobile:mb-6">
      <div className="flex items-center justify-center pb-3">
  <div className="inline-flex" role="group">
    <button onClick={(e) => setTimeline((e.target as HTMLInputElement).value)} value="daily" type="button" className={timeline === "daily" ? "rounded-l inline-block px-6 py-2.5 bg-[#999999] text-black font-medium text-xs leading-tight uppercase hover:bg-[#999999] focus:bg-[#999999] focus:outline-none focus:ring-0 active:bg-[#999999] transition duration-150 ease-in-out": "rounded-l inline-block px-6 py-2.5 bg-white text-black font-medium text-xs leading-tight uppercase hover:bg-[#999999] focus:bg-[#999999] focus:outline-none focus:ring-0 active:bg-[#999999] transition duration-150 ease-in-out"}>Daily</button>
    <button onClick={(e) => setTimeline((e.target as HTMLInputElement).value)} value="weekly"type="button" className={timeline === "weekly" ? " rounded-r inline-block px-6 py-2.5 bg-[#999999] text-black font-medium text-xs leading-tight uppercase hover:bg-[#999999] focus:bg-[#999999] focus:outline-none focus:ring-0 active:bg-[#999999] transition duration-150 ease-in-out": "rounded-r inline-block px-6 py-2.5 bg-white text-black font-medium text-xs leading-tight uppercase hover:bg-[#999999] focus:bg-[#999999] focus:outline-none focus:ring-0 active:bg-[#999999] transition duration-150 ease-in-out"}>Weekly</button>
    {/* <button onClick={(e) => setTimeline((e.target as HTMLInputElement).value)} value="monthly" type="button" className={timeline === "monthly" ? "rounded-r inline-block px-6 py-2.5 bg-[#999999] text-black font-medium text-xs leading-tight uppercase hover:bg-[#999999] focus:bg-[#999999] focus:outline-none focus:ring-0 active:bg-[#999999] transition duration-150 ease-in-out": "rounded-r inline-block px-6 py-2.5 bg-white text-black font-medium text-xs leading-tight uppercase hover:bg-[#999999] focus:bg-[#999999] focus:outline-none focus:ring-0 active:bg-[#999999] transition duration-150 ease-in-out"}>Monthly</button> */}
  </div>
</div>
        <h1 className="text-white text-3xl font-sans font-medium pb-1 uppercase">
          {selected}
        </h1>
        <h2 className="text-[#2FFD76] text-5xl font-sans font-bold pb-1">
        {"$" + data?.[data.length - 1]?.price.toFixed(2)}
        </h2>
        <p className="text-[gray] text-md font-sans font-light">
          Last updated on: {data?.[data.length - 1]?.date} at {data?.[data.length - 1]?.time} UTC
        </p>
      </div>

      <div className="grow h-[calc(100vh - 40vh)]; items-center mobile:pr-[30px] laptop:p-[10px]">
        <Chart key={data} data={data} />
      </div>
    </div>
  );
};

export default Home;
