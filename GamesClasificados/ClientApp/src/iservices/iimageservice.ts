export interface IImageService {
    uploadImage(file: File, fileName: string): Promise<boolean>;
    uploadImageFromBase64(base64Img: String, fileName: string): Promise<boolean>;
}