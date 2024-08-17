type MimeType = "image/jpeg" | "image/png" | "image/webp";

export const convertFileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const convertBase64ToFile = (
  base64: string,
  fileName: string,
  mimeType: MimeType = "image/jpeg"
): Promise<File> =>
  new Promise(async (resolve, reject) => {
    const blob = await fetch(base64)
      .then((res) => res.blob())
      .catch((err) => {
        console.error(err);
        reject(err);
        return null;
      });
    if (!blob) return;

    const file = new File([blob], fileName, {
      type: mimeType,
    });
    resolve(file);
  });
