import { MJMessage } from "midjourney";

export const MidjourneyAPi = (body: string,loading?: (uri: MJMessage) => void) =>{
  console.log('MidjourneyAPi');
  return fetch('api/imagine', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body,
  }) .then(async (response) => {
    const reader = response.body?.getReader();
    if (reader) {
      console.log('Response body is not null');
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        //Uint8Array to string
        const str = new TextDecoder("utf-8").decode(value);
        console.log(str);
        loading &&loading(JSON.parse(str))
      }
    } else {
       console.log('Response body is null');
    }
  });
}