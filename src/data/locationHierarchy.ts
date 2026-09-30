export interface IndiaStateLocation {
  state: string;
  districts: {
    district: string;
    subDistricts: string[];
    lat: number;
    lng: number;
  }[];
}

export const ALL_INDIAN_STATES_DISTRICTS: IndiaStateLocation[] = [
  {
    state: 'Rajasthan',
    districts: [
      { district: 'Jaipur', subDistricts: ['Jaipur Urban', 'Sanganer', 'Amber', 'Chaksu', 'Bass', 'Jamwa Ramgarh'], lat: 26.9124, lng: 75.7873 },
      { district: 'Jodhpur', subDistricts: ['Jodhpur City', 'Luni', 'Bilara', 'Osian', 'Phalodi', 'Bhopalgarh'], lat: 26.2389, lng: 73.0243 },
      { district: 'Udaipur', subDistricts: ['Girwa', 'Badgaon', 'Mavli', 'Vallabhnagar', 'Salumber', 'Kotra'], lat: 24.5854, lng: 73.7125 },
      { district: 'Kota', subDistricts: ['Ladpura', 'Digod', 'Pipalda', 'Ramganj Mandi', 'Sangod'], lat: 25.2138, lng: 75.8648 },
      { district: 'Ajmer', subDistricts: ['Ajmer Urban', 'Kishangarh', 'Beawar', 'Pushkar', 'Nasirabad', 'Kekri'], lat: 26.4499, lng: 74.6399 },
      { district: 'Bikaner', subDistricts: ['Bikaner Urban', 'Nokha', 'Lunkaransar', 'Kolayat', 'Khajuwala'], lat: 28.0229, lng: 73.3119 },
      { district: 'Alwar', subDistricts: ['Alwar City', 'Tijara', 'Behror', 'Ramgarh', 'Rajgarh', 'Thanagazi'], lat: 27.5530, lng: 76.6346 },
      { district: 'Jhunjhunu', subDistricts: ['Jhunjhunu Sadar', 'Nawalgarh', 'Khetri', 'Chirawa', 'Buhana', 'Udaipurwati'], lat: 28.1289, lng: 75.3995 },
      { district: 'Sikar', subDistricts: ['Sikar Urban', 'Danta Ramgarh', 'Fatehpur', 'Laxmangarh', 'Neem Ka Thana', 'Sri Madhopur'], lat: 27.6094, lng: 75.1398 },
      { district: 'Bhilwara', subDistricts: ['Bhilwara Sadar', 'Asind', 'Mandal', 'Mandalgarh', 'Shahpura', 'Jahazpur'], lat: 25.3407, lng: 74.6313 },
      { district: 'Nagaur', subDistricts: ['Nagaur Urban', 'Didwana', 'Ladnun', 'Makrana', 'Merta', 'Kuchaman'], lat: 27.2070, lng: 73.7423 },
      { district: 'Churu', subDistricts: ['Churu Sadar', 'Ratangarh', 'Sujangarh', 'Sardarshahar', 'Rajgarh'], lat: 28.2900, lng: 74.9600 },
      { district: 'Barmer', subDistricts: ['Barmer City', 'Balotra', 'Baytu', 'Gudamalani', 'Chohtan', 'Siwana'], lat: 25.7532, lng: 71.3967 },
      { district: 'Bharatpur', subDistricts: ['Bharatpur Sadar', 'Bayana', 'Deeg', 'Kaman', 'Nagar', 'Nadbai', 'Weir'], lat: 27.2152, lng: 77.4930 },
      { district: 'Pali', subDistricts: ['Pali Urban', 'Bali', 'Desuri', 'Jaitaran', 'Marwar Junction', 'Sojat', 'Rohat'], lat: 25.7711, lng: 73.3234 },
      { district: 'Sri Ganganagar', subDistricts: ['Ganganagar Urban', 'Suratgarh', 'Anupgarh', 'Raisinghnagar', 'Sadulshahar'], lat: 29.9038, lng: 73.8772 },
      { district: 'Hanumangarh', subDistricts: ['Hanumangarh Town', 'Nohar', 'Bhadra', 'Pilibanga', 'Sangaria'], lat: 29.5819, lng: 74.3294 },
      { district: 'Dausa', subDistricts: ['Dausa Sadar', 'Bandikui', 'Lalsot', 'Mahwa', 'Sikrai'], lat: 26.8924, lng: 76.3339 },
      { district: 'Tonk', subDistricts: ['Tonk Urban', 'Niwai', 'Malpura', 'Deoli', 'Uniara', 'Todaraisingh'], lat: 26.1624, lng: 75.7895 },
      { district: 'Chittorgarh', subDistricts: ['Chittorgarh Sadar', 'Kapasan', 'Rawatbhata', 'Bari Sadri', 'Nimbahera', 'Begun'], lat: 24.8887, lng: 74.6269 },
      { district: 'Sawai Madhopur', subDistricts: ['Sawai Madhopur Sadar', 'Gangapur City', 'Bamanwas', 'Bonli', 'Chauth Ka Barwara'], lat: 25.9928, lng: 76.3712 },
      { district: 'Jhalawar', subDistricts: ['Jhalawar Sadar', 'Jhalrapatan', 'Aklera', 'Khanpur', 'Manohar Thana', 'Pirawa'], lat: 24.5973, lng: 76.1610 },
      { district: 'Bundi', subDistricts: ['Bundi Urban', 'Keshoraipatan', 'Hindoli', 'Nainwa', 'Talera'], lat: 25.4414, lng: 75.6423 },
      { district: 'Baran', subDistricts: ['Baran Sadar', 'Atru', 'Chhabra', 'Chhipabarod', 'Kishanganj', 'Mangrol', 'Shahbad'], lat: 25.1011, lng: 76.5132 },
      { district: 'Sirohi', subDistricts: ['Sirohi Sadar', 'Abu Road', 'Mount Abu', 'Pindwara', 'Sheoganj', 'Reodar'], lat: 24.8826, lng: 72.8589 },
      { district: 'Jalore', subDistricts: ['Jalore Sadar', 'Ahore', 'Bhinmal', 'Sanchore', 'Sayla', 'Bagoda'], lat: 25.3444, lng: 72.6152 },
      { district: 'Banswara', subDistricts: ['Banswara Sadar', 'Garhi', 'Ghatol', 'Kushalgarh', 'Bagidora'], lat: 23.5461, lng: 74.4439 },
      { district: 'Dungarpur', subDistricts: ['Dungarpur Sadar', 'Aspur', 'Sagwara', 'Bichhiwara', 'Simalwara'], lat: 23.8368, lng: 73.7139 },
      { district: 'Pratapgarh', subDistricts: ['Pratapgarh Sadar', 'Arnod', 'Chhoti Sadri', 'Dhariawad', 'Peepalkhoont'], lat: 24.0322, lng: 74.7813 },
      { district: 'Rajsamand', subDistricts: ['Rajsamand Urban', 'Amet', 'Bhim', 'Deogarh', 'Kumbhalgarh', 'Nathdwara', 'Railmagra'], lat: 25.0441, lng: 73.8829 },
      { district: 'Dholpur', subDistricts: ['Dholpur Sadar', 'Bari', 'Baseri', 'Rajakhera', 'Sarmathura', 'Saipau'], lat: 26.7025, lng: 77.8934 },
      { district: 'Karauli', subDistricts: ['Karauli Sadar', 'Hindaun', 'Mandrail', 'Nadoti', 'Sapotra', 'Todabhim'], lat: 26.4950, lng: 77.0200 },
      { district: 'Jaisalmer', subDistricts: ['Jaisalmer Urban', 'Pokhran', 'Fatehgarh', 'Bhikodai'], lat: 26.9157, lng: 70.9083 }
    ]
  },
  {
    state: 'Uttar Pradesh',
    districts: [
      { district: 'Lucknow', subDistricts: ['Lucknow Central', 'Bakshi Ka Talab', 'Malihabad', 'Mohanlalganj', 'Sarojini Nagar'], lat: 26.8467, lng: 80.9462 },
      { district: 'Kanpur Nagar', subDistricts: ['Kanpur Sadar', 'Bilhaur', 'Ghatampur', 'Kalyanpur', 'Govind Nagar'], lat: 26.4499, lng: 80.3319 },
      { district: 'Varanasi', subDistricts: ['Varanasi Urban', 'Pindra', 'Raja Talab', 'Kashi Corridor', 'Sewapuri'], lat: 25.3176, lng: 82.9739 },
      { district: 'Prayagraj (Allahabad)', subDistricts: ['Prayagraj Urban', 'Phulpur', 'Soraon', 'Koraon', 'Meja', 'Bara'], lat: 25.4358, lng: 81.8463 },
      { district: 'Agra', subDistricts: ['Agra City', 'Fatehabad', 'Etmadpur', 'Kheragarh', 'Bah'], lat: 27.1767, lng: 78.0081 },
      { district: 'Gorakhpur', subDistricts: ['Gorakhpur Sadar', 'Sahjanwa', 'Chauri Chaura', 'Campierganj', 'Bansgaon'], lat: 26.7606, lng: 83.3732 },
      { district: 'Noida / Gautam Buddha Nagar', subDistricts: ['Noida City', 'Greater Noida', 'Dadri', 'Jewar'], lat: 28.5355, lng: 77.3910 },
      { district: 'Ghaziabad', subDistricts: ['Ghaziabad City', 'Modinagar', 'Loni'], lat: 28.6692, lng: 77.4538 },
      { district: 'Meerut', subDistricts: ['Meerut City', 'Mawana', 'Sardhana'], lat: 28.9845, lng: 77.7064 },
      { district: 'Bareilly', subDistricts: ['Bareilly Sadar', 'Aonla', 'Baheri', 'Faridpur', 'Nawabganj'], lat: 28.3670, lng: 79.4304 },
      { district: 'Aligarh', subDistricts: ['Aligarh City', 'Atrauli', 'Khair', 'Gabhana', 'Iglas'], lat: 27.8974, lng: 78.0880 },
      { district: 'Moradabad', subDistricts: ['Moradabad Sadar', 'Bilari', 'Kanth', 'Thakurdwara'], lat: 28.8386, lng: 78.7733 },
      { district: 'Jhansi (Bundelkhand)', subDistricts: ['Jhansi Sadar', 'Mauranipur', 'Garautha', 'Moth', 'Babina'], lat: 25.4484, lng: 78.5685 },
      { district: 'Mahoba (Bundelkhand)', subDistricts: ['Mahoba Sadar', 'Charkhari', 'Kulpahar', 'Kabrai'], lat: 25.2924, lng: 79.8724 },
      { district: 'Banda (Bundelkhand)', subDistricts: ['Banda Sadar', 'Atarra', 'Baberu', 'Naraini', 'Pailani'], lat: 25.4755, lng: 80.3347 },
      { district: 'Chitrakoot (Bundelkhand)', subDistricts: ['Karwi Sadar', 'Mau', 'Manikpur', 'Rajapur'], lat: 25.1764, lng: 80.8710 },
      { district: 'Mathura', subDistricts: ['Mathura Sadar', 'Chhata', 'Mant', 'Goverdhan'], lat: 27.4924, lng: 77.6737 },
      { district: 'Ayodhya (Faizabad)', subDistricts: ['Ayodhya Urban', 'Faizabad Sadar', 'Rudauli', 'Bikapur', 'Sohawal'], lat: 26.7922, lng: 82.1998 }
    ]
  },
  {
    state: 'Maharashtra',
    districts: [
      { district: 'Mumbai City', subDistricts: ['Colaba', 'Nariman Point', 'Dadar', 'Worli', 'Byculla'], lat: 18.9388, lng: 72.8354 },
      { district: 'Mumbai Suburban', subDistricts: ['Andheri', 'Bandra', 'Borivali', 'Kurla', 'Ghatkopar', 'Dharavi'], lat: 19.0760, lng: 72.8777 },
      { district: 'Pune', subDistricts: ['Pune City', 'Haveli', 'Baramati', 'Maval', 'Khed', 'Shirur', 'Pimpri-Chinchwad'], lat: 18.5204, lng: 73.8567 },
      { district: 'Nagpur (Vidarbha)', subDistricts: ['Nagpur Urban', 'Nagpur Rural', 'Kamptee', 'Hingna', 'Katol', 'Umred'], lat: 21.1458, lng: 79.0882 },
      { district: 'Thane', subDistricts: ['Thane City', 'Kalyan', 'Dombivli', 'Ulhasnagar', 'Bhiwandi'], lat: 19.2183, lng: 72.9781 },
      { district: 'Nashik', subDistricts: ['Nashik City', 'Malegaon', 'Sinnar', 'Niphad', 'Igatpuri'], lat: 19.9975, lng: 73.7898 },
      { district: 'Chhatrapati Sambhajinagar (Aurangabad)', subDistricts: ['Aurangabad Urban', 'Paithan', 'Gangapur', 'Vaijapur', 'Kannad'], lat: 19.8762, lng: 75.3433 },
      { district: 'Solapur', subDistricts: ['Solapur North', 'Solapur South', 'Pandharpur', 'Barshi', 'Akkalkot'], lat: 17.6599, lng: 75.9064 },
      { district: 'Kolhapur', subDistricts: ['Karveer', 'Hatkangale', 'Shirol', 'Radhanagari', 'Panhala'], lat: 16.7050, lng: 74.2433 },
      { district: 'Amravati (Vidarbha)', subDistricts: ['Amravati Sadar', 'Achalpur', 'Chandur', 'Morshi', 'Warud'], lat: 20.9320, lng: 77.7523 }
    ]
  },
  {
    state: 'Bihar',
    districts: [
      { district: 'Patna', subDistricts: ['Patna Sadar', 'Danapur', 'Barh', 'Masaurhi', 'Paliganj', 'Bikram', 'Phulwari Sharif'], lat: 25.5941, lng: 85.1376 },
      { district: 'Gaya', subDistricts: ['Gaya Town', 'Bodh Gaya', 'Sherghati', 'Tekari', 'Neemchak Bathani'], lat: 24.7914, lng: 85.0002 },
      { district: 'Muzaffarpur', subDistricts: ['Muzaffarpur Urban', 'Kanti', 'Motipur', 'Sahebganj', 'Minapur'], lat: 26.1209, lng: 85.3647 },
      { district: 'Bhagalpur', subDistricts: ['Bhagalpur Sadar', 'Kahalgaon', 'Naugachia', 'Sultanganj'], lat: 25.2425, lng: 86.9842 },
      { district: 'Darbhanga', subDistricts: ['Darbhanga Sadar', 'Benipur', 'Biraul', 'Keoti', 'Baheri'], lat: 26.1542, lng: 85.8918 },
      { district: 'Purnia', subDistricts: ['Purnia East', 'Kasba', 'Banmankhi', 'Dhamdaha', 'Baisi'], lat: 25.7771, lng: 87.4753 },
      { district: 'Rohtas (Sasaram)', subDistricts: ['Sasaram Sadar', 'Dehri', 'Bikramganj', 'Nokha'], lat: 24.9500, lng: 84.0300 },
      { district: 'Begusarai', subDistricts: ['Begusarai Sadar', 'Barauni', 'Bakhri', 'Teghra', 'Ballia'], lat: 25.4182, lng: 86.1272 },
      { district: 'Saran (Chapra)', subDistricts: ['Chapra Sadar', 'Marhaura', 'Sonepur'], lat: 25.7833, lng: 84.7333 }
    ]
  },
  {
    state: 'Delhi (NCT)',
    districts: [
      { district: 'New Delhi', subDistricts: ['Connaught Place', 'Chanakyapuri', 'Delhi Cantt', 'Vasant Vihar'], lat: 28.6139, lng: 77.2090 },
      { district: 'South Delhi', subDistricts: ['Hauz Khas', 'Saket', 'Mehrauli', 'Kalkaji', 'Greater Kailash'], lat: 28.5355, lng: 77.1990 },
      { district: 'Central Delhi', subDistricts: ['Karol Bagh', 'Paharganj', 'Daryaganj', 'Kotwali'], lat: 28.6448, lng: 77.2167 },
      { district: 'North Delhi', subDistricts: ['Civil Lines', 'Kotwali', 'Sadarbazar', 'Model Town'], lat: 28.6863, lng: 77.2218 },
      { district: 'West Delhi', subDistricts: ['Patel Nagar', 'Rajouri Garden', 'Punjabi Bagh', 'Janakpuri'], lat: 28.6663, lng: 77.0688 },
      { district: 'East Delhi', subDistricts: ['Preet Vihar', 'Mayur Vihar', 'Gandhi Nagar', 'Patparganj'], lat: 28.6280, lng: 77.2950 },
      { district: 'North East Delhi', subDistricts: ['Seelampur', 'Yamuna Vihar', 'Karawal Nagar', 'Shahdara'], lat: 28.6841, lng: 77.2690 },
      { district: 'South West Delhi', subDistricts: ['Dwarka', 'Najafgarh', 'Kapashera'], lat: 28.5921, lng: 77.0460 }
    ]
  },
  {
    state: 'Madhya Pradesh',
    districts: [
      { district: 'Bhopal', subDistricts: ['Bhopal Urban', 'Huzur', 'Berasia', 'Kolar'], lat: 23.2599, lng: 77.4126 },
      { district: 'Indore', subDistricts: ['Indore Urban', 'Mhow', 'Depalpur', 'Sanwer'], lat: 22.7196, lng: 75.8577 },
      { district: 'Gwalior', subDistricts: ['Gwalior City', 'Dabra', 'Bhitarwar', 'Chinour'], lat: 26.2183, lng: 78.1828 },
      { district: 'Jabalpur', subDistricts: ['Jabalpur Urban', 'Sihora', 'Patan', 'Panagar'], lat: 23.1815, lng: 79.9864 },
      { district: 'Ujjain', subDistricts: ['Ujjain City', 'Nagda', 'Tarana', 'Badnagar', 'Mahidpur'], lat: 23.1765, lng: 75.7885 },
      { district: 'Rewa', subDistricts: ['Rewa Sadar', 'Huzur', 'Mauganj', 'Teonthar'], lat: 24.5373, lng: 81.3042 },
      { district: 'Sagar (Bundelkhand)', subDistricts: ['Sagar Sadar', 'Bina', 'Khurai', 'Rahatgarh', 'Banda'], lat: 23.8388, lng: 78.7378 }
    ]
  },
  {
    state: 'Gujarat',
    districts: [
      { district: 'Ahmedabad', subDistricts: ['Ahmedabad City', 'Daskroi', 'Sanand', 'Dholka', 'Viramgam'], lat: 23.0225, lng: 72.5714 },
      { district: 'Surat', subDistricts: ['Surat City', 'Chorasi', 'Olpad', 'Bardoli', 'Kamrej'], lat: 21.1702, lng: 72.8311 },
      { district: 'Vadodara', subDistricts: ['Vadodara Urban', 'Padra', 'Karjan', 'Waghodia'], lat: 22.3072, lng: 73.1812 },
      { district: 'Rajkot', subDistricts: ['Rajkot City', 'Gondal', 'Jetpur', 'Dhoraji', 'Morbi'], lat: 22.3039, lng: 70.8022 },
      { district: 'Gandhinagar', subDistricts: ['Gandhinagar Urban', 'Kalol', 'Dehgam', 'Mansa'], lat: 23.2156, lng: 72.6369 },
      { district: 'Bhavnagar', subDistricts: ['Bhavnagar City', 'Sihor', 'Palitana', 'Talaja', 'Mahuva'], lat: 21.7645, lng: 72.1519 }
    ]
  },
  {
    state: 'Karnataka',
    districts: [
      { district: 'Bengaluru Urban', subDistricts: ['Bengaluru North', 'Bengaluru South', 'Bengaluru East', 'Anekal', 'Yelahanka'], lat: 12.9716, lng: 77.5946 },
      { district: 'Bengaluru Rural', subDistricts: ['Devanahalli', 'Doddaballapura', 'Hoskote', 'Nelamangala'], lat: 13.2500, lng: 77.5000 },
      { district: 'Mysuru', subDistricts: ['Mysuru City', 'Nanjangud', 'Hunsur', 'T. Narasipura', 'Piriyapatna'], lat: 12.2958, lng: 76.6394 },
      { district: 'Dharwad (Hubballi)', subDistricts: ['Hubballi Urban', 'Dharwad Rural', 'Navalgund', 'Kalghatgi'], lat: 15.4589, lng: 75.0078 },
      { district: 'Dakshina Kannada (Mangaluru)', subDistricts: ['Mangaluru City', 'Bantwal', 'Puttur', 'Belthangady', 'Sullia'], lat: 12.9141, lng: 74.8560 },
      { district: 'Belagavi', subDistricts: ['Belagavi City', 'Chikkodi', 'Gokak', 'Bailhongal', 'Athani'], lat: 15.8497, lng: 74.4977 }
    ]
  },
  {
    state: 'Tamil Nadu',
    districts: [
      { district: 'Chennai', subDistricts: ['Chennai Central', 'Egmore', 'Mylapore', 'T. Nagar', 'Velachery', 'Ambattur', 'Guindy'], lat: 13.0827, lng: 80.2707 },
      { district: 'Coimbatore', subDistricts: ['Coimbatore North', 'Coimbatore South', 'Pollachi', 'Mettupalayam', 'Sulur'], lat: 11.0168, lng: 76.9558 },
      { district: 'Madurai', subDistricts: ['Madurai North', 'Madurai South', 'Melur', 'Vadipatti', 'Thiruparankundram'], lat: 9.9252, lng: 78.1198 },
      { district: 'Tiruchirappalli (Trichy)', subDistricts: ['Trichy City', 'Srirangam', 'Lalgudi', 'Manapparai', 'Musiri'], lat: 10.7905, lng: 78.7047 },
      { district: 'Salem', subDistricts: ['Salem City', 'Attur', 'Mettur', 'Omalur', 'Edappadi'], lat: 11.6643, lng: 78.1460 }
    ]
  },
  {
    state: 'West Bengal',
    districts: [
      { district: 'Kolkata', subDistricts: ['Kolkata North', 'Kolkata South', 'Alipore', 'Jadavpur', 'Bhowanipore'], lat: 22.5726, lng: 88.3639 },
      { district: 'North 24 Parganas', subDistricts: ['Barasat', 'Barrackpore', 'Bidhannagar (Salt Lake)', 'Basirhat', 'Bongaon'], lat: 22.7230, lng: 88.4800 },
      { district: 'South 24 Parganas', subDistricts: ['Alipore', 'Diamond Harbour', 'Canning', 'Baruipur', 'Sundarbans'], lat: 22.1352, lng: 88.5448 },
      { district: 'Howrah', subDistricts: ['Howrah Sadar', 'Uluberia', 'Bally', 'Shibpur'], lat: 22.5958, lng: 88.2636 },
      { district: 'Darjeeling', subDistricts: ['Darjeeling Sadar', 'Kurseong', 'Mirik', 'Siliguri'], lat: 27.0410, lng: 88.2663 }
    ]
  },
  {
    state: 'Punjab',
    districts: [
      { district: 'Ludhiana', subDistricts: ['Ludhiana East', 'Ludhiana West', 'Jagraon', 'Khanna', 'Samrala'], lat: 30.9010, lng: 75.8573 },
      { district: 'Amritsar', subDistricts: ['Amritsar Urban', 'Amritsar Rural', 'Ajnala', 'Baba Bakala'], lat: 31.6340, lng: 74.8723 },
      { district: 'Jalandhar', subDistricts: ['Jalandhar Urban', 'Jalandhar Rural', 'Nakodar', 'Phillaur', 'Shahkot'], lat: 31.3260, lng: 75.5762 },
      { district: 'Patiala', subDistricts: ['Patiala Urban', 'Rajpura', 'Nabha', 'Samana'], lat: 30.3398, lng: 76.3869 }
    ]
  },
  {
    state: 'Haryana',
    districts: [
      { district: 'Gurugram (Gurgaon)', subDistricts: ['Gurugram Sadar', 'Badshahpur', 'Pataudi', 'Sohna', 'Manesar'], lat: 28.4595, lng: 77.0266 },
      { district: 'Faridabad', subDistricts: ['Faridabad Urban', 'Ballabgarh', 'Badkhal'], lat: 28.4089, lng: 77.3178 },
      { district: 'Panipat', subDistricts: ['Panipat Sadar', 'Samalkha', 'Israna'], lat: 29.3909, lng: 76.9635 },
      { district: 'Ambala', subDistricts: ['Ambala City', 'Ambala Cantt', 'Barara', 'Naraingarh'], lat: 30.3782, lng: 76.7767 },
      { district: 'Hisar', subDistricts: ['Hisar Sadar', 'Hansi', 'Barwala', 'Adampur'], lat: 29.1492, lng: 75.7217 }
    ]
  },
  {
    state: 'Telangana',
    districts: [
      { district: 'Hyderabad', subDistricts: ['Charminar', 'Secunderabad', 'Khairatabad', 'Golconda', 'Amberpet', 'Musheerabad'], lat: 17.3850, lng: 78.4867 },
      { district: 'Ranga Reddy', subDistricts: ['Gachibowli', 'Cyberabad', 'Rajendranagar', 'Ibrahimpatnam'], lat: 17.2403, lng: 78.4294 },
      { district: 'Medchal-Malkajgiri', subDistricts: ['Malkajgiri', 'Kukatpally', 'Quthbullapur', 'Alwal'], lat: 17.5449, lng: 78.5718 },
      { district: 'Warangal', subDistricts: ['Warangal Urban', 'Hanamkonda', 'Kazipet'], lat: 17.9689, lng: 79.5941 }
    ]
  },
  {
    state: 'Andhra Pradesh',
    districts: [
      { district: 'Visakhapatnam (Vizag)', subDistricts: ['Visakhapatnam Urban', 'Gajuwaka', 'Anakapalle', 'Bheemunipatnam'], lat: 17.6868, lng: 83.2185 },
      { district: 'Vijayawada (NTR District)', subDistricts: ['Vijayawada Central', 'Vijayawada East', 'Tiruvuru', 'Nandigama'], lat: 16.5062, lng: 80.6480 },
      { district: 'Guntur', subDistricts: ['Guntur City', 'Tenali', 'Mangalagiri', 'Ponnur'], lat: 16.3067, lng: 80.4365 },
      { district: 'Tirupati', subDistricts: ['Tirupati Urban', 'Chandragiri', 'Srikalahasti', 'Gudur'], lat: 13.6288, lng: 79.4192 }
    ]
  },
  {
    state: 'Kerala',
    districts: [
      { district: 'Thiruvananthapuram', subDistricts: ['Trivandrum City', 'Neyyattinkara', 'Nedumangad', 'Attingal'], lat: 8.5241, lng: 76.9366 },
      { district: 'Ernakulam (Kochi)', subDistricts: ['Kochi Urban', 'Kanayannur', 'Aluva', 'Paravur', 'Muvattupuzha'], lat: 9.9816, lng: 76.2999 },
      { district: 'Kozhikode (Calicut)', subDistricts: ['Kozhikode Town', 'Vadakara', 'Koyilandy', 'Thamarassery'], lat: 11.2588, lng: 75.7804 }
    ]
  },
  {
    state: 'Odisha',
    districts: [
      { district: 'Khordha (Bhubaneswar)', subDistricts: ['Bhubaneswar Urban', 'Khordha Town', 'Jatni', 'Balianta'], lat: 20.2961, lng: 85.8245 },
      { district: 'Cuttack', subDistricts: ['Cuttack Sadar', 'Choudwar', 'Banki', 'Athagarh'], lat: 20.4625, lng: 85.8828 },
      { district: 'Puri', subDistricts: ['Puri Sadar', 'Konark', 'Pipili', 'Nimapara'], lat: 19.8135, lng: 85.8312 }
    ]
  },
  {
    state: 'Assam',
    districts: [
      { district: 'Kamrup Metropolitan (Guwahati)', subDistricts: ['Guwahati Central', 'Dispur', 'Sonapur', 'Azara'], lat: 26.1445, lng: 91.7362 },
      { district: 'Dibrugarh', subDistricts: ['Dibrugarh West', 'Naharkatiya', 'Tingkhong', 'Moran'], lat: 27.4728, lng: 94.9120 }
    ]
  },
  {
    state: 'Jharkhand',
    districts: [
      { district: 'Ranchi', subDistricts: ['Ranchi Urban', 'Kanke', 'Hatia', 'Ormanjhi', 'Namkum'], lat: 23.3441, lng: 85.3096 },
      { district: 'East Singhbhum (Jamshedpur)', subDistricts: ['Jamshedpur Urban', 'Ghatshila', 'Potka', 'Golmuri'], lat: 22.8046, lng: 86.2029 },
      { district: 'Dhanbad', subDistricts: ['Dhanbad Sadar', 'Jharia', 'Katras', 'Baghmara', 'Nirsa'], lat: 23.7957, lng: 86.4304 }
    ]
  },
  {
    state: 'Chhattisgarh',
    districts: [
      { district: 'Raipur', subDistricts: ['Raipur City', 'Arang', 'Abhanpur', 'Tilda Neora'], lat: 21.2514, lng: 81.6296 },
      { district: 'Durg (Bhilai)', subDistricts: ['Durg Sadar', 'Bhilai Nagar', 'Patan', 'Dhamdha'], lat: 21.1904, lng: 81.2849 },
      { district: 'Bilaspur', subDistricts: ['Bilaspur Urban', 'Kota', 'Takhatpur', 'Masturi'], lat: 22.0797, lng: 82.1409 }
    ]
  },
  {
    state: 'Uttarakhand',
    districts: [
      { district: 'Dehradun', subDistricts: ['Dehradun City', 'Rishikesh', 'Vikasnagar', 'Mussoorie', 'Chakrata'], lat: 30.3165, lng: 78.0322 },
      { district: 'Haridwar', subDistricts: ['Haridwar Sadar', 'Roorkee', 'Laksar', 'Bhagwanpur'], lat: 29.9457, lng: 78.1642 },
      { district: 'Nainital', subDistricts: ['Nainital Town', 'Haldwani', 'Ramnagar', 'Kaladhungi'], lat: 29.3919, lng: 79.4542 }
    ]
  },
  {
    state: 'Himachal Pradesh',
    districts: [
      { district: 'Shimla', subDistricts: ['Shimla Urban', 'Shimla Rural', 'Theog', 'Rampur', 'Rohru'], lat: 31.1048, lng: 77.1734 },
      { district: 'Kangra (Dharamshala)', subDistricts: ['Dharamshala', 'Kangra Town', 'Palampur', 'Nurpur'], lat: 32.2190, lng: 76.3234 },
      { district: 'Mandi', subDistricts: ['Mandi Sadar', 'Sundernagar', 'Sarkaghat', 'Jogindernagar'], lat: 31.7087, lng: 76.9320 }
    ]
  },
  {
    state: 'Jammu and Kashmir',
    districts: [
      { district: 'Srinagar', subDistricts: ['Srinagar North', 'Srinagar South', 'Eidgah', 'Khanyar', 'Pantha Chowk'], lat: 34.0837, lng: 74.7973 },
      { district: 'Jammu', subDistricts: ['Jammu North', 'Jammu South', 'R.S. Pura', 'Akhnoor', 'Bishnah'], lat: 32.7266, lng: 74.8570 }
    ]
  },
  {
    state: 'Goa',
    districts: [
      { district: 'North Goa', subDistricts: ['Panaji (Tiswadi)', 'Bardez (Mapusa)', 'Pernem', 'Bicholim', 'Sattari'], lat: 15.4909, lng: 73.8278 },
      { district: 'South Goa', subDistricts: ['Salcete (Margao)', 'Mormugao (Vasco)', 'Ponda', 'Quepem', 'Canacona'], lat: 15.2832, lng: 73.9862 }
    ]
  }
];
