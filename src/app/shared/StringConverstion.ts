import * as CryptoJS from "crypto-js";

export class StringConversion {

    public static Encrypt(toBeEncrypted: string): string {
        const key = CryptoJS.enc.Utf8.parse('2006199220061992');
        const iv = CryptoJS.enc.Utf8.parse('1992200619922006');
        return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(toBeEncrypted), key,
            {
                keySize: 128 / 8,
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }).toString();
    }

    public static Decrypt(toBeDecrpyted: string): string {
        const key = CryptoJS.enc.Utf8.parse('2006199220061992');
        const iv = CryptoJS.enc.Utf8.parse('1992200619922006');
        var decrypted = CryptoJS.AES.decrypt(toBeDecrpyted, key, {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return decrypted.toString(CryptoJS.enc.Utf8)
    }

}