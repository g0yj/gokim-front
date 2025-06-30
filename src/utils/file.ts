import log from "@/lib/logger";

export const downloadFileFromUrl = async (fileUrl: string, fileName: string) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();
  
      window.URL.revokeObjectURL(url);
    } catch (error) {
        log.error('파일 다운로드 실패:', error);
    }
};
  
export const getFileName = <T,>(file: T): string => {
  if (
    typeof file === 'object' &&
    file !== null &&
    'originalFileName' in file &&
    typeof (file as { originalFileName?: string }).originalFileName === 'string'
  ) {
    return (file as { originalFileName: string }).originalFileName;
  }

  if (Array.isArray(file) && typeof file[1] === 'string') {
    return file[1];
  }

  return '이름 없는 파일';
};