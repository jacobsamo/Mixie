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

export function convertUint8ArrayToBase64(array: Uint8Array): string {
  let latin1string = "";

  // Note: regular for loop to support older JavaScript versions that
  // do not support for..of on Uint8Array
  for (let i = 0; i < array.length; i++) {
    latin1string += String.fromCodePoint(array[i]!);
  }

  return btoa(latin1string);
}

export type DataContent = string | Uint8Array | ArrayBuffer | Buffer;

/**
Converts data content to a base64-encoded string.

@param content - Data content to convert.
@returns Base64-encoded string.
*/
export function convertDataContentToBase64String(content: DataContent): string {
  if (typeof content === "string") {
    return content;
  }

  if (content instanceof ArrayBuffer) {
    return convertUint8ArrayToBase64(new Uint8Array(content));
  }

  return convertUint8ArrayToBase64(content);
}
