import {useEffect} from 'react';
import type {DashboardPdfData} from '../../services/pdfReports';
import PdfReportSheet from '../pdf/PdfReportSheet';

type LazyPdfReportSheetProps = {
  onReady?: () => void;
  report: DashboardPdfData;
};

export default function LazyPdfReportSheet({onReady, report}: LazyPdfReportSheetProps) {
  useEffect(() => {
    onReady?.();
  }, [onReady, report]);

  return <PdfReportSheet report={report} />;
}
