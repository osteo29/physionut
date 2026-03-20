import type {ReactNode} from 'react';
import type {DashboardPdfData, PdfReportData, RecoveryPdfData} from '../../services/pdfReports';

const SAGE = '#7da792';
const SAGE_LIGHT = '#dbe7e0';
const DEEP = '#16382c';
const MUTED = '#628474';
const SECTION_BG = '#ffffff';
const SURFACE_BG = '#f7fcf8';

function AccentDivider() {
  return (
    <div
      style={{
        height: 1,
        margin: '16px 0 18px',
        background: `linear-gradient(90deg, ${SAGE} 0%, ${SAGE_LIGHT} 52%, rgba(219,231,224,0) 100%)`,
      }}
    />
  );
}

function SectionCard({
  title,
  children,
  tone = 'default',
}: {
  title: string;
  children: ReactNode;
  tone?: 'default' | 'warm';
}) {
  const borderColor = tone === 'warm' ? '#f3d9b1' : SAGE_LIGHT;
  const background = tone === 'warm' ? '#fff7ed' : SECTION_BG;

  return (
    <div style={{background, borderRadius: 24, padding: 18, border: `1px solid ${borderColor}`}}>
      <div
        style={{
          height: 4,
          width: 72,
          borderRadius: 999,
          marginBottom: 12,
          background:
            tone === 'warm'
              ? 'linear-gradient(90deg, #d97706 0%, #fbbf24 100%)'
              : `linear-gradient(90deg, ${SAGE} 0%, #b9d2c4 100%)`,
        }}
      />
      <div style={{fontWeight: 800, color: DEEP, marginBottom: 12}}>{title}</div>
      {children}
    </div>
  );
}

function DashboardSection({report}: {report: DashboardPdfData}) {
  const isAr = report.lang === 'ar';

  return (
    <>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 18}}>
        {[
          {
            label: isAr ? 'إجمالي السجلات' : 'Total records',
            value: String(report.summary.totalRecords),
          },
          {
            label: isAr ? 'أنواع الحاسبات' : 'Calculator types',
            value: String(report.summary.calculatorTypes),
          },
          {
            label: isAr ? 'أحدث قيمة' : 'Latest value',
            value: report.summary.latestValue,
          },
        ].map((item) => (
          <div key={item.label} style={{background: SECTION_BG, borderRadius: 18, padding: 16, border: `1px solid ${SAGE_LIGHT}`}}>
            <div style={{fontSize: 11, color: MUTED, fontWeight: 700, textTransform: 'uppercase'}}>{item.label}</div>
            <div style={{marginTop: 8, fontSize: 20, color: DEEP, fontWeight: 800}}>{item.value}</div>
          </div>
        ))}
      </div>

      {report.chartImageDataUrl ? (
        <>
          <SectionCard title={isAr ? 'الرسم البياني للاتجاه' : 'Trend chart'}>
            <img src={report.chartImageDataUrl} alt="Trend chart" style={{width: '100%', borderRadius: 18}} />
          </SectionCard>
          <AccentDivider />
        </>
      ) : null}

      <SectionCard title={isAr ? 'أحدث السجلات المحفوظة' : 'Latest saved entries'}>
        {report.emptyMessage ? (
          <div style={{padding: 18, borderRadius: 16, background: SURFACE_BG, color: MUTED, lineHeight: 1.8}}>
            {report.emptyMessage}
          </div>
        ) : (
          <div style={{display: 'grid', gap: 10}}>
            {report.timelineEntries.map((item) => (
              <div key={item.id} style={{padding: 14, borderRadius: 16, background: SURFACE_BG, border: '1px solid #e3eeea'}}>
                <div style={{fontWeight: 700, color: DEEP}}>{item.calculatorType}</div>
                <div style={{marginTop: 4, color: '#315f4a'}}>{item.valueLabel}</div>
                <div style={{marginTop: 4, color: MUTED, fontSize: 12}}>{item.createdAt}</div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </>
  );
}

function RecoverySection({report}: {report: RecoveryPdfData}) {
  const isAr = report.lang === 'ar';

  return (
    <>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 18}}>
        {[
          {label: isAr ? 'الإصابة' : 'Injury', value: report.injuryName},
          {label: isAr ? 'المرحلة' : 'Phase', value: report.phaseLabel},
          {label: isAr ? 'الوزن' : 'Weight', value: `${report.weightKg} kg`},
        ].map((item) => (
          <div key={item.label} style={{background: SECTION_BG, borderRadius: 18, padding: 16, border: `1px solid ${SAGE_LIGHT}`}}>
            <div style={{fontSize: 11, color: MUTED, fontWeight: 700, textTransform: 'uppercase'}}>{item.label}</div>
            <div style={{marginTop: 8, fontSize: 18, color: DEEP, fontWeight: 800}}>{item.value}</div>
          </div>
        ))}
      </div>

      <SectionCard title={isAr ? 'الملخص الشخصي للتعافي' : 'Personal recovery summary'}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10}}>
          {report.planSummary.map((item) => (
            <div key={item.label} style={{padding: 14, borderRadius: 16, background: SURFACE_BG}}>
              <div style={{fontSize: 11, color: MUTED, fontWeight: 700, textTransform: 'uppercase'}}>{item.label}</div>
              <div style={{marginTop: 6, fontSize: 18, color: DEEP, fontWeight: 800}}>{item.value}</div>
            </div>
          ))}
        </div>
      </SectionCard>

      <AccentDivider />

      <div style={{display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 18}}>
        <SectionCard title={isAr ? 'أمثلة الوجبات' : 'Meal examples'}>
          <div style={{display: 'grid', gap: 10}}>
            {report.meals.map((item) => (
              <div key={item.label} style={{padding: 14, borderRadius: 16, background: SURFACE_BG}}>
                <div style={{fontWeight: 700, color: DEEP}}>{item.label}</div>
                <div style={{marginTop: 4, color: '#315f4a', lineHeight: 1.7}}>{item.value}</div>
              </div>
            ))}
          </div>
          <div style={{marginTop: 14, fontWeight: 800, color: DEEP}}>
            {isAr ? 'قائمة التسوق السريعة' : 'Mini shopping list'}
          </div>
          <div style={{marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 8}}>
            {report.shoppingList.map((item) => (
              <span key={item} style={{padding: '8px 12px', borderRadius: 999, background: '#edf6f1', color: '#1f4d3b', fontSize: 12, fontWeight: 700}}>
                {item}
              </span>
            ))}
          </div>
        </SectionCard>

        <div style={{display: 'grid', gap: 18}}>
          <SectionCard title={isAr ? 'جدول المكملات' : 'Supplement schedule'}>
            <div style={{display: 'grid', gap: 10}}>
              {report.supplementSchedule.map((item) => (
                <div key={`${item.name}-${item.dose}`} style={{padding: 14, borderRadius: 16, background: SURFACE_BG}}>
                  <div style={{fontWeight: 700, color: DEEP}}>{item.name} • {item.dose}</div>
                  <div style={{marginTop: 4, color: '#315f4a', lineHeight: 1.6}}>{item.reason}</div>
                  {item.timing ? <div style={{marginTop: 4, color: '#1f4d3b', fontSize: 12, fontWeight: 700}}>{item.timing}</div> : null}
                  {item.caution ? <div style={{marginTop: 4, color: '#b45309', fontSize: 12}}>{item.caution}</div> : null}
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title={isAr ? 'تنبيهات الأمان' : 'Safety notes'} tone="warm">
            <ul style={{margin: 0, paddingInlineStart: 18, color: '#92400e', lineHeight: 1.8}}>
              {[...report.safetyNotes, ...report.redFlags].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </SectionCard>
        </div>
      </div>
    </>
  );
}

function SignatureArea({report}: {report: PdfReportData}) {
  const isAr = report.lang === 'ar';

  return (
    <div
      style={{
        marginTop: 24,
        padding: '18px 20px',
        borderRadius: 24,
        background: 'linear-gradient(180deg, rgba(247,252,248,0.95) 0%, rgba(237,246,241,0.9) 100%)',
        border: `1px solid ${SAGE_LIGHT}`,
      }}
    >
      <div style={{fontWeight: 800, color: DEEP, marginBottom: 6}}>
        {isAr ? `تم إنشاء هذا التقرير للمستخدم ${report.userName}` : `Generated for ${report.userName}`}
      </div>
      <div style={{fontSize: 13, color: MUTED, marginBottom: 18}}>
        {isAr ? 'PhysioNutrition System - نسخة مخصصة للطباعة والمراجعة' : 'PhysioNutrition System - a personalized report for review and printing'}
      </div>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24}}>
        <div>
          <div style={{fontSize: 11, color: MUTED, textTransform: 'uppercase', fontWeight: 700, marginBottom: 28}}>
            {isAr ? 'الإمضاء' : 'Signature'}
          </div>
          <div style={{borderBottom: `1.5px solid ${SAGE}`, opacity: 0.9}} />
        </div>
        <div>
          <div style={{fontSize: 11, color: MUTED, textTransform: 'uppercase', fontWeight: 700, marginBottom: 28}}>
            {isAr ? 'ملاحظات إضافية' : 'Additional notes'}
          </div>
          <div style={{borderBottom: `1.5px solid ${SAGE}`, opacity: 0.9}} />
        </div>
      </div>
    </div>
  );
}

export default function PdfReportSheet({report}: {report: PdfReportData}) {
  const isAr = report.lang === 'ar';

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      style={{
        width: 794,
        padding: 28,
        background: 'linear-gradient(180deg, #f7fcf8 0%, #edf6f1 100%)',
        color: DEEP,
        fontFamily: '"Segoe UI", Tahoma, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          opacity: 0.05,
          fontSize: 84,
          fontWeight: 900,
          letterSpacing: '0.14em',
          color: SAGE,
          transform: 'rotate(-24deg) scale(1.18)',
          textTransform: 'uppercase',
          userSelect: 'none',
        }}
      >
        {report.branding.siteName}
      </div>

      <div
        style={{
          position: 'relative',
          background: '#ffffff',
          borderRadius: 32,
          padding: 24,
          border: `1px solid ${SAGE_LIGHT}`,
          boxShadow: '0 12px 28px rgba(31,77,59,0.08)',
        }}
      >
        <div style={{display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'flex-start', marginBottom: 20}}>
          <div>
            <div style={{display: 'inline-block', padding: '8px 12px', background: '#edf6f1', color: '#1f4d3b', borderRadius: 999, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em'}}>
              {report.branding.siteName}
            </div>
            <h1 style={{margin: '14px 0 8px', fontSize: 28, lineHeight: 1.2}}>{report.title}</h1>
            <p style={{margin: 0, color: MUTED, maxWidth: 460, lineHeight: 1.7}}>{report.subtitle}</p>
          </div>
          <div style={{textAlign: isAr ? 'left' : 'right'}}>
            <img src={report.branding.qrDataUrl} alt="QR code" style={{width: 96, height: 96, borderRadius: 12, background: '#fff', padding: 6}} />
            <div style={{marginTop: 8, fontSize: 12, color: MUTED}}>{report.generatedAt}</div>
          </div>
        </div>

        <AccentDivider />

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20}}>
          <div style={{background: SURFACE_BG, borderRadius: 18, padding: 16}}>
            <div style={{fontSize: 11, color: MUTED, fontWeight: 700, textTransform: 'uppercase'}}>
              {isAr ? 'اسم المستخدم' : 'User'}
            </div>
            <div style={{marginTop: 8, fontWeight: 800, fontSize: 18}}>{report.userName}</div>
          </div>
          <div style={{background: SURFACE_BG, borderRadius: 18, padding: 16}}>
            <div style={{fontSize: 11, color: MUTED, fontWeight: 700, textTransform: 'uppercase'}}>
              {isAr ? 'البريد' : 'Email'}
            </div>
            <div style={{marginTop: 8, fontWeight: 800, fontSize: 16}}>{report.userEmail || report.branding.email}</div>
          </div>
        </div>

        {report.variant === 'dashboard' ? <DashboardSection report={report} /> : <RecoverySection report={report} />}

        <AccentDivider />
        <SignatureArea report={report} />

        <div style={{marginTop: 24, paddingTop: 18, borderTop: `1px solid ${SAGE_LIGHT}`, display: 'flex', justifyContent: 'space-between', gap: 18, alignItems: 'center'}}>
          <div>
            <div style={{fontWeight: 800, marginBottom: 6}}>{report.branding.siteName}</div>
            <div style={{fontSize: 12, color: MUTED, marginBottom: 4}}>{report.branding.siteUrl}</div>
            <div style={{fontSize: 12, color: MUTED}}>{report.branding.email}</div>
          </div>
          <div style={{textAlign: isAr ? 'left' : 'right'}}>
            <div style={{fontWeight: 700, marginBottom: 6, color: DEEP}}>
              {isAr ? 'روابط التواصل' : 'Social links'}
            </div>
            {report.branding.socialLinks.map((item) => (
              <div key={item.label} style={{fontSize: 12, color: MUTED, marginBottom: 4}}>
                {item.label}: {item.url}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
