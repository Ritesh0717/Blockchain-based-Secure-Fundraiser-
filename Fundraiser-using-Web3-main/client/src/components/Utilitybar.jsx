import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { CustomButton } from './';
import { menu, search } from '../assets'
import { navlinks } from '../constants';
import { useStateContext } from '../context';


const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
    <div className={`w-[48px] h-[48px] rounded-[10px] ${isActive && isActive === name && 'bg-[#6d526e]'} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`} onClick={handleClick}>
      {!isActive ? (
        <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
      ) : (
        <img src={imgUrl} alt="fund_logo" className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`} />
      )}
    </div>
)

const Utilitybar = () => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState('dashboard');
    const { connect, address } = useStateContext();
    // const address = '0xAbc'

  return (
    <div className=" justify-between items-center sticky top-72 w-[53vw] mx-auto">

      <div className="flex-1 flex flex-col justify-between items-center  rounded-[20px] w-[100%] py-4">
        <div className="flex  justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon 
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if(!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>
        <div className="sm:flex hidden flex-row justify-end">
        <CustomButton 
          btnType="button"
          title={address ? 'Create Campaign' : 'Connect'}
          styles={address ? '' : 'bg-[#8c6dfd]'}
          handleClick={() => {
            if(address) navigate('create-campaign')
            else connect();
          }}
        />
      </div>
      </div>
    </div>
  )
}

export default Utilitybar
