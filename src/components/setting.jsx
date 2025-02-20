import { useLanguage } from '../contexts/LanguageContext';

const Setting = () => {
  const { language, setLanguage } = useLanguage();

  return ( 
    <div className="kurdish-font">
    <div className="flex justify-end items-center m-screen m-10">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="p-2 border rounded mx-10 cursor-pointer"
      >
        <option value="ku">Kurdish</option>
        <option value="en">English</option>
      </select>
      <p>گۆڕینی زمان</p>

      </div>
    </div>
  );
}

export default Setting;