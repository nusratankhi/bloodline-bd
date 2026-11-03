export interface Division {
  id: string;
  name: string;
  nameBn: string;
}

export interface District {
  id: string;
  divisionId: string;
  name: string;
  nameBn: string;
  upazilas: string[];
}

export const BANGLADESH_DIVISIONS: Division[] = [
  { id: "dhaka", name: "Dhaka", nameBn: "ঢাকা" },
  { id: "chittagong", name: "Chattogram", nameBn: "চট্টগ্রাম" },
  { id: "rajshahi", name: "Rajshahi", nameBn: "রাজশাহী" },
  { id: "khulna", name: "Khulna", nameBn: "খুলনা" },
  { id: "barisal", name: "Barishal", nameBn: "বরিশাল" },
  { id: "sylhet", name: "Sylhet", nameBn: "সিলেট" },
  { id: "rangpur", name: "Rangpur", nameBn: "রংপুর" },
  { id: "mymensingh", name: "Mymensingh", nameBn: "ময়মনসিংহ" },
];

export const BANGLADESH_DISTRICTS: District[] = [
  // Dhaka Division (13 Districts)
  {
    id: "dhaka",
    divisionId: "dhaka",
    name: "Dhaka",
    nameBn: "ঢাকা",
    upazilas: ["Dhanmondi", "Mirpur", "Gulshan", "Uttara", "Mohammadpur", "Motijheel", "Savar", "Dhamrai", "Keraniganj", "Nawabganj", "Dohar", "Badda", "Khilgaon", "Tejgaon", "Banani", "Paltan"],
  },
  {
    id: "gazipur",
    divisionId: "dhaka",
    name: "Gazipur",
    nameBn: "গাজীপুর",
    upazilas: ["Gazipur Sadar", "Kaliakair", "Kapasia", "Sreepur", "Kaliganj", "Tongi"],
  },
  {
    id: "narayanganj",
    divisionId: "dhaka",
    name: "Narayanganj",
    nameBn: "নারায়ণগঞ্জ",
    upazilas: ["Narayanganj Sadar", "Bandar", "Araihazar", "Sonargaon", "Rupganj", "Fatullah", "Siddhirganj"],
  },
  {
    id: "tangail",
    divisionId: "dhaka",
    name: "Tangail",
    nameBn: "টাঙ্গাইল",
    upazilas: ["Tangail Sadar", "Mirzapur", "Ghatail", "Madhupur", "Sakhipur", "Gopalpur", "Kalihati", "Nagarpur", "Delduar", "Basail", "Bhuapur", "Dhanbari"],
  },
  {
    id: "faridpur",
    divisionId: "dhaka",
    name: "Faridpur",
    nameBn: "ফরিদপুর",
    upazilas: ["Faridpur Sadar", "Boalmari", "Alfadanga", "Madhukhali", "Bhanga", "Nagarkanda", "Charbhadrasan", "Sadarpur", "Saltha"],
  },
  {
    id: "manikganj",
    divisionId: "dhaka",
    name: "Manikganj",
    nameBn: "মানিকগঞ্জ",
    upazilas: ["Manikganj Sadar", "Singair", "Shivalaya", "Saturia", "Harirampur", "Ghior", "Daulatpur"],
  },
  {
    id: "munshiganj",
    divisionId: "dhaka",
    name: "Munshiganj",
    nameBn: "মুন্সীগঞ্জ",
    upazilas: ["Munshiganj Sadar", "Sreenagar", "Sirajdikhan", "Louhajang", "Tongibari", "Gazaria"],
  },
  {
    id: "narsingdi",
    divisionId: "dhaka",
    name: "Narsingdi",
    nameBn: "নরসিংদী",
    upazilas: ["Narsingdi Sadar", "Palash", "Belabo", "Monohardi", "Shibpur", "Raipura"],
  },
  {
    id: "gopalganj",
    divisionId: "dhaka",
    name: "Gopalganj",
    nameBn: "গোপালগঞ্জ",
    upazilas: ["Gopalganj Sadar", "Kashiani", "Kotalipara", "Muksudpur", "Tungipara"],
  },
  {
    id: "madaripur",
    divisionId: "dhaka",
    name: "Madaripur",
    nameBn: "মাদারীপুর",
    upazilas: ["Madaripur Sadar", "Shibchar", "Kalkini", "Rajoir", "Dasar"],
  },
  {
    id: "rajbari",
    divisionId: "dhaka",
    name: "Rajbari",
    nameBn: "রাজবাড়ী",
    upazilas: ["Rajbari Sadar", "Goalanda", "Pangsha", "Baliakandi", "Kalukhali"],
  },
  {
    id: "shariatpur",
    divisionId: "dhaka",
    name: "Shariatpur",
    nameBn: "শরীয়তপুর",
    upazilas: ["Shariatpur Sadar", "Damudya", "Naria", "Janjira", "Bhedarganj", "Gosairhat"],
  },
  {
    id: "kishoreganj",
    divisionId: "dhaka",
    name: "Kishoreganj",
    nameBn: "কিশোরগঞ্জ",
    upazilas: ["Kishoreganj Sadar", "Bhairab", "Bajitpur", "Katiadi", "Pakundia", "Karimganj", "Tarail", "Hossainpur", "Kuliarchar", "Itna", "Mithamain", "Nikli", "Ashtagram"],
  },

  // Chattogram Division (11 Districts)
  {
    id: "chattogram",
    divisionId: "chittagong",
    name: "Chattogram",
    nameBn: "চট্টগ্রাম",
    upazilas: ["Kotwali", "Panchlaish", "Double Mooring", "Pahartali", "Bakalia", "Halishahar", "Chandgaon", "Mirsharai", "Sitakunda", "Hathazari", "Raozan", "Rangunia", "Boalkhali", "Patiya", "Anwara", "Chandanaish", "Satkania", "Lohagara", "Banshkhali", "Sandwip", "Karnaphuli"],
  },
  {
    id: "coxsbazar",
    divisionId: "chittagong",
    name: "Cox's Bazar",
    nameBn: "কক্সবাজার",
    upazilas: ["Cox's Bazar Sadar", "Chakaria", "Maheshkhali", "Teknaf", "Ramu", "Ukhia", "Pekua", "Kutubdia", "Eidgaon"],
  },
  {
    id: "cumilla",
    divisionId: "chittagong",
    name: "Cumilla",
    nameBn: "কুমিল্লা",
    upazilas: ["Cumilla Adarsha Sadar", "Cumilla Sadar Dakshin", "Barura", "Brahmanpara", "Burichang", "Chandina", "Chauddagram", "Daudkandi", "Debidwar", "Homna", "Laksam", "Muradnagar", "Meghna", "Monohargonj", "Titas", "Lalmai"],
  },
  {
    id: "brahmanbaria",
    divisionId: "chittagong",
    name: "Brahmanbaria",
    nameBn: "ব্রাহ্মণবাড়িয়া",
    upazilas: ["Brahmanbaria Sadar", "Kasba", "Nasirnagar", "Nabinagar", "Bancharampur", "Sarail", "Ashuganj", "Akhaura", "Bijoynagar"],
  },
  {
    id: "chandpur",
    divisionId: "chittagong",
    name: "Chandpur",
    nameBn: "চাঁদপুর",
    upazilas: ["Chandpur Sadar", "Faridganj", "Haimchar", "Haziganj", "Kachua", "Matlab Dakshin", "Matlab Uttar", "Shahrasti"],
  },
  {
    id: "feni",
    divisionId: "chittagong",
    name: "Feni",
    nameBn: "ফেনী",
    upazilas: ["Feni Sadar", "Chhagalnaiya", "Daganbhuiyan", "Parshuram", "Fulgazi", "Sonagazi"],
  },
  {
    id: "lakshmipur",
    divisionId: "chittagong",
    name: "Lakshmipur",
    nameBn: "লক্ষ্মীপুর",
    upazilas: ["Lakshmipur Sadar", "Raipur", "Ramganj", "Ramgati", "Kamalnagar"],
  },
  {
    id: "noakhali",
    divisionId: "chittagong",
    name: "Noakhali",
    nameBn: "নোয়াখালী",
    upazilas: ["Noakhali Sadar", "Begumganj", "Chatkhil", "Companiganj", "Hatiya", "Senbagh", "Subarnachar", "Kabirhat", "Sonaimuri"],
  },
  {
    id: "bandarban",
    divisionId: "chittagong",
    name: "Bandarban",
    nameBn: "বান্দরবান",
    upazilas: ["Bandarban Sadar", "Alikadam", "Naikhongchhari", "Rowangchhari", "Lama", "Ruma", "Thanchi"],
  },
  {
    id: "khagrachhari",
    divisionId: "chittagong",
    name: "Khagrachhari",
    nameBn: "খাগড়াছড়ি",
    upazilas: ["Khagrachhari Sadar", "Dighinala", "Panchhari", "Mahalchhari", "Matiranga", "Manikchhari", "Ramgarh", "Guimara", "Lakshmichhari"],
  },
  {
    id: "rangamati",
    divisionId: "chittagong",
    name: "Rangamati",
    nameBn: "রাঙ্গামাটি",
    upazilas: ["Rangamati Sadar", "Baghaichhari", "Barkal", "Kawkhali", "Belaichhari", "Kaptai", "Juraichhari", "Langadu", "Naniarchar", "Rajasthali"],
  },

  // Rajshahi Division (8 Districts)
  {
    id: "rajshahi",
    divisionId: "rajshahi",
    name: "Rajshahi",
    nameBn: "রাজশাহী",
    upazilas: ["Boalia", "Rajpara", "Motihar", "Shah Makhdum", "Godagari", "Tanore", "Mohanpur", "Bagmara", "Durgapur", "Puthia", "Charghat", "Bagha", "Paba"],
  },
  {
    id: "bogura",
    divisionId: "rajshahi",
    name: "Bogura",
    nameBn: "বগুড়া",
    upazilas: ["Bogura Sadar", "Adamdighi", "Dhunat", "Dhupchanchia", "Gabtali", "Kahaloo", "Nandigram", "Sariakandi", "Shajahanpur", "Sherpur", "Shibganj", "Sonatala"],
  },
  {
    id: "pabna",
    divisionId: "rajshahi",
    name: "Pabna",
    nameBn: "পাবনা",
    upazilas: ["Pabna Sadar", "Atgharia", "Bera", "Bhangura", "Chatmohar", "Faridpur", "Ishwardi", "Santhia", "Sujanagar"],
  },
  {
    id: "sirajganj",
    divisionId: "rajshahi",
    name: "Sirajganj",
    nameBn: "সিরাজগঞ্জ",
    upazilas: ["Sirajganj Sadar", "Belkuchi", "Chauhali", "Kamarkhanda", "Kazipur", "Rayganj", "Shahjadpur", "Tarash", "Ullapara"],
  },
  {
    id: "naogaon",
    divisionId: "rajshahi",
    name: "Naogaon",
    nameBn: "নওগাঁ",
    upazilas: ["Naogaon Sadar", "Atrai", "Badalgachhi", "Dhamoirhat", "Manda", "Mahadevpuri", "Niamatpur", "Patnitala", "Porsha", "Raninagar", "Sapahar"],
  },
  {
    id: "natore",
    divisionId: "rajshahi",
    name: "Natore",
    nameBn: "নাটোর",
    upazilas: ["Natore Sadar", "Bagatipara", "Baraigram", "Gurudaspur", "Lalpur", "Singra", "Naldanga"],
  },
  {
    id: "chapainawabganj",
    divisionId: "rajshahi",
    name: "Chapai Nawabganj",
    nameBn: "চাঁপাইনবাবগঞ্জ",
    upazilas: ["Chapai Nawabganj Sadar", "Bholahat", "Gomastapur", "Nachole", "Shibganj"],
  },
  {
    id: "joypurhat",
    divisionId: "rajshahi",
    name: "Joypurhat",
    nameBn: "জয়পুরহাট",
    upazilas: ["Joypurhat Sadar", "Akkelpur", "Kalai", "Khetlal", "Panchbibi"],
  },

  // Khulna Division (10 Districts)
  {
    id: "khulna",
    divisionId: "khulna",
    name: "Khulna",
    nameBn: "খুলনা",
    upazilas: ["Khulna Sadar", "Sonadanga", "Khalishpur", "Daulatpur", "Khan Jahan Ali", "Batiaghata", "Dacope", "Dumuria", "Dighalia", "Koyra", "Paikgachha", "Phultala", "Rupsha", "Terokhada"],
  },
  {
    id: "jashore",
    divisionId: "khulna",
    name: "Jashore",
    nameBn: "যশোর",
    upazilas: ["Jashore Sadar", "Abhaynagar", "Bagherpara", "Chaugachha", "Jhikargachha", "Keshabpur", "Manirampur", "Sharsha"],
  },
  {
    id: "satkhira",
    divisionId: "khulna",
    name: "Satkhira",
    nameBn: "সাতক্ষীরা",
    upazilas: ["Satkhira Sadar", "Assasuni", "Debhata", "Kalaroa", "Kaliganj", "Shyamnagar", "Tala"],
  },
  {
    id: "bagerhat",
    divisionId: "khulna",
    name: "Bagerhat",
    nameBn: "বাগেরহাট",
    upazilas: ["Bagerhat Sadar", "Chitalmari", "Fakirhat", "Kachua", "Mollahat", "Mongla", "Morrelganj", "Rampal", "Sarankhola"],
  },
  {
    id: "kushtia",
    divisionId: "khulna",
    name: "Kushtia",
    nameBn: "কুষ্টিয়া",
    upazilas: ["Kushtia Sadar", "Bheramara", "Daulatpur", "Khoksa", "Kumarkhali", "Mirpur"],
  },
  {
    id: "magura",
    divisionId: "khulna",
    name: "Magura",
    nameBn: "মাগুরা",
    upazilas: ["Magura Sadar", "Mohammadpur", "Shalikha", "Sreepur"],
  },
  {
    id: "meherpur",
    divisionId: "khulna",
    name: "Meherpur",
    nameBn: "মেহেরপুর",
    upazilas: ["Meherpur Sadar", "Gangni", "Mujibnagar"],
  },
  {
    id: "narail",
    divisionId: "khulna",
    name: "Narail",
    nameBn: "নড়াইল",
    upazilas: ["Narail Sadar", "Kalia", "Lohagara"],
  },
  {
    id: "chuadanga",
    divisionId: "khulna",
    name: "Chuadanga",
    nameBn: "চুয়াডাঙ্গা",
    upazilas: ["Chuadanga Sadar", "Alamdanga", "Damurhuda", "Jibannagar"],
  },
  {
    id: "jhenaidah",
    divisionId: "khulna",
    name: "Jhenaidah",
    nameBn: "ঝিনাইদহ",
    upazilas: ["Jhenaidah Sadar", "Harinakundu", "Kaliganj", "Kotchandpur", "Maheshpur", "Shailkupa"],
  },

  // Barishal Division (6 Districts)
  {
    id: "barishal",
    divisionId: "barisal",
    name: "Barishal",
    nameBn: "বরিশাল",
    upazilas: ["Barishal Sadar", "Agailjhara", "Babuganj", "Bakerganj", "Banaripara", "Gaurnadi", "Hizla", "Mehendiganj", "Muladi", "Wazirpur"],
  },
  {
    id: "bhola",
    divisionId: "barisal",
    name: "Bhola",
    nameBn: "ভোলা",
    upazilas: ["Bhola Sadar", "Burhanuddin", "Char Fasson", "Daulatkhan", "Lalmohan", "Manpura", "Tazumuddin"],
  },
  {
    id: "patuakhali",
    divisionId: "barisal",
    name: "Patuakhali",
    nameBn: "পটুয়াখালী",
    upazilas: ["Patuakhali Sadar", "Bauphal", "Dashmina", "Galachipa", "Kalapara", "Mirzaganj", "Rangabali", "Dumki"],
  },
  {
    id: "pirojpur",
    divisionId: "barisal",
    name: "Pirojpur",
    nameBn: "পিরোজপুর",
    upazilas: ["Pirojpur Sadar", "Bhandaria", "Kawkhali", "Mathbaria", "Nazirpur", "Nesarabad", "Indurkani"],
  },
  {
    id: "barguna",
    divisionId: "barisal",
    name: "Barguna",
    nameBn: "বরগুনা",
    upazilas: ["Barguna Sadar", "Amtali", "Bamna", "Betagi", "Patharghata", "Taltali"],
  },
  {
    id: "jhalokati",
    divisionId: "barisal",
    name: "Jhalokati",
    nameBn: "ঝালকাঠি",
    upazilas: ["Jhalokati Sadar", "Kathalia", "Nalchhiti", "Rajapur"],
  },

  // Sylhet Division (4 Districts)
  {
    id: "sylhet",
    divisionId: "sylhet",
    name: "Sylhet",
    nameBn: "সিলেট",
    upazilas: ["Sylhet Sadar", "Beanibazar", "Bishwanath", "Dakshin Surma", "Fenchuganj", "Golapganj", "Gowainghat", "Jaintiapur", "Kanaighat", "Companiganj", "Zakiganj", "Osmani Nagar"],
  },
  {
    id: "moulvibazar",
    divisionId: "sylhet",
    name: "Moulvibazar",
    nameBn: "মৌলভীবাজার",
    upazilas: ["Moulvibazar Sadar", "Barlekha", "Juri", "Kamalganj", "Kulaura", "Rajnagar", "Sreemangal"],
  },
  {
    id: "habiganj",
    divisionId: "sylhet",
    name: "Habiganj",
    nameBn: "হবিগঞ্জ",
    upazilas: ["Habiganj Sadar", "Ajmiriganj", "Bahubal", "Baniachong", "Chunarughat", "Lakhai", "Madhabpur", "Nabiganj", "Sayestaganj"],
  },
  {
    id: "sunamganj",
    divisionId: "sylhet",
    name: "Sunamganj",
    nameBn: "সুনামগঞ্জ",
    upazilas: ["Sunamganj Sadar", "Bishwamvarpur", "Chhatak", "Derai", "Dharampasha", "Dowarabazar", "Jagannathpur", "Jamalganj", "Sullah", "Tahirpur", "South Sunamganj", "Madhyanagar"],
  },

  // Rangpur Division (8 Districts)
  {
    id: "rangpur",
    divisionId: "rangpur",
    name: "Rangpur",
    nameBn: "রংপুর",
    upazilas: ["Rangpur Sadar", "Badarganj", "Gangachhara", "Kaunia", "Mithapukur", "Pirgachha", "Pirganj", "Taraganj"],
  },
  {
    id: "dinajpur",
    divisionId: "rangpur",
    name: "Dinajpur",
    nameBn: "দিনাজপুর",
    upazilas: ["Dinajpur Sadar", "Birampur", "Birganj", "Biral", "Bochaganj", "Chirirbandar", "Phulbari", "Ghoraghat", "Hakimpur", "Kaharole", "Khansama", "Nawabganj", "Parbatipur"],
  },
  {
    id: "gaibandha",
    divisionId: "rangpur",
    name: "Gaibandha",
    nameBn: "গাইবান্ধা",
    upazilas: ["Gaibandha Sadar", "Fulchhari", "Gobindaganj", "Palashbari", "Sadullapur", "Saghata", "Sundarganj"],
  },
  {
    id: "kurigram",
    divisionId: "rangpur",
    name: "Kurigram",
    nameBn: "কুড়িগ্রাম",
    upazilas: ["Kurigram Sadar", "Bhurungamari", "Char Rajibpur", "Chilmari", "Phulbari", "Nageshwari", "Rajarhat", "Raomari", "Ulipur"],
  },
  {
    id: "lalmonirhat",
    divisionId: "rangpur",
    name: "Lalmonirhat",
    nameBn: "লালমনিরহাট",
    upazilas: ["Lalmonirhat Sadar", "Aditmari", "Kaliganj", "Hatibandha", "Patgram"],
  },
  {
    id: "nilphamari",
    divisionId: "rangpur",
    name: "Nilphamari",
    nameBn: "নীলফামারী",
    upazilas: ["Nilphamari Sadar", "Dimla", "Domar", "Jaldhaka", "Kishoreganj", "Syedpur"],
  },
  {
    id: "panchagarh",
    divisionId: "rangpur",
    name: "Panchagarh",
    nameBn: "পঞ্চগড়",
    upazilas: ["Panchagarh Sadar", "Atwari", "Boda", "Debiganj", "Tetulia"],
  },
  {
    id: "thakurgaon",
    divisionId: "rangpur",
    name: "Thakurgaon",
    nameBn: "ঠাকুরগাঁও",
    upazilas: ["Thakurgaon Sadar", "Baliadangi", "Haripur", "Pirganj", "Ranisankail"],
  },

  // Mymensingh Division (4 Districts)
  {
    id: "mymensingh",
    divisionId: "mymensingh",
    name: "Mymensingh",
    nameBn: "ময়মনসিংহ",
    upazilas: ["Mymensingh Sadar", "Bhaluka", "Trishal", "Haluaghat", "Muktagachha", "Dhobaura", "Fulbaria", "Gaffargaon", "Gauripur", "Ishwarganj", "Nandail", "Tara Khanda"],
  },
  {
    id: "jamalpur",
    divisionId: "mymensingh",
    name: "Jamalpur",
    nameBn: "জামালপুর",
    upazilas: ["Jamalpur Sadar", "Baksiganj", "Dewanganj", "Islampur", "Madarganj", "Melandaha", "Sarishabari"],
  },
  {
    id: "netrokona",
    divisionId: "mymensingh",
    name: "Netrokona",
    nameBn: "নেত্রকোণা",
    upazilas: ["Netrokona Sadar", "Atpara", "Barhatta", "Durgapur", "Khaliajuri", "Kalmakanda", "Kendua", "Madan", "Mohanganj", "Purbadhala"],
  },
  {
    id: "sherpur",
    divisionId: "mymensingh",
    name: "Sherpur",
    nameBn: "শেরপুর",
    upazilas: ["Sherpur Sadar", "Jhenaigati", "Nakla", "Nalitabari", "Sreebardi"],
  },
];
