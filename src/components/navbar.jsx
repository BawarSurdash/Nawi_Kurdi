import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar = () => {
    const { language } = useLanguage();

    return ( 
        <nav className={language === 'ku' ? 'kurdish-font' : ''} dir={language === 'ku' ? 'rtl' : 'ltr'}>
            <div className="p-7 bg-gray-50 shadow-sm">
                {/* Mobile: Stack, SM: Stack, MD/LG: Row */}
                <div className="flex flex-col md:flex-row-reverse justify-between items-center">
                    <div className="text-xl font-bold mb-4 md:mb-0">
                        <Link to="/">{language === 'ku' ? 'ناوی کوردی' : 'Kurdish Names'}</Link>
                    </div>
                    
                    {/* Navigation Links */}
                    <div className="flex flex-col sm:grid sm:grid-cols-2 md:flex md:flex-row gap-4 md:gap-8 justify-center items-center w-full md:w-auto">
                        <Link to="/" className="text-gray-600 font-medium px-4 py-2 rounded transition-colors hover:bg-gray-200 text-center">
                            {language === 'ku' ? 'ماڵەوە' : 'Home'}
                        </Link>

                        <Link to="/addname" className="text-gray-600 font-medium px-4 py-2 rounded transition-colors hover:bg-gray-200 text-center">
                            {language === 'ku' ? '+ ناوێک بنێرە' : '+ Submit Name'}
                        </Link>

                        <Link to="https://www.messenger.com/login.php?next=https%3A%2F%2Fwww.messenger.com%2Ft%2F103717311296576%2F%3Fmessaging_source%3Dsource%253Apages%253Amessage_shortlink%26source_id%3D1441792%26recurring_notification%3D0" className="text-gray-600 font-medium px-4 py-2 rounded transition-colors hover:bg-gray-200 text-center">
                        {language === 'ku' ? 'لە ڕێگەی نامەوە' : 'Send Name in Messenger'}
                        </Link>

                        <Link to="/about" className="text-gray-600 font-medium px-4 py-2 rounded transition-colors hover:bg-gray-200 text-center">
                        {language === 'ku' ? 'دەربارەی ' : 'About'}

                        </Link>
                        <Link to="/fav" className="text-gray-600 font-medium px-4 py-2 rounded transition-colors hover:bg-gray-200 text-center">
                        {language === 'ku' ? 'هەڵبژاردەکانم' : 'My Favorite'}

                    </Link>
                    <Link to="/setting" className="text-gray-600 font-medium px-4 py-2 rounded transition-colors hover:bg-gray-200 text-center kurdish-font" >{language === 'ku' ? 'ڕێکخستن' : 'Settings'}</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;