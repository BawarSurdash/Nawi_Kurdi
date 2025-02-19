const About = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 text-right flex flex-col justify-end kurdish-font">
      {/* Main Title */}
      <h1 className="text-3xl font-bold mb-4">دەربارەی ماڵپەری ناوی کوردی</h1>
      
      {/* Description */}
      <p className="text-lg text-gray-700 mb-6 leading-relaxed">
        ماڵپەری ناوەکان بە یەکەم پرۆژەی درەختی گەشەپێدەر دادەنرێت کە وەک 
        <span className="font-bold"> سەرچاوەیەک </span>
        و تەرشێفیک کاردەکات بۆ ناوەکانی زمانی کوردی و ماناکانیان.  
      </p>

      {/* Section 1 */}
            <h2 className="text-2xl font-bold mt-8 mb-2">سەرچاوەکراوەیە</h2>
      <p className="text-lg text-gray-700 leading-relaxed">
        بە مانای ئەوەی سەرچاوەیە گۆڕدەکەی هەبێت دەتوانیت بەشداریبیت له 
        پەرەپیدان و باشترکردنی یان سود له کۆدەکەی وەرگرت
        <a href="#" className="text-purple-600 underline"> سەرچاوە </a>.
      </p>

      {/* Section 2 */}
      <h2 className="text-2xl font-bold mt-8 mb-2">پەیوەندیمان پێوەبکە</h2>
      <p className="text-lg text-gray-700 leading-relaxed">
        خۆشحاڵ دەبین بە زانینی هەر، ڕەخنەو پێشنیارەکانتان بگەینە 
        <a href="#" className="text-blue-600 underline"> پەڕەی درەختی گەشەپێدەر </a>.
      </p>

      {/* Section 3 */}
      <h2 className="text-2xl font-bold mt-8 mb-2">درەختی گەشەپێدەر</h2>
      <p className="text-lg text-gray-700 leading-relaxed">
        ماڵپەری ناوەکان بە سەرچاوەیەکی گەشەپێدەر ناسەنە. بەرومێش بەشداریبیت 
        بە ڕووپێش
        <a href="#" className="text-blue-600 underline"> ماڵپەری درەختی گەشەپێدەر </a>.
      </p>
    </div>
  );
};

export default About;
