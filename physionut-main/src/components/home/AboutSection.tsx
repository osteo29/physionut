import {memo} from 'react';
import {motion} from 'motion/react';
import {
  Brain,
  Calculator,
  HeartPulse,
  Info,
  Sparkles,
  Stethoscope,
} from 'lucide-react';
import type {Language} from '../../services/translations';

const AboutSection = memo(({lang}: {lang: Language}) => {
  return (
    <section id="about" className="py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-health-green/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-medical-blue/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{opacity: 0, x: -30}}
            whileInView={{opacity: 1, x: 0}}
            viewport={{once: true}}
            transition={{duration: 0.8}}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-health-green/10 text-health-green text-sm font-bold mb-8 border border-health-green/20">
              <Info className="w-4 h-4" />
              <span>{lang === 'en' ? 'Our Story' : 'قصتنا'}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight tracking-tight">
              {lang === 'en' ? 'Bridging the Gap Between' : 'سد الفجوة بين'}{' '}
              <br />
              <span className="text-health-green inline-block mt-2">
                {lang === 'en'
                  ? 'Physical Therapy & Nutrition'
                  : 'العلاج الطبيعي والتغذية'}
              </span>
            </h2>
            <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
              <p>
                {lang === 'en'
                  ? 'PhysioHub was founded with a single mission: to provide clinicians and patients with precision tools that integrate movement science and clinical nutrition.'
                  : 'تأسست فيزيو هاب بمهمة واحدة: تزويد الممارسين والمرضى بأدوات دقيقة تدمج علوم الحركة والتغذية العلاجية.'}
              </p>
              <p>
                {lang === 'en'
                  ? 'Developed by a dedicated Physical Therapy student, this platform combines evidence-based protocols with modern AI technology to streamline recovery and optimize human performance.'
                  : 'تم تطوير هذه المنصة من قبل طالب علاج طبيعي متخصص، وهي تجمع بين البروتوكولات القائمة على الأدلة وتقنيات الذكاء الاصطناعي الحديثة لتبسيط عملية التعافي وتحسين الأداء البشري.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
              <div className="flex items-center gap-4 p-6 rounded-[2rem] bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-xl transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl bg-health-green/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Calculator className="w-7 h-7 text-health-green" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">10+</div>
                  <div className="text-sm text-slate-500 font-medium">
                    {lang === 'en' ? 'Clinical Tools' : 'أداة سريرية'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 rounded-[2rem] bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-xl transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl bg-medical-blue/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Brain className="w-7 h-7 text-medical-blue" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">AI</div>
                  <div className="text-sm text-slate-500 font-medium">
                    {lang === 'en' ? 'Powered Insights' : 'رؤى ذكية'}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{opacity: 0, scale: 0.8}}
            whileInView={{opacity: 1, scale: 1}}
            viewport={{once: true}}
            transition={{duration: 0.8}}
            className="relative"
          >
            <div className="relative z-10 aspect-square bg-gradient-to-br from-soft-blue to-white rounded-[4rem] shadow-2xl overflow-hidden flex items-center justify-center p-16 border border-slate-100">
              <div className="absolute inset-0 opacity-10">
                <div
                  className="absolute top-0 left-0 w-full h-full"
                  style={{
                    backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />
              </div>
              <div className="relative w-full h-full bg-white rounded-[3rem] shadow-2xl flex items-center justify-center group">
                <HeartPulse className="w-48 h-48 text-health-green opacity-5 absolute group-hover:scale-110 transition-transform duration-700" />
                <Stethoscope className="w-32 h-32 text-medical-blue relative z-10 group-hover:rotate-12 transition-transform duration-700" />
              </div>
            </div>

            {/* Floating Card */}
            <motion.div
              animate={{y: [0, -10, 0]}}
              transition={{duration: 4, repeat: Infinity, ease: 'easeInOut'}}
              className="absolute -bottom-10 -right-10 md:right-0 bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 z-20 max-w-[280px]"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-health-green/10 p-3 rounded-2xl">
                  <Sparkles className="w-6 h-6 text-health-green" />
                </div>
                <div className="text-sm font-bold text-slate-900 leading-tight">
                  {lang === 'en' ? 'Evidence Based' : 'قائم على الأدلة'}
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {lang === 'en'
                  ? 'All tools and protocols are derived from the latest clinical research and peer-reviewed literature.'
                  : 'جميع الأدوات والبروتوكولات مستمدة من أحدث الأبحاث السريرية والمؤلفات العلمية المحكمة.'}
              </p>
            </motion.div>

            {/* Decorative Circles */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />
            <div className="absolute top-1/2 -right-20 w-48 h-48 bg-health-green/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;

