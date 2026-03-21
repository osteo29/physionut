import html2canvas from 'html2canvas';
import {jsPDF} from 'jspdf';

export async function generatePdfFromElement({
  element,
  fileName,
}: {
  element: HTMLElement;
  fileName: string;
}) {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#edf6f1',
  });

  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 10;
  const contentWidth = pageWidth - margin * 2;
  const contentHeight = pageHeight - margin * 2;
  const pagePixelHeight = Math.floor((canvas.width * contentHeight) / contentWidth);

  let renderedHeight = 0;
  let pageIndex = 0;

  while (renderedHeight < canvas.height) {
    const sliceHeight = Math.min(pagePixelHeight, canvas.height - renderedHeight);
    const pageCanvas = document.createElement('canvas');
    pageCanvas.width = canvas.width;
    pageCanvas.height = sliceHeight;
    const context = pageCanvas.getContext('2d');

    if (!context) {
      throw new Error('Could not create PDF page context.');
    }

    context.drawImage(
      canvas,
      0,
      renderedHeight,
      canvas.width,
      sliceHeight,
      0,
      0,
      canvas.width,
      sliceHeight,
    );

    const imageData = pageCanvas.toDataURL('image/png');
    const renderedHeightMm = (sliceHeight * contentWidth) / canvas.width;

    if (pageIndex > 0) {
      pdf.addPage();
    }

    pdf.addImage(imageData, 'PNG', margin, margin, contentWidth, renderedHeightMm, undefined, 'FAST');

    renderedHeight += sliceHeight;
    pageIndex += 1;
  }

  pdf.save(fileName);
}
