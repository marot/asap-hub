// Source: https://unstats.un.org/unsd/amaapi/api/Country?countriesOnly=true
const countrySuggestions = [
  {
    countryCode: 4,
    countryName: 'Afghanistan',
    currencyName: 'Afghani',
    isCountry: true,
  },
  {
    countryCode: 8,
    countryName: 'Albania',
    currencyName: 'Lek',
    isCountry: true,
  },
  {
    countryCode: 12,
    countryName: 'Algeria',
    currencyName: 'Algerian Dinar',
    isCountry: true,
  },
  {
    countryCode: 20,
    countryName: 'Andorra',
    currencyName: 'Euro',
    isCountry: true,
  },
  {
    countryCode: 24,
    countryName: 'Angola',
    currencyName: 'Kwanza',
    isCountry: true,
  },
  {
    countryCode: 660,
    countryName: 'Anguilla',
    currencyName: 'East Caribbean Dollar',
    isCountry: true,
  },
  {
    countryCode: 28,
    countryName: 'Antigua and Barbuda',
    currencyName: 'East Caribbean Dollar',
    isCountry: true,
  },
  {
    countryCode: 32,
    countryName: 'Argentina',
    currencyName: 'Argentine Peso',
    isCountry: true,
  },
  {
    countryCode: 51,
    countryName: 'Armenia',
    currencyName: 'Armenian Dram',
    isCountry: true,
  },
  {
    countryCode: 533,
    countryName: 'Aruba',
    currencyName: 'Aruban Guilder',
    isCountry: true,
  },
  {
    countryCode: 36,
    countryName: 'Australia',
    currencyName: 'Australian Dollar',
    isCountry: true,
  },
  {
    countryCode: 40,
    countryName: 'Austria',
    currencyName: 'Euro',
    isCountry: true,
  },
  {
    countryCode: 31,
    countryName: 'Azerbaijan',
    currencyName: 'Azerbaijanian Manat',
    isCountry: true,
  },
  {
    countryCode: 44,
    countryName: 'Bahamas',
    currencyName: 'Bahamian Dollar',
    isCountry: true,
  },
  {
    countryCode: 48,
    countryName: 'Bahrain',
    currencyName: 'Bahraini Dinar',
    isCountry: true,
  },
  {
    countryCode: 50,
    countryName: 'Bangladesh',
    currencyName: 'Taka',
    isCountry: true,
  },
  {
    countryCode: 52,
    countryName: 'Barbados',
    currencyName: 'Barbados Dollar',
    isCountry: true,
  },
  {
    countryCode: 112,
    countryName: 'Belarus',
    currencyName: 'Belarussian Ruble',
    isCountry: true,
  },
  {
    countryCode: 56,
    countryName: 'Belgium',
    currencyName: 'Euro',
    isCountry: true,
  },
  {
    countryCode: 84,
    countryName: 'Belize',
    currencyName: 'Belize Dollar',
    isCountry: true,
  },
  {
    countryCode: 204,
    countryName: 'Benin',
    currencyName: 'CFA Franc BCEAO',
    isCountry: true,
  },
  {
    countryCode: 60,
    countryName: 'Bermuda',
    currencyName: 'Bermudian Dollar',
    isCountry: true,
  },
  {
    countryCode: 64,
    countryName: 'Bhutan',
    currencyName: 'Ngultrum',
    isCountry: true,
  },
  {
    countryCode: 68,
    countryName: 'Bolivia (Plurinational State of)',
    currencyName: 'Boliviano',
    isCountry: true,
  },
  {
    countryCode: 70,
    countryName: 'Bosnia and Herzegovina',
    currencyName: 'Convertible Marks',
    isCountry: true,
  },
  {
    countryCode: 72,
    countryName: 'Botswana',
    currencyName: 'Pula',
    isCountry: true,
  },
  {
    countryCode: 76,
    countryName: 'Brazil',
    currencyName: 'Brazilian Real',
    isCountry: true,
  },
  {
    countryCode: 92,
    countryName: 'British Virgin Islands',
    currencyName: 'US Dollar',
    isCountry: true,
  },
  {
    countryCode: 96,
    countryName: 'Brunei Darussalam',
    currencyName: 'Brunei Dollar',
    isCountry: true,
  },
  {
    countryCode: 100,
    countryName: 'Bulgaria',
    currencyName: 'Bulgarian Lev',
    isCountry: true,
  },
  {
    countryCode: 854,
    countryName: 'Burkina Faso',
    currencyName: 'CFA Franc BCEAO',
    isCountry: true,
  },
  {
    countryCode: 108,
    countryName: 'Burundi',
    currencyName: 'Burundi Franc',
    isCountry: true,
  },
  {
    countryCode: 132,
    countryName: 'Cabo Verde',
    currencyName: 'Cabo Verde Escudo',
    isCountry: true,
  },
  {
    countryCode: 116,
    countryName: 'Cambodia',
    currencyName: 'Riel',
    isCountry: true,
  },
  {
    countryCode: 120,
    countryName: 'Cameroon',
    currencyName: 'CFA Franc BEAC',
    isCountry: true,
  },
  {
    countryCode: 124,
    countryName: 'Canada',
    currencyName: 'Canadian Dollar',
    isCountry: true,
  },
  {
    countryCode: 136,
    countryName: 'Cayman Islands',
    currencyName: 'Cayman Islands Dollar',
    isCountry: true,
  },
  {
    countryCode: 140,
    countryName: 'Central African Republic',
    currencyName: 'CFA Franc BEAC',
    isCountry: true,
  },
  {
    countryCode: 148,
    countryName: 'Chad',
    currencyName: 'CFA Franc BEAC',
    isCountry: true,
  },
  {
    countryCode: 152,
    countryName: 'Chile',
    currencyName: 'Chilean Peso',
    isCountry: true,
  },
  {
    countryCode: 344,
    countryName: 'China, Hong Kong SAR',
    currencyName: 'Hong Kong Dollar',
    isCountry: true,
  },
  {
    countryCode: 446,
    countryName: 'China, Macao Special Administrative Region',
    currencyName: 'Pataca',
    isCountry: true,
  },
  {
    countryCode: 156,
    countryName: "China, People's Republic of",
    currencyName: 'Yuan Renminbi',
    isCountry: true,
  },
  {
    countryCode: 170,
    countryName: 'Colombia',
    currencyName: 'Colombian Peso',
    isCountry: true,
  },
  {
    countryCode: 174,
    countryName: 'Comoros',
    currencyName: 'Comoro Franc',
    isCountry: true,
  },
  {
    countryCode: 178,
    countryName: 'Congo',
    currencyName: 'CFA Franc BEAC',
    isCountry: true,
  },
  {
    countryCode: 184,
    countryName: 'Cook Islands',
    currencyName: 'New Zealand Dollar',
    isCountry: true,
  },
  {
    countryCode: 188,
    countryName: 'Costa Rica',
    currencyName: 'Costa Rican Colon',
    isCountry: true,
  },
  {
    countryCode: 384,
    countryName: "Côte d'Ivoire",
    currencyName: 'CFA Franc BCEAO',
    isCountry: true,
  },
  {
    countryCode: 191,
    countryName: 'Croatia',
    currencyName: 'Croatian Kuna',
    isCountry: true,
  },
  {
    countryCode: 192,
    countryName: 'Cuba',
    currencyName: 'Cuban Peso',
    isCountry: true,
  },
  {
    countryCode: 531,
    countryName: 'Curaçao',
    currencyName: 'Netherlands Antillian Guilder',
    isCountry: true,
  },
  {
    countryCode: 196,
    countryName: 'Cyprus',
    currencyName: 'Euro',
    isCountry: true,
  },
  {
    countryCode: 203,
    countryName: 'Czechia',
    currencyName: 'Czech Koruna',
    isCountry: true,
  },
  {
    countryCode: 408,
    countryName: "Democratic People's Republic of Korea",
    currencyName: 'North Korean Won',
    isCountry: true,
  },
  {
    countryCode: 180,
    countryName: 'Democratic Republic of the Congo',
    currencyName: 'Franc Congolais',
    isCountry: true,
  },
  {
    countryCode: 208,
    countryName: 'Denmark',
    currencyName: 'Danish Krone',
    isCountry: true,
  },
  {
    countryCode: 262,
    countryName: 'Djibouti',
    currencyName: 'Djibouti Franc',
    isCountry: true,
  },
  {
    countryCode: 212,
    countryName: 'Dominica',
    currencyName: 'East Caribbean Dollar',
    isCountry: true,
  },
  {
    countryCode: 214,
    countryName: 'Dominican Republic',
    currencyName: 'Dominican Peso',
    isCountry: true,
  },
  {
    countryCode: 218,
    countryName: 'Ecuador',
    currencyName: 'US Dollar',
    isCountry: true,
  },
  {
    countryCode: 818,
    countryName: 'Egypt',
    currencyName: 'Egyptian Pound',
    isCountry: true,
  },
  {
    countryCode: 222,
    countryName: 'El Salvador',
    currencyName: 'US Dollar',
    isCountry: true,
  },
  {
    countryCode: 226,
    countryName: 'Equatorial Guinea',
    currencyName: 'CFA Franc BEAC',
    isCountry: true,
  },
  {
    countryCode: 232,
    countryName: 'Eritrea',
    currencyName: 'Nakfa',
    isCountry: true,
  },
  {
    countryCode: 233,
    countryName: 'Estonia',
    currencyName: 'Euro',
    isCountry: true,
  },
  {
    countryCode: 231,
    countryName: 'Ethiopia',
    currencyName: 'Ethiopian Birr',
    isCountry: true,
  },
  {
    countryCode: 242,
    countryName: 'Fiji',
    currencyName: 'Fiji Dollar',
    isCountry: true,
  },
  {
    countryCode: 246,
    countryName: 'Finland',
    currencyName: 'Euro',
    isCountry: true,
  },
  {
    countryCode: 200,
    countryName: 'Former Czechoslovakia',
    currencyName: 'Koruna',
    isCountry: true,
  },
  {
    countryCode: 230,
    countryName: 'Former Ethiopia',
    currencyName: 'Birr',
    isCountry: true,
  },
  {
    countryCode: 530,
    countryName: 'Former Netherlands Antilles',
    currencyName: 'Netherlands Antillian Guilder',
    isCountry: true,
  },
  {
    countryCode: 736,
    countryName: 'Former Sudan',
    currencyName: 'Sudanese Pound',
    isCountry: true,
  },
  {
    countryCode: 810,
    countryName: 'Former USSR',
    currencyName: 'Ruble',
    isCountry: true,
  },
  {
    countryCode: 890,
    countryName: 'Former Yugoslavia',
    currencyName: 'Dinar',
    isCountry: true,
  },
  {
    countryCode: 250,
    countryName: 'France',
    currencyName: 'Euro',
    isCountry: true,
  },
  {
    countryCode: 258,
    countryName: 'French Polynesia',
    currencyName: 'CFP Franc',
    isCountry: true,
  },
  {
    countryCode: 266,
    countryName: 'Gabon',
    currencyName: 'CFA Franc BEAC',
    isCountry: true,
  },
  {
    countryCode: 270,
    countryName: 'Gambia',
    currencyName: 'Dalasi',
    isCountry: true,
  },
  {
    countryCode: 268,
    countryName: 'Georgia',
    currencyName: 'Lari',
    isCountry: true,
  },
  {
    countryCode: 276,
    countryName: 'Germany',
    currencyName: 'Euro',
    isCountry: true,
  },
  {
    countryCode: 288,
    countryName: 'Ghana',
    currencyName: 'Cedi',
    isCountry: true,
  },
  {
    countryCode: 300,
    countryName: 'Greece',
    currencyName: 'Euro',
    isCountry: true,
  },
  {
    countryCode: 304,
    countryName: 'Greenland',
    currencyName: 'Danish Krone',
    isCountry: true,
  },
  {
    countryCode: 308,
    countryName: 'Grenada',
    currencyName: 'East Caribbean Dollar',
    isCountry: true,
  },
  {
    countryCode: 320,
    countryName: 'Guatemala',
    currencyName: 'Quetzal',
    isCountry: true,
  },
  {
    countryCode: 324,
    countryName: 'Guinea',
    currencyName: 'Guinea Franc',
    isCountry: true,
  },
  {
    countryCode: 624,
    countryName: 'Guinea-Bissau',
    currencyName: 'CFA Franc BCEAO',
    isCountry: true,
  },
  {
    countryCode: 328,
    countryName: 'Guyana',
    currencyName: 'Guyana Dollar',
    isCountry: true,
  },
  {
    countryCode: 332,
    countryName: 'Haiti',
    currencyName: 'Gourde',
    isCountry: true,
  },
  {
    countryCode: 340,
    countryName: 'Honduras',
    currencyName: 'Lempira',
    isCountry: true,
  },
  {
    countryCode: 348,
    countryName: 'Hungary',
    currencyName: 'Forint',
    isCountry: true,
  },
  {
    countryCode: 352,
    countryName: 'Iceland',
    currencyName: 'Iceland Krona',
    isCountry: true,
  },
  {
    countryCode: 356,
    countryName: 'India',
    currencyName: 'Indian Rupee',
    isCountry: true,
  },
  {
    countryCode: 360,
    countryName: 'Indonesia',
    currencyName: 'Rupiah',
    isCountry: true,
  },
  {
    countryCode: 364,
    countryName: 'Iran, Islamic Republic of',
    currencyName: 'Iranian Rial',
    isCountry: true,
  },
  {
    countryCode: 368,
    countryName: 'Iraq',
    currencyName: 'Iraqi Dinar',
    isCountry: true,
  },
  {
    countryCode: 372,
    countryName: 'Ireland',
    currencyName: 'Euro',
    isCountry: true,
  },
  {
    countryCode: 376,
    countryName: 'Israel',
    currencyName: 'New Israeli Sheqel',
    isCountry: true,
  },
  {
    countryCode: 380,
    countryName: 'Italy',
    currencyName: 'Euro',
    isCountry: true,
  },
  {
    countryCode: 388,
    countryName: 'Jamaica',
    currencyName: 'Jamaican Dollar',
    isCountry: true,
  },
  {
    countryCode: 392,
    countryName: 'Japan',
    currencyName: 'Yen',
    isCountry: true,
  },
  {
    countryCode: 400,
    countryName: 'Jordan',
    currencyName: 'Jordanian Dinar',
    isCountry: true,
  },
  {
    countryCode: 398,
    countryName: 'Kazakhstan',
    currencyName: 'Tenge',
    isCountry: true,
  },
  {
    countryCode: 404,
    countryName: 'Kenya',
    currencyName: 'Kenyan Shilling',
    isCountry: true,
  },
  {
    countryCode: 748,
    countryName: 'Kingdom of Eswatini',
    currencyName: 'Lilangeni',
    isCountry: true,
  },
  {
    countryCode: 296,
    countryName: 'Kiribati',
    currencyName: 'Australian Dollar',
    isCountry: true,
  },
  {
    countryCode: 412,
    countryName: 'Kosovo',
    currencyName: 'Euro',
    isCountry: true,
  },
  {
    countryCode: 414,
    countryName: 'Kuwait',
    currencyName: 'Kuwaiti Dinar',
    isCountry: true,
  },
  {
    countryCode: 417,
    countryName: 'Kyrgyzstan',
    currencyName: 'Som',
    isCountry: true,
  },
  {
    countryCode: 418,
    countryName: "Lao People's Democratic Republic",
    currencyName: 'Kip',
    isCountry: true,
  },
  {
    countryCode: 428,
    countryName: 'Latvia',
    currencyName: 'Euro',
    isCountry: true,
  },
  {
    countryCode: 422,
    countryName: 'Lebanon',
    currencyName: 'Lebanese Pound',
    isCountry: true,
  },
  {
    countryCode: 426,
    countryName: 'Lesotho',
    currencyName: 'Loti',
    isCountry: true,
  },
  {
    countryCode: 430,
    countryName: 'Liberia',
    currencyName: 'US Dollar',
    isCountry: true,
  },
  {
    countryCode: 434,
    countryName: 'Libya',
    currencyName: 'Libyan Dinar',
    isCountry: true,
  },
  {
    countryCode: 438,
    countryName: 'Liechtenstein',
    currencyName: 'Swiss Franc',
    isCountry: true,
  },
  {
    countryCode: 440,
    countryName: 'Lithuania',
    currencyName: 'Euro',
    isCountry: true,
  },
  {
    countryCode: 442,
    countryName: 'Luxembourg',
    currencyName: 'Euro',
    isCountry: true,
  },
  {
    countryCode: 450,
    countryName: 'Madagascar',
    currencyName: 'Malagasy Ariary',
    isCountry: true,
  },
  {
    countryCode: 454,
    countryName: 'Malawi',
    currencyName: 'Kwacha',
    isCountry: true,
  },
  {
    countryCode: 458,
    countryName: 'Malaysia',
    currencyName: 'Malaysian Ringgit',
    isCountry: true,
  },
  {
    countryCode: 462,
    countryName: 'Maldives',
    currencyName: 'Rufiyaa',
    isCountry: true,
  },
  {
    countryCode: 466,
    countryName: 'Mali',
    currencyName: 'CFA Franc BCEAO',
    isCountry: true,
  },
  {
    countryCode: 470,
    countryName: 'Malta',
    currencyName: 'Euro',
    isCountry: true,
  },
  {
    countryCode: 584,
    countryName: 'Marshall Islands',
    currencyName: 'US Dollar',
    isCountry: true,
  },
  {
    countryCode: 478,
    countryName: 'Mauritania',
    currencyName: 'Ouguiya',
    isCountry: true,
  },
  {
    countryCode: 480,
    countryName: 'Mauritius',
    currencyName: 'Mauritius Rupee',
    isCountry: true,
  },
  {
    countryCode: 484,
    countryName: 'Mexico',
    currencyName: 'Mexican Peso',
    isCountry: true,
  },
  {
    countryCode: 583,
    countryName: 'Micronesia (Federated States of)',
    currencyName: 'US Dollar',
    isCountry: true,
  },
  {
    countryCode: 492,
    countryName: 'Monaco',
    currencyName: 'Euro',
    isCountry: true,
  },
  {
    countryCode: 496,
    countryName: 'Mongolia',
    currencyName: 'Tugrik',
    isCountry: true,
  },
  {
    countryCode: 499,
    countryName: 'Montenegro',
    currencyName: 'Euro',
    isCountry: true,
  },
  {
    countryCode: 500,
    countryName: 'Montserrat',
    currencyName: 'East Caribbean Dollar',
    isCountry: true,
  },
  {
    countryCode: 504,
    countryName: 'Morocco',
    currencyName: 'Moroccan Dirham',
    isCountry: true,
  },
  {
    countryCode: 508,
    countryName: 'Mozambique',
    currencyName: 'Metical',
    isCountry: true,
  },
  {
    countryCode: 104,
    countryName: 'Myanmar',
    currencyName: 'Kyat',
    isCountry: true,
  },
  {
    countryCode: 516,
    countryName: 'Namibia',
    currencyName: 'Namibian Dollar',
    isCountry: true,
  },
  {
    countryCode: 520,
    countryName: 'Nauru',
    currencyName: 'Australian Dollar',
    isCountry: true,
  },
  {
    countryCode: 524,
    countryName: 'Nepal',
    currencyName: 'Nepalese Rupee',
    isCountry: true,
  },
  {
    countryCode: 528,
    countryName: 'Netherlands',
    currencyName: 'Euro',
    isCountry: true,
  },
  {
    countryCode: 540,
    countryName: 'New Caledonia',
    currencyName: 'CFP Franc',
    isCountry: true,
  },
  {
    countryCode: 554,
    countryName: 'New Zealand',
    currencyName: 'New Zealand Dollar',
    isCountry: true,
  },
  {
    countryCode: 558,
    countryName: 'Nicaragua',
    currencyName: 'Cordoba Oro',
    isCountry: true,
  },
  {
    countryCode: 562,
    countryName: 'Niger',
    currencyName: 'CFA Franc BCEAO',
    isCountry: true,
  },
  {
    countryCode: 566,
    countryName: 'Nigeria',
    currencyName: 'Naira',
    isCountry: true,
  },
  {
    countryCode: 578,
    countryName: 'Norway',
    currencyName: 'Norwegian Krone',
    isCountry: true,
  },
  {
    countryCode: 512,
    countryName: 'Oman',
    currencyName: 'Rial Omani',
    isCountry: true,
  },
  {
    countryCode: 586,
    countryName: 'Pakistan',
    currencyName: 'Pakistan Rupee',
    isCountry: true,
  },
  {
    countryCode: 585,
    countryName: 'Palau',
    currencyName: 'US Dollar',
    isCountry: true,
  },
  {
    countryCode: 591,
    countryName: 'Panama',
    currencyName: 'Balboa',
    isCountry: true,
  },
  {
    countryCode: 598,
    countryName: 'Papua New Guinea',
    currencyName: 'Kina',
    isCountry: true,
  },
  {
    countryCode: 600,
    countryName: 'Paraguay',
    currencyName: 'Guarani',
    isCountry: true,
  },
  {
    countryCode: 604,
    countryName: 'Peru',
    currencyName: 'Nuevo Sol',
    isCountry: true,
  },
  {
    countryCode: 608,
    countryName: 'Philippines',
    currencyName: 'Philippine Peso',
    isCountry: true,
  },
  {
    countryCode: 616,
    countryName: 'Poland',
    currencyName: 'Zloty',
    isCountry: true,
  },
  {
    countryCode: 620,
    countryName: 'Portugal',
    currencyName: 'Euro',
    isCountry: true,
  },
  {
    countryCode: 630,
    countryName: 'Puerto Rico',
    currencyName: 'US Dollar',
    isCountry: true,
  },
  {
    countryCode: 634,
    countryName: 'Qatar',
    currencyName: 'Qatari Rial',
    isCountry: true,
  },
  {
    countryCode: 410,
    countryName: 'Republic of Korea',
    currencyName: 'Won',
    isCountry: true,
  },
  {
    countryCode: 498,
    countryName: 'Republic of Moldova',
    currencyName: 'Moldovan Leu',
    isCountry: true,
  },
  {
    countryCode: 807,
    countryName: 'Republic of North Macedonia',
    currencyName: 'Denar',
    isCountry: true,
  },
  {
    countryCode: 642,
    countryName: 'Romania',
    currencyName: 'New Leu',
    isCountry: true,
  },
  {
    countryCode: 643,
    countryName: 'Russian Federation',
    currencyName: 'Russian Ruble',
    isCountry: true,
  },
  {
    countryCode: 646,
    countryName: 'Rwanda',
    currencyName: 'Rwanda Franc',
    isCountry: true,
  },
  {
    countryCode: 659,
    countryName: 'Saint Kitts and Nevis',
    currencyName: 'East Caribbean Dollar',
    isCountry: true,
  },
  {
    countryCode: 662,
    countryName: 'Saint Lucia',
    currencyName: 'East Caribbean Dollar',
    isCountry: true,
  },
  {
    countryCode: 670,
    countryName: 'Saint Vincent and the Grenadines',
    currencyName: 'East Caribbean Dollar',
    isCountry: true,
  },
  {
    countryCode: 882,
    countryName: 'Samoa',
    currencyName: 'Tala',
    isCountry: true,
  },
  {
    countryCode: 674,
    countryName: 'San Marino',
    currencyName: 'Euro',
    isCountry: true,
  },
  {
    countryCode: 678,
    countryName: 'Sao Tome and Principe',
    currencyName: 'Dobra',
    isCountry: true,
  },
  {
    countryCode: 682,
    countryName: 'Saudi Arabia',
    currencyName: 'Saudi Riyal',
    isCountry: true,
  },
  {
    countryCode: 686,
    countryName: 'Senegal',
    currencyName: 'CFA Franc BCEAO',
    isCountry: true,
  },
  {
    countryCode: 688,
    countryName: 'Serbia',
    currencyName: 'Serbian Dinar',
    isCountry: true,
  },
  {
    countryCode: 690,
    countryName: 'Seychelles',
    currencyName: 'Seychelles Rupee',
    isCountry: true,
  },
  {
    countryCode: 694,
    countryName: 'Sierra Leone',
    currencyName: 'Leone',
    isCountry: true,
  },
  {
    countryCode: 702,
    countryName: 'Singapore',
    currencyName: 'Singapore Dollar',
    isCountry: true,
  },
  {
    countryCode: 534,
    countryName: 'Sint Maarten (Dutch part)',
    currencyName: 'Netherlands Antillian Guilder',
    isCountry: true,
  },
  {
    countryCode: 703,
    countryName: 'Slovakia',
    currencyName: 'Euro',
    isCountry: true,
  },
  {
    countryCode: 705,
    countryName: 'Slovenia',
    currencyName: 'Euro',
    isCountry: true,
  },
  {
    countryCode: 90,
    countryName: 'Solomon Islands',
    currencyName: 'Solomon Islands Dollar',
    isCountry: true,
  },
  {
    countryCode: 706,
    countryName: 'Somalia',
    currencyName: 'Somali Shilling',
    isCountry: true,
  },
  {
    countryCode: 710,
    countryName: 'South Africa',
    currencyName: 'Rand',
    isCountry: true,
  },
  {
    countryCode: 728,
    countryName: 'South Sudan',
    currencyName: 'South Sudanese Pound',
    isCountry: true,
  },
  {
    countryCode: 724,
    countryName: 'Spain',
    currencyName: 'Euro',
    isCountry: true,
  },
  {
    countryCode: 144,
    countryName: 'Sri Lanka',
    currencyName: 'Sri Lanka Rupee',
    isCountry: true,
  },
  {
    countryCode: 275,
    countryName: 'State of Palestine',
    currencyName: 'US Dollar',
    isCountry: true,
  },
  {
    countryCode: 729,
    countryName: 'Sudan',
    currencyName: 'Sudanese Pound',
    isCountry: true,
  },
  {
    countryCode: 740,
    countryName: 'Suriname',
    currencyName: 'Surinam Dollar',
    isCountry: true,
  },
  {
    countryCode: 752,
    countryName: 'Sweden',
    currencyName: 'Swedish Krona',
    isCountry: true,
  },
  {
    countryCode: 756,
    countryName: 'Switzerland',
    currencyName: 'Swiss Franc',
    isCountry: true,
  },
  {
    countryCode: 760,
    countryName: 'Syrian Arab Republic',
    currencyName: 'Syrian Pound',
    isCountry: true,
  },
  {
    countryCode: 762,
    countryName: 'Tajikistan',
    currencyName: 'Somoni',
    isCountry: true,
  },
  {
    countryCode: 764,
    countryName: 'Thailand',
    currencyName: 'Baht',
    isCountry: true,
  },
  {
    countryCode: 626,
    countryName: 'Timor-Leste',
    currencyName: 'US Dollar',
    isCountry: true,
  },
  {
    countryCode: 768,
    countryName: 'Togo',
    currencyName: 'CFA Franc BCEAO',
    isCountry: true,
  },
  {
    countryCode: 776,
    countryName: 'Tonga',
    currencyName: "Pa'anga",
    isCountry: true,
  },
  {
    countryCode: 780,
    countryName: 'Trinidad and Tobago',
    currencyName: 'Trinidad and Tobago Dollar',
    isCountry: true,
  },
  {
    countryCode: 788,
    countryName: 'Tunisia',
    currencyName: 'Tunisian Dinar',
    isCountry: true,
  },
  {
    countryCode: 792,
    countryName: 'Turkey',
    currencyName: 'New Turkish Lira',
    isCountry: true,
  },
  {
    countryCode: 795,
    countryName: 'Turkmenistan',
    currencyName: 'Turkmenistan Manat',
    isCountry: true,
  },
  {
    countryCode: 796,
    countryName: 'Turks and Caicos Islands',
    currencyName: 'US Dollar',
    isCountry: true,
  },
  {
    countryCode: 798,
    countryName: 'Tuvalu',
    currencyName: 'Australian Dollar',
    isCountry: true,
  },
  {
    countryCode: 800,
    countryName: 'Uganda',
    currencyName: 'Uganda Shilling',
    isCountry: true,
  },
  {
    countryCode: 804,
    countryName: 'Ukraine',
    currencyName: 'Hryvnia',
    isCountry: true,
  },
  {
    countryCode: 784,
    countryName: 'United Arab Emirates',
    currencyName: 'UAE Dirham',
    isCountry: true,
  },
  {
    countryCode: 826,
    countryName: 'United Kingdom of Great Britain and Northern Ireland',
    currencyName: 'Pound Sterling',
    isCountry: true,
  },
  {
    countryCode: 835,
    countryName: 'United Republic of Tanzania: Mainland',
    currencyName: 'Tanzanian Shilling',
    isCountry: true,
  },
  {
    countryCode: 836,
    countryName: 'United Republic of Tanzania: Zanzibar',
    currencyName: 'Tanzanian Shilling',
    isCountry: true,
  },
  {
    countryCode: 840,
    countryName: 'United States',
    currencyName: 'US Dollar',
    isCountry: true,
  },
  {
    countryCode: 858,
    countryName: 'Uruguay',
    currencyName: 'Peso Uruguayo',
    isCountry: true,
  },
  {
    countryCode: 860,
    countryName: 'Uzbekistan',
    currencyName: 'Uzbekistan Sum',
    isCountry: true,
  },
  {
    countryCode: 548,
    countryName: 'Vanuatu',
    currencyName: 'Vatu',
    isCountry: true,
  },
  {
    countryCode: 862,
    countryName: 'Venezuela (Bolivarian Republic of)',
    currencyName: 'Bolivar Fuerte',
    isCountry: true,
  },
  {
    countryCode: 704,
    countryName: 'Viet Nam',
    currencyName: 'Dong',
    isCountry: true,
  },
  {
    countryCode: 887,
    countryName: 'Yemen',
    currencyName: 'Yemeni Rial',
    isCountry: true,
  },
  {
    countryCode: 720,
    countryName: 'Yemen: Former Democratic Yemen',
    currencyName: 'Dinar',
    isCountry: true,
  },
  {
    countryCode: 886,
    countryName: 'Yemen: Former Yemen Arab Republic',
    currencyName: 'Rial  ',
    isCountry: true,
  },
  {
    countryCode: 894,
    countryName: 'Zambia',
    currencyName: 'Kwacha',
    isCountry: true,
  },
  {
    countryCode: 716,
    countryName: 'Zimbabwe',
    currencyName: 'US Dollar',
    isCountry: true,
  },
];

export default countrySuggestions;
