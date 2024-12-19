CREATE DATABASE bdfix;
\c bdfix;
DROP TABLE IF EXISTS currencies CASCADE;

DROP TABLE IF EXISTS users CASCADE;

DROP TABLE IF EXISTS categories CASCADE;

DROP TABLE IF EXISTS transactions CASCADE;

CREATE TABLE
  currencies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    iso_code VARCHAR(25) NOT NULL,
    symbol VARCHAR(25) NOT NULL
  );

CREATE TABLE
  users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    profile_image_url VARCHAR(255),
    currency_id INTEGER REFERENCES currencies (id)
  );

CREATE TABLE
  categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    category_type VARCHAR(20) NOT NULL CHECK (category_type IN ('income', 'expense')),
    icon_url VARCHAR(255) DEFAULT '/images/default-category-icon.svg'
  );

Create table transactions (
  id serial primary key,
  amount numeric(10, 2) not null,
  transaction_type varchar(20) not null check (transaction_type in ('income', 'expense')),
  description text,
  date date not null,
  user_id bigint (20) unsigned not null,
  category_id bigint (20) uns igned not null,
  foreign key (user_id) references users (id),
  foreign key (category_id) references categories (id)
);

 CREATE TABLE budgets ( id INT AUTO_INCREMENT PRIMARY KEY, user_id BIGINT UNSIGNED NOT NULL, category_id BIGINT UNSIGNED NOT NULL,  amount DECIMAL(10, 2) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, UNIQUE (user_id, category_id),  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,  FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE);


-- Insert Items for Currencies
INSERT INTO
  currencies (name, iso_code, symbol)
VALUES
  ('Afghan Afghani', 'AFN', '؋'),
  ('Albanian Lek', 'ALL', 'L'),
  ('Algerian Dinar', 'DZD', 'دج'),
  ('Angolan Kwanza', 'AOA', 'Kz'),
  ('Argentine Peso', 'ARS', '$'),
  ('Armenian Dram', 'AMD', '֏'),
  ('Aruban Florin', 'AWG', 'ƒ'),
  ('Australian Dollar', 'AUD', '$'),
  ('Azerbaijani Manat', 'AZN', '₼'),
  ('Bahamian Dollar', 'BSD', '$'),
  ('Bahraini Dinar', 'BHD', '.د.ب'),
  ('Bangladeshi Taka', 'BDT', '৳'),
  ('Barbados Dollar', 'BBD', '$'),
  ('Belarusian Ruble', 'BYN', 'Br'),
  ('Belizian Dollar', 'BZD', '$'),
  ('Bermudian Dollar', 'BMD', '$'),
  ('Bhutanese Ngultrum', 'BTN', 'Nu.'),
  ('Bolivian Boliviano', 'BOB', 'Bs.'),
  (
    'Bosnia-Herzegovina Convertible Mark',
    'BAM',
    'KM'
  ),
  ('Botswanan Pula', 'BWP', 'P'),
  ('Brazilian Real', 'BRL', 'R$'),
  ('British Pound Sterling', 'GBP', '£'),
  ('Brunei Dollar', 'BND', '$'),
  ('Bulgarian Lev', 'BGN', 'лв'),
  ('Burundian Franc', 'BIF', 'FBu'),
  ('Cambodian Riel', 'KHR', '៛'),
  ('Canadian Dollar', 'CAD', '$'),
  ('Cape Verdean Escudo', 'CVE', 'Esc'),
  ('Cayman Islands Dollar', 'KYD', '$'),
  ('Central African CFA Franc', 'XAF', 'FCFA'),
  ('Chilean Peso', 'CLP', '$'),
  ('Chinese Yuan', 'CNY', '¥'),
  ('Colombian Peso', 'COP', '$'),
  ('Comorian Franc', 'KMF', 'CF'),
  ('Congolese Franc', 'CDF', 'FC'),
  ('Costa Rican Colón', 'CRC', '₡'),
  ('Croatian Kuna', 'HRK', 'kn'),
  ('Cuban Peso', 'CUP', '₱'),
  ('Czech Republic Koruna', 'CZK', 'Kč'),
  ('Danish Krone', 'DKK', 'kr'),
  ('Djiboutian Franc', 'DJF', 'Fdj'),
  ('Dominican Peso', 'DOP', 'RD$'),
  ('East Caribbean Dollar', 'XCD', '$'),
  ('Egyptian Pound', 'EGP', 'ج.م'),
  ('Eritrean Nakfa', 'ERN', 'Nfk'),
  ('Estonian Kroon', 'EEK', 'kr'),
  ('Ethiopian Birr', 'ETB', 'Br'),
  ('Euro', 'EUR', '€'),
  ('Falkland Islands Pound', 'FKP', '£'),
  ('Fijian Dollar', 'FJD', 'FJ$'),
  ('Gambian Dalasi', 'GMD', 'D'),
  ('Georgian Lari', 'GEL', '₾'),
  ('Ghanaian Cedi', 'GHS', '₵'),
  ('Gibraltar Pound', 'GIP', '£'),
  ('Guatemalan Quetzal', 'GTQ', 'Q'),
  ('Guinean Franc', 'GNF', 'FG'),
  ('Guyanaese Dollar', 'GYD', 'G$'),
  ('Haitian Gourde', 'HTG', 'G'),
  ('Honduran Lempira', 'HNL', 'L'),
  ('Hong Kong Dollar', 'HKD', 'HK$'),
  ('Hungarian Forint', 'HUF', 'Ft'),
  ('Icelandic Króna', 'ISK', 'kr'),
  ('Indian Rupee', 'INR', '₹'),
  ('Indonesian Rupiah', 'IDR', 'Rp'),
  ('Iranian Rial', 'IRR', 'ريال'),
  ('Iraqi Dinar', 'IQD', 'ع.د'),
  ('Israeli New Sheqel', 'ILS', '₪'),
  ('Jamaican Dollar', 'JMD', 'J$'),
  ('Japanese Yen', 'JPY', '¥'),
  ('Jordanian Dinar', 'JOD', 'د.ا'),
  ('Kazakhstani Tenge', 'KZT', '₸'),
  ('Kenyan Shilling', 'KES', 'KSh'),
  ('Kuwaiti Dinar', 'KWD', 'د.ك'),
  ('Kyrgystani Som', 'KGS', 'с'),
  ('Laotian Kip', 'LAK', '₭'),
  ('Latvian Lats', 'LVL', 'Ls'),
  ('Lebanese Pound', 'LBP', 'ل.ل'),
  ('Lesotho Loti', 'LSL', 'L'),
  ('Liberian Dollar', 'LRD', '$'),
  ('Libyan Dinar', 'LYD', 'ل.د'),
  ('Swiss Franc', 'CHF', 'Fr.'),
  ('Lithuanian Litas', 'LTL', 'Lt'),
  ('Macanese Pataca', 'MOP', 'P'),
  ('Macedonian Denar', 'MKD', 'ден'),
  ('Malagasy Ariary', 'MGA', 'Ar'),
  ('Malawian Kwacha', 'MWK', 'MK'),
  ('Malaysian Ringgit', 'MYR', 'RM'),
  ('Maldivian Rufiyaa', 'MVR', 'ރ'),
  ('Mauritanian Ouguiya', 'MRU', 'UM'),
  ('Mauritian Rupee', 'MUR', '₨'),
  ('Mexican Peso', 'MXN', '$'),
  ('Moldovan Leu', 'MDL', 'L'),
  ('Mongolian Tugrik', 'MNT', '₮'),
  ('Moroccan Dirham', 'MAD', 'د.م.'),
  ('Mozambican Metical', 'MZN', 'MT'),
  ('Namibian Dollar', 'NAD', '$'),
  ('Nepalese Rupee', 'NPR', 'रू'),
  ('Netherlands Antillean Guilder', 'ANG', 'ƒ'),
  ('New Taiwan Dollar', 'TWD', 'NT$'),
  ('New Zealand Dollar', 'NZD', '$'),
  ('Nicaraguan Córdoba', 'NIO', 'C$'),
  ('Nigerian Naira', 'NGN', '₦'),
  ('North Korean Won', 'KPW', '₩'),
  ('Norwegian Krone', 'NOK', 'kr'),
  ('Omani Rial', 'OMR', 'ر.ع.'),
  ('Pakistani Rupee', 'PKR', 'Rs'),
  ('Panamanian Balboa', 'PAB', 'B/'),
  ('Papua New Guinean Kina', 'PGK', 'K'),
  ('Paraguayan Guarani', 'PYG', '₲'),
  ('Peruvian Nuevo Sol', 'PEN', 'S/.'),
  ('Philippine Peso', 'PHP', '₱'),
  ('Polish Zloty', 'PLN', 'zł'),
  ('Qatari Rial', 'QAR', 'ر.ق'),
  ('Romanian Leu', 'RON', 'lei'),
  ('Russian Ruble', 'RUB', '₽'),
  ('Rwandan Franc', 'RWF', 'RF'),
  ('Saint Helena Pound', 'SHP', '£'),
  ('Samoan Tala', 'WST', 'T'),
  ('Sao Tome and Principe Dobra', 'STD', 'Db'),
  ('Saudi Riyal', 'SAR', 'ر.س'),
  ('Serbian Dinar', 'RSD', 'РСД'),
  ('Seychellois Rupee', 'SCR', '₨'),
  ('Sierra Leonean Leone', 'SLL', 'Le'),
  ('Singapore Dollar', 'SGD', '$'),
  ('Solomon Islands Dollar', 'SBD', '$'),
  ('Somali Shilling', 'SOS', 'S'),
  ('South African Rand', 'ZAR', 'R'),
  ('South Korean Won', 'KRW', '₩'),
  ('Sri Lankan Rupee', 'LKR', 'Rs'),
  ('Sudanese Pound', 'SDG', 'ج.س.'),
  ('Swedish Krona', 'SEK', 'kr'),
  ('Swiss Franc', 'CHF', 'Fr.'),
  ('Surinamese Dollar', 'SRD', '$'),
  ('Swazi Lilangeni', 'SZL', 'L'),
  ('Syrian Pound', 'SYP', '£S'),
  ('Tajikistani Somoni', 'TJS', 'ЅМ'),
  ('Tanzanian Shilling', 'TZS', 'Sh'),
  ('Thai Baht', 'THB', '฿'),
  ('Tongan Pa''anga', 'TOP', 'T$'),
  ('Trinidad and Tobago Dollar', 'TTD', 'TT$'),
  ('Tunisian Dinar', 'TND', 'د.ت'),
  ('Turkish Lira', 'TRY', '₺'),
  ('Turkmenistani Manat', 'TMT', 'T'),
  ('Ugandan Shilling', 'UGX', 'USh'),
  ('Ukrainian Hryvnia', 'UAH', '₴'),
  ('United Arab Emirates Dirham', 'AED', 'د.إ'),
  ('United States Dollar', 'USD', '$'),
  ('Uruguayan Peso', 'UYU', '$'),
  ('Uzbekistan Som', 'UZS', 'so''m'),
  ('Vanuatu Vatu', 'VUV', 'VT'),
  ('Venezuelan Bolívar', 'VES', 'Bs.'),
  ('Vietnamese Dong', 'VND', '₫'),
  ('Yemeni Rial', 'YER', '﷼'),
  ('Zambian Kwacha', 'ZMW', 'ZK'),
  ('Zimbabwean Dollar', 'ZWL', 'Z$');

-- Insert Items for Key Expense Categories
INSERT INTO categories (name, category_type)
VALUES
  ('Belanja Groceries', 'expense'),
  ('Utilitas', 'expense'),
  ('Sewa atau Hipotek', 'expense'),
  ('Asuransi', 'expense'),
  ('Kesehatan', 'expense'),
  ('Biaya Kendaraan', 'expense'),
  ('Transportasi Umum', 'expense'),
  ('Makan di Luar', 'expense'),
  ('Hiburan', 'expense'),
  ('Liburan & Perjalanan', 'expense'),
  ('Pakaian dan Aksesori', 'expense'),
  ('Elektronik & Gadget', 'expense'),
  ('Renovasi Rumah', 'expense'),
  ('Layanan Hukum', 'expense'),
  ('Fitness & Gym', 'expense'),
  ('Makanan & Perlengkapan Hewan Peliharaan', 'expense'),
  ('Pendidikan', 'expense'),
  ('Pajak & Potongan', 'expense'),
  ('Pembayaran Utang', 'expense');

-- Insert Items for Key Income Categories
INSERT INTO categories (name, category_type)
VALUES
  ('Pendapatan dari Sampingan', 'income'),
  ('Penjualan Kerajinan', 'income'),
  ('Mengajar/Tutor', 'income'),
  ('Penjualan Musik/Seni', 'income'),
  ('Penjualan Properti', 'income'),
  ('Pendapatan Iklan', 'income'),
  ('Biaya Lisensi', 'income'),
  ('Beasiswa & Hibah', 'income'),
  ('Ekonomi Gig', 'income'),
  ('Pendapatan Airbnb', 'income'),
  ('Crowdfunding', 'income'),
  ('Pendapatan Kemitraan', 'income'),
  ('Pendapatan Lainnya', 'income');



-- Insert Items for Currencies
INSERT INTO
  currencies (name, iso_code, symbol)
VALUES
  ('Afghan Afghani', 'AFN', '؋'),
  ('Albanian Lek', 'ALL', 'L'),
  ('Algerian Dinar', 'DZD', 'دج'),
  ('Angolan Kwanza', 'AOA', 'Kz'),
  ('Argentine Peso', 'ARS', '$'),
  ('Armenian Dram', 'AMD', '֏'),
  ('Aruban Florin', 'AWG', 'ƒ'),
  ('Australian Dollar', 'AUD', '$'),
  ('Azerbaijani Manat', 'AZN', '₼'),
  ('Bahamian Dollar', 'BSD', '$'),
  ('Bahraini Dinar', 'BHD', '.د.ب'),
  ('Bangladeshi Taka', 'BDT', '৳'),
  ('Barbados Dollar', 'BBD', '$'),
  ('Belarusian Ruble', 'BYN', 'Br'),
  ('Belizian Dollar', 'BZD', '$'),
  ('Bermudian Dollar', 'BMD', '$'),
  ('Bhutanese Ngultrum', 'BTN', 'Nu.'),
  ('Bolivian Boliviano', 'BOB', 'Bs.'),
  (
    'Bosnia-Herzegovina Convertible Mark',
    'BAM',
    'KM'
  ),
  ('Botswanan Pula', 'BWP', 'P'),
  ('Brazilian Real', 'BRL', 'R$'),
  ('British Pound Sterling', 'GBP', '£'),
  ('Brunei Dollar', 'BND', '$'),
  ('Bulgarian Lev', 'BGN', 'лв'),
  ('Burundian Franc', 'BIF', 'FBu'),
  ('Cambodian Riel', 'KHR', '៛'),
  ('Canadian Dollar', 'CAD', '$'),
  ('Cape Verdean Escudo', 'CVE', 'Esc'),
  ('Cayman Islands Dollar', 'KYD', '$'),
  ('Central African CFA Franc', 'XAF', 'FCFA'),
  ('Chilean Peso', 'CLP', '$'),
  ('Chinese Yuan', 'CNY', '¥'),
  ('Colombian Peso', 'COP', '$'),
  ('Comorian Franc', 'KMF', 'CF'),
  ('Congolese Franc', 'CDF', 'FC'),
  ('Costa Rican Colón', 'CRC', '₡'),
  ('Croatian Kuna', 'HRK', 'kn'),
  ('Cuban Peso', 'CUP', '₱'),
  ('Czech Republic Koruna', 'CZK', 'Kč'),
  ('Danish Krone', 'DKK', 'kr'),
  ('Djiboutian Franc', 'DJF', 'Fdj'),
  ('Dominican Peso', 'DOP', 'RD$'),
  ('East Caribbean Dollar', 'XCD', '$'),
  ('Egyptian Pound', 'EGP', 'ج.م'),
  ('Eritrean Nakfa', 'ERN', 'Nfk'),
  ('Estonian Kroon', 'EEK', 'kr'),
  ('Ethiopian Birr', 'ETB', 'Br'),
  ('Euro', 'EUR', '€'),
  ('Falkland Islands Pound', 'FKP', '£'),
  ('Fijian Dollar', 'FJD', 'FJ$'),
  ('Gambian Dalasi', 'GMD', 'D'),
  ('Georgian Lari', 'GEL', '₾'),
  ('Ghanaian Cedi', 'GHS', '₵'),
  ('Gibraltar Pound', 'GIP', '£'),
  ('Guatemalan Quetzal', 'GTQ', 'Q'),
  ('Guinean Franc', 'GNF', 'FG'),
  ('Guyanaese Dollar', 'GYD', 'G$'),
  ('Haitian Gourde', 'HTG', 'G'),
  ('Honduran Lempira', 'HNL', 'L'),
  ('Hong Kong Dollar', 'HKD', 'HK$'),
  ('Hungarian Forint', 'HUF', 'Ft'),
  ('Icelandic Króna', 'ISK', 'kr'),
  ('Indian Rupee', 'INR', '₹'),
  ('Indonesian Rupiah', 'IDR', 'Rp'),
  ('Iranian Rial', 'IRR', 'ريال'),
  ('Iraqi Dinar', 'IQD', 'ع.د'),
  ('Israeli New Sheqel', 'ILS', '₪'),
  ('Jamaican Dollar', 'JMD', 'J$'),
  ('Japanese Yen', 'JPY', '¥'),
  ('Jordanian Dinar', 'JOD', 'د.ا'),
  ('Kazakhstani Tenge', 'KZT', '₸'),
  ('Kenyan Shilling', 'KES', 'KSh'),
  ('Kuwaiti Dinar', 'KWD', 'د.ك'),
  ('Kyrgystani Som', 'KGS', 'с'),
  ('Laotian Kip', 'LAK', '₭'),
  ('Latvian Lats', 'LVL', 'Ls'),
  ('Lebanese Pound', 'LBP', 'ل.ل'),
  ('Lesotho Loti', 'LSL', 'L'),
  ('Liberian Dollar', 'LRD', '$'),
  ('Libyan Dinar', 'LYD', 'ل.د'),
  ('Swiss Franc', 'CHF', 'Fr.'),
  ('Lithuanian Litas', 'LTL', 'Lt'),
  ('Macanese Pataca', 'MOP', 'P'),
  ('Macedonian Denar', 'MKD', 'ден'),
  ('Malagasy Ariary', 'MGA', 'Ar'),
  ('Malawian Kwacha', 'MWK', 'MK'),
  ('Malaysian Ringgit', 'MYR', 'RM'),
  ('Maldivian Rufiyaa', 'MVR', 'ރ'),
  ('Mauritanian Ouguiya', 'MRU', 'UM'),
  ('Mauritian Rupee', 'MUR', '₨'),
  ('Mexican Peso', 'MXN', '$'),
  ('Moldovan Leu', 'MDL', 'L'),
  ('Mongolian Tugrik', 'MNT', '₮'),
  ('Moroccan Dirham', 'MAD', 'د.م.'),
  ('Mozambican Metical', 'MZN', 'MT'),
  ('Namibian Dollar', 'NAD', '$'),
  ('Nepalese Rupee', 'NPR', 'रू'),
  ('Netherlands Antillean Guilder', 'ANG', 'ƒ'),
  ('New Taiwan Dollar', 'TWD', 'NT$'),
  ('New Zealand Dollar', 'NZD', '$'),
  ('Nicaraguan Córdoba', 'NIO', 'C$'),
  ('Nigerian Naira', 'NGN', '₦'),
  ('North Korean Won', 'KPW', '₩'),
  ('Norwegian Krone', 'NOK', 'kr'),
  ('Omani Rial', 'OMR', 'ر.ع.'),
  ('Pakistani Rupee', 'PKR', 'Rs'),
  ('Panamanian Balboa', 'PAB', 'B/'),
  ('Papua New Guinean Kina', 'PGK', 'K'),
  ('Paraguayan Guarani', 'PYG', '₲'),
  ('Peruvian Nuevo Sol', 'PEN', 'S/.'),
  ('Philippine Peso', 'PHP', '₱'),
  ('Polish Zloty', 'PLN', 'zł'),
  ('Qatari Rial', 'QAR', 'ر.ق'),
  ('Romanian Leu', 'RON', 'lei'),
  ('Russian Ruble', 'RUB', '₽'),
  ('Rwandan Franc', 'RWF', 'RF'),
  ('Saint Helena Pound', 'SHP', '£'),
  ('Samoan Tala', 'WST', 'T'),
  ('Sao Tome and Principe Dobra', 'STD', 'Db'),
  ('Saudi Riyal', 'SAR', 'ر.س'),
  ('Serbian Dinar', 'RSD', 'РСД'),
  ('Seychellois Rupee', 'SCR', '₨'),
  ('Sierra Leonean Leone', 'SLL', 'Le'),
  ('Singapore Dollar', 'SGD', '$'),
  ('Solomon Islands Dollar', 'SBD', '$'),
  ('Somali Shilling', 'SOS', 'S'),
  ('South African Rand', 'ZAR', 'R'),
  ('South Korean Won', 'KRW', '₩'),
  ('Sri Lankan Rupee', 'LKR', 'Rs'),
  ('Sudanese Pound', 'SDG', 'ج.س.'),
  ('Swedish Krona', 'SEK', 'kr'),
  ('Swiss Franc', 'CHF', 'Fr.'),
  ('Surinamese Dollar', 'SRD', '$'),
  ('Swazi Lilangeni', 'SZL', 'L'),
  ('Syrian Pound', 'SYP', '£S'),
  ('Tajikistani Somoni', 'TJS', 'ЅМ'),
  ('Tanzanian Shilling', 'TZS', 'Sh'),
  ('Thai Baht', 'THB', '฿'),
  ('Tongan Pa''anga', 'TOP', 'T$'),
  ('Trinidad and Tobago Dollar', 'TTD', 'TT$'),
  ('Tunisian Dinar', 'TND', 'د.ت'),
  ('Turkish Lira', 'TRY', '₺'),
  ('Turkmenistani Manat', 'TMT', 'T'),
  ('Ugandan Shilling', 'UGX', 'USh'),
  ('Ukrainian Hryvnia', 'UAH', '₴'),
  ('United Arab Emirates Dirham', 'AED', 'د.إ'),
  ('United States Dollar', 'USD', '$'),
  ('Uruguayan Peso', 'UYU', '$'),
  ('Uzbekistan Som', 'UZS', 'so''m'),
  ('Vanuatu Vatu', 'VUV', 'VT'),
  ('Venezuelan Bolívar', 'VES', 'Bs.'),
  ('Vietnamese Dong', 'VND', '₫'),
  ('Yemeni Rial', 'YER', '﷼'),
  ('Zambian Kwacha', 'ZMW', 'ZK'),
  ('Zimbabwean Dollar', 'ZWL', 'Z$');

-- Insert Items for Key Expense Categories
INSERT INTO categories (name, category_type)
VALUES
  ('Belanja Groceries', 'expense'),
  ('Utilitas', 'expense'),
  ('Sewa atau Hipotek', 'expense'),
  ('Asuransi', 'expense'),
  ('Kesehatan', 'expense'),
  ('Biaya Kendaraan', 'expense'),
  ('Transportasi Umum', 'expense'),
  ('Makan di Luar', 'expense'),
  ('Hiburan', 'expense'),
  ('Liburan & Perjalanan', 'expense'),
  ('Pakaian dan Aksesori', 'expense'),
  ('Elektronik & Gadget', 'expense'),
  ('Renovasi Rumah', 'expense'),
  ('Layanan Hukum', 'expense'),
  ('Fitness & Gym', 'expense'),
  ('Makanan & Perlengkapan Hewan Peliharaan', 'expense'),
  ('Pendidikan', 'expense'),
  ('Pajak & Potongan', 'expense'),
  ('Pembayaran Utang', 'expense');

-- Insert Items for Key Income Categories
INSERT INTO categories (name, category_type)
VALUES
  ('Pendapatan dari Sampingan', 'income'),
  ('Penjualan Kerajinan', 'income'),
  ('Mengajar/Tutor', 'income'),
  ('Penjualan Musik/Seni', 'income'),
  ('Penjualan Properti', 'income'),
  ('Pendapatan Iklan', 'income'),
  ('Biaya Lisensi', 'income'),
  ('Beasiswa & Hibah', 'income'),
  ('Ekonomi Gig', 'income'),
  ('Pendapatan Airbnb', 'income'),
  ('Crowdfunding', 'income'),
  ('Pendapatan Kemitraan', 'income'),
  ('Pendapatan Lainnya', 'income');
