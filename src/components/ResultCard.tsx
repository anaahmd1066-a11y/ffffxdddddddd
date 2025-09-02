import React from "react";
import { Result } from "../types";
import { Trophy, Medal, Award, User, Hash, BookOpen, Star, CheckCircle, Heart, Sparkles, Calendar, Clock } from "lucide-react";
import { getCategoryColor, getGradeColor } from "../utils/contestStats";

interface ResultCardProps {
  student: Result;
  isDarkMode?: boolean;
}

export const ResultCard: React.FC<ResultCardProps> = ({ student, isDarkMode = false }) => {
  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-8 h-8 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-8 h-8 text-gray-400" />;
    if (rank === 3) return <Award className="w-8 h-8 text-amber-600" />;
    return <Star className="w-8 h-8 text-blue-500" />;
  };

  const getRankText = (rank: number) => {
    const categoryName = getCategoryName(student.category?.toString() || 'غير محدد');
    if (rank === 1) return `المركز الأول في ${categoryName}`;
    if (rank === 2) return `المركز الثاني في ${categoryName}`;
    if (rank === 3) return `المركز الثالث في ${categoryName}`;
    if (rank <= 10) return `المركز ${rank} في ${categoryName}`;
    return `الترتيب ${rank} في ${categoryName}`;
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case '3': return 'فئة ثلاثة أجزاء';
      case '5': return 'فئة خمسة أجزاء';
      case '8': return 'فئة ثمانية أجزاء';
      case '10': return 'فئة عشرة أجزاء';
      case '15': return 'فئة خمسة عشر جزءا';
      case '20': return 'فئة عشرون جزءا';
      case '25': return 'فئة خمسة وعشرون جزءا';
      case '30': return 'فئة ثلاثون جزءا';
      default: return `فئة ${category}`;
    }
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return "from-yellow-500 to-orange-500";
    if (rank === 2) return "from-gray-400 to-gray-600";
    if (rank === 3) return "from-amber-500 to-yellow-600";
    if (rank <= 10) return "from-blue-500 to-purple-600";
    return "from-green-500 to-blue-500";
  };

  const getSuccessMessage = (grade: number) => {
    if (grade >= 85) {
      return {
        message: "مبروك! لقد نجحت بتفوق في المسابقة",
        subMessage: "أداء ممتاز ومشرف، استمر في حفظ كتاب الله",
        icon: <CheckCircle className="w-8 h-8 text-green-500 animate-pulse" />,
        bgColor: "from-green-500 to-emerald-500",
        textColor: "text-green-100"
      };
    } else {
      return {
        message: "لا تيأس، المحاولة القادمة ستكون أفضل بإذن الله",
        subMessage: "كل خطوة في طريق حفظ القرآن لها أجر عظيم، واصل المحاولة",
        icon: <Heart className="w-8 h-8 text-orange-500 animate-pulse" />,
        bgColor: "from-orange-500 to-yellow-500",
        textColor: "text-orange-100"
      };
    }
  };

  const successInfo = getSuccessMessage(student.grade);

  return (
    <div className="max-w-2xl mx-auto animate-fadeIn">
      <div className={`rounded-2xl shadow-2xl overflow-hidden border transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600' 
          : 'bg-gradient-to-br from-white to-blue-50 border-blue-100'
      }`}>
        {/* Header with rank */}
        <div className={`bg-gradient-to-r ${getRankColor(student.rank!)} text-white p-6 text-center`}>
          <div className="flex items-center justify-center gap-3 mb-2">
            {getRankIcon(student.rank!)}
            <h3 className="text-2xl font-bold">{getRankText(student.rank!)}</h3>
          </div>
          <p className="text-white/90">
            {student.grade >= 85 ? "تهانينا على هذا الإنجاز الرائع!" : "شكراً لمشاركتك في المسابقة"}
          </p>
        </div>

        {/* Student details */}
        <div className="p-8 space-y-6">
          <div className={`flex items-center gap-4 p-4 rounded-xl transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-blue-900/30 to-purple-900/30' 
              : 'bg-gradient-to-r from-blue-50 to-purple-50'
          }`}>
            <User className="w-6 h-6 text-blue-600" />
            <div className="flex-1 text-right">
              <p className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>اسم الطالب</p>
              <p className={`text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>{student.name}</p>
            </div>
          </div>

          <div className={`flex items-center gap-4 p-4 rounded-xl transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-green-900/30 to-blue-900/30' 
              : 'bg-gradient-to-r from-green-50 to-blue-50'
          }`}>
            <Hash className="w-6 h-6 text-green-600" />
            <div className="flex-1 text-right">
              <p className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>رقم الطالب</p>
              <p className={`text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>{student.id || student.no || 'غير محدد'}</p>
            </div>
          </div>

          <div className={`flex items-center gap-4 p-4 rounded-xl transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-purple-900/30 to-pink-900/30' 
              : 'bg-gradient-to-r from-purple-50 to-pink-50'
          }`}>
            <BookOpen className="w-6 h-6 text-purple-600" />
            <div className="flex-1 text-right">
              <p className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>الفئة</p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${getCategoryColor(
                  student.category?.toString() || 'غير محدد', isDarkMode
                )}`}
              >
                {student.category || 'غير محدد'}
              </span>
            </div>
          </div>

          <div className={`flex items-center gap-4 p-4 rounded-xl transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-yellow-900/30 to-orange-900/30' 
              : 'bg-gradient-to-r from-yellow-50 to-orange-50'
          }`}>
            <Star className="w-6 h-6 text-yellow-600" />
            <div className="flex-1 text-right">
              <p className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>الدرجة</p>
              <div className="flex items-center justify-end gap-2">
                <span
                  className={`text-3xl font-bold px-4 py-2 rounded-lg ${getGradeColor(
                    student.grade, isDarkMode
                  )}`}
                >
                  {student.grade}
                </span>
                <span className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>من 100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Success/Encouragement message */}
        <div className={`bg-gradient-to-r ${successInfo.bgColor} text-white p-6 text-center relative overflow-hidden`}>
          {/* Background decorative elements */}
          <div className="absolute top-2 right-4 opacity-20">
            <Sparkles className="w-12 h-12 animate-spin-slow" />
          </div>
          <div className="absolute bottom-2 left-4 opacity-15">
            <BookOpen className="w-10 h-10 animate-bounce-slow" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              {successInfo.icon}
              <h4 className={`text-xl font-bold ${successInfo.textColor}`}>
                {successInfo.message}
              </h4>
            </div>
            
            <p className={`text-lg ${successInfo.textColor} mb-4`}>
              {successInfo.subMessage}
            </p>
            
            {student.grade >= 85 ? (
              <div className="space-y-2">
                <p className="text-white/90 font-semibold">
                  🎉 درجة النجاح: {student.grade} من 100
                </p>
                <p className="text-white/80 text-sm">
                  "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ"
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-white/90 font-semibold">
                  📚 درجتك: {student.grade} من 100
                </p>
                <p className="text-white/80 text-sm">
                  "وَمَن جَاهَدَ فَإِنَّمَا يُجَاهِدُ لِنَفْسِهِ ۚ إِنَّ اللَّهَ لَغَنِيٌّ عَنِ الْعَالَمِينَ"
                </p>
                <div className="mt-4 p-3 bg-white/20 rounded-xl">
                  <p className="text-white font-semibold text-sm">
                    💪 نصائح للمرة القادمة:
                  </p>
                  <ul className="text-white/90 text-sm mt-2 space-y-1">
                    <li>• راجع الأجزاء يومياً</li>
                    <li>• اطلب المساعدة من المحفظ</li>
                    <li>• ادع الله أن يعينك على الحفظ</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Invitation Banner for Successful Students */}
        {student.grade >= 85 && (
          <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white p-8 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-4 right-4 opacity-20">
              <Trophy className="w-20 h-20 animate-bounce-slow" />
            </div>
            <div className="absolute bottom-4 left-4 opacity-15">
              <Star className="w-16 h-16 animate-spin-slow" />
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-96 h-96 rounded-full bg-gradient-radial from-white/10 via-yellow-300/5 to-transparent animate-pulse-soft"></div>
            </div>
            
            <div className="relative z-10 text-center">
              <div className="flex justify-center items-center gap-4 mb-6">
                <div className="bg-white/20 p-4 rounded-full">
                  <Trophy className="w-12 h-12 text-yellow-300 animate-bounce-slow" />
                </div>
                <div className="text-center">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 glowing-text-main">
                    🎉 دعوة خاصة للفائزين 🎉
                  </h3>
                  <div className="w-32 h-1 bg-gradient-to-r from-yellow-300 to-white mx-auto rounded-full animate-pulse-glow"></div>
                </div>
                <div className="bg-white/20 p-4 rounded-full">
                  <Star className="w-12 h-12 text-yellow-300 animate-spin-slow" />
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl mb-6">
                <div className="flex justify-center items-center gap-3 mb-6">
                  <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />
                  <h4 className="text-2xl md:text-3xl font-bold text-yellow-200 glowing-text">
                    تتشرف إدارة المسجد الشرقي بدعوتكم
                  </h4>
                  <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" style={{ animationDelay: '0.5s' }} />
                </div>
                
                <div className="space-y-4 mb-6">
                  <p className="text-xl md:text-2xl text-white font-bold leading-relaxed">
                    لحضور حفل تكريم الفائزين في مسابقة المولد النبوي الشريف
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <Calendar className="w-6 h-6 text-yellow-300" />
                        <h5 className="text-xl font-bold text-yellow-200">التاريخ الهجري</h5>
                      </div>
                      <p className="text-2xl font-bold text-white">
                        الخميس، ١٨ صفر ١٤٤٧ هـ
                      </p>
                    </div>
                    
                    <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <Calendar className="w-6 h-6 text-yellow-300" />
                        <h5 className="text-xl font-bold text-yellow-200">التاريخ الميلادي</h5>
                      </div>
                      <p className="text-2xl font-bold text-white">
                        الخميس، ١١ سبتمبر ٢٠٢٥ م
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 rounded-2xl p-6 border border-white/20 mt-6">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Clock className="w-6 h-6 text-yellow-300 animate-tick" />
                      <h5 className="text-xl font-bold text-yellow-200">الموعد</h5>
                    </div>
                    <p className="text-2xl font-bold text-white mb-2">
                      بعد صلاة العشاء مباشرة
                    </p>
                    <p className="text-lg text-yellow-100">
                      المسجد الشرقي - دار المناسبات الشرقيه، دمليج
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-center gap-4 mb-6">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-400 px-6 py-3 rounded-full">
                    <span className="text-white font-bold text-lg">🏆 تكريم الفائزين</span>
                  </div>
                  <div className="bg-gradient-to-r from-green-400 to-emerald-400 px-6 py-3 rounded-full">
                    <span className="text-white font-bold text-lg">🎁 توزيع الجوائز</span>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-lg text-yellow-100 mb-4 font-semibold">
                    نتطلع لرؤيتكم في هذا اليوم المبارك
                  </p>
                  <div className="flex justify-center items-center gap-2">
                    <Heart className="w-5 h-5 text-red-400 animate-pulse" />
                    <span className="text-white/90 text-sm">
                      مع أطيب التهاني والتبريكات
                    </span>
                    <Heart className="w-5 h-5 text-red-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-8 py-4 bg-white/20 rounded-full border border-white/30">
                  <CheckCircle className="w-6 h-6 text-green-300 animate-pulse" />
                  <span className="text-white font-bold text-lg">
                    مبروك النجاح والتفوق!
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};