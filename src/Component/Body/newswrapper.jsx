// import React from "react";
// import { useState } from "react";
// import { NewsBoard } from "./newsboard";
// import { NewsCategory } from "./newscategory";
// import { HealthCategory } from "./health";
// import { SportCategory } from "./sports";
// import { ScienceCategory } from "./science";
// import { BusinessCategory } from "./business";
// import {EntertainmentCategory} from './entertainment'

// export function NewsWrapper() {
//   const [selectedCountry, setSelectedCountry] = useState("us");

//   const handleCountryChange = (country) => {
//     setSelectedCountry(country);
//   }

//   return (
//     <div>
//       <label htmlFor="country">Select Country</label>
//       <select
//         id="country"
//         onChange={(e) => {
//           handleCountryChange(e.target.value);
//         }}
//         value={selectedCountry}
//       >
//         <option value="gb">United Kingdom</option>
//         <option value="ng">Nigeria</option>
//         <option value="fr">France</option>
//         <option value="id">India</option>
//         <option value="be">Belgium</option>
//         <option value="ir">Iran</option>
//       </select>
//       <NewsBoard category="general" country={selectedCountry} />
//       <NewsCategory category="technology" country={selectedCountry} />
//       <BusinessCategory category="business" country={selectedCountry} />
//       <HealthCategory category="health" country={selectedCountry} />
//       <SportCategory category="sport" country={selectedCountry} />
//       <ScienceCategory category="science" country={selectedCountry} />
//       {/* Assuming you have an EntertainmentCategory component */}
//        <EntertainmentCategory category="entertainment" country={selectedCountry} /> 
//     </div>
//   );
// }
