// src/utils/pkce.ts
function base64URLEncode(str: ArrayBuffer) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(str) as unknown as number[]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

function sha256(buffer: string): Promise<ArrayBuffer> {
    const encoder = new TextEncoder();
    const data = encoder.encode(buffer);
    return window.crypto.subtle.digest('SHA-256', data);
}

export async function generateCodeChallenge(codeVerifier: string): Promise<string> {
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64URLEncode(hashed);
    console.log("Code Verifier:", codeVerifier);
    console.log("Code Challenge:", codeChallenge);
    return codeChallenge;
}

export function generateCodeVerifier(): string {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    const verifier = base64URLEncode(array.buffer);
    console.log("Generated Code Verifier:", verifier);
    return verifier;
}
