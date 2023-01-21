import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setAuthBox } from "../../features/auth";
import { RootState } from "../../../store";
import "../../styles/navigationBar.scss";
import Cookies from "universal-cookie";
import { event } from "../../vite-env";
import NavigationDisplay from "./NavigationDisplay";
import Hamburger from "./Hamburger";


export default function NavigationBar() {
  const dispatch = useDispatch();
  const { auth } = useSelector((state: RootState) => state.auth);
  const cookies = new Cookies()
  const [num,setNum] = useState(Math.min(8,Math.floor(window.innerWidth / 130)))

  function listener(e: Event){
    setNum(Math.min(8,Math.floor(window.innerWidth / 150)))
  }

  useEffect(() => {
    window.addEventListener('resize', listener )

    return () => {
      window.removeEventListener('resize', listener)
    }

  },[])

  

  return (
    <nav>
      <div className="logo">
        <svg width="150" height="49" viewBox="0 0 150 49" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.30769 31.9725L8.03077 25.8465L22.5494 10.6907H28.3252L16.2593 23.5791L13.411 26.7217L8.30769 31.9725ZM3.71869 38.5361V10.6907H8.86153V38.5361H3.71869ZM23.0241 38.5361L12.422 25.8465L15.8242 22.0675L29.0373 38.5361H23.0241Z"
            fill="#464346"
          />
          <path
            d="M62.5188 38.8145C60.7518 38.8145 59.0507 38.5891 57.4155 38.1383C55.8067 37.6609 54.5276 37.0908 53.5782 36.4278L55.4771 32.6488C56.4265 33.2587 57.5606 33.7626 58.8793 34.1604C60.1979 34.5582 61.5166 34.757 62.8353 34.757C64.3913 34.757 65.5122 34.5449 66.1979 34.1206C66.91 33.6963 67.266 33.1261 67.266 32.4101C67.266 31.8267 67.0287 31.3891 66.5539 31.0974C66.0792 30.7791 65.4595 30.5405 64.6946 30.3813C63.9298 30.2222 63.0726 30.0764 62.1232 29.9438C61.2001 29.8112 60.2639 29.6388 59.3144 29.4266C58.3914 29.188 57.5474 28.8565 56.7826 28.4322C56.0177 27.9813 55.398 27.3846 54.9232 26.6421C54.4485 25.8996 54.2111 24.9183 54.2111 23.6984C54.2111 22.346 54.5936 21.1791 55.3584 20.1979C56.1232 19.1901 57.1914 18.4211 58.5628 17.8907C59.9606 17.3338 61.6089 17.0553 63.5078 17.0553C64.932 17.0553 66.3693 17.2145 67.8199 17.5327C69.2704 17.8509 70.4704 18.3017 71.4199 18.8852L69.521 22.6642C68.5188 22.0542 67.5034 21.6432 66.4748 21.431C65.4726 21.1924 64.4704 21.073 63.4683 21.073C61.965 21.073 60.8441 21.2984 60.1056 21.7493C59.3935 22.2001 59.0375 22.7703 59.0375 23.4598C59.0375 24.0962 59.2749 24.5736 59.7496 24.8918C60.2243 25.2101 60.8441 25.462 61.6089 25.6476C62.3737 25.8333 63.2177 25.9924 64.1408 26.125C65.0902 26.2311 66.0265 26.4034 66.9496 26.6421C67.8726 26.8808 68.7166 27.2123 69.4814 27.6366C70.2726 28.0344 70.9056 28.6045 71.3803 29.3471C71.855 30.0896 72.0924 31.0576 72.0924 32.251C72.0924 33.5769 71.6968 34.7305 70.9056 35.7117C70.1407 36.693 69.0462 37.462 67.6221 38.0189C66.1979 38.5493 64.4968 38.8145 62.5188 38.8145ZM76.8256 38.5361V10.6907H89.8014C93.1244 10.6907 95.6563 11.3537 97.3969 12.6796C99.1376 13.9791 100.008 15.7294 100.008 17.9305C100.008 19.4156 99.6651 20.6885 98.9794 21.7493C98.2936 22.7835 97.3706 23.5924 96.2101 24.1758C95.0761 24.7327 93.8365 25.0112 92.4915 25.0112L93.2036 23.5791C94.7596 23.5791 96.1574 23.8708 97.3969 24.4543C98.6365 25.0112 99.6123 25.8333 100.324 26.9206C101.063 28.0079 101.432 29.3603 101.432 30.978C101.432 33.3648 100.522 35.2211 98.7024 36.5471C96.8827 37.8731 94.1794 38.5361 90.5926 38.5361H76.8256ZM81.9684 34.4786H90.2761C92.2014 34.4786 93.6783 34.1604 94.7068 33.5239C95.7354 32.8874 96.2497 31.8664 96.2497 30.4609C96.2497 29.0819 95.7354 28.0742 94.7068 27.4377C93.6783 26.7747 92.2014 26.4432 90.2761 26.4432H81.5728V22.4255H89.2475C91.0409 22.4255 92.4123 22.1073 93.3618 21.4708C94.3376 20.8344 94.8255 19.8797 94.8255 18.6067C94.8255 17.3073 94.3376 16.3393 93.3618 15.7028C92.4123 15.0664 91.0409 14.7481 89.2475 14.7481H81.9684V34.4786ZM119.462 38.5361V34.2399L119.185 33.325V25.8067C119.185 24.3482 118.75 23.2211 117.879 22.4255C117.009 21.6034 115.69 21.1924 113.923 21.1924C112.736 21.1924 111.563 21.378 110.402 21.7493C109.268 22.1205 108.306 22.6377 107.514 23.3007L105.576 19.6808C106.71 18.8056 108.055 18.1559 109.611 17.7316C111.194 17.2807 112.829 17.0553 114.517 17.0553C117.576 17.0553 119.936 17.7979 121.598 19.283C123.286 20.7415 124.13 23.0089 124.13 26.0852V38.5361H119.462ZM112.816 38.8145C111.233 38.8145 109.849 38.5493 108.662 38.0189C107.475 37.462 106.552 36.7062 105.893 35.7515C105.26 34.7703 104.943 33.6697 104.943 32.4499C104.943 31.2565 105.22 30.1824 105.774 29.2277C106.354 28.2731 107.29 27.5172 108.583 26.9603C109.875 26.4034 111.589 26.125 113.725 26.125H119.857V29.4266H114.081C112.394 29.4266 111.26 29.7051 110.679 30.262C110.099 30.7924 109.809 31.4554 109.809 32.251C109.809 33.1526 110.165 33.8686 110.877 34.399C111.589 34.9294 112.578 35.1946 113.844 35.1946C115.057 35.1946 116.139 34.9162 117.088 34.3593C118.064 33.8023 118.763 32.9802 119.185 31.893L120.016 34.8764C119.541 36.1228 118.684 37.0908 117.444 37.7803C116.231 38.4698 114.688 38.8145 112.816 38.8145ZM131.83 46.5317C130.802 46.5317 129.773 46.3593 128.745 46.0145C127.716 45.6698 126.859 45.1924 126.173 44.5825L128.151 40.9228C128.652 41.3736 129.219 41.7317 129.852 41.9968C130.485 42.262 131.132 42.3946 131.79 42.3946C132.688 42.3946 133.413 42.1692 133.967 41.7184C134.521 41.2676 135.035 40.5118 135.51 39.451L136.736 36.6664L137.132 36.0698L145.123 17.294H149.87L139.98 40.2466C139.321 41.8377 138.582 43.0974 137.764 44.0256C136.973 44.9538 136.077 45.6035 135.074 45.9748C134.099 46.346 133.017 46.5317 131.83 46.5317ZM136.182 39.2919L126.648 17.294H131.79L139.545 35.6322L136.182 39.2919Z"
            fill="#464346"
          />
          <path
            d="M30.3602 34.0781L29.9319 32.2128L44.1891 28.903L44.6177 30.7683L30.3602 34.0781ZM29.5159 30.4008L29.0876 28.5355L43.3451 25.2257L43.7733 27.091L29.5159 30.4008ZM44.4879 37.9837C43.0567 38.3159 41.6787 38.3926 40.3536 38.2137C39.0421 38.0129 37.8468 37.5887 36.7676 36.9411C35.6844 36.2757 34.7608 35.4141 33.997 34.3565C33.2331 33.2989 32.6921 32.0772 32.3739 30.6916C32.0558 29.3059 32.0095 27.9694 32.235 26.6821C32.4604 25.3948 32.917 24.2222 33.6045 23.1645C34.288 22.0889 35.1774 21.1808 36.2728 20.44C37.3817 19.6774 38.6517 19.1299 40.0827 18.7977C41.602 18.445 43.0501 18.3895 44.4269 18.6313C45.8173 18.8511 47.0548 19.3778 48.1394 20.2113L46.423 22.8271C45.5844 22.2546 44.7092 21.8871 43.7972 21.7245C42.8811 21.5442 41.9374 21.5669 40.9657 21.7924C39.994 22.018 39.1385 22.385 38.3992 22.8935C37.6776 23.3978 37.0838 24.0128 36.6177 24.7385C36.1693 25.46 35.869 26.2595 35.7169 27.1369C35.5647 28.0142 35.5988 28.9325 35.819 29.8918C36.0393 30.8511 36.409 31.6915 36.9283 32.413C37.4475 33.1345 38.0659 33.7207 38.7835 34.1716C39.5188 34.6184 40.3207 34.9094 41.1891 35.0446C42.0751 35.1757 43.0039 35.1284 43.9756 34.9029C44.9473 34.6773 45.8078 34.2905 46.5565 33.7424C47.3012 33.1766 47.9234 32.4427 48.4237 31.5407L51.1126 33.1619C50.4969 34.3713 49.6147 35.3902 48.4649 36.2184C47.3329 37.0426 46.0072 37.631 44.4879 37.9837Z"
            fill="#848484"
          />
        </svg>
      </div>
      <div className="navigation_items">
        <NavigationDisplay end={num} />
        {
          num < 8  && <Hamburger start={num + 1} />
        }
        
      </div>
    </nav>
  );
}
