import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { useContract } from '@thirdweb-dev/react';
import { CustomButton, FormField, Loader } from '../components';
import { checkIfImage } from '../utils';
    

const CreateCampaign = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { createCampaign } = useStateContext();
    const [form, setForm] = useState({
      name: '',
      title: '',
      description: '',
      target: '', 
      deadline: '',
      image: ''
    });

    
    const { contract } = useContract('0x7460e61A909408464bF03DCD59e94111C1b0287e')

    const handleFormFieldChange = (fieldName, e) => {
        setForm({ ...form, [fieldName]: e.target.value })
    }

    const handleSubmit = async (e) => {
      e.preventDefault();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
    
      // checkIfImage(form.image, async (exists) => {
      //   if (exists) {
      //     setIsLoading(true);
    
      //     // Get the current signer account
      //     const signer = provider.getSigner();
      //     const owner = await signer.getAddress();
    
      //     // Convert the target amount to BigNumberish
      //     const target = ethers.utils.parseUnits(form.target, 18);
    
      //     // Convert the deadline date to a Unix timestamp
      //     const deadline = Math.floor(new Date(form.deadline).getTime() / 1000);
    
      //     // Call the createCampaign function with the six arguments
      //     await contract.createCampaign(owner, form.title, form.description, target, deadline, form.image);
    
      //     setIsLoading(false);
      //     navigate('/');
      //   } else {
      //     alert('Provide valid image URL');
      //     setForm({ ...form, image: '' });
      //   }
      // });

      checkIfImage(form.image, async (exists) => {
        if (exists) {
          setIsLoading(true);
    
          try {
            // Create an instance of the contract
            const contractAddress = '0x7460e61A909408464bF03DCD59e94111C1b0287e';
            const abi = [
              {
                "type": "function",
                "name": "campaigns",
                "inputs": [
                  {
                    "type": "uint256",
                    "name": "",
                    "internalType": "uint256"
                  }
                ],
                "outputs": [
                  {
                    "type": "address",
                    "name": "owner",
                    "internalType": "address"
                  },
                  {
                    "type": "string",
                    "name": "title",
                    "internalType": "string"
                  },
                  {
                    "type": "string",
                    "name": "description",
                    "internalType": "string"
                  },
                  {
                    "type": "uint256",
                    "name": "target",
                    "internalType": "uint256"
                  },
                  {
                    "type": "uint256",
                    "name": "deadline",
                    "internalType": "uint256"
                  },
                  {
                    "type": "uint256",
                    "name": "amountCollected",
                    "internalType": "uint256"
                  },
                  {
                    "type": "string",
                    "name": "image",
                    "internalType": "string"
                  }
                ],
                "stateMutability": "view"
              },
              {
                "type": "function",
                "name": "createCampaign",
                "inputs": [
                  {
                    "type": "address",
                    "name": "_owner",
                    "internalType": "address"
                  },
                  {
                    "type": "string",
                    "name": "_title",
                    "internalType": "string"
                  },
                  {
                    "type": "string",
                    "name": "_description",
                    "internalType": "string"
                  },
                  {
                    "type": "uint256",
                    "name": "_target",
                    "internalType": "uint256"
                  },
                  {
                    "type": "uint256",
                    "name": "_deadline",
                    "internalType": "uint256"
                  },
                  {
                    "type": "string",
                    "name": "_image",
                    "internalType": "string"
                  }
                ],
                "outputs": [
                  {
                    "type": "uint256",
                    "name": "",
                    "internalType": "uint256"
                  }
                ],
                "stateMutability": "nonpayable"
              },
              {
                "type": "function",
                "name": "donateToCampaign",
                "inputs": [
                  {
                    "type": "uint256",
                    "name": "_id",
                    "internalType": "uint256"
                  }
                ],
                "outputs": [],
                "stateMutability": "payable"
              },
              {
                "type": "function",
                "name": "getCampaigns",
                "inputs": [],
                "outputs": [
                  {
                    "type": "tuple[]",
                    "name": "",
                    "components": [
                      {
                        "type": "address",
                        "name": "owner",
                        "internalType": "address"
                      },
                      {
                        "type": "string",
                        "name": "title",
                        "internalType": "string"
                      },
                      {
                        "type": "string",
                        "name": "description",
                        "internalType": "string"
                      },
                      {
                        "type": "uint256",
                        "name": "target",
                        "internalType": "uint256"
                      },
                      {
                        "type": "uint256",
                        "name": "deadline",
                        "internalType": "uint256"
                      },
                      {
                        "type": "uint256",
                        "name": "amountCollected",
                        "internalType": "uint256"
                      },
                      {
                        "type": "string",
                        "name": "image",
                        "internalType": "string"
                      },
                      {
                        "type": "address[]",
                        "name": "donators",
                        "internalType": "address[]"
                      },
                      {
                        "type": "uint256[]",
                        "name": "donations",
                        "internalType": "uint256[]"
                      }
                    ],
                    "internalType": "struct CrowdFunding.Campaign[]"
                  }
                ],
                "stateMutability": "view"
              },
              {
                "type": "function",
                "name": "getDonators",
                "inputs": [
                  {
                    "type": "uint256",
                    "name": "_id",
                    "internalType": "uint256"
                  }
                ],
                "outputs": [
                  {
                    "type": "address[]",
                    "name": "",
                    "internalType": "address[]"
                  },
                  {
                    "type": "uint256[]",
                    "name": "",
                    "internalType": "uint256[]"
                  }
                ],
                "stateMutability": "view"
              },
              {
                "type": "function",
                "name": "numberOfCampaigns",
                "inputs": [],
                "outputs": [
                  {
                    "type": "uint256",
                    "name": "",
                    "internalType": "uint256"
                  }
                ],
                "stateMutability": "view"
              }
            ];
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, abi, signer);
    
            // Get the current signer account
            const owner = await signer.getAddress();
    
            // Convert the target amount to BigNumberish
            const target = ethers.utils.parseUnits(form.target, 18);
    
            // Convert the deadline date to a Unix timestamp
            const deadline = Math.floor(new Date(form.deadline).getTime() / 1000);
    
            // Call the createCampaign function with the six arguments
            await contract.createCampaign(owner, form.title, form.description, target, deadline, form.image);
    
            setIsLoading(false);
            navigate('/');
          } catch (err) {
            console.error(err);
            setIsLoading(false);
          }
        } else {
          alert('Provide valid image URL');
          setForm({ ...form, image: '' });
        }
      });
    };

  return (
    <div className="bg-[#49274a] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] rounded-[10px]">
        <h1 className="font-Ysabeau font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Start a Campaign</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField 
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField 
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
        </div>

        <FormField 
            labelName="Story *"
            placeholder="Write your story"
            isTextArea
            value={form.description}
            handleChange={(e) => handleFormFieldChange('description', e)}
          />

        <div className="flex flex-wrap gap-[40px]">
          <FormField 
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField 
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
        </div>

        <FormField 
            labelName="Campaign image *"
            placeholder="Place image URL of your campaign"
            inputType="url"
            value={form.image}
            handleChange={(e) => handleFormFieldChange('image', e)}
          />

          <div className="flex justify-center items-center mt-[40px]">
            <CustomButton 
              btnType="submit"
              title="Submit new campaign"
              styles="bg-[#1dc071]"
            />
          </div>
      </form>
    </div>
  )
}

export default CreateCampaign
