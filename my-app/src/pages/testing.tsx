// import { getAllListingFromSupabase, getListingFromSupabase } from '@/shared/utils';
// import React, { useEffect, useState } from 'react';
// import { useRouter } from "next/router";


// const ListingsPage: React.FC = () => {
//   const [listings, setListings] = useState<any[]>([]); 
//   const router = useRouter();



//   function handleRouteClick(walletAddress) {
//     router.push(`/trade/detail/${walletAddress}`);
//   }

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const data = await getAllListingFromSupabase();

//         setListings(data);
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     }

//     fetchData();
//   }, []); 

//   return (
//     <div>
//       <h1>Listings</h1>
//       <ul>
//         {listings.map((listing, key) => (
//           <li key={key}>
//             <p>Token: {listing.token}</p>
//             <p>Listing price: {listing.price}</p>
//             <p>Listing Amount: {listing.amount}</p>
//             <p>Listing Duration: {listing.duration}</p>
//             <button onClick={() => handleRouteClick(listing.wallet_address)}>ROUTE</button>
//             <br />
//             <br />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ListingsPage;

import React from 'react'
import { useBalance } from 'wagmi'


const Testing = () => {
  const { data, isError, isLoading } = useBalance({
    address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  })
  return (
    <div>testing</div>
  )
}

export default Testing;