// Main footer for all pages
'use client';
import footerVector from "/public/footerVector.png";


import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaFacebookF, FaTiktok, FaTwitter, FaYoutube } from 'react-icons/fa';
import fax from '../../../../public/Fax.png';
import letter from '../../../../public/Letter.png';
import map from '../../../../public/Map Point Favourite.png';
import phone from '../../../../public/Phone.png';
import {
  civilEng,
  contactUs,
  informationTech,
  usefulLinks,
} from '../../utils/data';
import BackToTop from '../shared/BackToTop';
import Brands from '../shared/Brands';
import Button from '../shared/Button';
import FooterLink from '../shared/FooterLink';
import SocialLink from '../shared/SocialLink';
import Subscribe from '../shared/Subscrive';

export default function PrimaryFooter() {
  const [footerData, setFooterData] = useState([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/landingpage/footer`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        return res.json();
      })
      .then((data) => {
        setFooterData(data.footerData);
        setError(null);
      })
      .catch((err) => {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
      });
  }, []);

  return (
    <footer className=" relative flex flex-col justify-center gap-1 bg-orange-400 text-white px-10 py-10">
          
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8 font-medium ">
        <p className="footer-contact-link">
          <Image src={map} alt="phone" className="h-[16px] w-[16px]" /> London,
          Vladivostok named Sergey
        </p>
        <p className="footer-contact-link">
          <Image src={letter} alt="phone" className="h-[16px] w-[16px]" />
          sampleemail@email.com
        </p>
        <p className="footer-contact-link">
          <Image src={fax} alt="fax" className="h-[16px] w-[16px]" /> +1
          949494-99
        </p>
        <p className="footer-contact-link">
          <Image src={phone} alt="phone" className="h-[16px] w-[16px]" /> +1
          949494-99
        </p>
      </div>

      <hr className="my-2 mx-24 border-gray-400" />

      <h2 className="mx-auto mb-8 mt-2 text-center text-lg font-semibold md:mt-0">
        APPLE STORE ONLINE
      </h2>

      <div className="flex flex-col items-center justify-between gap-6">
        <div className="flex flex-col items-center justify-center gap-4 text-sm font-semibold">
          <div className="footer-nav-link">
            {usefulLinks.map((link, i) => (
              <FooterLink key={i} href={link.url}>
                {link.name}
              </FooterLink>
            ))}
          </div>
          <div className="footer-nav-link">
            {informationTech.map((link, i) => (
              <FooterLink key={i} href={link.url}>
                {link.name}
              </FooterLink>
            ))}
          </div>
          <div className="footer-nav-link">
            {civilEng.map((link, i) => (
              <FooterLink key={i} href={link.url}>
                {link.name}
              </FooterLink>
            ))}
          </div>
          <div className="footer-nav-link">
            {contactUs.map((link, i) => (
              <FooterLink key={i} href={link.url}>
                {link.name}
              </FooterLink>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Button label="Agency" href="/agency" />
          <Button label="Global Locations" href="/locations" />
          <Button label="Apply Now" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-1 md:grid-cols-3">
        <div className="flex flex-col justify-start items-start gap-3">
          <p className="text-[12px] font-semibold">
            Subscribe to our news letter
          </p>
          <hr className="mr-auto w-60 border-gray-400" />
          <Subscribe />
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="mt-6 flex justify-center gap-6 md:justify-center">
            <div className="flex space-x-4 pt-2">
              {/* Facebook */}
              <div className="cursor-pointer rounded-full bg-white p-2">
                <SocialLink link="">
                  <FaFacebookF className="text-black hover:text-[#1877F2] hover:shadow-md" />
                </SocialLink>
              </div>
              {/* YouTube */}
              <div className="cursor-pointer rounded-full bg-white p-2">
                <SocialLink link="">
                  <FaYoutube className="text-black hover:text-[#FF0000] hover:shadow-md" />
                </SocialLink>
              </div>
              {/* TikTok */}
              <div className="cursor-pointer rounded-full bg-white p-2">
                <SocialLink link="">
                  <FaTiktok className="text-black hover:text-[#4741ee] hover:shadow-md" />
                </SocialLink>
              </div>
              {/* Twitter */}
              <div className="cursor-pointer rounded-full bg-white p-2">
                <SocialLink link="">
                  <FaTwitter className="text-black hover:text-[#1DA1F2] hover:shadow-md" />
                </SocialLink>
              </div>
            </div>
          </div>
          <div className="-mt-6 overflow-hidden">
            <Brands />
          </div>
          <div>
            <p className="text-md text-center text-gray-400">
              © 2024 Sample. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      <div className="absolute md:right-16 md:bottom-20 right-4 bottom-4">
        <BackToTop />
      </div>
    </footer>
  );
}
