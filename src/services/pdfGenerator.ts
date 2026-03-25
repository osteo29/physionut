function isMobileBrowser() {
  return /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(window.navigator.userAgent);
}

function downloadBlob(blob: Blob, fileName: string) {
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = objectUrl;
  link.download = fileName;
  link.rel = 'noopener';

  if (isMobileBrowser()) {
    link.target = '_blank';
  }

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.setTimeout(() => {
    URL.revokeObjectURL(objectUrl);
  }, 60_000);
}

export async function generatePdfFromElement({
  element,
  fileName,
}: {
  element: HTMLElement;
  fileName: string;
}) {
  const [{default: html2canvas}, {jsPDF}] = await Promise.all([
    import('html2canvas'),
    import('jspdf'),
  ]);

  const canvas = await html2canvas(element, {
    scale: Math.min(window.devicePixelRatio || 1, 2),
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#edf6f1',
    scrollX: 0,
    scrollY: -window.scrollY,
    windowWidth: Math.max(document.documentElement.clientWidth, element.scrollWidth),
    windowHeight: Math.max(document.documentElement.clientHeight, element.scrollHeight),
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

  const blob = pdf.output('blob');
  downloadBlob(blob, fileName);
}
