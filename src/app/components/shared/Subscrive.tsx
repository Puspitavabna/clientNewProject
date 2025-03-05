import { useEffect, useRef, useState } from 'react';

const Subscribe = () => {
  const languages = [
    'Afrikaans',
    'Azərbaycan',
    'Bahasa Indonesia',
    'Bahasa Malaysia',
    'Bosanski',
    'Català',
    'Čeština',
    'Dansk',
    'Deutsch',
    'Eesti',
    'English (India)',
    'English (UK)',
    'English (US)',
    'Español (España)',
    'Español (Latinoamérica)',
    'Español (US)',
    'Euskara',
    'Filipino',
    'Français',
    'Français (Canada)',
    'Galego',
    'Hrvatski',
    'IsiZulu',
    'Íslenska',
    'Italiano',
    'Kiswahili',
    'Latviešu valoda',
    'Lietuvių',
    'Magyar',
    'Nederlands',
    'Norsk',
    'O‘zbek',
    'Polski',
    'Português',
    'Português (Brasil)',
    'Română',
    'Shqip',
    'Slovenčina',
    'Slovenščina',
    'Srpski',
    'Suomi',
    'Svenska',
    'Tiếng Việt',
    'Türkçe',
    'Беларуская',
    'Български',
    'Кыргызча',
    'Қазақ Тілі',
    'Македонски',
    'Монгол',
    'Русский',
    'Српски',
    'Українська',
    'Ελληνικά',
    'Հայերեն',
    'עברית',
    'اردو',
    'فارسی',
    'नेपाली',
    'मराठी',
    'हिन्दी',
    'অসমীয়া',
    'বাংলা',
    'ਪੰਜਾਬੀ',
    'ગુજરાતી',
    'ଓଡ଼ିଆ',
    'தமிழ்',
    'తెలుగు',
    'ಕನ್ನಡ',
    'മലയാളം',
    'සිංහල',
    'ภาษาไทย',
    'ລາວ',
    'ဗမာ',
    'ქართული',
    'አማርኛ',
    'ខ្មែរ',
    '中文 (简体)',
    '中文 (繁體)',
    '中文 (香港)',
    '日本語',
    '한국어',
  ];

  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    languages[0]
  );
  const selectRef = useRef<HTMLSelectElement | null>(null);

  // Function to resize the select element based on the selected text's length
  const resizeSelect = () => {
    if (selectRef.current) {
      const selectedOption =
        selectRef.current.options[selectRef.current.selectedIndex];
      const width = selectedOption.text.length;
      selectRef.current.style.width = `${width}ch`; // Adjust width dynamically
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
  };

  useEffect(() => {
    resizeSelect();
  }, [selectedLanguage]);

  return (
    <form className="flex items-center gap-2 w-80">
      <select
        ref={selectRef}
        value={selectedLanguage}
        onChange={handleSelectChange}
        className="rounded-[4px] px-1 py-2 text-[10px] min-w-[70px] max-w-[70px]  focus:outline-none"
        style={{ color: 'gray' }}
      >
        {languages.map((language, index) => (
          <option value={language} key={index}>
            {language}
          </option>
        ))}
      </select>

      <div className="relative flex items-center w-full max-w-[250px] ">
        <input
          type="email"
          className="w-full rounded-[4px] pl-2 pr-16 py-2 text-[10px] text-black focus:outline-none"
          placeholder="Enter your email"
          required
          aria-label="Email address"
        />
        <button
          type="submit"
          className="absolute right-1 h-[24px] text-[10px] rounded-[4px] bg-blue-600 px-2 text-white hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Subscribe;
