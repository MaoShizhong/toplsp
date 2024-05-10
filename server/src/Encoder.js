export default class Encoder {
  #decoderCache = "";

  encode(request) {
    if (request == undefined || request.length === 0) {
      return `Content-Length 0`;
    }
    const json = JSON.stringify(request);

    return `Content-Length: ${json.length}\r\n\r\n${json}`;
  }

  decode(request) {
    this.#decoderCache += request;
    const startIndex = "Content-Length ".length;
    const lastIndex = this.#decoderCache.indexOf("\r\n\r\n");
    const length = Number(this.#decoderCache.substring(startIndex, lastIndex));

    const bodyStartIndex = this.#decoderCache.indexOf("{");
    if (bodyStartIndex === -1) {
      return null;
    }

    const requestBody = this.#decoderCache.substring(
      bodyStartIndex,
      bodyStartIndex + length,
    );

    if (length > requestBody.length) {
      return null;
    }

    console.log(requestBody);
    this.#decoderCache = this.#decoderCache.substring(bodyStartIndex + length);
    return JSON.parse(requestBody);
  }
}
